<template>
  <section
    class="flex flex-col md:flex-row md:pr-[0] h-full overflow-y-auto md:overflow-hidden gap-[1.4375rem]"
  >
    <aside
      class="w-full md:w-1/3 py-[1.4375rem] pt-0 px-[1.4375rem] md:px-0 md:pl-[1.4375rem]"
    >
      <!--Change to applicant Id once the endpoint is ready-->
      <DashboardInfluencerBioCard
        :publicId="publicId"
        :applicationId="applicationId"
      />
    </aside>
    <aside
      class="w-full md:w-2/3 md:h-full pt-0 md:overflow-auto md:pr-[0.1875rem]"
    >
      <UiTab
        :menu-items="tabs"
        class="w-full px-[1.4375rem] md:px-0 md:pr-[1.4375rem]"
        @change="tabChange"
        :args="{
          publicId,
        }"
        :default-tab="constants.CAMPAIGN_PERSONAL_INFO"
      />
    </aside>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Campaign >>> Influencers",
});

const route = useRoute();

const publicId = computed(() => route.query.publicId as string);
const applicationId = computed(() => route.query.applicationId as string);

const tabs = [
  {
    name: constants.CAMPAIGN_PERSONAL_INFO,
    component: resolveComponent("LazyDashboardCampaignInfluencerPersonalInfo"),
    label: "Personal Info",
  },
  {
    name: constants.CAMPAIGN_INFLUENCER_CAMPAIGN_INFO,
    component: resolveComponent("LazyDashboardCampaignInfluencerCampaignInfo"),
    label: "Campaigns",
  },
];

const currentTab = ref();

function tabChange(tab: string) {
  currentTab.value = tab;
}
</script>

<style></style>
