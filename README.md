# BUNSTRO Framework

> Production-ready fullstack framework built with **100% Pure Bun Native Runtime**

🚀 **Ultra Fast** • 🎯 **Type-Safe** • 🔧 **Production-Ready** • 📦 **Zero Framework Dependencies**

## Why BUNSTRO?

- ✅ **Pure Bun Native** - No Elysia, Express, or any HTTP framework. Just pure Bun!
- ✅ **Knex + PostgreSQL** - Robust ORM dengan powerful query builder
- ✅ **VentoJS** - Fast & modern template engine
- ✅ **Advanced Logger** - Colored output, file logging, easy debugging
- ✅ **Static Assets** - Built-in static file serving with MIME types
- ✅ **Rich Helpers** - 50+ utility functions (URL, String, Number, Date, Array, Object)
- ✅ **Multi-Application** - API, Dashboard, Tenant, Web, Blog dalam satu codebase
- ✅ **Flexible Deployment** - Single process atau multi process
- ✅ **CLI Tools** - Code generators dan database management
- ✅ **Production Ready** - Logging, error handling, security built-in

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) >= 1.0.0
- PostgreSQL >= 13

### Installation

```bash
# Create project directory
mkdir my-bunstro-app
cd my-bunstro-app

# Copy all files from this repository
# (See SETUP_GUIDE.md for complete file structure)

# Install dependencies
bun install

# Setup environment
cp .env.example .env

# Edit .env - configure your database credentials
nano .env

# Create database
createdb bunstro

# Run migrations (optional, if you have migrations)
bun run migrate:latest

# Start development server
bun run dev
```

Server akan berjalan di `http://localhost:3000`

## Project Structure

```
bunstro/
├── src/
│   ├── core/                 # Framework Core (Pure Bun!)
│   │   ├── HttpServer.ts     # Bun native HTTP server
│   │   ├── Router.ts         # Custom router
│   │   ├── Database.ts       # Knex database manager
│   │   ├── Logger.ts         # Advanced logger
│   │   └── View.ts           # VentoJS engine
│   │
│   ├── helpers/              # Utility Helpers
│   │   └── index.ts          # 50+ helper functions
│   │
│   ├── config/               # Configuration
│   ├── cli/                  # CLI Commands
│   └── index.ts              # Main Entry Point
│
├── database/
│   ├── migrations/           # Database Migrations
│   └── seeds/                # Database Seeders
│
├── views/                    # VentoJS Templates
├── public/                   # Static Assets
├── storage/                  # Logs & Uploads
├── .env.example
├── package.json
├── knexfile.ts
└── README.md
```

## Core Features

### 1. Pure Bun HTTP Server

```typescript
import { HttpServer } from './core/HttpServer';
import { Router } from './core/Router';

const router = new Router();

router.get('/', async (ctx) => ({
  message: 'Hello World!'
}));

const server = new HttpServer({
  port: 3000,
  host: '0.0.0.0',
  router,
});

await server.start();
```

### 2. Routing

```typescript
import { Router } from './core/Router';

const router = new Router();

// Basic routes
router.get('/users', async (ctx) => {
  return { users: [] };
});

router.post('/users', async (ctx) => {
  const { name, email } = ctx.body;
  return { user: { name, email } };
});

// Route with params
router.get('/users/:id', async (ctx) => {
  const { id } = ctx.params;
  return { id };
});

// Route groups
router.group({ prefix: '/api' }, (api) => {
  api.get('/info', async () => ({ version: '1.0.0' }));
  api.get('/status', async () => ({ status: 'ok' }));
});

// Resource routes (CRUD)
import UserController from './controllers/UserController';
router.resource('/users', new UserController());
```

### 3. Database (Knex)

```typescript
import db from './core/Database';

// Connect
await db.connect();

// Query builder
const users = await db.getConnection()('users')
  .select('*')
  .where('active', true)
  .orderBy('created_at', 'desc');

// Insert
await db.getConnection()('users').insert({
  name: 'John Doe',
  email: 'john@example.com',
});

// Update
await db.getConnection()('users')
  .where('id', 1)
  .update({ name: 'Jane Doe' });

// Delete
await db.getConnection()('users')
  .where('id', 1)
  .delete();

// Transactions
await db.transaction(async (trx) => {
  await trx('users').insert({ name: 'User 1' });
  await trx('posts').insert({ title: 'Post 1' });
});
```

### 4. Views (VentoJS)

```typescript
import view from './core/View';

// In route handler
router.get('/', async () => {
  return view.response('home', {
    title: 'Welcome',
    users: await getUsers(),
  });
});
```

Template (views/home.vto):
```html
<!DOCTYPE html>
<html>
<head>
  <title>{{ title }}</title>
</head>
<body>
  <h1>{{ title }}</h1>
  
  {{ for user of users }}
    <p>{{ user.name }} - {{ user.email }}</p>
  {{ /for }}
</body>
</html>
```

### 5. Static Files

Serve otomatis dari folder `public/`:

