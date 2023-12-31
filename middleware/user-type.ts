import { UserType } from "~/lib/enums";
import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const userTypes = Object.values(UserType);
  const routeUserType = to.params.type as UserType;

  if (!userTypes.includes(routeUserType)) {
    return navigateTo("/404")
  }

  if (!authStore.userType) {
    authStore.$patch({
      userType: routeUserType
    });
  }

  if (routeUserType !== authStore.$state.userType) {
    return navigateTo("/")
  }
});
