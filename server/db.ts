import { createClient, type Client } from '@libsql/client';
import type { ContactMessage, Instrument } from '../src/types';

type TableRow = Record<string, unknown>;

const dbUrl = 'file:local.db';
const db = createClient({ url: dbUrl });

const instrumentSeed: Instrument[] = [
  {
    id: 'ukulele-001',
    slug: 'concert-ukulele',
    name: 'Concert Ukulele',
    category: 'Folk',
    origin: 'Hawaiian tradition',
    price: 14999,
    description: 'A luminous concert ukulele with a warm, articulate voice and a satin finish that reads like a gallery object.',
    story: 'Built for intimate rooms and bright melodic phrasing, this concert-size instrument balances clarity with a rounded low end. Its voice carries the easy shimmer of island music while remaining precise enough for contemporary arrangements.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85'
    ],
    featured: true,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    tuning: 'G-C-E-A',
    materials: ['Mahogany top', 'Rosewood fingerboard', 'Nylon strings'],
    dimensions: 'Concert scale, 23 inches',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'sitar-002',
    slug: 'classical-sitar',
    name: 'Classical Sitar',
    category: 'String',
    origin: 'North India',
    price: 89999,
    description: 'A resonant sitar with intricate sympathetic strings and a commanding, meditative sustain.',
    story: 'The instrument is voiced for expansive alap passages and intricate ornamentation, with a carved gourd resonator and a deep, singing timbre that blooms in sustained phrases.',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    tuning: 'C#-F#-C#-F#-C#-F#',
    materials: ['Tuned teak neck', 'Pumpkin resonator', 'Bronze strings'],
    dimensions: 'Approx. 4 feet',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tabla-003',
    slug: 'handcrafted-tabla',
    name: 'Handcrafted Tabla',
    category: 'Percussion',
    origin: 'North India',
    price: 34999,
    description: 'A paired tabla set with crisp dayan articulation and a deep, rounded bayan response.',
    story: 'Selected skins and carefully weighted syahi centers create a dynamic range from whisper-soft bols to sharply defined accents. The pair is tuned for both solo performance and ensemble dialogue.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    materials: ['Sheesham wood', 'Goat skin', 'Iron tuning straps'],
    dimensions: 'Pair set',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'harmonium-004',
    slug: 'studio-harmonium',
    name: 'Studio Harmonium',
    category: 'Keyboard',
    origin: 'Indian classical workshop',
    price: 45999,
    description: 'A compact reed harmonium with a steady bellows response and a rich, devotional tone.',
    story: 'Designed for vocal accompaniment and drone-rich textures, this harmonium offers a stable airflow and a refined reed response that supports long-form melodic exploration.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
    ],
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    tuning: 'A=440Hz',
    materials: ['Teak cabinet', 'Brass reeds', 'Leather bellows'],
    dimensions: 'Portable studio size',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'synth-005',
    slug: 'modular-synth',
    name: 'Modular Synth',
    category: 'Electronic',
    origin: 'Contemporary studio craft',
    price: 129999,
    description: 'A tactile modular instrument for sculpting evolving textures, pulses, and cinematic atmospheres.',
    story: 'This system invites hands-on sound design through patchable modules, voltage control, and a wide sonic palette that moves from precise rhythmic sequences to expansive ambient fields.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85'
    ],
    featured: true,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    materials: ['Aluminum panels', 'Analog circuitry', 'Patch cables'],
    dimensions: 'Rack modular system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

