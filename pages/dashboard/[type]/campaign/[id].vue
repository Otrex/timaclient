<template>
  <div class="p-[1.75rem]">
    <template v-if="state === constants.LOADING">
      <div class="text-center">
        <UtSvg name="sunshine" class="spinner w-[1.5rem] h-[1.5rem]" />
        Fetching Campaign
      </div>
    </template>
    <template v-else-if="!campaign">
      <div>404 (No campaign found)</div>
    </template>
    <template v-else>
      <div class="flex justify-end">
        <!-- <div>
          <UiButtonDefault
            p="0.625rem"
            class="mr-[0.75rem]"
            variant="info-outline"
            label="Edit publications"
          />
          <UiButtonDefault variant="info" label="Add Publications" p="0.625rem" />
        </div> -->
      </div>
      <section class="mt-[0.75rem]">
        <div class="h-[24.1875rem] w-full overflow-hidden">
          <img
            :src="campaign?.creative.thumbnail"
            alt="campaign banner"
            class="w-full h-full object-cover object-center"
          />
        </div>

        <div class="flex flex-row justify-between mt-[1.125rem]">
          <div>
            <h3>{{ campaign?.overview.name }} Campaign</h3>
            <div class="flex gap-[2rem]">
              <!--
              <p class="sm">34 publications</p>
              <p class="sm">34 Influencers</p>
              -->
              <p class="sm">
                Date posted:
                {{ tools.timeAgo(new Date(campaign.createdOn || "")) }}
              </p>
            </div>
          </div>
          <div>
            <button
              @click="openShare = true"
              class="bg-[#111] text-white px-[0.9375rem] rounded-lg p-[0.625rem]"
            >
              Share Campaign
            </button>
          </div>
        </div>
        <p class="nl mt-[0.75rem] text-[#696969] dark:text-slate-100">
          {{ campaign.overview.briefDescription }}
        </p>

        <div class="mt-[1.625rem]">
          <UiTab
            :menu-items="tabs"
            class="w-full"
            @change="tabChange"
            :default-tab="constants.CAMPAIGN_INFLUENCERS"
          />
        </div>
      </section>
      <UtModal
        m-width="31.25rem"
        backdrop-color="rgba(0,0,0,.3)"
        v-model:state="openShare"
      >
        <UiModalShare />
      </UtModal>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { GetCampaign } from "~/lib/interfaces/response";

definePageMeta({
  name: "Campaign",
});

const api = useAPI();
const route = useRoute();
const campaign = ref<GetCampaign["data"]>();

const { execute: getCampaign, state } = useRequestState({
  action: () => api.getCampaign(route.params.id as string),
  onSuccess: (response) => {
    campaign.value = response.data;
  },
});

onMounted(() => {
  getCampaign();
});

const openShare = ref(false);

const tabs = [
  {
    name: constants.CAMPAIGN_ANALYTICS,
    component: resolveComponent("LazyDashboardCampaignUserAnalytics"),
    label: "Analytics",
  },
  {
    name: constants.CAMPAIGN_INFLUENCERS,
    component: resolveComponent("LazyDashboardCampaignUserInfluencers"),
    label: "Influencers",
  },
  {
    name: constants.CAMPAIGN_PAYMENT,
    component: resolveComponent("LazyDashboardCampaignUserPayment"),
    label: "Payments",
  },
];

const currentTab = ref();

function tabChange(tab: string) {
  currentTab.value = tab;
}

const src =
  "https://s3-alpha-sig.figma.com/img/8fe6/8571/c8e53c81e59e8694df607a6bf3018436?Expires=1703462400&Signature=FJ6hEMq~uLydgv0fRwBCDCdZnGbOawNY1DNYkKlF2LO2TygXq7C9S6Rc9GYprDWaW83ZAhCIxJKPxKkUD6afauKYoV1hrUpsDpIH0n43Ntu9C6YhmOYyH-d2C7Qu22q0VSK-soA6qp3gJ6MxYjuUIujcu-K1q9MVojFOQijGsqTXVLCZKIpOx3nrIR4C-wcpCRyM~MHIX9wphPH9LJRe-SSTxYPxjLt9EpOYHhKjuQOUyL~tz4fYEHQek2pc21yZyqjigMq9an9i1kVnsS6KnNsE7cRZ9DOtj62gYnG8DeIK0sYWnNDmOBFhKb2JvApSOUXDphrh23JGgtX4e~t~DQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";
</script>

<style></style>
