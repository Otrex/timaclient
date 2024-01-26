<template>
  <div>
    <NuxtLayout name="dashboard">
      <template #main>
        <NuxtPage
          :transition="{
            name: 'page',
            mode: 'out-in',
          }"
        />
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: [
    "options",
    (to, from) => {
      const authStore = useAuthStore();
      const userType = authStore.authorization.userType;

      if (!Object.keys(to.params).includes("type")) {
        return navigateTo(
          userType === constants.INFLUENCER
            ? {
                name: "Explore",
                params: {
                  type: userType,
                },
              }
            : {
                name: "BrandCampaign",
                params: {
                  type: userType,
                },
              }
        );
      }
    },
  ],
});
</script>

<style></style>
