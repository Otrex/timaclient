
import { ProfileSetupState } from "~/lib/enums";
import { forAsterisk as astk } from "~/utils";
import { useAuthStore } from "~~/stores/auth";

const allowedPaths = [
  "/",
  "/terms",
  "/sandbox",
  "/auth/*",
  "/sign-up/*",
  "/share/*"
];

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const authenticated = authStore.isAuthenticated;
  const profile = authStore.profile;
  if (astk(allowedPaths, to.path)) return;
  if (profile?.profileSetupProgress === ProfileSetupState.PROFILE_IN_REVIEW) {
    return navigateTo({ name: "Reviewing" });
  }


  if (!authenticated) return navigateTo("/");
});
