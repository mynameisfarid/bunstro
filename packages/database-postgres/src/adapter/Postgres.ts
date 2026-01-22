import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import type { DBConfig, DBInstance } from "../types";

export function createInstance(name: string, config: DBConfig): DBInstance {
	const sql = postgres(config.url, {
		max: config.pool?.max ?? 20,
		idle_timeout: 30,
	});

	const db = drizzle(sql, { schema: config.schema });

	return {
		drizzle: db,

		async query<T = any>(sqlText: string, params?: any[]): Promise<T[]> {
			return (await sql.unsafe(sqlText, params)) as T[];
		},

		async queryOne<T = any>(
			sqlText: string,
			params?: any[],
		): Promise<T | null> {
			const res = await sql.unsafe(sqlText, params);
			return (res[0] as T) ?? null;
		},

		async transaction<T>(cb: (tx: any) => Promise<T>): Promise<T> {
			const result = await sql.begin(async (trx) => {
				const txDb = drizzle(trx as any, {
					schema: config.schema,
				});
				return cb(txDb);
			});

			// 🔑 TYPE BOUNDARY CAST
			return result as unknown as T;
		},

		// async query(sqlText, params) {
		// 	return sql.unsafe(sqlText, params);
		// },

		// async queryOne(sqlText, params) {
		// 	const res = await sql.unsafe(sqlText, params);
		// 	return res[0] ?? null;
		// },

		// async transaction(cb) {
		// 	return sql.begin(async (trx) => {
		// 		const txDb = drizzle(trx, { schema: config.schema });
		// 		return cb(txDb);
		// 	});
		// },

		async healthCheck() {
			try {
				await sql`select 1`;
				// await sql.unsafe(`select 1`, []);
				return true;
			} catch {
				return false;
			}
		},

		stats() {
			return sql.options;
		},

		async close() {
			await sql.end({ timeout: 5 });
		},
	};
}
