import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return navigateTo(`/auth/login?redirect=${to.fullPath}`)
  }

  const type = to.params.type;
  const publicId = to.params.publicId;

  if (authStore.authorization.userType === constants.AGENCY) {
    return navigateTo({
      name: "ViewBrandCampaignAnalytics",
      params: {
        id: publicId,
      }
    })
  } else {
    return navigateTo({
      name: "Explore - Campaign",
      params: {
        type: authStore.authorization.userType,
        id: publicId,
      }
    })
  }
});
