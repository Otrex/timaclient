import { forAsterisk as astk } from "~/utils";
import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  console.log("-- Checking the guest block");
  const allowedPaths = [
    "/",
    "/terms",
    "/sandbox",
    "/auth/*",
    "/sign-up/*",
    "/share/*"
  ];

  const authenticated = useAuthStore().isAuthenticated;
  if (astk(allowedPaths, to.path)) return;
  if (!authenticated) return navigateTo("/");
});
