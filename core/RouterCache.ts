type Handler = (ctx: Context) => any | Promise<any>
type Middleware = (ctx: Context, next: () => Promise<Response>) => Promise<Response>

interface Context {
  req: Request
  url: URL
  params: Record<string, string>
  query: Record<string, string>
  body: Promise<any>
  json: (v: any, init?: ResponseInit) => Response
  text: (v: string, init?: ResponseInit) => Response
}

interface Route {
  method: string
  regex: RegExp
  keys: string[]
  handlers: Handler[]
}

interface MatchCacheEntry {
  route: Route
  params: Record<string, string>
}

export class Router {
  private routes: Route[] = []
  private middlewares: Middleware[] = []
  private basePath = ''
  private matchCache = new Map<string, MatchCacheEntry>()

  /* ---------- GROUP ---------- */

  group(prefix: string, cb: (r: Router) => void) {
    const prev = this.basePath
    this.basePath = prev + prefix
    cb(this)
    this.basePath = prev
  }

  /* ---------- ROUTES ---------- */

  get(path: string, ...h: Handler[]) { this.add('GET', path, h) }
  post(path: string, ...h: Handler[]) { this.add('POST', path, h) }
  put(path: string, ...h: Handler[]) { this.add('PUT', path, h) }
  delete(path: string, ...h: Handler[]) { this.add('DELETE', path, h) }

  private add(method: string, path: string, handlers: Handler[]) {
    const full = this.basePath + path
    const { regex, keys } = this.compile(full)
    this.routes.push({ method, regex, keys, handlers })
  }

  /* ---------- FETCH ---------- */

  handler() {
    return async (req: Request): Promise<Response> => {
      const url = new URL(req.url)
      const method = req.method
      const pathname = url.pathname
      const cacheKey = method + ':' + pathname

      let cached = this.matchCache.get(cacheKey)
      if (!cached) {
        for (const route of this.routes) {
          if (route.method !== method) continue
          const m = route.regex.exec(pathname)
          if (!m) continue

          const params: Record<string, string> = {}
          route.keys.forEach((k, i) => (params[k] = m[i + 1]))

          cached = { route, params }
          this.matchCache.set(cacheKey, cached)

          if (this.matchCache.size > 1000) this.matchCache.clear()
          break
        }
      }

      if (!cached) {
        return new Response('Not Found', { status: 404 })
      }

      return this.runRoute(req, url, cached.route, cached.params)
    }
  }

  /* ---------- EXEC ---------- */

  private async runRoute(
    req: Request,
    url: URL,
    route: Route,
    params: Record<string, string>
  ): Promise<Response> {
    const ctx: Context = {
      req,
      url,
      params,
      query: Object.fromEntries(url.searchParams),
      body: parseBody(req),
      json: (v, init) => Response.json(v, init),
      text: (v, init) => new Response(v, init)
    }

    let i = -1
    const run = async (): Promise<Response> => {
      i++
      if (i < this.middlewares.length) {
        return this.middlewares[i](ctx, run)
      }

      // const result = await route.handlers[i - this.middlewares.length](ctx)
      // return normalizeResponse(result)
      
      const idx = i - this.middlewares.length
      const handler = route.handlers[idx]

      if (!handler) {
        return new Response('Handler not found', { status: 500 })
      }

      const result = await handler(ctx)
      return normalizeResponse(result)
    }

    try {
      return await run()
    } catch (e) {
      console.error(e)
      return new Response('Internal Error', { status: 500 })
    }
  }

  /* ---------- UTIL ---------- */

  private compile(path: string) {
    const keys: string[] = []
    const regex = path
      .replace(/\/\*/g, '/(.*)')
      .replace(/:([^/]+)/g, (_, k) => {
        keys.push(k)
        return '([^/]+)'
      })

    return { regex: new RegExp(`^${regex}$`), keys }
  }
}

/* ---------- HELPERS ---------- */

function normalizeResponse(v: any): Response {
  if (v instanceof Response) return v
  if (v === undefined || v === null) return new Response('', { status: 204 })
  if (typeof v === 'object') return Response.json(v)
  return new Response(String(v))
}

async function parseBody(req: Request) {
  if (req.method === 'GET' || req.method === 'HEAD') return undefined

  const type = req.headers.get('content-type') || ''
  if (type.includes('application/json')) return req.json()
  if (type.includes('text/')) return req.text()
  return undefined
}
