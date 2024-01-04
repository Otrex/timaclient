
import TimaAPI from "~/lib/api";

export default function () {
  const config = useRuntimeConfig();
  const api = new TimaAPI();
  api.setBaseUrl(config.public.baseUrl);
  api.setStore({
    get(key) {
      return JSON.stringify(useCookie(key).value);
    },
    set(key, value) {
      useCookie(key).value = value;
    },
  })
  api.setStoreGetter({
    token: {
      key: 'pinia-persist.auth.authorization',
      getter: (state: any) => typeof state === 'string'
        ? JSON.parse(state || '{}').value?.accessToken
        : state.accessToken
    }
  })

  return api;
}