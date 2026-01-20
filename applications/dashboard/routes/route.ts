import { Router } from '@core/Router';
// import db from '@core/Database';
import { HomeController } from '../controllers/home_controller';

/**
 * Web Application Routes
 */
export default function register(router: Router) {
  const homeController = new HomeController();
  router.group({ prefix: '/dash' }, (r) => {
    r.get('/info', async () => ({
      framework: 'BUNSTRO DASHBOARD',
      version: '1.0.0',
      runtime: 'Bun',
      timestamp: new Date().toISOString(),
    }));

    r.get('/', homeController.index);
    r.get('/health', async (ctx: AppContext) => {
      const dbHealthy = await ctx.db.healthCheck();
      
      return {
        status: dbHealthy ? 'ok' : 'degraded',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: dbHealthy ? 'connected' : 'disconnected',
      };
    });
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