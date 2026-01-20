import { Router } from '@core/Router';
import view from '@core/ViewEngine';
import logger from '@core/Logger';

import { join } from 'path';
// import { authMiddleware } from './middleware/auth';

/**
 * Initialize Tenant Application
 */
export async function initWebApp(router: Router): Promise<void> {
  logger.log('app', '🏢 Initializing Web Application...');

  // Register view path
  // console.log(view);
  // view.register('web', '@applications/web/views');


  view.register(
    'web',
    join(process.cwd(), 'applications/web/views')
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
  await router.loadRoutes('@applications/web/routes/route.ts');

  logger.log('app', '✅ Web Application initialized');
}

export default initWebApp;