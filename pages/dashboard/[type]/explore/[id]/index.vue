<template>
  <div class="p-[1.625rem]">
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
      <div class="mb-[1.25rem] overflow-hidden h-[29.3125rem] relative">
        <button
          style="--tw-ring-opacity: 0.2"
          :class="[
            'absolute active:ring-4 rounded-md  right-[0.75rem] top-[0.75rem]',
            avgColor < 128 ? 'active:ring-slate-100' : 'active:ring-slate-700',
          ]"
        >
          <UtSvg
            name="bookmark"
            :class="[
              'w-[1.5rem] h-[1.5rem]',
              avgColor > 128 ? 'text-black' : 'text-white',
            ]"
          />
        </button>
        <img
          ref="image"
          class="w-full h-full object-cover"
          :src="campaign.creative.thumbnail"
          alt="campaign banner"
        />
      </div>

      <section>
        <h2 class="mb-[1rem] font-bold">Campaign Information</h2>
        <h3 class="mb-[1rem]">
          {{ campaign.overview.name || "Nike" }} Campaign
        </h3>
        <p class="mb-[1.4375rem]">
          {{ campaign.overview.briefDescription }}
        </p>

        <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
          <p class="nl">Campaign website: {{ campaign.overview.website }}</p>
          <p class="nl">
            Planned Budget: {{ campaign.overview.plannedBudget }}
          </p>
          <p class="nl">Cost per post: {{ campaign.overview.costPerPost }}</p>
          <div>
            <p class="nl">Social media platform:</p>
            <div
              v-for="(socials, idx) in campaign.overview.socialMediaPlatforms"
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
            Category: {{ campaign.influencer.influencerCategory.join(", ") }}
          </p>
          <p class="nl">
            Audience size: {{ campaign.influencer.audienceSize.join(", ") }}
          </p>
          <p class="nl">
            Audience gender: {{ campaign.influencer.audienceGender.join(", ") }}
          </p>
          <p class="nl">
            Audience location:
            {{ campaign.influencer.audienceLocation.join(", ") }}
          </p>
        </div>
      </section>

      <section>
        <h2 class="mb-[0.75rem] font-bold">Creatives</h2>
        <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
          <p class="nl">Payment type: {{ campaign.creative.paymentType }}</p>
          <p class="nl">
            Campaign start date: {{ campaign.creative.startDate }}
          </p>
          <p class="nl">Campaign end date: {{ campaign.creative.endDate }}</p>
          <p class="nl">Content type: {{ campaign.creative.contentType }}</p>
          <p class="nl">
            Content placement: {{ campaign.creative.contentPlacement }}
          </p>
          <p class="nl">
            Creative brief: {{ campaign.creative.creativeBrief }}
          </p>
          <p class="nl">Creative tone: {{ campaign.creative.creativeTone }}</p>
          <p class="nl">Campaign rules: {{ campaign.creative.rules }}</p>
          <p class="nl">
            Sample content reference link:
            <a :href="campaign.creative.referenceLink">{{
              campaign.creative.referenceLink
            }}</a>
          </p>
          <p class="nl">
            Campaign objective awareness:
            {{ campaign.creative.awarenessObjective.join(", ") }}
          </p>
          <p class="nl">
            Campaign objective acquisition:
            {{ campaign.creative.acquisitionObjective.join(", ") }}
          </p>
        </div>
      </section>

      <section class="text-center">
        <UiButtonDefault
          @click="
            navigateTo({
              name: 'Explore - Application',
              params: {
                id: $route.params.id,
              },
            })
          "
          variant="primary"
          class="py-[0.75rem] px-[3.75rem]"
          label="Apply to this campaign"
        />
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { GetCampaign } from "~/lib/interfaces/response";

definePageMeta({
  name: "Explore - Campaign",
});

const colorExtract = useImageColorExtract();
const image = ref<HTMLImageElement>();
const avgColor = ref(0);

const api = useAPI();
const route = useRoute();
const campaign = ref<GetCampaign["data"]>();

const { execute: getCampaign, state } = useRequestState({
  action: () => api.getCampaign(route.params.id as string),
  onSuccess: (response) => {
    campaign.value = response.data;
  },
});

async function extractColor() {
  const imageSrc = image.value?.src!;
  image.value!.onload = async () => {
    const value = await colorExtract.getAverageColor(imageSrc);
    avgColor.value = value;
  };
}

onMounted(() => {
  extractColor();
  getCampaign();
});
</script>

<style></style>
