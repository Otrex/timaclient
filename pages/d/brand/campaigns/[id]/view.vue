<template>
  <div class="p-[1.75rem] pt-[0rem]">
    <template v-if="state === RequestState.LOADING">
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
        <div class="flex justify-center mt-10">
          <UiButtonDefault
            @click="() => confirmEnd?.open()"
            variant="primary"
            class="py-3 px-10"
          >
            End Campaign
          </UiButtonDefault>
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
        :loading="endingState === constants.LOADING"
        @onapprove="endCampaign"
        ref="confirmEnd"
      >
        <template #title>
          <div>End Campaign</div>
        </template>
        <template #body>
          <div>Are you sure you want to end this campaign?</div>
        </template>
      </UiModalConfirmAction>
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
      <UiModalConfirmAction
        :loading="deletingState === constants.LOADING"
        @onapprove="
          () => {
            allowRating = true;
            rateInfluencer?.close();
          }
        "
        ref="rateInfluencer"
      >
        <template #title>
          <div>Rate our Influencer</div>
        </template>
        <template #body>
          <div>
            How would you rate our influencer’s for their performance on the
            Back To School campaign?
          </div>
        </template>
      </UiModalConfirmAction>
      <UtModal
        m-width="31.25rem"
        backdrop-color="rgba(0,0,0,.3)"
        v-model:state="openRateForm"
      >
        <div class="bg-white rounded-lg p-4">
          <div class="flex justify-between">
            <div class="font-semibold text-xl">Rate This Influencer</div>
            <div>
              <X @click="openRateForm = false" class="size-5" />
            </div>
          </div>

          <div class="my-4">HOW WOULD YOU RATE THIS INFLUENCER?</div>

          <div class="flex flex-row gap-3 items-center">
            <div class="size-[3rem]">
              <img
                :src="influencer?.profile.profileImage"
                alt=""
                class="size-[3rem] rounded-full bg-green-400 object-cover"
              />
            </div>
            <div>{{ influencer?.userName }}</div>
          </div>

          <div class="text-center">
            <UiInputStars class="scale-125" v-model="form.rating" :length="5" />
          </div>

          <div class="my-4">
            <textarea
              class="w-full border-2 border-gray-200 rounded-lg p-2"
              placeholder="Write a review"
              v-model="form.review"
            ></textarea>
          </div>

          <div>
            <UiButtonDefault
              variant="primary"
              class="w-full py-2"
              @click="() => rateTheInfluencer()"
              label="Submit"
            />
          </div>
        </div>
      </UtModal>
    </template>
  </div>
</template>

<script setup lang="ts">
import { RequestState } from "~/lib/enums";
import { Core } from "~/lib/interfaces";
import { X } from "lucide-vue-next";

const api = useAPI();
const route = useRoute();
const confirmAccept = ref();
const rateInfluencer = ref();
const openRateForm = ref(false);
const allowRating = ref(false);
const confirmEnd = ref();
const campaign = ref<Core.Campaign | null>(null);
const openShare = ref(false);
const { notify } = useNotification();
const influencer = ref();

provide("allowRating", allowRating);
provide("openRateForm", openRateForm);
provide("influencer", influencer);

const form = reactive({
  rating: 0,
  review: "",
});

const { state } = useRequestState({
  action: () => api.getBrandCampaign(route.params.id as string),
  immediately: true,
  onSuccess: (response) => {
    campaign.value = response.data as any;
  },
});

const { execute: rateTheInfluencer } = useRequestState({
  action: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    }),
  onSuccess: (response) => {
    notify({
      title: "Review submitted",
      text: "Review has been submitted successfully",
      type: "success",
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

const { state: endingState, execute: endCampaign } = useRequestState({
  action: () => api.endCampaign(route.params.id as string),
  onSuccess: (response) => {
    notify({
      title: "Campaign ended",
      text: "Campaign has been ended successfully",
      type: "success",
    });
    rateInfluencer.value?.open();
    // navigateTo({
    //   name: "Campaign",
    // });
  },
  onError(error) {
    notify({
      title: "Review Failed",
      text: error.description,
      type: "error",
    });
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
