<template>
  <div class="flex md:flex-row h-full flex-col">
    <div class="w-2/3 p-[1.625rem]">
      <UiTab
        :menu-items="tabs"
        class="w-full"
        :default-tab="constants.BRAND_OVERVIEW"
      />
    </div>
    <UiLayoutPreview title="SUMMARY">
      <div class="flex flex-col gap-3">
        <p>Campaign name:</p>
        <p>About campaign:</p>
        <p>Planned budget:</p>
        <p>Cost per post:</p>
        <p>Social media platforms:</p>
      </div>
    </UiLayoutPreview>
  </div>
</template>

<script setup lang="ts">
const tabs = [
  {
    name: constants.BRAND_OVERVIEW,
    component: resolveComponent("LazyDashboardCampaignOverview"),
    label: "Overview",
  },
  {
    name: constants.BRAND_INFLUENCERS,
    component: resolveComponent("LazyDashboardCampaignInfluencers"),
    label: "Influencers",
  },
  {
    name: constants.BRAND_CREATIVE,
    component: resolveComponent("LazyDashboardCampaignCreative"),
    label: "Creative",
  },
];
</script>

<style></style>
