import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import type { DBConfig, DBInstance } from "../../types";

export function createSQLite(name: string, config: DBConfig): DBInstance {
	const sqlite = new Database(config.url);
	sqlite.pragma("journal_mode = WAL");

	const db = drizzle(sqlite, { schema: config.schema });

	return {
		drizzle: db,

		async query<T = any>(sql, params = []) {
			return sqlite.prepare(sql).all(params) as T[];
		},

		async queryOne<T = any>(sql, params = []) {
			return sqlite.prepare(sql).get(params) as T | null;
		},

		async transaction<T>(cb) {
			const trx = sqlite.transaction(() => {
				return cb(db);
			});
			return trx();
		},

		async healthCheck() {
			try {
				sqlite.prepare("SELECT 1").get();
				return true;
			} catch {
				return false;
			}
		},

		stats() {
			return {
				memory: sqlite.memory,
				open: sqlite.open,
			};
		},

		async close() {
			db.close();
		},
	};
}
