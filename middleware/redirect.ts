import { UserType } from "~/lib/enums";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const userType = authStore.authorization.userType;

  if (!Object.keys(to.params).includes("type") && userType) {
    const redirect: Record<UserType, string> = {
      [UserType.BRAND]: "DashboardBrandCampaigns",
      [UserType.SUPERADMIN]: "AdminRedirect",
      [UserType.INFLUENCER]: "Dashboard",
      [UserType.ADMIN]: "AdminRedirect",
    };

    return navigateTo({
      name: redirect[userType],
      params: {
        type: userType,
        id: 2,
      },
    });
  }
})
