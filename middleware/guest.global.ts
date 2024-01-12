import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated && !to.path.includes("/dashboard")) {
    return navigateTo("/dashboard");
  }

  if (!authStore.isAuthenticated && to.path.includes("/dashboard")) {
    return navigateTo("/");
  }
});
