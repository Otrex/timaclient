<template>
  <div class="flex md:flex-row h-full flex-col">
    <div class="md:w-2/3 p-[1.625rem] h-full md:overflow-auto pb-[2.5rem]">
      <UiTab
        class="w-full"
        :disabled="true"
        :menu-items="tabs"
        ref="currentScreen"
        @change="(tab) => (currentTab = tab)"
        :default-tab="constants.BRAND_OVERVIEW"
      />
    </div>

    <transition mode="out-in">
      <DashboardCampaignPreviewOverviewSummary
        @next="goNext"
        v-if="currentTab === constants.BRAND_OVERVIEW || !currentTab"
      />
      <DashboardCampaignPreviewInfluencerSummary
        @next="goNext"
        v-else-if="currentTab === constants.BRAND_INFLUENCERS"
      />
      <DashboardCampaignPreviewCreativeSummary
        @next="goNext"
        v-else-if="currentTab === constants.BRAND_CREATIVE"
      />
      <DashboardCampaignPreviewSummary
        @next="goNext"
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

const currentScreen = ref<{ component: { next: Function } }>();

const goNext = async () => {
  await currentScreen.value?.component.next();
};

const currentTab = ref();

function tabChange(tab: string) {
  currentTab.value = tab;
}
</script>

<style></style>
