import 'dotenv/config';
import logger from '@core/Logger';
// import db from '@core/Database';
import { HttpServer } from '@core/HttpServer';
import { Router } from '@core/Router';
import appConfig from '@config/applications';

async function bootstrap() {
  try {
    logger.log('app', '🚀 BUNSTRO Framework Starting...');
    logger.log('app', `📝 Environment: ${process.env.APP_ENV || 'development'}`);

    // Create router
    const router = new Router();

    // Register routes
    // await registerRoutes(router);

    // console.log(router.routes);

    // Create HTTP server
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

    // Start server
    await server.start();


    // Connect to database
    // await db.connect();

    for ( const app of Object.values(appConfig)) {
      // console.log(app);
      await app.init(router);
    }


    // new HttpServer(router).start()

    logger.info('');
    logger.log('app', `✅ Application started successfully! on ${server.url}`);
    logger.info('');


	  // Graceful shutdown
	  // const shutdown = async () => {
	  //   logger.info('🛑 Shutting down gracefully...');
	  //   await server.stop();
	  //   await server.shutdown();
	  //   // await db.destroy();
	  //   process.exit(0);
	  // };

    process.on('SIGTERM', server.shutdown);
    process.on('SIGINT', server.shutdown);

  } catch (error: any) {
    logger.fatal('❌ Failed to start application', {
      error: error.message,
      stack: error.stack,
    });
    logger.fatal(error);
    // server.shutdown;
    // process.exit(1);
  }
}

bootstrap();
