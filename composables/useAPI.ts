import TimaAPI from "~/lib/api";

export default function () {
  const config = useRuntimeConfig();
  const AUTH_STORE_KEY = 'pinia-persist.auth.authorization';

  const api = new TimaAPI();

  api.setBaseUrl(config.public.baseUrl);
  api.set401handler(async () => {
    return useAuthStore().refreshAuth();
  });

  api.setStore(tools.cookieStore());

  api.setStoreGetter({
    accessToken: {
      key: AUTH_STORE_KEY,
      getter: tools.cookieStoreValueGetter('accessToken')
    },
    refreshToken: {
      key: AUTH_STORE_KEY,
      getter: tools.cookieStoreValueGetter('refreshToken')
    }
  })

  return api;
}