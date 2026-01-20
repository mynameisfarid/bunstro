import { Router } from '@core/Router';
// import db from '@core/Database';
// import type { AppContext } from '@core/HttpServer';
import { HomeController } from '../controllers/home_controller';

/**
 * Web Application Routes
 */
export default function register(router: Router) {
  const homeController = new HomeController();

  // Home page
  router.get('/', homeController.index);

  router.get('/health', async (ctx: AppContext) => {
    // return {status: await ctx.db.healthCheck()};
    const dbHealthy = await ctx.db.healthCheck();
    const dbPool = await ctx.db.poolStats();
    return {
      status: dbHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      // database: dbHealthy ? 'connected' : 'disconnected',
      db_pool: dbPool,
    };
  });

  router.get('/users', async (ctx: AppContext) => {
    const result = await ctx.db.query(
      'SELECT id, email FROM users LIMIT 10'
    )
    return result
  });

  // console.log(router);
  // // About page
  // router.get('/about', homeController.about);

  // // Contact page
  // router.get('/contact', homeController.contact);
  // router.post('/contact', homeController.submitContact);

  // // Products
  // router.get('/products', homeController.products);
  // router.get('/products/:slug', homeController.productDetail);
}