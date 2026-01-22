export interface DBInstance {
	drizzle: any;

	query<T = any>(sql: string, params?: any[]): Promise<T[]>;
	queryOne<T = any>(sql: string, params?: any[]): Promise<T | null>;
	transaction<T>(cb: (tx: any) => Promise<T>): Promise<T>;

	healthCheck(): Promise<boolean>;
	stats(): any;
	close(): any;
}

export interface DBConfig {
	type: "postgres" | "mysql" | "sqlite" | "mssql";
	url: string;
	schema?: any;
	pool?: {
		min?: number;
		max?: number;
	};
}

export type DatabaseConfig = {
	default: string;
	eager_load: string;
	connections: Record<string, DBConfig>;
};

export type DBFactory = (
	name: string,
	config: DBConfig,
) => Promise<DBInstance> | DBInstance;
