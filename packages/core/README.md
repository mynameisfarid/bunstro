# @bunstro/core

Fast, secure, stable fullstack framework for Bun.

## Installation
```bash
bun add @bunstro/core
```

## Quick Start
```typescript
import { createApp, defineConfig } from '@bunstro/core';

const config = defineConfig({
  server: {
    port: 3000,
  },
});

const app = await createApp(config);

app.router.get('/', async () => ({
  message: 'Hello BUNSTRO!'
}));

await app.start();
```

## Documentation

See [bunstro.dev](https://bunstro.dev) for full documentation.

## License

MIT
