import { Router } from '@core/Router';
// import { HomeController } from '../controllers/home_controller';

/**
 * Web Application Routes
 */
export default function register(router: Router) {
  	// const homeController = new HomeController();
	router.group({ prefix: '/api' }, (r) => {
	  	r.get('/info', async () => ({
		  framework: 'BUNSTRO API',
		  version: '1.0.0',
		  runtime: 'Bun',
		  timestamp: new Date().toISOString(),
		}));
	});

  // Home page
  // router.get('/', homeController.index);

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