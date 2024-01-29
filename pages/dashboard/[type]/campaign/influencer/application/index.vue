<template>
  <section class="flex flex-row pr-[0] h-full overflow-hidden gap-[1.4375rem]">
    <aside class="w-1/3 py-[1.4375rem] pl-[1.4375rem]">
      <DashboardInfluencerBioCard />
    </aside>
    <aside class="w-2/3 h-full pt-[1.4375rem] overflow-auto pr-[0.1875rem]">
      <UiTab
        :menu-items="tabs"
        class="w-full pr-[1.4375rem]"
        @change="tabChange"
        :default-tab="constants.CAMPAIGN_PERSONAL_INFO"
      />
    </aside>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Campaign >>> Influencers",
});

const tabs = [
  {
    name: constants.CAMPAIGN_PERSONAL_INFO,
    component: resolveComponent("LazyDashboardCampaignInfluencerPersonalInfo"),
    label: "Personal Info",
  },
  {
    name: constants.CAMPAIGN_INFLUENCER_CAMPAIGN_INFO,
    component: resolveComponent("LazyDashboardCampaignInfluencerCampaignInfo"),
    label: "Campaign",
  },
];

const currentTab = ref();

function tabChange(tab: string) {
  currentTab.value = tab;
}
</script>

<style></style>
