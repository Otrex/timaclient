<template>
  <div>Invalid User Type</div>
</template>

<script setup lang="ts">
import { ProfileSetupState, UserType } from "~/lib/enums";

definePageMeta({
  name: "Redirect-D",
  middleware: [
    "options",
    "dashboard",
    "permission",
    async (to, from) => {
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
    },
  ],
});
</script>

<style></style>
