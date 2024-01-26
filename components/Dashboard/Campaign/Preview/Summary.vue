<template>
  <UiLayoutPreview title="PREVIEW THE CAMPAIGN" @next="props.bus?.emit()">
    <div>
      <p class="mb-[2.5rem]">
        Congrats on reaching the preview page! Your campaign is almost ready to
        launch.
      </p>

      <div>
        <div class="flex flex-row items-center mb-[0.75rem] justify-between">
          <div>
            <p>General settings</p>
            <p class="sm">Complete</p>
          </div>
          <div>
            <UiSvgCheck checked size="sm" />
          </div>
        </div>

        <div class="flex flex-row items-center mb-[0.75rem] justify-between">
          <div>
            <p>Influencers</p>
            <p class="sm">Complete</p>
          </div>
          <div>
            <UiSvgCheck checked size="sm" />
          </div>
        </div>

        <div class="flex flex-row items-center mb-[0.75rem] justify-between">
          <div>
            <p>Creative</p>
            <p class="sm">Complete</p>
          </div>
          <div>
            <UiSvgCheck checked size="sm" />
          </div>
        </div>

        <div class="flex flex-row items-center mb-[0.75rem] justify-between">
          <div>
            <p>Preview</p>
            <p class="sm">Complete</p>
          </div>
          <div>
            <UiSvgCheck checked size="sm" />
          </div>
        </div>
      </div>
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
