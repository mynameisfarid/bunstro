import view from '@core/ViewEngine';
import db from '@core/Database';
import type { AppContext } from '@core/HttpServer';

export class HomeController {
  /**
   * Home page
   */
  async index(ctx: AppContext) {
    return await ctx.html('dashboard::home.vto', {
      title: 'Welcome to BUNSTRO',
      description: 'Fast, Secure, Stable, and Simple',
    });
  }

  // /**
  //  * About page
  //  */
  // async about(ctx: RequestContext) {
  //   return view.response('about', {
  //     title: 'About Us',
  //   }, { app: 'web' });
  // }

  // /**
  //  * Contact page
  //  */
  // async contact(ctx: RequestContext) {
  //   return view.response('contact', {
  //     title: 'Contact Us',
  //   }, { app: 'web' });
  // }

  // /**
  //  * Submit contact form
  //  */
  // async submitContact(ctx: RequestContext) {
  //   const { name, email, message } = ctx.body;

  //   // Save to database
  //   await db.query(
  //     'INSERT INTO contacts (name, email, message, created_at) VALUES ($1, $2, $3, NOW())',
  //     [name, email, message]
  //   );

  //   return {
  //     success: true,
  //     message: 'Thank you for contacting us!',
  //   };
  // }

  // /**
  //  * Products listing
  //  */
  // async products(ctx: RequestContext) {
  //   const page = parseInt(ctx.query.page || '1');
  //   const limit = 12;
  //   const offset = (page - 1) * limit;

  //   const [products, total] = await Promise.all([
  //     db.query(
  //       'SELECT id, name, slug, price, image FROM products WHERE active = true LIMIT $1 OFFSET $2',
  //       [limit, offset]
  //     ),
  //     db.queryValue<number>('SELECT COUNT(*) FROM products WHERE active = true'),
  //   ]);

  //   return view.response('products', {
  //     title: 'Our Products',
  //     products,
  //     pagination: {
  //       page,
  //       limit,
  //       total,
  //       totalPages: Math.ceil((total || 0) / limit),
  //     },
  //   }, { app: 'web' });
  // }

  // /**
  //  * Product detail
  //  */
  // async productDetail(ctx: RequestContext) {
  //   const { slug } = ctx.params;

  //   const product = await db.queryOne(
  //     'SELECT * FROM products WHERE slug = $1 AND active = true',
  //     [slug]
  //   );

  //   if (!product) {
  //     return new Response('Product not found', { status: 404 });
  //   }

  //   return view.response('product_detail', {
  //     title: product.name,
  //     product,
  //   }, { app: 'web' });
  // }
}