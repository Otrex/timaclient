<template>
  <UiLayoutPreview
    title="SUMMARY"
    @back="
      navigateTo({
        query: {
          tab: constants.BRAND_INFLUENCERS,
        },
      })
    "
    @next="props.bus?.emit()"
  >
    <div class="flex flex-col gap-3">
      <p>Payment type: {{ creative.paymentType }}</p>
      <p>
        Campaign duration:
        {{ calculateDuration(creative.startDate, creative.endDate) }}
      </p>
      <p>
        Campaign start date:
        {{ creative.startDate && tools.formatDate(creative.startDate) }}
      </p>
      <p>
        Campaign end date:
        {{ creative.endDate && tools.formatDate(creative.endDate) }}
      </p>
      <p>Content type: {{ creative.contentType }}</p>
      <p>Content placement: {{ creative.contentPlacement }}</p>
      <p>Creative brief: {{ creative.creativeBrief }}</p>
      <p>Creative tone: {{ creative.creativeTone }}</p>
      <p>Campaign rules: {{ creative.rules }}</p>
      <p>Sample content link: {{ creative.referenceLink }}</p>
      <p>Awareness: {{ creative.awarenessObjective?.join(", ") }}</p>
      <p>Acquisition: {{ creative.acquisitionObjective?.join(", ") }}</p>
      <p>Thumbnail: {{ creative.thumbnail }}</p>
    </div>
  </UiLayoutPreview>
</template>

<script setup lang="ts">
import type { UseEventBusReturn } from "@vueuse/core";

const props = defineProps<{
  bus?: UseEventBusReturn<string, any>;
}>();

const campaignStore = useCampaignStore();

function calculateDuration(start?: string | Date, end?: string | Date) {
  if (!start) return "";

  const startDate = new Date(start!) as any;
  const endDate = new Date(end!) as any;

  const difference = Math.abs(startDate - endDate);
  if (Number.isNaN(difference)) return "Infinite";

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 365) {
    const years = Math.floor(days / 365);
    return `In ${years} year${years !== 1 ? "s" : ""} time`;
  } else if (days > 30) {
    const months = Math.floor(days / 30);
    return `In ${months} month${months !== 1 ? "s" : ""} time`;
  } else if (days > 0) {
    return `In ${days} day${days !== 1 ? "s" : ""} time`;
  } else if (hours > 0) {
    return `In ${hours} hour${hours !== 1 ? "s" : ""} time`;
  } else if (minutes > 0) {
    return `In ${minutes} minute${minutes !== 1 ? "s" : ""} time`;
  } else {
    return `In ${seconds} second${seconds !== 1 ? "s" : ""} time`;
  }
}

const creative = computed(() => campaignStore.campaign.creative);
</script>

<style></style>
