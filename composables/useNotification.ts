import type { ToastOptions } from "vue3-toastify";

export type NotificationOptions = {
  title: string;
  text: string;
} & ToastOptions;

export default function () {
  const { $toast } = useNuxtApp();
  const { toastConfig: globalToastConfig } = useAppConfig();

  const notify = (options: NotificationOptions) => {
    const { title, text, ...toastOptions } = options;
    $toast(`<b>${title}</b>\n${text}`, {
      ...globalToastConfig,
      ...toastOptions
    });
  }
  return {
    notify
  }
}