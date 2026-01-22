import { HttpServer } from "./http/HttpServer";
import { Router } from "./router/Router";
// import { DatabaseManager } from "./database/DatabaseManager";
import { Logger } from "./logger/Logger";
import type { BunstroConfig } from "./types";

export function defineConfig(config: BunstroConfig): BunstroConfig {
	return config;
}

export async function createApp(config: BunstroConfig) {
	const logger = new Logger();
	const router = new Router();
	// const db = Database.getInstance();

	// Connect database if configured

	let db: any = null;

	if (config.database) {
		const { DatabaseManager } = await import("./database/DatabaseManager");
		db = DatabaseManager.init(config.database);
	}

	// Create HTTP server
	const server = new HttpServer({
		port: config.server?.port || 3000,
		host: config.server?.host || "0.0.0.0",
		router,
		staticPath: config.static?.path || "public",
		staticUrl: config.static?.url || "/",
	});

	return {
		router,
		db,
		logger,
		server,

		async start(options?: { port?: number; host?: string }) {
			await server.start();
		},

		async stop() {
			await server.stop();
			if (db?.close) await db.close();
		},
	};
}
