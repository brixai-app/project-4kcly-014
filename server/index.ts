import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { db, initDb, inspectTables, getTableData } from './db';
import type { ContactFormValues, Product } from '../src/types';

const index = new Hono();

index.use('/api/*', cors({ origin: '*', allowMethods: ['GET', 'POST', 'OPTIONS'], allowHeaders: ['Content-Type'] }));

const jsonError = (message: string, status = 400) => index.json({ ok: false, error: message }, status);

const isString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const clean = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const toNumber = (value: unknown) => {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : NaN;
};

const normalizeProduct = (row: Record<string, unknown>): Product => ({
  id: String(row?.id ?? ''),
  name: String(row?.name ?? ''),
  category: String(row?.category ?? ''),
  price: toNumber(row?.price ?? 0),
  image: String(row?.image ?? ''),
  description: row?.description ? String(row.description) : undefined,
  origin: row?.origin ? String(row.origin) : undefined,
  featured: Boolean(row?.featured ?? false),
  slug: row?.slug ? String(row.slug) : undefined,
  accent: row?.accent === 'red' || row?.accent === 'green' || row?.accent === 'blue' ? row.accent : undefined,
});

index.get('/api/health', (c) => c.json({ ok: true, status: 'ready' }));

index.get('/api/products', async (c) => {
  try {
    const result = await db.execute(
      'SELECT id, name, category, price, image, description, origin, featured, slug, accent FROM products ORDER BY featured DESC, name ASC'
    );
    const products = (result.rows ?? []).map((row) => normalizeProduct(row as Record<string, unknown>));
    return c.json({ ok: true, data: products });
  } catch (error) {
    return c.json({ ok: false, error: 'Failed to load products' }, 500);
  }
});

index.get('/api/products/:id', async (c) => {
  const id = clean(c.req.param('id'));
  if (!id) return jsonError('Product id is required', 400);
  try {
    const result = await db.execute({
      sql: 'SELECT id, name, category, price, image, description, origin, featured, slug, accent FROM products WHERE id = ? LIMIT 1',
      args: [id],
    });
    const row = result.rows?.[0] as Record<string, unknown> | undefined;
    if (!row) return jsonError('Product not found', 404);
    return c.json({ ok: true, data: normalizeProduct(row) });
  } catch {
    return c.json({ ok: false, error: 'Failed to load product' }, 500);
  }
});

index.post('/api/contact', async (c) => {
  try {
    const body = (await c.req.json().catch(() => null)) as Partial<ContactFormValues> | null;
    const name = clean(body?.name);
    const email = clean(body?.email);
    const subject = clean(body?.subject);
    const message = clean(body?.message);

    if (!name || !email || !subject || !message) return jsonError('All contact fields are required', 400);
    if (!email.includes('@')) return jsonError('A valid email address is required', 400);

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await db.execute({
      sql: 'INSERT INTO contact_messages (id, name, email, subject, message, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
      args: [id, name, email, subject, message, createdAt],
    });

    return c.json({ ok: true, data: { id, name, email, subject, message, createdAt } }, 201);
  } catch {
    return c.json({ ok: false, error: 'Failed to save contact message' }, 500);
  }
});

index.get('/api/admin/tables', async (c) => {
  try {
    const tables = await inspectTables();
    return c.json({ ok: true, data: tables });
  } catch {
    return c.json({ ok: false, error: 'Failed to inspect tables' }, 500);
  }
});

index.get('/api/admin/tables/:name', async (c) => {
  const name = clean(c.req.param('name'));
  if (!name) return jsonError('Table name is required', 400);
  try {
    const data = await getTableData(name);
    return c.json({ ok: true, data });
  } catch {
    return c.json({ ok: false, error: 'Failed to load table data' }, 500);
  }
});

index.get('/api/admin/init', async (c) => {
  try {
    await initDb();
    return c.json({ ok: true, data: { initialized: true } });
  } catch {
    return c.json({ ok: false, error: 'Failed to initialize database' }, 500);
  }
});

index.notFound((c) => c.json({ ok: false, error: 'Route not found' }, 404));

export { index };
export default index;