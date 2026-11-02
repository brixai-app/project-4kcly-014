export type BrixApiClientOptions = {
  baseUrl?: string;
  getAuthToken?: () => string | Promise<string | null | undefined>;
  onUnauthorized?: () => void;
  defaultHeaders?: HeadersInit;
  fetchImpl?: typeof fetch;
};

export type BrixApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  query?: Record<string, string | number | boolean | null | undefined>;
  headers?: HeadersInit;
  responseType?: "json" | "text" | "blob" | "arrayBuffer" | "response";
  skipAuth?: boolean;
};

export class BrixApiError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly method: string;
  readonly code?: string;
  readonly details?: unknown;
  readonly responseBody?: unknown;

  constructor(params: {
    message: string;
    status: number;
    statusText: string;
    url: string;
    method: string;
    code?: string;
    details?: unknown;
    responseBody?: unknown;
  }) {
    super(params.message);
    this.name = "BrixApiError";
    this.status = params.status;
    this.statusText = params.statusText;
    this.url = params.url;
    this.method = params.method;
    this.code = params.code;
    this.details = params.details;
    this.responseBody = params.responseBody;
    Object.setPrototypeOf(this, BrixApiError.prototype);
  }
}

type ApiClient = {
  request<T = unknown>(path: string, options?: BrixApiRequestOptions): Promise<T>;
  get<T = unknown>(path: string, options?: Omit<BrixApiRequestOptions, "method" | "body">): Promise<T>;
  post<T = unknown>(path: string, body?: unknown, options?: Omit<BrixApiRequestOptions, "method" | "body">): Promise<T>;
  put<T = unknown>(path: string, body?: unknown, options?: Omit<BrixApiRequestOptions, "method" | "body">): Promise<T>;
  patch<T = unknown>(path: string, body?: unknown, options?: Omit<BrixApiRequestOptions, "method" | "body">): Promise<T>;
  delete<T = unknown>(path: string, options?: Omit<BrixApiRequestOptions, "method" | "body">): Promise<T>;
  raw(path: string, options?: BrixApiRequestOptions): Promise<Response>;
};

const isAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value);

const joinUrl = (baseUrl: string, path: string) => {
  if (isAbsoluteUrl(path)) return path;
  const base = baseUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};

const buildQueryString = (query?: Record<string, string | number | boolean | null | undefined>) => {
  if (!query) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined) continue;
    params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
};

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (Object.prototype.toString.call(value) !== "[object Object]") return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

const mergeHeaders = (a?: HeadersInit, b?: HeadersInit) => {
  const headers = new Headers(a);
  if (b) {
    const incoming = new Headers(b);
    incoming.forEach((value, key) => headers.set(key, value));
  }
  return headers;
};

const safeJsonParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const normalizeErrorMessage = (status: number, statusText: string, body: unknown) => {
  if (typeof body === "string" && body.trim()) return body;
  if (isPlainObject(body)) {
    const candidate =
      (typeof body.message === "string" && body.message) ||
      (typeof body.error === "string" && body.error) ||
      (typeof body.detail === "string" && body.detail) ||
      (typeof body.title === "string" && body.title);
    if (candidate) return candidate;
  }
  return `Request failed with status ${status}${statusText ? ` ${statusText}` : ""}`;
};

const serializeBody = (body: unknown, headers: Headers) => {
  if (body === undefined || body === null) return undefined;
  if (
    typeof body === "string" ||
    body instanceof Blob ||
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof ArrayBuffer ||
    ArrayBuffer.isView(body)
  ) {
    return body as BodyInit;
  }
  if (isPlainObject(body) || Array.isArray(body)) {
    if (!headers.has("content-type")) headers.set("content-type", "application/json");
    return JSON.stringify(body);
  }
  if (typeof body === "number" || typeof body === "boolean") {
    if (!headers.has("content-type")) headers.set("content-type", "application/json");
    return JSON.stringify(body);
  }
  return String(body);
};

export function createBrixApiClient(options: BrixApiClientOptions = {}): ApiClient {
  const baseUrl = options.baseUrl ?? (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_API_BASE_URL ?? "" : "");
  const fetchImpl = options.fetchImpl ?? fetch.bind(globalThis);

  const request = async <T = unknown>(path: string, reqOptions: BrixApiRequestOptions = {}): Promise<T> => {
    const method = (reqOptions.method ?? "GET").toUpperCase();
    const url = `${joinUrl(baseUrl, path)}${buildQueryString(reqOptions.query)}`;

    const headers = mergeHeaders(options.defaultHeaders, reqOptions.headers);
    if (!headers.has("accept")) headers.set("accept", "application/json");

    if (!reqOptions.skipAuth && options.getAuthToken) {
      const token = await options.getAuthToken();
      if (token) headers.set("authorization", `Bearer ${token}`);
    }

    const body = serializeBody(reqOptions.body, headers);

    const response = await fetchImpl(url, {
      ...reqOptions,
      method,
      headers,
      body,
    });

    if (response.status === 401 && options.onUnauthorized) {
      options.onUnauthorized();
    }

    if (reqOptions.responseType === "response") {
      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new BrixApiError({
          message: normalizeErrorMessage(response.status, response.statusText, text),
          status: response.status,
          statusText: response.statusText,
          url,
          method,
          responseBody: text,
        });
      }
      return response as unknown as T;
    }

    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json") || contentType.includes("+json");

    let parsed: unknown = undefined;
    if (reqOptions.responseType === "blob") {
      parsed = await response.blob();
    } else if (reqOptions.responseType === "arrayBuffer") {
      parsed = await response.arrayBuffer();
    } else if (reqOptions.responseType === "text") {
      parsed = await response.text();
    } else if (isJson) {
      const text = await response.text();
      parsed = text ? safeJsonParse(text) : null;
    } else {
      parsed = await response.text();
    }

    if (!response.ok) {
      throw new BrixApiError({
        message: normalizeErrorMessage(response.status, response.statusText, parsed),
        status: response.status,
        statusText: response.statusText,
        url,
        method,
        responseBody: parsed,
        details: isPlainObject(parsed) ? parsed : undefined,
      });
    }

    return parsed as T;
  };

  return {
    request,
    raw: (path, options) => request<Response>(path, { ...options, responseType: "response" }),
    get: (path, options) => request(path, { ...options, method: "GET" }),
    post: (path, body, options) => request(path, { ...options, method: "POST", body }),
    put: (path, body, options) => request(path, { ...options, method: "PUT", body }),
    patch: (path, body, options) => request(path, { ...options, method: "PATCH", body }),
    delete: (path, options) => request(path, { ...options, method: "DELETE" }),
  };
}