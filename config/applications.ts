const appConfig = {
  web: {
    appName : 'Website',
    hostname : 'web.local',
    port : 3000,
    init : async (router, view) => {
      console.log('Register web routes');
      const { default: initWebApp } = await import('@applications/web/init');

      await initWebApp(router);
    }
  },

  dashboard: {
    appName : 'Dashboard',
    hostname : 'dash.local',
    port : 3000,
    init : async (router, view) => {
      console.log('Register dashboard routes');
      const { default: initDashboardApp } = await import('@applications/dashboard/init');

      await initDashboardApp(router);
    }
  },
  api: {
    appName : 'Api',
    hostname : 'api.local',
    port : 3001,
    init : async (router, view) => {
      console.log('Register api routes');

      const { default: initApiApp } = await import('@applications/api/init');
      await initApiApp(router, view);
    }
  },
};

export default appConfig;
