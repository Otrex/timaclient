<template>
  <UiLayoutPreview title="SUMMARY" :hide-back="true" @next="$emit('next')">
    <div class="flex flex-col gap-3">
      <p><b>Campaign name:</b> {{ campaignStore.overview.name }}</p>
      <p>
        <b>About campaign:</b> {{ campaignStore.overview.briefDescription }}
      </p>
      <p><b>Planned budget:</b> {{ campaignStore.overview.plannedBudget }}</p>
      <p><b>Cost per post:</b> {{ campaignStore.overview.costPerPost }}</p>
      <p>
        <b>Social media platforms:</b>
        {{ campaignStore.overview.socialMediaPlatforms?.join(", ") }}
      </p>
    </div>
  </UiLayoutPreview>
</template>

<script setup lang="ts">
const campaignStore = useCampaignStore();
</script>

<style></style>
