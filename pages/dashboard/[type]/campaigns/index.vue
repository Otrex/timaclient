<template>
  <div class="px-8">
    <div
      class="flex flex-row mb-6 w-full overflow-x-auto items-center gap-5 scrollbar-hide"
    >
      <CampaignsTab
        class="md:w-[1/6]"
        v-for="item in tabs"
        :key="item.icon"
        :icon="item.icon"
        :text="item.text"
        :value="item.text.toLowerCase()"
        :is-default="item.default"
      />
    </div>

    <div class="flex mb-8 justify-end">
      <div class="flex flex-row gap-6">
        <div class="max-w-[25rem] w-full">
          <UiInputText
            search
            class="!w-full"
            placeholder="Search for campaigns"
          />
        </div>
        <UiButtonIconed
          left-icon="filter"
          variant="outline-plain"
          label="Filter"
          class="pr-7"
        />
      </div>
    </div>

    <section
      v-if="campaignsTabs.includes(route.query.ctab as string || 'active')"
      class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6 xl:grid-cols-4"
    >
      <template v-for="(campaign, i) in campaigns" :key="i">
        <DashboardCampaignCard
          :image="(campaign.banner as string)"
          :budget="0"
          :category="campaign.category"
          :description="campaign.campaignAbout"
          :deadline="campaign.endDate"
          :brand="(campaign as any).companyName || ''"
          :completion="campaign.statusProgress === 'APPROVED' ? 10 : 0"
          :public-id="(campaign.campaign_id as string)"
          :title="campaign.campaignName"
        />
      </template>
    </section>

    <section v-if="route.query.ctab === 'invitations'">
      <DashboardNotifySection />
    </section>

    <section v-if="notificationTabs.includes(route.query.ctab as string)">
      <DashboardNotifyReview />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { GetInfluencerCampaignsResponse } from "~/lib/interfaces/response";

definePageMeta({
  name: "InfluencerCampaigns",
});

const route = useRoute();
const campaignsTabs = ["active", "upcoming", "completed"];
const notificationTabs = ["submissions", "applications"];

const tabs = [
  {
    icon: "tab/active",
    text: "Active",
    default: true,
  },
  {
    icon: "tab/calender",
    text: "Upcoming",
  },
  {
    icon: "tab/completed",
    text: "Completed",
  },
  {
    icon: "tab/application",
    text: "Applications",
  },
  {
    icon: "tab/invitation",
    text: "Invitations",
  },
  {
    icon: "tab/submit",
    text: "Submissions",
  },
];

const api = useAPI();
const campaigns = ref<GetInfluencerCampaignsResponse["data"]>([]);
const getAllCampaigns = useRequestState({
  immediately: true,
  action: () => api.getInfluencerCampaigns({}),
  onSuccess(response) {
    campaigns.value = response.data;
  },
});
</script>

<style>
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
