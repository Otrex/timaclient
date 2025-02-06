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

    <section v-if="campaignsTabs.includes(currentTab)">
      <DLoadingState
        label="campaigns"
        :data="campaigns"
        :state="fetchingCampaigns"
      >
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                :budget="0"
                :image="(campaign.banner as string)"
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
        </div>
      </DLoadingState>
    </section>

    <section v-if="currentTab === 'applications'">
      <DLoadingState
        label="applications"
        :data="applications"
        :state="gapplications"
      >
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <template
            v-for="campaign in applications"
            :key="campaign.campaign_id"
          >
            <DAppCardMini
              :campaign="campaign"
              :status="campaign.applicationStatus"
            />
          </template>
        </div>
      </DLoadingState>
    </section>

    <section v-if="currentTab === 'submissions'">
      <DLoadingState
        label="submissions"
        :data="submissions"
        :state="gettingSubmissions"
      >
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <template v-for="campaign in submissions" :key="campaign.campaign_id">
            <DContentSubmissionCard :item="campaign" />
          </template>
        </div>
      </DLoadingState>
    </section>

    <section v-if="currentTab === 'invitations'">
      <DashboardNotifySection :invites="invites" />
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
const submissions = ref<any[]>([]);
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

const { state: gettingSubmissions, execute: getSubmissions } = useRequestState({
  action: () =>
    api.getInfluencerSubmissions({
      page: 1,
      limit: 10,
    }),
  onSuccess(response) {
    console.log(response.data);
    submissions.value = response.data.contents;
  },
});

function getData(tab: string) {
  if (campaignsTabs.includes(tab)) {
    getCampaigns(tab);
  }

  if (tab === "applications") {
    getApplications();
  }

  if (tab === "submissions") {
    getSubmissions();
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
