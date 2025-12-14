import { db } from './database';

export async function initDB() {
    const database = await db;

    await database.executeSql(`
    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lat REAL,
      lng REAL,
      timestamp TEXT,
      synced INTEGER DEFAULT 0
    );
  `);
}
