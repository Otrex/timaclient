import { UserType } from "~/lib/enums";
import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const userTypes = Object.values(UserType);
  const routeUserType = to.params.type as UserType;

  if (!userTypes.includes(routeUserType)) {
    return navigateTo("/404")
  }

  if (authStore.isAuthenticated && to.query.tab !== 'basic-details') {
    await authStore.getProfile();
  }

  if (!authStore.registration.type) {
    authStore.$patch({
      registration: {
        type: routeUserType
      }
    });
  }

  if (routeUserType !== authStore.$state.registration.type) {
    return navigateTo("/")
  }
});
