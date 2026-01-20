import vento from "ventojs";
import { join } from 'path';
import logger from './Logger';

class ViewEngine {
  private static instance: ViewEngine;
  private vento: Environment;
  private viewsPath: string;

  private constructor() {
    this.viewsPath = process.env.VIEWS_PATH || 'views';
    
    // Initialize Vento
    // this.vento = new Environment({
    //   includes: this.viewsPath,
    //   autoescape: true,
    // });
    this.vento = vento({
      includes: this.viewsPath,
      cache: false, // Bun.env.NODE_ENV === 'production'
    });

    // Add custom filters/helpers
    this.registerHelpers();
  }

  static getInstance(): ViewEngine {
    if (!ViewEngine.instance) {
      ViewEngine.instance = new ViewEngine();
    }
    return ViewEngine.instance;
  }

  /**
   * Register custom helpers for Vento
   */
  private registerHelpers(): void {
    // URL helper
    this.vento.filters.url = (path: string) => {
      const baseUrl = process.env.APP_URL || 'http://localhost:3000';
      return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
    };

    // Asset helper
    this.vento.filters.asset = (path: string) => {
      const baseUrl = process.env.APP_URL || 'http://localhost:3000';
      return `${baseUrl}/${path.replace(/^\//, '')}`;
    };

    // Date format helper
    this.vento.filters.date = (date: Date | string, format?: string) => {
      const d = typeof date === 'string' ? new Date(date) : date;
      return d.toLocaleDateString('id-ID');
    };

    // Number format helper
    this.vento.filters.number = (num: number) => {
      return new Intl.NumberFormat('id-ID').format(num);
    };

    // Currency helper
    this.vento.filters.currency = (amount: number) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(amount);
    };

    // Truncate helper
    this.vento.filters.truncate = (text: string, length: number = 100) => {
      if (text.length <= length) return text;
      return text.substring(0, length) + '...';
    };

    // Uppercase helper
    this.vento.filters.upper = (text: string) => text.toUpperCase();

    // Lowercase helper
    this.vento.filters.lower = (text: string) => text.toLowerCase();

    // Capitalize helper
    this.vento.filters.capitalize = (text: string) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    };
  }

  /**
   * Render template
   */
  async render(template: string, data: Record<string, any> = {}): Promise<string> {
    try {
      // Add global data
      const globalData = {
        ...data,
        app: {
          name: process.env.APP_NAME || 'BUNSTRO',
          env: process.env.APP_ENV || 'development',
          url: process.env.APP_URL || 'http://localhost:3000',
        },
      };

      const result = await this.vento.run(template, globalData);
      return result.content;
    } catch (error: any) {
      logger.error(`View render error: ${error.message}`, {
        template,
        error: error.stack,
      });
      throw error;
    }
  }

  /**
   * Render template and return Response
   */
  async response(template: string, data: Record<string, any> = {}, status: number = 200): Promise<Response> {
    const html = await this.render(template, data);
    
    return new Response(html, {
      status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  }

  /**
   * Check if template exists
   */
  async exists(template: string): Promise<boolean> {
    try {
      const templatePath = join(this.viewsPath, `${template}.vto`);
      const file = Bun.file(templatePath);
      return await file.exists();
    } catch {
      return false;
    }
  }

  /**
   * Get Vento instance for advanced usage
   */
  getEngine(): Environment {
    return this.vento;
  }
}

// Export singleton
const view = ViewEngine.getInstance();
export default view;
export { ViewEngine };