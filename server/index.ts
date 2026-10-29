import { Hono } from 'hono';
import { cors } from 'hono/cors';

const index = new Hono();

index.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  })
);

index.get('/api/health', (c) =>
  c.json({
    ok: true,
    service: 'SurSangeet',
    timestamp: new Date().toISOString(),
  })
);

index.get('/api/contact', (c) =>
  c.json({
    ok: true,
    message: 'Contact endpoint is available for frontend validation flow.',
  })
);

index.post('/api/contact', async (c) => {
  const body = await c.req.json().catch(() => null);
  const name = String(body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim();
  const subject = String(body?.subject ?? '').trim();
  const message = String(body?.message ?? '').trim();

  const errors: { field: string; message: string }[] = [];
  if (!name) errors.push({ field: 'name', message: 'Name is required.' });
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push({ field: 'email', message: 'Enter a valid email address.' });
  if (!subject) errors.push({ field: 'subject', message: 'Subject is required.' });
  if (!message || message.length < 10) errors.push({ field: 'message', message: 'Message must be at least 10 characters.' });

  if (errors.length > 0) {
    return c.json({ ok: false, errors }, 400);
  }

  return c.json({
    ok: true,
    message: 'Your message has been validated successfully.',
    data: { name, email, subject, message },
  });
});

index.notFound((c) => c.json({ ok: false, message: 'Route not found.' }, 404));

export default index;