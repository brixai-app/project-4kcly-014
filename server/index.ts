import { Hono } from 'hono';
import { cors } from 'hono/cors';
import db, { getInstrumentBySlug, getInstruments, getTableData, inspectTables, insertContactMessage } from './db';
import type { ContactMessage, ContactValidationResult, Instrument, ApiPayload } from '../src/types';

const index = new Hono();

index.use(
  '/api/*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  })
);

const jsonError = (message: string, status = 400) =>
  index.json<ApiPayload>({ success: false, error: message, message }, status);

const isString = (value: unknown) => typeof value === 'string' && value.trim().length > 0;

const validateContact = (input: Partial<ContactMessage>): ContactValidationResult => {
  const errors: ContactValidationResult['errors'] = {};
  if (!isString(input?.name)) errors.name = 'Name is required.';
  if (!isString(input?.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email ?? '')) errors.email = 'Valid email is required.';
  if (!isString(input?.subject)) errors.subject = 'Subject is required.';
  if (!isString(input?.message)) errors.message = 'Message is required.';
  if (input?.phone != null && typeof input.phone !== 'string') errors.phone = 'Phone must be a string.';
  if (input?.preferredInstrument != null && typeof input.preferredInstrument !== 'string') errors.preferredInstrument = 'Preferred instrument must be a string.';
  return { valid: Object.keys(errors).length === 0, errors };
};

const parseFeatures = (instrument: Instrument) => ({
  ...instrument,
  gallery: Array.isArray(instrument?.gallery) ? instrument.gallery.filter((item): item is string => typeof item === 'string' && item.trim().length > 0) : [],
  materials: Array.isArray(instrument?.materials) ? instrument.materials.filter((item): item is string => typeof item === 'string' && item.trim().length > 0) : [],
});

index.get('/api/instruments', async (c) => {
  try {
    const instruments = await getInstruments();
    return c.json<ApiPayload<Instrument[]>>({ success: true, data: instruments.map(parseFeatures) });
  } catch {
    return c.json<ApiPayload>({ success: false, error: 'Failed to load instruments.' }, 500);
  }
});

index.get('/api/instruments/:id', async (c) => {
  try {
    const id = c.req.param('id') ?? '';
    const instruments = await getInstruments();
    const byId = instruments.find((item) => item?.id === id || item?.slug === id) ?? null;
    const instrument = byId ?? (await getInstrumentBySlug(id));
    if (!instrument) return jsonError('Instrument not found.', 404);
    return c.json<ApiPayload<Instrument>>({ success: true, data: parseFeatures(instrument) });
  } catch {
    return c.json<ApiPayload>({ success: false, error: 'Failed to load instrument.' }, 500);
  }
});

index.post('/api/contact', async (c) => {
  try {
    const body = (await c.req.json().catch(() => null)) as Partial<ContactMessage> | null;
    if (!body) return jsonError('Invalid request body.');
    const validation = validateContact(body);
    if (!validation.valid) return c.json<ApiPayload<{ errors: ContactValidationResult['errors'] }>>({ success: false, error: 'Validation failed.', data: { errors: validation.errors } }, 422);
    const result = await insertContactMessage({
      name: body.name?.trim() ?? '',
      email: body.email?.trim() ?? '',
      subject: body.subject?.trim() ?? '',
      message: body.message?.trim() ?? '',
      phone: body.phone?.trim(),
      preferredInstrument: body.preferredInstrument?.trim(),
    });
    return c.json<ApiPayload<{ id: string }>>({ success: true, data: { id: result.id }, message: 'Message received.' }, 201);
  } catch {
    return c.json<ApiPayload>({ success: false, error: 'Failed to submit contact message.' }, 500);
  }
});

index.get('/api/_admin/db/tables', async (c) => {
  try {
    const tables = await inspectTables();
    return c.json<ApiPayload<string[]>>({ success: true, data: tables });
  } catch {
    return c.json<ApiPayload>({ success: false, error: 'Failed to inspect tables.' }, 500);
  }
});

index.get('/api/_admin/db/table/:name', async (c) => {
  try {
    const name = c.req.param('name') ?? '';
    if (name !== 'Instruments' && name !== 'ContactMessages') return jsonError('Table not allowed.', 403);
    const rows = await getTableData(name);
    return c.json<ApiPayload<typeof rows>>({ success: true, data: rows });
  } catch {
    return c.json<ApiPayload>({ success: false, error: 'Failed to load table data.' }, 500);
  }
});

export default index;