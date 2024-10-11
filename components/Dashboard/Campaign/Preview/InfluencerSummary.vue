<template>
  <UiLayoutPreview
    title="SUMMARY"
    @back="
      navigateTo({
        query: {
          tab: constants.BRAND_OVERVIEW,
        },
      })
    "
    @next="props.bus?.emit('INFLUENCER_SUMMARY')"
  >
    <div class="flex flex-col gap-3">
      <p>
        Influencer category:
        {{ campaignStore.newCampaign.category?.join(", ") }}
      </p>
      <p>
        Influencer size:
        {{ campaignStore.newCampaign.audienceSize?.join(", ") }}
      </p>
      <p>
        Influencer Audience gender:
        {{ campaignStore.newCampaign.audienceGender?.join(", ") }}
      </p>
      <p>
        Audience age group:
        {{ campaignStore.newCampaign.audienceAgeGroup?.join(", ") }}
      </p>
      <p>
        Audience location:
        {{ campaignStore.newCampaign.audienceLocation?.join(", ") }}
      </p>
    </div>
  </UiLayoutPreview>
</template>

<script setup lang="ts">
import type { UseEventBusReturn } from "@vueuse/core";

const props = defineProps<{
  bus?: UseEventBusReturn<string, any>;
}>();

const campaignStore = useCampaignStore();
</script>

<style></style>
