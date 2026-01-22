import { ConnectionFactory } from "./ConnectionFactory";
import { DBInstance, DatabaseConfig } from "../types";
// import type { BunstroConfig } from "../types";
import logger from "../logger/Logger";

export class DatabaseManager {
	private static instance: DatabaseManager | null = null;

	private factory: ConnectionFactory;
	private databaseConfig: DatabaseConfig;
	private connections = new Map<string, Promise<DBInstance>>();
	private defaultConnection: string;

	// private constructor() {
	// 	this.eagerLoad();
	// }

	private constructor(config: DatabaseConfig) {
		console.log("DBManager Constructor");
		this.databaseConfig = config;
		this.defaultConnection =
			config?.default ?? Object.keys(config?.connections ?? {})[0] ?? "default";
		this.factory = new ConnectionFactory(config);

		// eager load if env set
		this.eagerLoad();
	}

	/**
	 * Initialize with explicit config object.
	 * Call this at bootstrap before any getInstance() usage.
	 */
	static init(config: DatabaseConfig): DatabaseManager {
		if (!DatabaseManager.instance) {
			DatabaseManager.instance = new DatabaseManager(config);
		}
		return DatabaseManager.instance;
	}

	static getInstance(): DatabaseManager {
		// if (!DatabaseManager.instance) {
		// 	DatabaseManager.instance = new DatabaseManager();
		// }

		if (!DatabaseManager.instance) {
			throw new Error(
				"DatabaseManager is not initialized. Call DatabaseManager.init(config) first.",
			);
		}
		return DatabaseManager.instance;
	}

	private eagerLoad() {
		const eager = process.env.DB_EAGER_LOAD?.split(",") ?? [];
		for (const name of eager) {
			this.getConnection(name.trim());
		}
	}

	getConnection(name?: string): Promise<DBInstance> {
		const key = name ?? this.defaultConnection;

		if (!this.connections.has(key)) {
			this.connections.set(key, this.factory.create(key));
		}

		return this.connections.get(key)!;
	}

	async shutdown() {
		for (const [name, connPromise] of this.connections) {
			try {
				const conn = await connPromise;
				if (conn && typeof (conn as any).close === "function") {
					await (conn as any).close();
				}
			} catch (err) {
				// gunakan logger Anda jika tersedia
				logger.error(`Failed closing DB: ${name}`, err);
			}
		}

		this.connections.clear();
	}

	/**
	 * ===== CONTEXT FACADE =====
	 * ctx.db
	 */
	createContextFacade() {
		const manager = this;

		const facade: any = {
			async use(name?: string) {
				const conn = await manager.getConnection(name);
				return conn.drizzle;
			},

			async query(sql: string, params?: any[]) {
				const conn = await manager.getConnection();
				return conn.query(sql, params);
			},

			async transaction(cb: any) {
				const conn = await manager.getConnection();
				return conn.transaction(cb);
			},

			async healthCheck() {
				const conn = await manager.getConnection();
				return conn.healthCheck();
			},
			async close() {
				const conn = await manager.getConnection();
				return conn.close();
			},
		};

		/**
		 * MAGIC: proxy Drizzle API ke default connection
		 * ctx.db.select().from(...)
		 */
		return new Proxy(facade, {
			get(_, prop) {
				if (prop in facade) return (facade as any)[prop];

				return async (...args: any[]) => {
					const conn = await manager.getConnection();
					const target = conn.drizzle[prop];
					if (typeof target !== "function") return target;
					return target.apply(conn.drizzle, args);
				};
			},
		});
	}
}

// export default DatabaseManager.getInstance();
