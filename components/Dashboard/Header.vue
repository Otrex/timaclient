<template>
  <div
    class="w-full flex md:flex-row items-center gap-[1.875rem] justify-between py-[1rem] px-[1.75rem] dark:border-slate-900"
  >
    <div class="flex items-center flex-row gap-4">
      <div class="flex md:hidden">
        <button class="" @click="$emit('open-sidebar')">
          <UtSvg name="menu" dim w="1.5rem" h="1.5rem" class="text-black" />
        </button>
      </div>
      <div class="whitespace-nowrap">
        <slot name="left">
          <h2>{{ routeName }}</h2>
        </slot>
      </div>
    </div>
    <div class="w-full hidden md:block justify-self-start max-w-[42.5rem]">
      <slot name="middle">
        <div
          class="flex gap-[1.25rem] relative"
          v-if="['Campaign'].includes(routeName)"
        >
          <UiInputText
            class="w-full"
            @keyup.prevent="() => search('campaign')"
            :loading-state="searchState"
            v-model="searchQuery"
            placeholder="Search campaigns"
            search
          />

          <UiButtonDefault
            v-if="routeName === 'Campaign'"
            @click="
              navigateTo({
                name: 'CreateCampaign',
              })
            "
            label="+ New campaign"
            class="px-[1.125rem] sm:text-sm md:text-lg whitespace-nowrap py-[0.625rem]"
            variant="primary"
          />

          <div
            v-if="searchResults.length"
            class="absolute top-[109%] p-5 z-10 shadow-sm w-[100%] bg-white dark:bg-slate-600 dark:text-white"
          >
            <div class="flex justify-end">
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
                class="mb-3"
                :name="campaign.name"
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
        <div class="flex items-center"><DashboardNotification /></div>
        <div class="flex items-center">
          <DashboardUserMenu
            :name="profile?.fullName || ''"
            :image="profile?.profilePicture || '#'"
            :type="profile?.userType || ''"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import type { Core } from "~/lib/interfaces";

const route = useRoute();

const searchQuery = ref("");
const searchResults = ref<Core.CampaignByName[]>([]);

const routeNameMap: Record<string, any> = {
  CreateCampaign: "Campaign >>> Create a campaign",
  "Campaign Application Influencer": "Campaign Application",
  BrandCampaign: "Campaign",
};

const routeName = computed(
  () =>
    routeNameMap[route.name as string] || tools.capitalize(route.name as string)
);

const profileStore = useProfileStore();
const profile = computed(() => profileStore.$profile);

const api = useAPI();
const { notify } = useNotification();

const { execute: searchForCampaigns, state: searchState } = useRequestState({
  action: (name: string) => api.getCampaignsByName(name, {}),
  onSuccess(response) {
    searchResults.value = response.data;
  },
  onError(error) {
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
</script>
