import TimaAPI from "~/lib/api";
import { auth } from "~/stores/persisted";

export default function () {
  const api = new TimaAPI();
  const config = useRuntimeConfig();

  api.setStore('auth', auth);
  api.setBaseUrl(config.public.baseUrl);

  api.socials.setBaseUrl(config.public.socialsBaseUrl);
  api.socials.setProxyUrl(config.public.proxyBaseUrl);
  // api.socials.setBaseUrl('https://tima-data-service-8xssl.ondigitalocean.app/api');

  return api;
}