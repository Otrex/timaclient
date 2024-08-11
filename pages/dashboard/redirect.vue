<template>
  <div>Invalid User Type</div>
</template>

<script setup lang="ts">
import { UserType } from "~/lib/enums";

definePageMeta({
  name: "Redirect",
  middleware: [
    "options",
    (to, from) => {
      const authStore = useAuthStore();
      const userType = authStore.authorization.userType;

      console.log("Enter");

      if (!Object.keys(to.params).includes("type") && userType) {
        const paths: Record<UserType, string> = {
          [UserType.BRAND]: "BrandCampaign",
          [UserType.SUPERADMIN]: "AdminHome",
          [UserType.INFLUENCER]: "Explore",
          [UserType.ADMIN]: "AdminHome",
        };

        console.log(paths, userType);

        return navigateTo({
          name: paths[userType],
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
