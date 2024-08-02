<template>
  <div class="flex md:flex-row h-full flex-col">
    <div class="md:w-2/3 p-[1.625rem] h-full md:overflow-auto pb-[2.5rem]">
      <UiTab
        :menu-items="tabs"
        ref="currentScreen"
        :bus="bus"
        :disabled="true"
        class="w-full"
        @change="tabChange"
        :default-tab="constants.BRAND_OVERVIEW"
      />
    </div>
    <transition mode="out-in">
      <DashboardCampaignPreviewOverviewSummary
        :bus="bus"
        v-if="currentTab === constants.BRAND_OVERVIEW || !currentTab"
      />
      <DashboardCampaignPreviewInfluencerSummary
        :bus="bus"
        v-else-if="currentTab === constants.BRAND_INFLUENCERS"
      />
      <DashboardCampaignPreviewCreativeSummary
        :bus="bus"
        v-else-if="currentTab === constants.BRAND_CREATIVE"
      />
      <DashboardCampaignPreviewSummary
        :bus="bus"
        v-else-if="currentTab === constants.BRAND_PREVIEW"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useEventBus } from "@vueuse/core";

definePageMeta({
  name: "CreateCampaign",
});

const bus = useEventBus<string>("tab-switch");
const tabs = [
  {
    name: constants.BRAND_OVERVIEW,
    component: resolveComponent("DashboardCampaignOverview"),
    label: "Overview",
  },
  {
    name: constants.BRAND_INFLUENCERS,
    component: resolveComponent("DashboardCampaignInfluencers"),
    label: "Influencers",
  },
  {
    name: constants.BRAND_CREATIVE,
    component: resolveComponent("DashboardCampaignCreative"),
    label: "Creative",
  },
  {
    name: constants.BRAND_PREVIEW,
    component: resolveComponent("DashboardCampaign_Preview"),
    label: "Preview",
  },
];

const currentScreen = ref<{ next: Function }>();

const currentTab = ref();

function tabChange(tab: string) {
  currentTab.value = tab;
}
</script>

<style></style>
