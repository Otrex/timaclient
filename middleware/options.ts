export default defineNuxtRouteMiddleware(async (to, from) => {
  const optionsStore = useOptionsStore();
  const { notify } = useNotification();
  const authStore = useAuthStore();

  try {
    if (authStore.isAuthenticated) {
      await optionsStore.getIndustries();
    }
  } catch (error) {
    notify({
      type: 'error',
      title: "Data loading error",
      text: "Something went wrong"
    });
  }
})