async function ensureTables(): Promise<void> {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS Instruments (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      origin TEXT,
      price INTEGER,
      description TEXT NOT NULL,
      story TEXT,
      image TEXT NOT NULL,
      gallery TEXT,
      featured INTEGER DEFAULT 0,
      audioUrl TEXT,
      tuning TEXT,
      materials TEXT,
      dimensions TEXT,
      createdAt TEXT,
      updatedAt TEXT
    )
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS ContactMessages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      phone TEXT,
      preferredInstrument TEXT,
      createdAt TEXT NOT NULL
    )
  `);
}

async function seedInstruments(): Promise<void> {
  const result = await db.execute('SELECT COUNT(*) as count FROM Instruments');
  const count = Number((result.rows?.[0]?.count ?? 0) as number);
  if (count > 0) return;
  for (const instrument of instrumentSeed) {
    await db.execute({
      sql: `INSERT INTO Instruments
        (id, slug, name, category, origin, price, description, story, image, gallery, featured, audioUrl, tuning, materials, dimensions, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        instrument.id,
        instrument.slug,
        instrument.name,
        instrument.category,
        instrument.origin ?? null,
        instrument.price ?? null,
        instrument.description,
        instrument.story ?? null,
        instrument.image,
        JSON.stringify(instrument.gallery ?? []),
        instrument.featured ? 1 : 0,
        instrument.audioUrl ?? null,
        instrument.tuning ?? null,
        JSON.stringify(instrument.materials ?? []),
        instrument.dimensions ?? null,
        instrument.createdAt ?? new Date().toISOString(),
        instrument.updatedAt ?? new Date().toISOString()
      ]
    });
  }
}

async function init(): Promise<void> {
  await ensureTables();
  await seedInstruments();
}

const ready = init();

function toInstrument(row: TableRow): Instrument {
  return {
    id: String(row.id ?? ''),
    slug: String(row.slug ?? ''),
    name: String(row.name ?? ''),
    category: String(row.category ?? ''),
    origin: (row.origin as string | null | undefined) ?? undefined,
    price: row.price == null ? undefined : Number(row.price),
    description: String(row.description ?? ''),
    story: (row.story as string | null | undefined) ?? undefined,
    image: String(row.image ?? ''),
    gallery: parseJsonArray(row.gallery),
    featured: Boolean(row.featured ?? false),
    audioUrl: (row.audioUrl as string | null | undefined) ?? undefined,
    tuning: (row.tuning as string | null | undefined) ?? undefined,
    materials: parseJsonArray(row.materials),
    dimensions: (row.dimensions as string | null | undefined) ?? undefined,
    createdAt: (row.createdAt as string | null | undefined) ?? undefined,
    updatedAt: (row.updatedAt as string | null | undefined) ?? undefined
  };
}

function parseJsonArray(value: unknown): string[] | undefined {
  if (typeof value !== 'string' || !value) return undefined;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : undefined;
  } catch {
    return undefined;
  }
}

export async function getInstruments(): Promise<Instrument[]> {
  await ready;
  const result = await db.execute('SELECT * FROM Instruments ORDER BY featured DESC, createdAt DESC');
  return (result.rows ?? []).map((row) => toInstrument(row as TableRow));
}

export async function getInstrumentBySlug(slug: string): Promise<Instrument | null> {
  await ready;
  const result = await db.execute({ sql: 'SELECT * FROM Instruments WHERE slug = ? LIMIT 1', args: [slug] });
  const row = result.rows?.[0];
  return row ? toInstrument(row as TableRow) : null;
}

export async function insertContactMessage(message: ContactMessage): Promise<{ id: string }> {
  await ready;
  const id = crypto.randomUUID();
  await db.execute({
    sql: `INSERT INTO ContactMessages (id, name, email, subject, message, phone, preferredInstrument, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      message.name,
      message.email,
      message.subject,
      message.message,
      message.phone ?? null,
      message.preferredInstrument ?? null,
      new Date().toISOString()
    ]
  });
  return { id };
}

export async function inspectTables(): Promise<string[]> {
  await ready;
  const result = await db.execute(`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`);
  return (result.rows ?? []).map((row) => String((row as TableRow).name ?? ''));
}

export async function getTableData(tableName: 'Instruments' | 'ContactMessages'): Promise<TableRow[]> {
  await ready;
  const allowed = ['Instruments', 'ContactMessages'] as const;
  if (!allowed.includes(tableName)) return [];
  const result = await db.execute(`SELECT * FROM ${tableName} ORDER BY rowid DESC`);
  return (result.rows ?? []) as TableRow[];
}

export { db };
export default db;