import { ProfileSetupState, UserType } from "~/lib/enums";
import type { IProfile } from "./perms";
import * as handler from "./perms";


const dashboardBlock = async (profile: IProfile) => {
  return
}

const registerBlock = async (profile: IProfile) => {
  console.log("-- Checking the register - permissions block");

  const key = profile.role as keyof typeof handler.register
  const progress = profile.profileSetupProgress!;
  const provider = handler.register[key];
  if (!provider) return;

  if (progress === ProfileSetupState.PROFILE_IN_REVIEW) {
    return navigateTo({ name: "SignUpReview" });
  }

  return provider(profile, progress);
}

export default defineNuxtRouteMiddleware(async (to) => {
  console.log("-- Checking the permission block");
  const profile = useAuthStore().profile;

  if (!profile) {
    await useAuthStore().getProfile();
  }

  if (to.path.includes("/sign-up")) {
    return registerBlock(profile!);
  }

  if (to.path.includes("/dashboard")) {
    return dashboardBlock(profile!);
  }

  if (to.path.includes("/d/")) {
    return dashboardBlock(profile!);
  }
})