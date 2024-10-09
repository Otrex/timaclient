<template>
  <UiLayoutPreview
    title="SUMMARY"
    :hide-back="true"
    @next="props.bus?.emit('OVERVIEW')"
  >
    <div class="flex flex-col gap-3">
      <p><b>Campaign name:</b> {{ campaignStore.newCampaign.campaignName }}</p>
      <p>
        <b>About campaign:</b> {{ campaignStore.newCampaign.campaignAbout }}
      </p>
      <p>
        <b>Planned budget:</b> {{ campaignStore.newCampaign.planningBudget }}
      </p>
      <!-- <p><b>Cost per post:</b> {{ campaignStore.overview.costPerPost }}</p> -->
      <p>
        <b>Social media platforms:</b>
        {{ campaignStore.newCampaign.socialMediaPlatform?.join(", ") }}
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
