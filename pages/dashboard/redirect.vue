<template>
  <div>Invalid User Type</div>
</template>

<script setup lang="ts">
import { ProfileSetupState, UserType } from "~/lib/enums";

definePageMeta({
  name: "Redirect",
  middleware: [
    "options",
    async (to, from) => {
      const authStore = useAuthStore();
      const userType = authStore.authorization.userType;
      await authStore.getProfile();

      if (
        [ProfileSetupState.INDUSTRY_SELECTED].includes(
          authStore.profile?.profileSetupProgress!
        )
      ) {
        return navigateTo({
          name: "AwaitingApproval",
        });
      }

      if (!Object.keys(to.params).includes("type") && userType) {
        const redirect: Record<UserType, string> = {
          [UserType.BRAND]: "BrandCampaign",
          [UserType.SUPERADMIN]: "AdminHome",
          [UserType.INFLUENCER]: "Explore",
          [UserType.ADMIN]: "AdminHome",
        };

        return navigateTo({
          name: redirect[userType],
          params: {
            type: userType,
          },
        });
      }
    },
  ],
});
</script>

<style></style>
