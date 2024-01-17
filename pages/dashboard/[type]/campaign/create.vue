<template>
  <div class="flex md:flex-row h-full flex-col">
    <div class="md:w-2/3 p-[1.625rem] h-full overflow-auto pb-[2.5rem]">
      <UiTab
        :menu-items="tabs"
        class="w-full"
        @change="tabChange"
        :default-tab="constants.BRAND_OVERVIEW"
      />
    </div>
    <transition mode="out-in">
      <DashboardCampaignPreviewOverviewSummary
        v-if="currentTab === constants.BRAND_OVERVIEW || !currentTab"
      />
      <DashboardCampaignPreviewInfluencerSummary
        v-else-if="currentTab === constants.BRAND_INFLUENCERS"
      />
      <DashboardCampaignPreviewCreativeSummary
        v-else-if="currentTab === constants.BRAND_CREATIVE"
      />
      <DashboardCampaignPreviewSummary
        v-else-if="currentTab === constants.BRAND_PREVIEW"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Campaign >>> Create a campaign",
});
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
  {
    name: constants.BRAND_PREVIEW,
    component: resolveComponent("LazyDashboardCampaign_Preview"),
    label: "Preview",
  },
];

const currentTab = ref();

function tabChange(tab: string) {
  currentTab.value = tab;
}
</script>

<style></style>
