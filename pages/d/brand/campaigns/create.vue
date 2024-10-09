<template>
  <div class="flex md:flex-row h-full flex-col">
    <div class="md:w-2/3 p-[1.625rem] h-full md:overflow-auto pb-[2.5rem]">
      <UiTab
        :menu-items="tabs"
        ref="currentScreen"
        :bus="bus"
        class="w-full"
        @change="tabChange"
        :default-tab="constants.BRAND_OVERVIEW"
      />
    </div>

    <transition mode="out-in">
      <component :is="summaryComponent" :bus="bus" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useEventBus } from "@vueuse/core";

definePageMeta({
  name: "DashboardCampaignsCreate",
  middleware: ["options"],
});

const bus = useEventBus<string>("tab-switch");
const tabs = [
  {
    name: constants.BRAND_OVERVIEW,
    component: resolveComponent("DashboardCampaignOverview"),
    summary: resolveComponent("DashboardCampaignPreviewOverviewSummary"),
    label: "Overview",
  },
  {
    name: constants.BRAND_INFLUENCERS,
    component: resolveComponent("DashboardCampaignInfluencers"),
    summary: resolveComponent("DashboardCampaignPreviewInfluencerSummary"),
    label: "Influencers",
  },
  {
    name: constants.BRAND_CREATIVE,
    component: resolveComponent("DashboardCampaignCreative"),
    summary: resolveComponent("DashboardCampaignPreviewCreativeSummary"),
    label: "Creative",
  },
  {
    name: constants.BRAND_PREVIEW,
    component: resolveComponent("DashboardCampaign_Preview"),
    summary: resolveComponent("DashboardCampaignPreviewSummary"),
    label: "Preview",
  },
];

const currentScreen = ref<{ next: Function }>();
const currentTab = ref<string>(constants.BRAND_OVERVIEW);

const summaryComponent = computed(() => {
  const component = tabs.find((e) => e.name === currentTab.value);
  return component?.summary;
});

function tabChange(tab: string) {
  currentTab.value = tab;
}
</script>

<style></style>
