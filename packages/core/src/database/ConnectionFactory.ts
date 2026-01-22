import type { SQL } from "drizzle-orm";
import type { DBConfig, DBInstance, DatabaseConfig, DBFactory } from "../types";

export class ConnectionFactory {
	private static factories = new Map<string, DBFactory>();

	constructor(private config: DatabaseConfig) {}

	static register(type: string, factory: DBFactory) {
		// this.factories.set(name, factory);
		if (this.factories.has(type)) return;
		this.factories.set(type, factory);
	}

	async create(name: string): Promise<DBInstance> {
		console.log("FACTORY INIT");
		const conf = this.config.connections[name];
		if (!conf) {
			throw new Error(`Database connection "${name}" not found`);
		}

		const factory = ConnectionFactory.factories.get(conf.type);

		if (!factory) {
			throw new Error(`Database driver "${conf.type}" not registered`);
		}

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
