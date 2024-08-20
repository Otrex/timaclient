
import { ProfileSetupState } from "~/lib/enums";
import { forAsterisk as astk } from "~/utils";
import { useAuthStore } from "~~/stores/auth";

const allowedPaths = [
  "/",
  "/sandbox",
  "/auth/*",
  "/sign-up/*",
  "/share/*"
];

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const authenticated = authStore.isAuthenticated;
  if (astk(allowedPaths, to.path)) return;
  if (!authenticated) return navigateTo("/");
});
