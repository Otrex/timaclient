import { ProfileSetupState, UserType } from "~/lib/enums";
import { forAsterisk as astk } from "~/utils";
import { useAuthStore } from "~~/stores/auth";

const allowedPaths = [
  "/",
  "/sandbox",
  "/auth/login",
  "/sign-up/*",
  "/share/*"
];

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  console.log(to);


  const authenticated = authStore.isAuthenticated;
  const profile = authStore.profile;

  if (authenticated && profile?.profileSetupProgress) {
    await authStore.getProfile();
    const progress = profile.profileSetupProgress || ProfileSetupState.REGISTERED;
    const stateMap: Partial<Record<ProfileSetupState, string>> = {
      [ProfileSetupState.REGISTERED]: constants.EMAIL_VERIFY
    }

    if (to.name === "SignUp") return

    return navigateTo({
      name: "SignUp",
      params: { type: authStore.registration.type },
      query: { tab: to.query.tab || stateMap[progress] }
    })
  }

  if (astk(allowedPaths, to.path)) return;
  if (!authenticated) return navigateTo("/");

  // TODO: Delete later
  // if (authenticated && !profile) {
  //   await authStore.getProfile();
  // }



  if (authenticated && !profile?.profileSetupProgress) {
    return navigateTo({
      name: "SignUp",
      params: { type: authStore.registration.type },
      query: { tab: constants.EMAIL_VERIFY }
    })
  }

  // console.log(
  //   authStore.isAuthenticated,
  //   authStore.profile?.profileSetupProgress,
  //   authStore.userType,
  //   authStore.registration.type
  // );


  // if (authStore.isAuthenticated && authStore.profile?.profileSetupProgress && [UserType.BRAND, UserType.INFLUENCER].includes(authStore.userType!)) {
  //   const progress = authStore.profile.profileSetupProgress;

  //   const stateMap: Partial<Record<ProfileSetupState, string>> = {
  //     [ProfileSetupState.REGISTERED]: constants.EMAIL_VERIFY
  //   }

  //   return navigateTo({
  //     name: "SignUp",
  //     query: {
  //       tab: stateMap[progress] ?? constants.EMAIL_VERIFY,
  //       type: authStore.registration.type,
  //     }
  //   })
  // }

  // if (authStore.isAuthenticated && !to.path.includes("/dashboard")) {
  //   return navigateTo({
  //     name: "Redirect",
  //   });
  // }

  // if (!authStore.isAuthenticated && to.path.includes("/dashboard")) {
  //   return navigateTo("/");
  // }
});
