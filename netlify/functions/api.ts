import { getDatabase } from "@netlify/database";

export default async (req) => {
  try {
    const db = getDatabase();

    // 1. Create table if it doesn't exist
    await db.sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100)
      );
    `;

    // 2. Insert initial rows if table is empty
    const existing = await db.sql`SELECT COUNT(*) FROM users`;
    if (parseInt(existing[0].count) === 0) {
      await db.sql`
        INSERT INTO users (name, email) VALUES 
        ('Database User 1', 'db1@example.com'),
        ('Database User 2', 'db2@example.com');
      `;
    }

    // 3. Query records from Netlify DB
    const users = await db.sql`SELECT * FROM users`;

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
