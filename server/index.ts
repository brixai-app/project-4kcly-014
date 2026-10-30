import { Hono } from "hono";
import { cors } from "hono/cors";
import { getInstrumentById, getInstruments } from "./db";

const index = new Hono();

index.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

index.get("/api/health", (c) =>
  c.json({
    ok: true,
    service: "SurSangeet",
    timestamp: new Date().toISOString(),
  })
);

index.get("/api/instruments", async (c) => {
  const instruments = await getInstruments();
  return c.json({ instruments });
});

index.get("/api/instruments/:id", async (c) => {
  const id = c.req.param("id") ?? "";
  const instrument = await getInstrumentById(id);
  if (!instrument) {
    return c.json({ error: "Instrument not found" }, 404);
  }
  return c.json({ instrument });
});

export { index };
export default index;