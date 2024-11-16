import TimaAPI from "~/lib/api";
import { auth } from "~/stores/persisted";

export default function () {
  const api = new TimaAPI();
  const config = useRuntimeConfig();

  api.setStore('auth', auth);
  api.setBaseUrl(config.public.baseUrl);

  // api.socials.setBaseUrl(config.public.mode == 'development' ? ' /api' : config.public.socialsBaseUrl);
  // api.socials.setBaseUrl("/api");
  api.socials.setBaseUrl('https://tima-data-service-8xssl.ondigitalocean.app/api');

  return api;
}