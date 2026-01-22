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
