import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import type { DBConfig, DBInstance } from "../../types";

export function createMySQL(name: string, config: DBConfig): DBInstance {
	const pool = mysql.createPool({
		uri: config.url,
		connectionLimit: config.pool?.max ?? 10,
		enableKeepAlive: true,
	});

	const db = drizzle(pool, {
		schema: config.schema,
		mode: "default",
	});

	return {
		drizzle: db,

		async query<T = any>(sql, params = []) {
			const [rows] = await pool.query(sql, params);
			return rows as T[];
		},

		async queryOne<T = any>(sql, params = []) {
			const [rows] = await pool.query(sql, params);
			return (rows as T[])[0] ?? null;
		},

		async transaction<T>(cb) {
			const conn = await pool.getConnection();
			try {
				await conn.beginTransaction();
				const txDb = drizzle(conn, { schema: config.schema });
				const result = await cb(txDb);
				await conn.commit();
				return result;
			} catch (e) {
				await conn.rollback();
				throw e;
			} finally {
				conn.release();
			}
		},

		async healthCheck() {
			try {
				await pool.query("SELECT 1");
				return true;
			} catch {
				return false;
			}
		},

		stats() {
			return {
				totalConnections: pool.pool?.size,
				activeConnections: pool.pool?.borrowed,
			};
		},
		async close() {
			await pool.end();
		},
	};
}
