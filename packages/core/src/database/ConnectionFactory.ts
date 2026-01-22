import type { SQL } from "drizzle-orm";
import type { DBConfig, DBInstance, DatabaseConfig } from "../types";

export type DBFactory = (
	name: string,
	config: DBConfig,
) => Promise<DBInstance> | DBInstance;

export class ConnectionFactory {
	private factories = new Map<string, DBFactory>();

	constructor(private config: DatabaseConfig) {}

	register(name: string, factory: DBFactory) {
		this.factories.set(name, factory);
	}

	async create(name: string): Promise<DBInstance> {
		const factory = this.factories.get(name);

		if (!factory) {
			throw new Error(`Database driver "${name}" not registered`);
		}

		const conf = this.config.connections[name];

		return factory(name, conf);

		// const conf = this.config.connections[name];

		// if (!conf) {
		// 	throw new Error(`Database connection "${name}" not found`);
		// }

		// switch (conf.type) {
		// 	case "postgres": {
		// 		const { createPostgres } = await import("./databases/Postgres");
		// 		return createPostgres(name, conf);
		// 	}
		// 	case "mysql": {
		// 		const { createMySQL } = await import("./databases/MySQL");
		// 		return createMySQL(name, conf);
		// 	}
		// 	case "sqlite": {
		// 		const { createSQLite } = await import("./databases/SQLite");
		// 		return createSQLite(name, conf);
		// 	}
		// 	case "mssql": {
		// 		const { createMSSQL } = await import("./databases/MSSQL");
		// 		return createMSSQL(name, conf);
		// 	}
		// 	default:
		// 		throw new Error(`Unsupported DB client: ${conf.type}`);
		// }
	}
}