```
public/
├── css/
│   └── style.css
├── js/
│   └── app.js
└── images/
    └── logo.png
```

Akses: `http://localhost:3000/css/style.css`

### 6. Logging

```typescript
import logger from './core/Logger';

logger.debug('Debug message', { userId: 1 });
logger.info('User logged in', { email: 'user@example.com' });
logger.warn('Low disk space');
logger.error('Payment failed', { error });
logger.fatal('Critical error');

// HTTP logging (automatic)
logger.http('GET', '/api/users', 200, 45);
```

Logs tersimpan di `storage/logs/` dengan colored console output!

### 7. Helpers

```typescript
import { str, num, datetime, url, arr } from './helpers';

// String helpers
str.slug('Hello World!');        // hello-world
str.random(16);                  // random string
str.truncate('Long text', 10);   // Long te...
str.camel('hello-world');        // helloWorld

// Number helpers
num.format(1234567);             // 1.234.567
num.currency(50000);             // Rp50.000,00
num.fileSize(1024000);           // 1 MB

// Date helpers
datetime.format(new Date());     // 18 Jan 2026
datetime.diffForHumans(date);    // 3 hari yang lalu
datetime.timestamp();            // 1737187200

// URL helpers
url.route('/users/:id', { id: 1 });  // /users/1
url.asset('images/logo.png');        // http://localhost:3000/images/logo.png

// Array helpers
arr.chunk([1,2,3,4,5], 2);       // [[1,2], [3,4], [5]]
arr.unique([1,2,2,3]);           // [1,2,3]
arr.groupBy(users, 'role');      // { admin: [...], user: [...] }
```

## CLI Commands

```bash
# Development
bun run dev                    # Start dev server

# Production
bun run start                  # Start production server
bun run build                  # Build for production

# Database
bun run migrate:latest         # Run migrations
bun run migrate:rollback       # Rollback last migration
bun run migrate:status         # Check migration status
bun run db:seed               # Run seeders

# Code Generators
bun run make:controller User   # Create controller
bun run make:model User       # Create model
bun run make:migration name   # Create migration

# Utilities
bun run route:list            # List all routes
```

## Request Context

Setiap route handler menerima context object:

```typescript
router.get('/example', async (ctx) => {
  // Request info
  ctx.request        // Original Request object
  ctx.method         // HTTP method
  ctx.url            // URL object
  ctx.path           // Path string
  
  // Route data
  ctx.params         // { id: '1' }
  ctx.query          // { page: '1', limit: '10' }
  
  // Request data
  ctx.headers        // Request headers
  ctx.body           // Parsed body (JSON/Form)
  ctx.ip             // Client IP address
  
  return { message: 'Hello!' };
});
```

## Response Types

```typescript
// JSON response (automatic)
router.get('/json', async () => ({
  message: 'This is JSON',
  data: { foo: 'bar' }
}));

// HTML response
router.get('/html', async () => {
  return view.response('template', { data });
});

// Custom response
router.get('/custom', async () => {
  return new Response('Plain text', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
});

// File response
router.get('/file', async () => {
  const file = Bun.file('path/to/file.pdf');
  return new Response(file);
});
```

## Deployment

### Production with PM2

```bash
# Install PM2
bun add -g pm2

# Start
pm2 start bun --name "bunstro" -- run start

# Monitor
pm2 monit

# Logs
pm2 logs bunstro

# Restart
pm2 restart bunstro

# Stop
pm2 stop bunstro
```

### Docker

```dockerfile
FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --production

COPY . .

EXPOSE 3000

CMD ["bun", "run", "start"]
```

```bash
docker build -t bunstro .
docker run -p 3000:3000 bunstro
```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Variables

Key variables in `.env`:

```env
# Application
APP_NAME=BUNSTRO
APP_ENV=production
APP_DEBUG=false
APP_URL=https://example.com

# Server
SINGLE_PORT=3000
SINGLE_HOST=0.0.0.0

# Database
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=bunstro
DB_USERNAME=postgres
DB_PASSWORD=your-password

# Logging
LOG_LEVEL=info
LOG_FILE=true
LOG_CONSOLE=true

# Static Files
STATIC_PATH=public
STATIC_URL=/
```

## Performance

BUNSTRO menggunakan Bun native yang jauh lebih cepat dari Node.js:

- ⚡ **3x faster** startup time
- ⚡ **4x faster** request handling
- ⚡ **Built-in transpiler** (TypeScript native)
- ⚡ **Efficient memory usage**

## Security

Built-in security features:

- ✅ SQL injection protection (via Knex parameterized queries)
- ✅ XSS protection (via VentoJS auto-escaping)
- ✅ CORS support
- ✅ Rate limiting ready
- ✅ Secure headers

## Testing

```typescript
// test/example.test.ts
import { test, expect } from 'bun:test';

test('example test', () => {
  expect(2 + 2).toBe(4);
});
```

Run: `bun test`

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ using Pure Bun**

**No Express. No Fastify. No Elysia. Just Bun. 🚀**