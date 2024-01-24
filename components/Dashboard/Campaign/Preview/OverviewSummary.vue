<template>
  <UiLayoutPreview title="SUMMARY" @next="props.bus?.emit()">
    <div class="flex flex-col gap-3">
      <p>Campaign name: {{ campaignStore.overview.name }}</p>
      <p>About campaign: {{ campaignStore.overview.briefDescription }}</p>
      <p>Planned budget: {{ campaignStore.overview.plannedBudget }}</p>
      <p>Cost per post: {{ campaignStore.overview.costPerPost }}</p>
      <p>
        Social media platforms:
        {{ campaignStore.overview.socialMediaPlatforms?.join(", ") }}
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
