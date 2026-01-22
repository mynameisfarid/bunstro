import type { RouteHandler } from "../http/HttpServer";

export interface Route {
	method: string;
	path: string;
	pattern?: RegExp;
	keys: string[];
	handler: RouteHandler;
	middleware?: RouteMiddleware[];
	name?: string;
	isStatic: boolean;
}

export interface RouteMatch {
	route: Route;
	params: Record<string, string>;
	query: Record<string, string>;
}

export type RouteMiddleware = (
	ctx: any,
	next: () => Promise<any>,
) => Promise<any>;

const EMPTY_PARAMS = Object.freeze({});
const EMPTY_QUERY = Object.freeze({});

export class Router {
	private routes: Route[] = [];
	private staticRoutes: Map<string, Route> = new Map();
	private dynamicRoutes: Route[] = [];
	private prefix: string = "";
	private middlewareStack: RouteMiddleware[] = [];

	/**
	 * Set route prefix
	 */
	setPrefix(prefix: string): this {
		this.prefix = prefix;
		return this;
	}

	/**
	 * Add middleware to all routes
	 */
	use(middleware: RouteMiddleware): this {
		this.middlewareStack.push(middleware);
		return this;
	}

	/**
	 * HTTP Methods
	 */
	get(path: string, handler: RouteHandler, options?: RouteOptions): this {
		return this.addRoute("GET", path, handler, options);
	}

	post(path: string, handler: RouteHandler, options?: RouteOptions): this {
		return this.addRoute("POST", path, handler, options);
	}

	put(path: string, handler: RouteHandler, options?: RouteOptions): this {
		return this.addRoute("PUT", path, handler, options);
	}

	patch(path: string, handler: RouteHandler, options?: RouteOptions): this {
		return this.addRoute("PATCH", path, handler, options);
	}

	delete(path: string, handler: RouteHandler, options?: RouteOptions): this {
		return this.addRoute("DELETE", path, handler, options);
	}

	/**
	 * Resource routes (REST)
	 */
	resource(path: string, controller: any): this {
		if (controller.index) this.get(path, controller.index.bind(controller));
		if (controller.store) this.post(path, controller.store.bind(controller));
		if (controller.show)
			this.get(`${path}/:id`, controller.show.bind(controller));
		if (controller.update)
			this.put(`${path}/:id`, controller.update.bind(controller));
		if (controller.destroy)
			this.delete(`${path}/:id`, controller.destroy.bind(controller));
		return this;
	}

	/**
	 * Group routes
	 */
	group(options: GroupOptions, callback: (router: Router) => void): this {
		const groupRouter = new Router();

		// Apply prefix
		if (options.prefix) {
			groupRouter.setPrefix(this.prefix + options.prefix);
		} else {
			groupRouter.setPrefix(this.prefix);
		}

		// Apply middleware
		if (options.middleware) {
			options.middleware.forEach((m) => groupRouter.use(m));
		}

		// Execute callback
		callback(groupRouter);

		// Merge routes
		groupRouter.routes.forEach((route) => {
			this.routes.push(route);
			if (route.isStatic) {
				this.staticRoutes.set(`${route.method}:${route.path}`, route);
			} else {
				this.dynamicRoutes.push(route);
			}
		});

		return this;
	}

	/**
	 * Load routes from file
	 */
	async loadRoutes(filePath: string): Promise<void> {
		try {
			const module = await import(filePath);
			const registerRoutes = module.default || module.register;

			if (typeof registerRoutes === "function") {
				registerRoutes(this);
			}
		} catch (error: any) {
			throw new Error(
				`Failed to load routes from ${filePath}: ${error.message} ${error}`,
			);
		}
	}

	private addRoute(
		method: string,
		path: string,
		handler: RouteHandler,
		options?: RouteOptions,
	): this {
		const fullPath = this.prefix + path;
		const isStatic = !fullPath.includes(":");
		const keys: string[] = [];
		let pattern: RegExp | undefined;

		if (!isStatic) {
			const result = this.pathToRegex(fullPath);
			pattern = result.pattern;
			keys.push(...result.keys);
		}

		// Combine middleware
		const middleware = [
			...this.middlewareStack,
			...(options?.middleware || []),
		];

		const route: Route = {
			method: method.toUpperCase(),
			path: fullPath,
			pattern,
			keys,
			handler,
			middleware: middleware.length > 0 ? middleware : undefined,
			name: options?.name,
			isStatic,
		};

		this.routes.push(route);

		if (isStatic) {
			this.staticRoutes.set(`${method}:${fullPath}`, route);
		} else {
			this.dynamicRoutes.push(route);
		}

		return this;
	}

	private pathToRegex(path: string): { pattern: RegExp; keys: string[] } {
		const keys: string[] = [];
		const pattern = path
			.replace(/\/:([^/]+)/g, (_, key) => {
				keys.push(key);
				return "/([^/]+)";
			})
			.replace(/\//g, "\\/");

		return { pattern: new RegExp(`^${pattern}$`), keys };
	}

	/**
	 * Match route (optimized)
	 */
	match(method: string, path: string): RouteMatch | null {
		const [pathname, queryString] = path.split("?");
		const query = queryString ? this.parseQuery(queryString) : EMPTY_QUERY;

		// Fast path: static routes
		const staticKey = `${method}:${pathname}`;
		const staticRoute = this.staticRoutes.get(staticKey);

		if (staticRoute) {
			return { route: staticRoute, params: EMPTY_PARAMS, query };
		}

		// Dynamic routes
		for (const route of this.dynamicRoutes) {
			if (route.method !== method) continue;

			const match = pathname.match(route.pattern!);
			if (!match) continue;

			const params: Record<string, string> = {};
			route.keys.forEach((key, index) => {
				params[key] = match[index + 1];
			});

			return { route, params, query };
		}

		return null;
	}

	private parseQuery(queryString: string): Record<string, string> {
		const params = new URLSearchParams(queryString);
		const result: Record<string, string> = {};
		for (const [key, value] of params.entries()) {
			result[key] = value;
		}
		return result;
	}

	/**
	 * Get all routes
	 */
	getRoutes(): Route[] {
		return this.routes;
	}

	/**
	 * Clear all routes
	 */
	clear(): void {
		this.routes = [];
		this.staticRoutes.clear();
		this.dynamicRoutes = [];
	}
}

interface RouteOptions {
	middleware?: RouteMiddleware[];
	name?: string;
}

interface GroupOptions {
	prefix?: string;
	middleware?: RouteMiddleware[];
}

export default Router;
