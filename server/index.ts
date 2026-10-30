import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { initDb, inspectTables, getTableData } from './db';
import { auth } from './auth';

const index = new Hono();

index.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length'],
    maxAge: 86400,
  })
);

index.get('/api/health', (c) =>
  c.json({
    ok: true,
    service: 'SurSangeet',
    timestamp: new Date().toISOString(),
  })
);

index.get('/api/db/tables', async (c) => {
  try {
    await initDb();
    const tables = await inspectTables();
    return c.json({ ok: true, tables: tables ?? [] });
  } catch (error) {
    return c.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Failed to inspect tables',
      },
      500
    );
  }
});

index.get('/api/db/:name', async (c) => {
  try {
    await initDb();
    const name = c.req.param('name') ?? '';
    const rows = await getTableData(name);
    return c.json({ ok: true, name, rows: rows ?? [] });
  } catch (error) {
    return c.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Failed to fetch table data',
      },
      500
    );
  }
});

index.all('/api/auth/*', (c) => typeof auth !== 'undefined' && auth && auth.handler ? auth.handler(c.req.raw) : (typeof auth === 'function' ? auth(c.req.raw) : c.json({ error: 'Auth handler unavailable' }, 500)));

index.all('*', (c) =>
  c.json(
    {
      ok: false,
      error: 'Not Found',
      path: c.req.path,
    },
    404
  )
);

export { index };
export default index;