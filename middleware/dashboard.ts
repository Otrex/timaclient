import { ProfileSetupState } from "~/lib/enums";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.getProfile();



  // if (
  //   [ProfileSetupState.INDUSTRY_SELECTED].includes(
  //     authStore.profile?.profileSetupProgress!
  //   )
  // ) {
  //   return navigateTo({
  //     name: "AwaitingApproval",
  //   });
  // }


})
