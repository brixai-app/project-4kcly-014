import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { auth } from './auth';
import { initDb } from './db';

const index = new Hono();

index.use('*', cors({ origin: '*', allowMethods: ['GET', 'POST', 'OPTIONS'], allowHeaders: ['Content-Type', 'Authorization'] }));

index.get('/health', (c) =>
  c.json({
    ok: true,
    service: 'SurSangeet',
    timestamp: new Date().toISOString(),
  }),
);

index.get('/api/auth/*', async (c) => {
  const handler = auth?.handler ?? auth;
  if (typeof handler === 'function') return handler(c);
  return c.json({ ok: false, error: 'Auth handler unavailable' }, 501);
});

index.post('/api/auth/*', async (c) => {
  const handler = auth?.handler ?? auth;
  if (typeof handler === 'function') return handler(c);
  return c.json({ ok: false, error: 'Auth handler unavailable' }, 501);
});

index.get('/api/db/init', async (c) => {
  try {
    const result = await initDb();
    return c.json({ ok: true, result: result ?? null });
  } catch (error) {
    return c.json({ ok: false, error: error instanceof Error ? error.message : 'Database init failed' }, 500);
  }
});

export default index;