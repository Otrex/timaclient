import TimaAPI from "~/lib/api";
import MockTimaAPI from "~/lib/api/mock";


export default function () {
  const config = useRuntimeConfig();
  const appConfig = useAppConfig();

  // const api = new TimaAPI();
  const api = new MockTimaAPI();

  api.setStore(tools.cookieStore());
  api.setBaseUrl(config.public.baseUrl);
  api.set401handler(() => useAuthStore().refreshAuth());
  api.setStoreGetter({
    accessToken: {
      key: appConfig.authStoreKey as string,
      getter: tools.cookieStoreValueGetter('accessToken')
    },
    refreshToken: {
      key: appConfig.authStoreKey as string,
      getter: tools.cookieStoreValueGetter('refreshToken')
    }
  })

  return api;
}