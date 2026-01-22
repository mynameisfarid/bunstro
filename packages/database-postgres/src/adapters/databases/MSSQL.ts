import sql from "mssql";
import { drizzle } from "drizzle-orm/mssql";
import type { DBConfig, DBInstance } from "../../types";

export function createMSSQL(name: string, config: DBConfig): DBInstance {
	const pool = new sql.ConnectionPool({
		connectionString: config.url,
		pool: {
			max: config.pool?.max ?? 10,
			min: config.pool?.min ?? 0,
			idleTimeoutMillis: 30000,
		},
	});

	const poolConnect = pool.connect();

	const db = drizzle(pool, { schema: config.schema });

	return {
		drizzle: db,

		async query<T = any>(query, params = []) {
			await poolConnect;
			const request = pool.request();
			params.forEach((val, i) => request.input(`p${i}`, val));
			const result = await request.query(query);
			return result.recordset as T[];
		},

		async queryOne<T = any>(query, params = []) {
			const rows = await this.query<T>(query, params);
			return rows[0] ?? null;
		},

		async transaction<T>(cb) {
			await poolConnect;
			const transaction = new sql.Transaction(pool);

			await transaction.begin();

			try {
				const txDb = drizzle(transaction, { schema: config.schema });
				const result = await cb(txDb);
				await transaction.commit();
				return result;
			} catch (e) {
				await transaction.rollback();
				throw e;
			}
		},

		async healthCheck() {
			try {
				await poolConnect;
				await pool.request().query("SELECT 1");
				return true;
			} catch {
				return false;
			}
		},

		stats() {
			return {
				connected: pool.connected,
				connecting: pool.connecting,
			};
		},
		async close() {
			await pool.close();
		},
	};
}
