import TimaAPI from "~/lib/api";

export default function () {
  const config = useRuntimeConfig();
  const appConfig = useAppConfig();

  const api = new TimaAPI();

  api.setStore(tools.cookieStore());
  api.setBaseUrl(config.public.baseUrl);
  // api.socials.setBaseUrl('config.public.mode == 'development' ? ' / api' : config.public.socialsBaseUrl');
  api.socials.setBaseUrl('https://tima-data-service-8xssl.ondigitalocean.app/api');
  api.set401handler(() => useAuthStore().refreshAuth());
  api.setStoreGetter({
    accessToken: {
      key: appConfig.authStoreKey,
      getter: tools.cookieStoreValueGetter('accessToken')
    },
    refreshToken: {
      key: appConfig.authStoreKey,
      getter: tools.cookieStoreValueGetter('refreshToken')
    }
  })

  return api;
}