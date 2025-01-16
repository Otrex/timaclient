import type { ToastOptions } from "vue3-toastify";

type IAppConfig = {
  toastConfig: ToastOptions,
  thumbnailBaseUrl: string,
  authStoreKey: string,
  supportEmail: string
}
export default defineAppConfig<IAppConfig>({
  supportEmail: 'admin@tima.agency',
  authStoreKey: 'pinia-persist.auth.authorization',
  thumbnailBaseUrl: "https://tima-resources.s3.us-east-2.amazonaws.com/thumbnailPicture",
  toastConfig: {
    dangerouslyHTMLString: true,
    position: "top-right",
    pauseOnHover: true,
    transition: "flip",
    autoClose: 5000,
    theme: "auto",
  },
})