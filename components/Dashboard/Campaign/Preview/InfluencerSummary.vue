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
    @next="$emit('next')"
  >
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
const campaignStore = useCampaignStore();
</script>

<style></style>
