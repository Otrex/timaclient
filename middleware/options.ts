export default defineNuxtRouteMiddleware(async (to, from) => {
  const optionsStore = useOptionsStore();
  const { notify } = useNotification();
  const authStore = useAuthStore();

  try {
    if (authStore.isAuthenticated && !from.path.includes('/auth/login')) {
      // await optionsStore.loadDashboardOptions();
    } else {
      optionsStore.loadRegisterOptions();
    }
  } catch (error) {
    notify({
      type: 'error',
      title: "Data loading error",
      text: "Something went wrong"
    });
  }
})