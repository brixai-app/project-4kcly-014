export type BrixApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface BrixApiClientOptions {
  baseUrl?: string;
  headers?: HeadersInit;
  credentials?: RequestCredentials;
  timeoutMs?: number;
  onUnauthorized?: () => void;
  onError?: (error: BrixApiError) => void;
  fetchImpl?: typeof fetch;
}

export interface BrixApiRequestOptions extends Omit<RequestInit, 'body' | 'headers' | 'method'> {
  headers?: HeadersInit;
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: unknown;
  timeoutMs?: number;
  parseAs?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'response';
}

export interface BrixApiErrorDetails {
  status?: number;
  statusText?: string;
  url?: string;
  method?: string;
  code?: string;
  details?: unknown;
  cause?: unknown;
}

export class BrixApiError extends Error {
  status?: number;
  statusText?: string;
  url?: string;
  method?: string;
  code?: string;
  details?: unknown;
  cause?: unknown;

  constructor(message: string, details: BrixApiErrorDetails = {}) {
    super(message);
    this.name = 'BrixApiError';
    this.status = details.status;
    this.statusText = details.statusText;
    this.url = details.url;
    this.method = details.method;
    this.code = details.code;
    this.details = details.details;
    this.cause = details.cause;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

const DEFAULT_TIMEOUT_MS = 30_000;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function joinUrl(baseUrl: string, path: string): string {
  if (!baseUrl) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

function buildUrl(url: string, params?: BrixApiRequestOptions['params']): string {
  if (!params) return url;
  const nextUrl = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    nextUrl.searchParams.set(key, String(value));
  }
  return /^https?:\/\//i.test(url) ? nextUrl.toString() : `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
}

function mergeHeaders(...headersList: Array<HeadersInit | undefined>): Headers {
  const headers = new Headers();
  for (const headerInit of headersList) {
    if (!headerInit) continue;
    const header = new Headers(headerInit);
    header.forEach((value, key) => headers.set(key, value));
  }
  return headers;
}

function isFormData(value: unknown): value is FormData {
  return typeof FormData !== 'undefined' && value instanceof FormData;
}

function isBlob(value: unknown): value is Blob {
  return typeof Blob !== 'undefined' && value instanceof Blob;
}

function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer;
}

function isURLSearchParams(value: unknown): value is URLSearchParams {
  return typeof URLSearchParams !== 'undefined' && value instanceof URLSearchParams;
}

function serializeBody(body: unknown, headers: Headers): BodyInit | undefined {
  if (body === undefined || body === null) return undefined;
  if (
    typeof body === 'string' ||
    isFormData(body) ||
    isBlob(body) ||
    isArrayBuffer(body) ||
    isURLSearchParams(body)
  ) {
    return body as BodyInit;
  }
  if (body instanceof ReadableStream) return body as unknown as BodyInit;
  if (body instanceof URL) return body.toString();
  if (typeof body === 'object') {
    if (!headers.has('content-type')) headers.set('content-type', 'application/json');
    return JSON.stringify(body as JsonValue);
  }
  return String(body);
}

async function parseResponse<T>(response: Response, parseAs: NonNullable<BrixApiRequestOptions['parseAs']>): Promise<T> {
  if (parseAs === 'response') return response as unknown as T;
  if (parseAs === 'text') return (await response.text()) as unknown as T;
  if (parseAs === 'blob') return (await response.blob()) as unknown as T;
  if (parseAs === 'arrayBuffer') return (await response.arrayBuffer()) as unknown as T;
  return (await response.json()) as T;
}

async function safeParseErrorDetails(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) return await response.json();
    return await response.text();
  } catch {
    return undefined;
  }
}

function createTimeoutSignal(timeoutMs: number): { signal: AbortSignal; cleanup: () => void } {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new DOMException('Request timed out', 'TimeoutError')), timeoutMs);
  return {
    signal: controller.signal,
    cleanup: () => clearTimeout(timer),
  };
}

