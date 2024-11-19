<template>
  <div class="p-[1.75rem] pt-[0rem]">
    <template v-if="state === constants.LOADING">
      <div class="text-center relative">
        <UtLoaderIndicator
          class="absolute inset-0"
          message="Fetching Campaign"
        />
      </div>
    </template>
    <template v-else-if="!campaign">
      <UtNoResource message="Campaign not found" />
    </template>
    <template v-else>
      <section class="">
        <div class="h-[24.1875rem] rounded w-full overflow-hidden">
          <UiImg
            :src="campaign.banner as string"
            alt="campaign banner"
            class="w-full h-full object-cover object-center"
          />
        </div>

        <div class="flex flex-row justify-between mt-[1.125rem]">
          <div>
            <h3>{{ campaign.campaignName }} Campaign</h3>
            <div class="flex gap-[2rem]">
              <!--
              <p class="sm">34 publications</p> -->
              <p class="sm">34 Influencers</p>
              <p class="sm">
                Date posted:
                {{ tools.timeAgo(new Date(campaign.createdAt || "")) }}
              </p>
            </div>
          </div>
          <div>
            <button
              @click="openShare = true"
              class="bg-[#111] text-white mr-3 text-sm !px-[0.9375rem] rounded-4xl p-[0.625rem]"
            >
              Share Campaign
            </button>
            <button
              @click="confirmAccept.open()"
              class="text-sm bg-slate-200 !px-[0.9375rem] rounded-4xl p-[0.625rem]"
            >
              Delete Campaign
            </button>
          </div>
        </div>
        <p class="nl mt-[0.75rem] text-[#696969] dark:text-slate-100">
          {{ campaign.campaignAbout }}
        </p>

        <div class="mt-[1.625rem]">
          <div
            class="inline-flex px-2 flex-row md:gap-10 gap-3 items-start mb-2 justify-between"
          >
            <UtTabNuxtLink name="ViewBrandCampaignAnalytics">
              Analytics
            </UtTabNuxtLink>
            <UtTabNuxtLink name="ViewbrandCampaignInfluencers">
              Influencers
            </UtTabNuxtLink>
            <UtTabNuxtLink name="ViewbrandCampaignPayments">
              Payments
            </UtTabNuxtLink>
            <UtTabNuxtLink name="ViewBrandCampaignContents">
              Contents
            </UtTabNuxtLink>
          </div>
          <div v-show="campaign">
            <Transition>
              <NuxtPage />
            </Transition>
          </div>
        </div>
      </section>
      <UtModal
        m-width="31.25rem"
        backdrop-color="rgba(0,0,0,.3)"
        v-model:state="openShare"
      >
        <UiModalShare
          :publicId="campaign.campaign_id!"
          :type="constants.CAMPAIGN"
        />
      </UtModal>
      <UiModalConfirmAction
        :loading="deletingState === constants.LOADING"
        @onapprove="deleteCampaign"
        ref="confirmAccept"
      >
        <template #title>
          <div>Delete Campaign</div>
        </template>
        <template #body>
          <div>Are you sure you want to delete this campaign?</div>
        </template>
      </UiModalConfirmAction>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Core } from "~/lib/interfaces";

const api = useAPI();
const route = useRoute();
const confirmAccept = ref();
const campaign = ref<Core.Campaign | null>(null);
const openShare = ref(false);
const { notify } = useNotification();

const { state } = useRequestState({
  action: () => api.getBrandCampaign(route.params.id as string),
  immediately: true,
  onSuccess: (response) => {
    campaign.value = response.data as any;
  },
});

const { state: deletingState, execute: deleteCampaign } = useRequestState({
  action: () => api.deleteCampaign(route.params.id as string),
  onSuccess: (response) => {
    notify({
      title: "Campaign deleted",
      text: "Campaign has been deleted successfully",
      type: "success",
    });
    navigateTo({
      name: "Campaign",
    });
  },
  onError(error) {
    notify({
      title: "Review Failed",
      text: error.description,
      type: "error",
    });
  },
});
</script>

<style></style>
