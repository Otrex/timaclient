import type { NotificationsProps } from "#build/nuxt-notifications";

export default defineAppConfig({
  notification: {
    speed: 1000,
    position: "top right"
  } as NotificationsProps
})