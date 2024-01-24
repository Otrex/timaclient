<template>
  <UiLayoutPreview title="SUMMARY" @next="props.bus?.emit()">
    <div class="flex flex-col gap-3">
      <p>
        Influencer category:
        {{ campaignStore.influencer.influencerCategory?.join(", ") }}
      </p>
      <p>
        Influencer size: {{ campaignStore.influencer.audienceSize?.join(", ") }}
      </p>
      <p>
        Influencer Audience gender:
        {{ campaignStore.influencer.audienceGender?.join(", ") }}
      </p>
      <p>
        Audience age group:
        {{ campaignStore.influencer.audienceAgeGroup?.join(", ") }}
      </p>
      <p>
        Audience location:
        {{ campaignStore.influencer.audienceLocation?.join(", ") }}
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
const emit = defineEmits(["next"]);
</script>

<style></style>
