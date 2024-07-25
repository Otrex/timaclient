import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return navigateTo(`/auth/login?redirect=${to.fullPath}`)
  }

  const type = to.params.type;
  const publicId = to.params.publicId;

  console.log({ type, c: authStore.authorization.userType });


  if (authStore.authorization.userType === constants.AGENCY) {
    return navigateTo({
      name: "Campaign",
      params: {
        type: constants.AGENCY,
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
