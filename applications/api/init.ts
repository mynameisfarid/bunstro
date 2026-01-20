import { Router } from '@core/Router';
import view from '@core/ViewEngine';
import logger from '@core/Logger';
// import { authMiddleware } from './middleware/auth';

/**
 * Initialize Tenant Application
 */
export async function initApiApp(router: Router, view: view): Promise<void> {
  logger.log('app', '🏢 Initializing API Application...');

  // Register view path
  // view.register('api', '@applications/api/views');

  // // Add tenant-specific middleware
  // // router.use(authMiddleware);

  // // Tenant context middleware
  // router.use(async (ctx, next) => {
  //   // Extract tenant from subdomain
  //   const host = ctx.request.headers.get('host') || '';
  //   const match = host.match(/^([^.]+)\.web\./);
  //   ctx.tenant = {
  //     slug: match ? match[1] : 'default',
  //     host: host,
  //   };
  //   return next();
  // });

  // // Load routes
  await router.loadRoutes('@applications/api/routes/route.ts');

  logger.log('app', '✅ API Application initialized');
}

export default initApiApp;