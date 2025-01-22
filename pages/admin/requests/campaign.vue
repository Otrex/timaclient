<template>
  <NuxtLayout name="admin">
    <template #main>
      <div>
        <transition mode="out-in">
          <div class="text-center relative" v-if="state === constants.LOADING">
            <UtLoaderIndicator
              class="absolute inset-0"
              message="Fetching Campaign"
            />
          </div>
          <div class="h-[400px]" v-else-if="!campaign">
            <div>
              <UtNoResource
                message="Campaign not found"
                style="--height: 400px"
              />
            </div>
          </div>
          <div v-else>
            <div class="mb-[1.25rem] overflow-hidden h-[20rem] relative">
              <button
                style="--tw-ring-opacity: 0.2"
                :class="[
                  'absolute active:ring-4 rounded-md  right-[0.75rem] top-[0.75rem]',
                ]"
              >
                <UtSvg name="bookmark" :class="['w-[1.5rem] h-[1.5rem]']" />
              </button>
              <UiImg
                ref="image"
                class="w-full h-full object-cover"
                :src="campaign.banner"
                alt="campaign banner"
              />
            </div>

            <section>
              <h2 class="mb-[1rem] font-bold">Campaign Information</h2>
              <h3 class="mb-[1rem]">
                {{ campaign.campaignName || "Nike" }}
              </h3>
              <p class="mb-[1.4375rem]">
                {{ campaign.campaignObjective }}
              </p>

              <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
                <p class="nl">
                  <b>Campaign website:</b> {{ campaign.website }}
                </p>
                <p class="nl">
                  <b>Planned Budget:</b>
                  {{ tools.formatCurrency(campaign?.budget) }}
                </p>
                <div>
                  <p class="nl"><b>Social media platform:</b></p>
                  <div
                    v-for="(socials, idx) in campaign.socialMediaPlatform"
                    :key="idx"
                    class="border inline-flex rounded-md mr-2 items-center justify-center max-w-[3.125rem] p-[0.625rem] border-[--input-border-color]"
                  >
                    <UtSvg
                      :name="tools.resolveSocialsIcon(socials)"
                      class="h-[1.3125rem] max-w-[1.9375rem]"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section class="mb-[1.75rem]">
              <h2 class="mb-[0.75rem] font-bold">Influencer requirement</h2>
              <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
                <p class="nl">
                  <b>Category:</b>
                  {{ campaign.category.join(", ") }}
                </p>
                <p class="nl">
                  <b>Audience size:</b>
                  {{ campaign.audienceSize.join(", ") }}
                </p>
                <p class="nl">
                  <b>Audience gender:</b>
                  {{ campaign.audienceGender.join(", ") }}
                </p>
                <p class="nl">
                  <b>Audience location:</b>
                  {{ campaign.audienceLocation.join(", ") }}
                </p>
              </div>
            </section>

            <section>
              <h2 class="mb-[0.75rem] font-bold">Creatives</h2>
              <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
                <p class="nl">
                  <b>Campaign start date:</b> {{ campaign.startDate }}
                </p>
                <p class="nl">
                  <b>Campaign end date:</b> {{ campaign.endDate }}
                </p>
                <p class="nl">
                  <b>Content type:</b> {{ campaign.contentType }}
                </p>
                <p class="nl">
                  <b>Content placement:</b>
                  {{ campaign.contentPlacement }}
                </p>
                <p class="nl">
                  <b>Creative brief:</b> {{ campaign.creativeBrief }}
                </p>
                <p class="nl">
                  <b>Creative tone:</b> {{ campaign.creativeTone }}
                </p>
                <p class="nl">
                  <b>Campaign rules:</b> {{ campaign.campaignRule }}
                </p>
                <p class="nl">
                  <b>Sample content reference link:</b>
                  <a :href="campaign.referenceLink">{{
                    campaign.referenceLink
                  }}</a>
                </p>
                <p class="nl">
                  <b>Campaign objective awareness:</b>
                  {{ campaign.campaignObjectiveAwareness.join(", ") }}
                </p>
                <p class="nl">
                  <b>Campaign objective acquisition:</b>
                  {{ campaign.campaignObjectiveAcquisition.join(", ") }}
                </p>
              </div>
            </section>

            <section class="text-center flex gap-3 items-center justify-center">
              <UiButtonDefault
                variant="info-outline"
                :loading="reviewing == RequestState.LOADING"
                :disabled="reviewing == RequestState.LOADING"
                @click="() => review('DECLINED')"
                class="text-gray-700 border-gray-700 !px-8 rounded-3xl !py-2.5"
              >
                Decline
              </UiButtonDefault>
              <UiButtonDefault
                variant="primary"
                class="py-[0.75rem] px-[7rem]"
                label="Accept"
                :loading="reviewing == RequestState.LOADING"
                :disabled="reviewing == RequestState.LOADING"
                @click="() => review('APPROVED')"
              />
            </section>
          </div>
        </transition>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { RequestState } from "~/lib/enums";
import type {
  AdminCampaignResponse,
  GetCampaign,
} from "~/lib/interfaces/response";

definePageMeta({
  name: "admin.requests.campaign",
});

const campaign = ref<AdminCampaignResponse["data"]>();
const route = useRoute();
const api = useAPI();
const { notify } = useNotification();

const { execute: getCampaign, state } = useRequestState({
  immediately: true,
  action: () => api.viewAdminCampaign(route.query.id as string),
  onSuccess: (response) => {
    campaign.value = response.data;
  },
  onError: (error: any) => {
    console.log(error);
  },
});

const { state: reviewing, execute: review } = useRequestState({
  immediately: false,
  action: (review: "APPROVED" | "DECLINED") =>
    api.reviewCampaign(route.query.id as string, {
      review: review,
    }),
  onSuccess: (response) => {
    notify({
      type: "success",
      text: "Campaign has been reviewed",
      title: "Success!!",
    });
  },
  onError: (error: any) => {
    console.log(error);
  },
});
</script>

<style></style>
