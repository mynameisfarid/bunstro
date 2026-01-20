import 'dotenv/config';
import logger from '@core/Logger';
import db from '@core/Database';
import { HttpServer } from '@core/HttpServer';
import { Router } from '@core/Router';
import { Pool } from 'pg';

try {
  console.log('🚀 BUNSTRO Framework Starting...');
  console.log(`📝 Environment: ${process.env.APP_ENV || 'development'}`);
  await db.connect();


  const router = new Router()

  // app.use(async (ctx, next) => {
  //   console.log(ctx.req.method, ctx.url.pathname)
  //   return next()
  // })

  router.get('/', () => {
    return new Response('Bun Home')
  })

  router.get('/users', async () => {
      // const rows = await db
      // .select({
      //   id: sql<number>`id`,
      //   email: sql<string>`email`
      // })
      // .from(sql`users`)
      // .limit(10)


      // const rows = await db
      // .select()
      // .from(users)
      // .limit(10)

    const rows = await db.query(
      'SELECT id, email FROM users LIMIT 10'
    )
    return rows

    // const { rows } = await pool.query(
    //   'SELECT id, email FROM users LIMIT 10'
    // )

    // const { rows } = await db.raw('SELECT id, email FROM users LIMIT 10')
    // return Response.json(rows)

    // const { rows } = await db.query(
    //   'SELECT id, email FROM users LIMIT 10'
    // )

    return Response.json({rows, ...{
      total: pool.totalCount,
      idle: pool.idleCount,
      waiting: pool.waitingCount,
    }})
  })

  console.log(router.routes)


  const server = new HttpServer({
    port: parseInt(process.env.SINGLE_PORT || '3000'),
    host: process.env.SINGLE_HOST || '0.0.0.0',
    router,
    staticPath: process.env.STATIC_PATH || 'public',
    staticUrl: process.env.STATIC_URL || '/',
    onError: (error, req) => {
      if (process.env.APP_DEBUG === 'true') {
        return new Response(JSON.stringify({
          error: error.message,
          stack: error.stack,
          url: req.url,
          method: req.method,
        }, null, 2), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      return new Response(JSON.stringify({
        error: 'Internal Server Error',
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    },
  });
  await server.start();

  console.log('');
  console.log(`✅ Application started successfully! on ${server.url}`);
  console.log('');

  // Graceful shutdown
  const shutdown = async () => {
    logger.info('🛑 Shutting down gracefully...');
    // await server.stop();
    // await db.destroy();
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

} catch (error: any) {
  logger.fatal('❌ Failed to start application', {
    error: error.message,
    stack: error.stack,
  });
  process.exit(0);
}