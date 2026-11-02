import { createClient } from '@libsql/client';

export const db = createClient({
  url: 'file:local.db',
});

export async function initDb() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'All',
        price INTEGER NOT NULL,
        description TEXT,
        image TEXT,
        alt TEXT,
        featured INTEGER NOT NULL DEFAULT 0,
        inStock INTEGER NOT NULL DEFAULT 1,
        sizes TEXT,
        colors TEXT
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        items TEXT NOT NULL,
        total INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'completed',
        customerName TEXT,
        customerEmail TEXT,
        createdAt TEXT NOT NULL
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS user (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        emailVerified INTEGER DEFAULT 0,
        createdAt TEXT,
        updatedAt TEXT
      )
    `);

    // Seed starter products if table is empty
    const countRes = await db.execute('SELECT COUNT(*) as count FROM products');
    const count = Number(countRes.rows[0]?.count || 0);

    if (count === 0) {
      const starterProducts = [
        {
          id: 'prod-1',
          name: 'Minimalist Studio Desk',
          category: 'Furniture',
          price: 499,
          description: 'Precision-engineered solid oak desk with built-in cable management.',
          image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
          alt: 'Minimalist Studio Desk',
          featured: 1,
          inStock: 1,
        },
        {
          id: 'prod-2',
          name: 'Ergonomic Task Chair',
          category: 'Seating',
          price: 349,
          description: 'Breathable mesh chair with dynamic lumbar support and adjustable arms.',
          image: 'https://images.unsplash.com/photo-1580481077195-c3c267b2d56a?auto=format&fit=crop&w=800&q=80',
          alt: 'Ergonomic Task Chair',
          featured: 1,
          inStock: 1,
        },
        {
          id: 'prod-3',
          name: 'Nordic Ceramic Mug Set',
          category: 'Accessories',
          price: 45,
          description: 'Handcrafted stoneware matte glaze mugs for daily coffee rituals.',
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
          alt: 'Nordic Ceramic Mug Set',
          featured: 0,
          inStock: 1,
        },
        {
          id: 'prod-4',
          name: 'Brass Desk Lamp',
          category: 'Lighting',
          price: 120,
          description: 'Warm ambient LED light with machined solid brass counterweight base.',
          image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
          alt: 'Brass Desk Lamp',
          featured: 1,
          inStock: 1,
        },
      ];

      for (const p of starterProducts) {
        await db.execute({
          sql: `INSERT OR REPLACE INTO products (id, name, category, price, description, image, alt, featured, inStock)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [p.id, p.name, p.category, p.price, p.description, p.image, p.alt, p.featured, p.inStock],
        });
      }
    }
  } catch (err) {
    console.error('[db] Database initialization error:', err);
  }
}

export async function inspectTables() {
  try {
    const res = await db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
    const tables = [];
    for (const row of res.rows) {
      const tableName = String(row.name);
      const countRes = await db.execute(`SELECT COUNT(*) as count FROM "${tableName}"`);
      const count = Number(countRes.rows[0]?.count || 0);
      const isAuth = ['user', 'session', 'account', 'verification'].includes(tableName);
      tables.push({ name: tableName, count, isAuth });
    }
    return tables;
  } catch (e) {
    console.error('[db] inspectTables failed:', e);
    return [];
  }
}

export async function getTableData(name: string) {
  try {
    const tableRes = await db.execute(`SELECT * FROM "${name}" LIMIT 100`);
    return {
      columns: tableRes.columns,
      rows: tableRes.rows,
    };
  } catch (e) {
    console.error(`[db] getTableData(${name}) failed:`, e);
    return { columns: [], rows: [] };
  }
}

export default db;
