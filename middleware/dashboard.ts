import { ProfileSetupState, UserType } from "~/lib/enums";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("-- Checking the dashboard block");
  const authStore = useAuthStore();
  await authStore.getProfile();

  const verifiables = [UserType.BRAND, UserType.INFLUENCER]

  if (!verifiables.includes(authStore.profile?.role!)) {
    return
  }

  const progress = authStore.profile?.profileSetupProgress;
  if (progress === ProfileSetupState.PROFILE_IN_REVIEW) {
    return navigateTo({
      name: "AwaitingApproval",
    });
  }
  if (progress !== ProfileSetupState.PROFILE_APPROVED) {
    return navigateTo({
      name: "SignUpRedirect"
    })
  }
})
