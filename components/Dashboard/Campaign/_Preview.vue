<template>
  <div class="mt-[1.4375rem]">
    <div class="h-[10.625rem] mb-[1.4375rem] w-full overflow-hidden">
      <div
        v-if="!campaignStore.newCampaign.banner"
        class="w-full h-full flex items-center font-extrabold bg-slate-300 justify-center"
      >
        Thumbnail
      </div>
      <UiImg
        v-else
        :src="tools.toObjectURL(campaignStore.newCampaign.banner)"
        alt="logo"
        class="w-full h-full object-cover"
      />
    </div>

    <section>
      <h2 class="mb-[1rem] font-bold">Campaign Information</h2>
      <h3 class="mb-[1rem]">
        {{ campaignStore.newCampaign.campaignName }} Campaign
      </h3>
      <p class="mb-[1.4375rem]">
        {{ campaignStore.newCampaign.campaignAbout }}
      </p>

      <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
        <p class="nl">
          Campaign website: {{ campaignStore.newCampaign.campaignWebsite }}
        </p>
        <p class="nl">
          Planned Budget:
          {{
            tools.formatCurrency(+campaignStore.newCampaign.planningBudget || 0)
          }}
        </p>
        <!-- <p class="nl">
          Cost per post:
          {{ tools.formatCurrency(campaignStore.overview.costPerPost || 0) }}
        </p> -->
        <div>
          <p class="nl">Social media platform:</p>
          <div
            v-for="(media, idx) in campaignStore.newCampaign
              .socialMediaPlatform"
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
          {{ campaignStore.newCampaign.category?.join(", ") }}
        </p>
        <p class="nl">
          Audience size:
          {{ campaignStore.newCampaign.audienceSize?.join(", ") }}
        </p>
        <p class="nl">
          Audience gender:
          {{ campaignStore.newCampaign.audienceGender?.join(", ") }}
        </p>
        <p class="nl">
          Audience location:
          {{ campaignStore.newCampaign.audienceLocation?.join(", ") }}
        </p>
      </div>
    </section>

    <section>
      <h2 class="mb-[0.75rem] font-bold">Creatives</h2>
      <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
        <!-- <p class="nl">Payment type: {{ campaignStore.creative.paymentType }}</p> -->
        <p class="nl">
          Campaign start date:
          {{ tools.formatDate(campaignStore.newCampaign.startDate || "") }}
        </p>
        <p class="nl">
          Campaign end date:
          {{ tools.formatDate(campaignStore.newCampaign.endDate || "") }}
        </p>
        <p class="nl">
          Content type: {{ campaignStore.newCampaign.contentType }}
        </p>
        <p class="nl">
          Content placement: {{ campaignStore.newCampaign.contentPlacement }}
        </p>
        <p class="nl">
          Creative brief: {{ campaignStore.newCampaign.creativeBrief }}
        </p>
        <p class="nl">
          Creative tone: {{ campaignStore.newCampaign.creativeTone }}
        </p>
        <p class="nl">
          Campaign rules: {{ campaignStore.newCampaign.campaignRule }}
        </p>
        <p class="nl">
          Sample content reference link:
          {{ campaignStore.newCampaign.referenceLink }}
        </p>
        <p class="nl">
          Campaign objective awareness:
          {{
            typeof campaignStore.newCampaign.campaignObjectiveAwareness ==
            "string"
              ? campaignStore.newCampaign.campaignObjectiveAwareness
              : campaignStore.newCampaign.campaignObjectiveAwareness?.join(", ")
          }}
        </p>
        <p class="nl">
          Campaign objective acquisition:
          {{ campaignStore.newCampaign.campaignObjectiveAcquisition }}
        </p>
      </div>
    </section>

    <UiModalLoading ref="loadingModal" message="Submitting campaign..." />

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
const loadingModal = ref();

const { state, execute } = useRequestState({
  action: async () => {
    loadingModal.value.open();
    campaignStore.createCampaign();
  },
  onSuccess: () => {
    loadingModal.value.close();
    successModal.value.open();

    setTimeout(() => {
      successModal.value.close();
      navigateTo({
        name: "DashboardBrandCampaigns",
      });
    }, 5000);
  },
  onError: (error) => {
    console.log(error);
    loadingModal.value.close();

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

props.bus?.on((message) => {
  if (message === "SUBMIT" && state.value !== constants.LOADING) {
    execute();
  }
});
</script>

<style></style>
