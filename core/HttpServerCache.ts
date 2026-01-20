// HttpServerCache.ts
import { Router } from './RouterCache'

export class HttpServer {
  constructor(
    private router: Router,
    private port = 3000,
    private host = '0.0.0.0'
  ) {}


  start() {
    console.log(this.router);
    Bun.serve({
      port: this.port,
      hostname: this.host,
      fetch: this.router.handler() // ✅ FIX TOTAL
    })

    console.log(`🚀 http://${this.host}:${this.port}`)
  }
}
