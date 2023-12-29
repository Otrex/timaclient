import type { UserType } from "~/lib/enums";
import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  // const route = useRoute();

  // console.log(
  //   (route.params.type as string).toUpperCase()
  // );

  // authStore.$patch({
  //   userType: (route.params.type as string).toUpperCase() as UserType
  // });
});
