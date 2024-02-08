import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated && !to.path.includes("/dashboard")) {
    return navigateTo({
      name: "Redirect"
    });
  }

  if (!authStore.isAuthenticated && to.path.includes("/dashboard")) {
    return navigateTo("/");
  }
});
