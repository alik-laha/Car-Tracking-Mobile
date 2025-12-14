import { db } from './database';

export async function saveLocationOffline(
    lat: number,
    lng: number
) {
    const database = await db;

    await database.executeSql(
        `INSERT INTO locations (lat, lng, timestamp, synced)
     VALUES (?, ?, datetime('now'), 0)`,
        [lat, lng]
    );
}
