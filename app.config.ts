import type { ToastOptions } from "vue3-toastify";

export default defineAppConfig<{
  toastConfig: ToastOptions,
  authStoreKey: string
}>({
  toastConfig: {
    dangerouslyHTMLString: true,
    position: "top-right",
    pauseOnHover: true,
    transition: "flip",
    autoClose: 5000,
    theme: "auto",
  },
  authStoreKey: 'pinia-persist.auth.authorization'
})