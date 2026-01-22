import type { Server } from "bun";
import logger from "../logger/Logger";
import { Router, Route } from "../router/Router";
import db from "../database/DatabaseManager";
import { DatabaseManager } from "../database/DatabaseManager";
import view from "../view/ViewEngine";

import type { AppContext } from "../types";

import { join } from "path";
import mime from "mime-types";

interface HttpServerConfig {
	port: number;
	host: string;
	router: Router;
	staticPath?: string;
	staticUrl?: string;
	onError?: (error: Error, req: Request) => Response;
}

// Pre-compiled responses
const NOT_FOUND = new Response("Not Found", { status: 404 });
const JSON_HEADERS = { "Content-Type": "application/json" };
const HTML_HEADERS = { "Content-Type": "text/html; charset=utf-8" };

export class HttpServer {
	private server?: Server<any>;
	private config: HttpServerConfig;
	private router: Router;
	private staticCache: Map<string, Response> = new Map();

	constructor(config: HttpServerConfig) {
		this.config = config;
		this.router = config.router ?? new Router();
	}

	async start(): Promise<void> {
		this.server = Bun.serve({
			port: this.config.port,
			hostname: this.config.host,
			fetch: this.handleRequest.bind(this),
			error: this.handleError.bind(this),
		});

		logger.log(
			"app",
			`🚀 Server running on http://${this.config.host}:${this.config.port}`,
		);
	}

	private async handleRequest(req: Request): Promise<Response> {
		const url = new URL(req.url);
		const method = req.method;
		const path = url.pathname;

		try {
			// Fast path for static files
			if (
				this.config.staticPath &&
				path.startsWith(this.config.staticUrl || "/")
			) {
				const staticResponse = await this.serveStatic(path);
				if (staticResponse) return staticResponse;
			}

			// Find matching route (optimized)
			const match = this.router.match(method, path);

			if (!match) return NOT_FOUND;

			// Fast context building (lazy parsing)
			const context = this.buildContextFast(
				req,
				url,
				match.params,
				match.query,
			);

			// Execute handler directly (no middleware overhead for now)
			const result = await match.route.handler(context);

			// Fast response conversion
			return this.convertToResponse(result);
		} catch (error: any) {
			logger.error(`Request error: ${error.message}`);
			return this.config.onError
				? this.config.onError(error, req)
				: new Response(JSON.stringify({ error: "Internal Server Error" }), {
						status: 500,
						headers: JSON_HEADERS,
					});
		}
	}

	private async serveStatic(path: string): Promise<Response | null> {
		if (!this.config.staticPath || !this.config.staticUrl) return null;
		if (!path.startsWith(this.config.staticUrl)) return null;

		// Check cache first (in production)
		if (process.env.APP_ENV === "production" && this.staticCache.has(path)) {
			return this.staticCache.get(path)!;
		}

		const relativePath = path.slice(this.config.staticUrl.length);
		const filePath = join(this.config.staticPath, relativePath);

		try {
			const file = Bun.file(filePath);
			if (!(await file.exists())) return null;

			const contentType = mime.lookup(filePath) || "application/octet-stream";
			const response = new Response(file, {
				headers: {
					"Content-Type": contentType,
					"Cache-Control": `public, max-age=${process.env.STATIC_MAX_AGE || 86400}`,
				},
			});

			// Cache in production
			if (process.env.APP_ENV === "production") {
				this.staticCache.set(path, response);
			}

			return response;
		} catch {
			return null;
		}
	}

	// Optimized: Build context without parsing body unless needed
	private buildContextFast(
		req: Request,
		url: URL,
		params: Record<string, string>,
		query: Record<string, string>,
	): AppContext {
		return {
			request: req,
			method: req.method,
			url,
			path: url.pathname,
			params,
			query,
			headers: req.headers, // Don't convert to object unless needed
			// Lazy body parsing
			body: this._parseBody(req),
			ip:
				req.headers.get("x-forwarded-for") ||
				req.headers.get("x-real-ip") ||
				"unknown",
			db: db.createContextFacade(),
			view: view,
			json(data: any, status = 200) {
				return new Response(JSON.stringify(data), {
					status,
					headers: { "Content-Type": "application/json" },
				});
			},

			html(template: string, data: any, status?: number) {
				if (status) {
					return view.response(template, data, { status: status });
				}

				return view.response(template, data);
			},

			redirect(url: string, status = 302) {
				return new Response(null, {
					status,
					headers: { Location: url },
				});
			},
		};
	}

	private async _parseBody(req: Request): Promise<any> {
		if (!["POST", "PUT", "PATCH"].includes(req.method)) return null;

		const contentType = req.headers.get("content-type");

		if (contentType?.includes("application/json")) {
			return req.json().catch(() => null);
		}

		if (
			contentType?.includes("application/x-www-form-urlencoded") ||
			contentType?.includes("multipart/form-data")
		) {
			const formData = await req.formData();
			return Object.fromEntries(formData.entries());
		}

		return req.text();
	}

	// Optimized: Fast response conversion
	private convertToResponse(result: any): Response {
		// Already a Response
		if (result instanceof Response) return result;

		// JSON response (most common case - optimized)
		if (typeof result === "object" && result !== null) {
			return new Response(JSON.stringify(result), { headers: JSON_HEADERS });
		}

		// String/primitive
		return new Response(String(result));
	}

	private handleError(error: Error): Response {
		logger.error("Server error:", error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: JSON_HEADERS,
		});
	}

	async stop(): Promise<void> {
		logger.info("Server stopped");
		if (this.server) {
			this.server.stop();
			logger.info("Server stopped");
		}
	}

	// Graceful shutdown
	// async shutdown() {
	//   logger.log('app', '🛑 Shutting down gracefully...');
	//   await this.stop();
	//   await db.shutdown();
	//   // await db.disconnect();
	//   // await db.destroy();
	//   process.exit(0);
	// }

	async shutdown(signal: string): Promise<void> {
		console.log(`\n🛑 Shutting down (${signal}) gracefully`);

		try {
			await db.shutdown();

			if (this.server) {
				this.server.stop();
				logger.info("Server stopped");
			}
		} catch (err) {
			console.error("Shutdown error", err);
		} finally {
			process.exit(0);
		}
	}
}

export type RouteHandler = (appContext: AppContext) => Promise<any> | any;

export default HttpServer;
