<template>
  <div class="mt-[1.4375rem]">
    <div class="h-[10.625rem] mb-[1.4375rem] w-full overflow-hidden">
      <div
        v-if="!campaignStore.creative.thumbnail"
        class="w-full h-full flex items-center font-extrabold bg-slate-300 justify-center"
      >
        Thumbnail
      </div>
      <UiImg
        v-else
        :src="thumb(campaignStore.creative.thumbnail)"
        alt="logo"
        class="w-full h-full object-cover"
      />
    </div>

    <section>
      <h2 class="mb-[1rem] font-bold">Campaign Information</h2>
      <h3 class="mb-[1rem]">{{ campaignStore.overview.name }} Campaign</h3>
      <p class="mb-[1.4375rem]">
        {{ campaignStore.overview.briefDescription }}
      </p>

      <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
        <p class="nl">Campaign website: {{ campaignStore.overview.website }}</p>
        <p class="nl">
          Planned Budget:
          {{ tools.formatCurrency(campaignStore.overview.plannedBudget || 0) }}
        </p>
        <p class="nl">
          Cost per post:
          {{ tools.formatCurrency(campaignStore.overview.costPerPost || 0) }}
        </p>
        <div>
          <p class="nl">Social media platform:</p>
          <div
            v-for="(media, idx) in campaignStore.overview.socialMediaPlatforms"
            :key="idx"
            class="border inline-flex rounded-md mr-2 items-center justify-center max-w-[3.125rem] p-[0.625rem] border-[--input-border-color]"
          >
            <UtSvg
              :name="tools.resolveSocialsIcon(media)"
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
          Category:
          {{ campaignStore.influencer.influencerCategory?.join(", ") }}
        </p>
        <p class="nl">
          Audience size: {{ campaignStore.influencer.audienceSize?.join(", ") }}
        </p>
        <p class="nl">
          Audience gender:
          {{ campaignStore.influencer.audienceGender?.join(", ") }}
        </p>
        <p class="nl">
          Audience location:
          {{ campaignStore.influencer.audienceLocation?.join(", ") }}
        </p>
      </div>
    </section>

    <section>
      <h2 class="mb-[0.75rem] font-bold">Creatives</h2>
      <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
        <p class="nl">Payment type: {{ campaignStore.creative.paymentType }}</p>
        <p class="nl">
          Campaign start date:
          {{ tools.formatDate(campaignStore.creative.startDate || "") }}
        </p>
        <p class="nl">
          Campaign end date:
          {{ tools.formatDate(campaignStore.creative.endDate || "") }}
        </p>
        <p class="nl">Content type: {{ campaignStore.creative.contentType }}</p>
        <p class="nl">
          Content placement: {{ campaignStore.creative.contentPlacement }}
        </p>
        <p class="nl">
          Creative brief: {{ campaignStore.creative.creativeBrief }}
        </p>
        <p class="nl">
          Creative tone: {{ campaignStore.creative.creativeTone }}
        </p>
        <p class="nl">Campaign rules: {{ campaignStore.creative.rules }}</p>
        <p class="nl">
          Sample content reference link:
          {{ campaignStore.creative.referenceLink }}
        </p>
        <p class="nl">
          Campaign objective awareness:
          {{ campaignStore.creative.awarenessObjective?.join(", ") }}
        </p>
        <p class="nl">
          Campaign objective acquisition:
          {{ campaignStore.creative.acquisitionObjective?.join(", ") }}
        </p>
      </div>
    </section>

    <UiModalSuccessModal
      ref="successModal"
      message="Congratulations! Your campaign has been successfully posted on our platform"
    />
  </div>
</template>

<script setup lang="ts">
import type { UseEventBusReturn } from "@vueuse/core";

const props = defineProps<{
  bus?: UseEventBusReturn<string, any>;
}>();

const campaignStore = useCampaignStore();
const { notify } = useNotification();
const successModal = ref();

const { state, execute } = useRequestState({
  action: () => campaignStore.createCampaign(),
  onSuccess: () => {
    successModal.value.open();

    setTimeout(() => {
      successModal.value.close();
      navigateTo({
        name: "BrandCampaign",
      });
    }, 5000);
  },
  onError: (error) => {
    notify({
      type: "error",
      text: error.description,
      title: error.title,
    });

    setTimeout(() => {
      navigateTo({
        query: { tab: constants.BRAND_OVERVIEW },
      });
    }, 1000);
  },
});

props.bus?.on(() => {
  execute();
});

const appCfg = useAppConfig();

const thumb = (img: string) => `${appCfg.thumbnailBaseUrl}/${img}`;
</script>

<style></style>
