<template>
  <div
    class="w-full flex md:flex-row items-center gap-[1.875rem] justify-between py-[1rem] px-[1.75rem] dark:border-slate-900"
  >
    <div class="flex items-center flex-row gap-3">
      <button class="flex md:hidden" @click="openMenu">
        <UtSvg name="menu" dim w="1.5rem" h="1.5rem" class="text-black" />
      </button>
      <div class="whitespace-nowrap">
        <slot name="left">
          <div class="flex items-center gap-3">
            <h2 class="font-bold" v-html="getFormattedRouteName"></h2>
          </div>
        </slot>
      </div>
    </div>
    <div class="w-full hidden md:block justify-self-start max-w-[42.5rem]">
      <slot name="middle">
        <div class="flex gap-[1.25rem] relative" v-if="isCampaignRoute">
          <UiInputText
            class="w-full"
            @keyup.prevent="handleSearch"
            :loading="searchState === RequestState.LOADING"
            v-model="searchQuery"
            placeholder="Search campaigns"
            search
          />

          <UiButtonDefault
            v-if="isCampaignRoute"
            @click="goToCreateCampaign"
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
                @click="clearSearch"
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
        <NuxtLink
          :to="`/d/${user?.role?.toLowerCase()}/calendar`"
          class="p-[.8rem] hover:outline-slate-200 hover:outline outline-solid active:ring-4 dark:hover:bg-slate-600 active:ring-slate-200 rounded-md"
        >
          <UtSvg
            name="calendar"
            class="text-[#05091C] dark:text-white w-[1.5rem] h-[1.5rem]"
          />
        </NuxtLink>
        <DashboardNotification />
        <DashboardUserMenu
          :image="profile?.profileImage || '#'"
          :type="user?.role || ''"
          :name="userIdentifier"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import type { Core } from "~/lib/interfaces";
import { useAuthStore } from "~/stores/auth";
import UtSvg from "../Utility/Svg.vue";
import { RequestState } from "~/lib/enums";

const route = useRoute();
const router = useRouter();
const $emit = defineEmits(["open-menu"]);

const searchQuery = ref("");
const searchResults = ref<Core.CampaignByName[]>([]);

const routeNameMap: Record<string, string> = {
  CreateCampaign: "Campaign >>> Create a campaign",
  BrandFinanceCampaign: "FinanceInfo",
  "Campaign Application Influencer": "Campaign Application",
  "Notification/CampaignApplication": "Notification >>> Campaign Applications",
  "Notification/Invitations": "Notification >>> Invitations",
  InfluencerCampaigns: "Campaign",
  DashboardBrandExplore: "Explore",
  BrandCampaign: "Campaign",
  BrandNotification: "Notification",
  InfluencerDashboard: "Dashboard",
  BrandFinance: "Finance",
  InfluencerSettingPersonal: "Settings",
  InfluencerSettingPassword: "Settings",
  InfluencerSettingPayment: "Settings",
  AttachContent: "Attach Content Files",
  DashboardBrandCampaigns: "Campaigns",
  InfluencerSettingIndustry: "Settings",
  InfluencerSettingAccount: "Settings",
  BrandSettingPassword: "Settings",
  BrandSettingBillingTransactions: "Settings",
  BrandSettingBillingSubscription: "Settings",
  BrandSettingPersonal: "Settings",
  InfluencerSettingNotification: "Settings",
  ViewBrandCampaignAnalytics: "Campaign",
  ViewbrandCampaignInfluencers: "Campaign",
  ViewbrandCampaignPayments: "Campaign",
  ViewBrandCampaignContents: "Campaign",
  InfluencerCampaignsState: "Campaign",
  InfluencerFinance: "Finance",
  InfluencerCalendar: "Calendar",
  InfluencerNotification: "Notifications",
  BrandViewInfluencers: "Influencers",
  InfluencerSubmitContent: "Attach Files",
  ViewInfluencerCampaign: "Dashboard",
  BrandViewSpecialInfluencers: "Influencers",
  DashboardCampaignsCreate:
    'Campaign >>> <span class="text-[#B0B0B0]">Create a campaign</span>',
  BrandInfluencerProfile:
    'Campaign >>> <span class="text-[#B0B0B0] font-normal">Influencers</span>',
};

const getFormattedRouteName = computed(
  () => routeNameMap[route.name as string] || route.name
);
const isCampaignRoute = computed(() => route.name === "ViewBrandCampaign");

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
  () => {
    searchForCampaigns(searchQuery.value);
  },
  1000,
  { maxWait: 5000 }
);

const handleSearch = () => search();
const clearSearch = () => {
  searchResults.value = [];
  searchQuery.value = "";
};

function navigateToCampaign(campaignId: string) {
  clearSearch();
  router.push({
    name: "Explore - Campaign",
    params: { id: campaignId },
  });
}

function goToCreateCampaign() {
  router.push({ name: "DashboardCampaignsCreate" });
}

function openMenu() {
  $emit("open-menu");
}
</script>
