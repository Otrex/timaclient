export default defineNuxtRouteMiddleware(async (to) => {
  const optionsStore = useOptionsStore();
  const { notify } = useNotification();
  const authStore = useAuthStore();

  try {
    if (authStore.isAuthenticated) {
      await optionsStore.loadDashboardOptions();
    } else {
      await optionsStore.loadRegisterOptions();
    }
  } catch (error) {
    notify({
      type: 'error',
      title: "Data loading error",
    });
  }
})