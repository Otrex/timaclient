<template>
  <div
    class="w-full flex md:flex-row items-center gap-[1.875rem] justify-between py-[1rem] px-[1.75rem] dark:border-slate-900"
  >
    <div class="flex items-center flex-row gap-3">
      <div class="flex md:hidden">
        <button class="" @click="openMenu">
          <UtSvg name="menu" dim w="1.5rem" h="1.5rem" class="text-black" />
        </button>
      </div>
      <div class="whitespace-nowrap">
        <slot name="left">
          <div class="flex items-center gap-3">
            <h2 class="font-bold" v-if="typeof routeName === 'string'">
              {{ routeName === "ViewBrandCampaign" ? "Campaign" : routeName }}
            </h2>
            <component :is="routeName" />
          </div>
        </slot>
      </div>
    </div>
    <div class="w-full hidden md:block justify-self-start max-w-[42.5rem]">
      <slot name="middle">
        <div
          class="flex gap-[1.25rem] relative"
          v-if="routeName === 'ViewBrandCampaign'"
        >
          <UiInputText
            class="w-full"
            @keyup.prevent="() => search('campaign')"
            :loading="searchState === constants.LOADING"
            v-model="searchQuery"
            placeholder="Search campaigns"
            search
          />

          <UiButtonDefault
            v-if="routeName === 'ViewBrandCampaign'"
            @click="
              navigateTo({
                name: 'DashboardCampaignsCreate',
              })
            "
            class="px-[1.125rem] sm:text-sm md:text-lg whitespace-nowrap py-[0.625rem]"
            variant="primary"
          >
            <div class="flex items-center gap-3">
              <UtSvg name="plus-circle" dim w="1.5rem" h="1.5rem" />
              <span>New Campaign</span>
            </div>
          </UiButtonDefault>

          <div
            v-if="searchResults.length"
            class="absolute top-[calc(100%_+_15px)] rounded-[20px] p-5 z-10 shadow-sm w-[100%] bg-white dark:bg-slate-600 dark:text-white"
          >
            <div class="flex justify-between items-center mb-3">
              <p>Search Results:</p>
              <button
                @click="searchResults = []"
                class="active:ring-4 active:ring-slate-200"
              >
                <UtSvg name="close" dim w="1rem" h="1rem" />
              </button>
            </div>
            <div
              v-for="(campaign, idx) in searchResults"
              class="w-full"
              :key="idx"
            >
              <UiCampaignInfo
                class="mb-3 p-3 rounded-md cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-100"
                :name="campaign.name"
                @click="() => navigateToCampaign(campaign.campaignId)"
                :banner="campaign.banner"
                :description="campaign.description"
                :public-id="campaign.campaignId"
              />
            </div>
          </div>
        </div>
      </slot>
    </div>
    <div class="flex justify-end">
      <div class="flex flex-row gap-[0.625rem] items-center">
        <div class="flex items-center">
          <DashboardNotification />
        </div>
        <div class="flex items-center">
          <DashboardUserMenu
            :image="profile?.profileImage || '#'"
            :type="user?.role || ''"
            :name="userIdentifier"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import type { Core } from "~/lib/interfaces";
import { useAuthStore } from "~/stores/auth";
import UtSvg from "../Utility/Svg.vue";

const route = useRoute();
const $emit = defineEmits(["open-menu"]);

const searchQuery = ref("");
const searchResults = ref<Core.CampaignByName[]>([]);

const routeNameMap: Record<string, any> = {
  CreateCampaign: "Campaign >>> Create a campaign",
  "Campaign Application Influencer": "Campaign Application",
  "Notification/CampaignApplication": "Notification >>> Campaign Applications",
  "Notification/Invitations": "Notification >>> Invitations",
  InfluencerCampaigns: "Campaign",
  DashboardBrandExplore: "Explore",
  BrandCampaign: "Campaign",
  BrandNotification: "Notification",
  InfluencerDashboard: "Dashboard",
  BrandFinance: "Finance",
  AttachContent: "Attach Content Files",
  DashboardBrandCampaigns: "Campaigns",
  ViewBrandCampaignAnalytics: "ViewBrandCampaign",
  ViewbrandCampaignInfluencers: "ViewBrandCampaign",
  ViewbrandCampaignPayments: "ViewBrandCampaign",
  ViewBrandCampaignContents: "ViewBrandCampaign",
  InfluencerCampaignsState: "Campaign",
  InfluencerFinance: "Finance",
  InfluencerNotification: "Notifications",
  InfluencerSubmitContent: defineComponent({
    template: '<h3 class="font-bold">Attach Files</h3>',
  }),
  ViewInfluencerCampaign: defineComponent({
    components: { UtSvg },
    methods: { navigateTo },
    template: `<div class="flex flex-row items-center gap-5">
      <UtSvg name="nav/back" @click="navigateTo({ name: 'InfluencerDashboard' })" dim w="1.5rem" h="1.5rem" />
      <h2 class="font-bold"> Dashboard </h2>
    </div>`,
  }),
  DashboardCampaignsCreate: defineComponent({
    components: { UtSvg },
    methods: { navigateTo },
    template: `<div class="flex flex-row items-center gap-5">
      <UtSvg name="nav/back" @click="navigateTo({ name: 'DashboardBrandCampaigns' })" dim w="1.5rem" h="1.5rem" />
      <h2 class="font-bold">Campaign >>> <span class="text-[#B0B0B0]">Create a campaign</span> </h2>
    </div>`,
  }),
  BrandInfluencerProfile: defineComponent({
    components: { UtSvg },
    methods: { navigateTo },
    template: `<div class="flex flex-row items-center gap-5">
      <UtSvg name="nav/back" @click="navigateTo({ name: 'DashboardBrandCampaigns' })" dim w="1.5rem" h="1.5rem" />
      <h2 class="font-bold">Campaign >>> <span class="text-[#B0B0B0] font-normal">Influencers</span> </h2>
    </div>`,
  }),
};

const routeName = computed(
  () => routeNameMap[route.name as string] || route.name
);

const authStore = useAuthStore();
const profile = computed(() => authStore.profile || null);
const user = computed(() => authStore.user || null);

const userIdentifier = computed(() => authStore.user?.userName || "");

const api = useAPI();
const { notify } = useNotification();

const { execute: searchForCampaigns, state: searchState } = useRequestState({
  action: (name: string) => api.getCampaignsByName(name, {}),
  onSuccess(response) {
    searchResults.value = response.data;
  },
  onError(error) {
    if (!searchQuery.value) return;
    notify({
      type: "error",
      title: error.title,
      text: error.description,
    });
  },
});

const search = useDebounceFn(
  (type: string) => {
    if (type === "campaign") {
      searchForCampaigns(searchQuery.value);
    }
  },
  1000,
  { maxWait: 5000 }
);

function navigateToCampaign(campaignId: string) {
  searchResults.value = [];
  searchQuery.value = "";
  navigateTo({
    name: "Explore - Campaign",
    params: {
      id: campaignId,
    },
  });
}

function openMenu() {
  console.log("Opening");

  $emit("open-menu");
}
</script>
