import type { DatabaseManager } from "./database/DatabaseManager";
import type { ViewEngine } from "./view/ViewEngine";
import type { Logger } from "./logger/Logger";

export interface BunstroConfig {
	server?: {
		port?: number;
		host?: string;
	};

	database?: DatabaseConfig;

	static?: {
		path?: string;
		url?: string;
		maxAge?: number;
	};

	view?: {
		paths?: Record<string, string>;
	};

	logger?: {
		level?: string;
		file?: boolean;
		console?: boolean;
	};

	apps?: string[];
	defaultApp?: string;

	plugins?: any[];
}

export interface RequestContext {
	request: Request;
	method: string;
	url: URL;
	path: string;
	params: Record<string, string>;
	query: Record<string, string>;
	headers: Headers;
	body: any;
	ip: string;
}

export interface AppContext {
	request: Request;
	method: string;
	url: URL;
	path: string;

	params: Record<string, string>;
	query: Record<string, string>;
	headers: Headers;

	ip: string;

	body: any;

	// db: ReturnType<DatabaseManager["createContextFacade"]>;
	db?: DatabaseManager | null;
	view?: ViewEngine | null;
	logger: Logger;

	json(data: any, status?: number): Response;
	// html(template: string, data?: any, status?: number): Promise<Response>;
	redirect(url: string, status?: number): Response;
}

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
