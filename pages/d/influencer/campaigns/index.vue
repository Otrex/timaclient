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
      </div>
    </div>

    <section
      v-if="campaignsTabs.includes(route.query.ctab as string || 'active')"
      class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6 xl:grid-cols-4"
    >
      <section
        v-if="fetchingCampaigns === 'LOADING'"
        class="flex items-center col-span-full justify-center py-12"
      >
        <div class="flex flex-col items-center">
          <div
            class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"
          ></div>
          <p class="text-gray-600 font-medium">Loading campaigns...</p>
        </div>
      </section>
      <section
        v-else-if="campaigns.length < 1"
        class="flex flex-col items-center col-span-full justify-center py-12 text-center"
      >
        <svg
          class="w-32 h-32 mb-6 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">
          No Campaigns Found
        </h3>
        <p class="text-gray-500">
          We couldn't find any campaigns at the moment. Check back later!
        </p>
      </section>
      <template v-else>
        <template v-for="(campaign, i) in campaigns" :key="i">
          <NuxtLink
            class="w-full"
            :to="{
              name: 'ViewInfluencerCampaign',
              params: {
                id: campaign.campaign_id,
              },
            }"
          >
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
          </NuxtLink>
        </template>
      </template>
    </section>

    <section v-if="route.query.ctab === 'invitations'">
      <DashboardNotifySection :invites="invites" />
    </section>

    <section v-if="notificationTabs.includes(route.query.ctab as string)">
      <DashboardNotifyReview />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { GetInfluencerCampaignsResponse } from "~/lib/interfaces/response";

definePageMeta({
  name: "InfluencerCampaignsState",
});

const route = useRoute();
const currentTab = computed(() => (route.query?.ctab || "active") as string);
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

const invites = ref<any[]>([]);
const applications = ref<any[]>([]);
const campaigns = ref<GetInfluencerCampaignsResponse["data"]>([]);

const { state: gapplications, execute: getApplications } = useRequestState({
  action: async () => api.getInfluencerApplications({ applicationStatus: "" }),
  onSuccess(response) {
    console.log(response.data);
    applications.value = response.data;
  },
});

const { state: gettingInvitations, execute: getInvites } = useRequestState({
  action: () => api.fetchInvites(),
  onSuccess(response) {
    console.log(response.data);
    invites.value = response.data;
  },
});

const { state: fetchingCampaigns, execute: getCampaigns } = useRequestState({
  action: (status: string) =>
    api.getInfluencerCampaigns({
      status,
    }),
  onSuccess(response) {
    campaigns.value = response.data;
  },
});

function getData(tab: string) {
  if (campaignsTabs.includes(tab)) {
    getCampaigns(tab);
  }

  if (tab === "applications") {
    console.log(tab);

    getApplications();
  }

  if (tab === "invitations") {
    getInvites();
  }
}

onBeforeRouteUpdate((to) => {
  getData((to.query.ctab || "active") as string);
});

onMounted(() => {
  getData(currentTab.value);
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