export function createBrixApiClient(options: BrixApiClientOptions = {}) {
  const {
    baseUrl = '',
    headers: defaultHeaders,
    credentials = 'same-origin',
    timeoutMs = DEFAULT_TIMEOUT_MS,
    onUnauthorized,
    onError,
    fetchImpl = fetch,
  } = options;

  async function request<T = unknown>(
    method: BrixApiMethod,
    path: string,
    requestOptions: BrixApiRequestOptions = {}
  ): Promise<T> {
    const url = buildUrl(joinUrl(baseUrl, path), requestOptions.params);
    const headers = mergeHeaders(defaultHeaders, requestOptions.headers);
    const body = serializeBody(requestOptions.body, headers);
    const effectiveTimeout = requestOptions.timeoutMs ?? timeoutMs;
    const timeout = effectiveTimeout > 0 ? createTimeoutSignal(effectiveTimeout) : null;

    const init: RequestInit = {
      ...requestOptions,
      method,
      headers,
      body,
      credentials: requestOptions.credentials ?? credentials,
      signal: requestOptions.signal ?? timeout?.signal,
    };

    try {
      const response = await fetchImpl(url, init);

      if (!response.ok) {
        const details = await safeParseErrorDetails(response);
        const error = new BrixApiError(
          `Request failed with status ${response.status}${response.statusText ? ` ${response.statusText}` : ''}`,
          {
            status: response.status,
            statusText: response.statusText,
            url,
            method,
            details,
          }
        );

        if (response.status === 401) onUnauthorized?.();
        onError?.(error);
        throw error;
      }

      const parseAs = requestOptions.parseAs ?? 'json';
      if (parseAs === 'response') return response as unknown as T;

      if (response.status === 204 || response.status === 205) {
        return undefined as T;
      }

      return await parseResponse<T>(response, parseAs);
    } catch (cause) {
      if (cause instanceof BrixApiError) throw cause;

      const error =
        cause instanceof DOMException && cause.name === 'AbortError'
          ? new BrixApiError('Request was aborted', { url, method, code: 'ABORTED', cause })
          : new BrixApiError(cause instanceof Error ? cause.message : 'Network request failed', {
              url,
              method,
              code: 'NETWORK_ERROR',
              cause,
            });

      onError?.(error);
      throw error;
    } finally {
      timeout?.cleanup();
    }
  }

  return {
    request,
    get<T = unknown>(path: string, requestOptions?: BrixApiRequestOptions) {
      return request<T>('GET', path, requestOptions);
    },
    post<T = unknown>(path: string, body?: unknown, requestOptions: BrixApiRequestOptions = {}) {
      return request<T>('POST', path, { ...requestOptions, body });
    },
    put<T = unknown>(path: string, body?: unknown, requestOptions: BrixApiRequestOptions = {}) {
      return request<T>('PUT', path, { ...requestOptions, body });
    },
    patch<T = unknown>(path: string, body?: unknown, requestOptions: BrixApiRequestOptions = {}) {
      return request<T>('PATCH', path, { ...requestOptions, body });
    },
    delete<T = unknown>(path: string, requestOptions?: BrixApiRequestOptions) {
      return request<T>('DELETE', path, requestOptions);
    },
    withDefaults(nextOptions: BrixApiClientOptions) {
      return createBrixApiClient({
        baseUrl: nextOptions.baseUrl ?? baseUrl,
        headers: mergeHeaders(defaultHeaders, nextOptions.headers),
        credentials: nextOptions.credentials ?? credentials,
        timeoutMs: nextOptions.timeoutMs ?? timeoutMs,
        onUnauthorized: nextOptions.onUnauthorized ?? onUnauthorized,
        onError: nextOptions.onError ?? onError,
        fetchImpl: nextOptions.fetchImpl ?? fetchImpl,
      });
    },
  };
}

export type BrixApiClient = ReturnType<typeof createBrixApiClient>;