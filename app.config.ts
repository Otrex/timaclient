import type { NotificationsProps } from "#build/nuxt-notifications";

export default defineAppConfig({
  notification: {
    group: "all",
    duration: 5000,
    speed: 1000,
  } as NotificationsProps
})