
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

  return api;
}