import { Router } from '@core/Router';
import view from '@core/ViewEngine';
import logger from '@core/Logger';

import { join } from 'path';
// import { authMiddleware } from './middleware/auth';

/**
 * Initialize Tenant Application
 */
export async function initDashboardApp(router: Router): Promise<void> {
  logger.log('app', '🏢 Initializing Dashboard Application...');

  // Register view path
  view.register(
    'dashboard',
    join(process.cwd(), 'applications/dashboard/views')
  );

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
  await router.loadRoutes('@applications/dashboard/routes/route.ts');

  logger.log('app', '✅ Dashboard Application initialized');
}

export default initDashboardApp;