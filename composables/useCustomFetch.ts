import type { UseFetchOptions } from "nuxt/app"
import { defu } from 'defu'

export default <T>(url: string | (() => string), options: UseFetchOptions<T> = {}) => {
  const userAuth = useCookie('token')
  const config = useRuntimeConfig();


  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.baseUrl,
    headers: userAuth.value
      ? { Authorization: `Bearer ${userAuth.value}` }
      : {},

    onResponse(_ctx) {
    },

    onResponseError(_ctx) {
    }
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)

  return useFetch(url, params)
}
