<template>
  <div
    class="bg-white rounded-lg border border-gray-100 overflow-hidden hover:border-gray-200 transition-all duration-300"
  >
    <img
      :src="campaign?.campaign.banner || 'https://via.placeholder.com/400'"
      alt="Campaign Banner"
      class="w-full h-48 object-cover"
    />

    <div class="p-6">
      <div class="flex justify-between mb-3 items-center">
        <h2
          class="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
        >
          {{ campaign?.campaign.campaignName || "Untitled Campaign" }}
        </h2>

        <span
          class="inline-flex px-2 py-1 rounded-full text-xs font-semibold"
          :class="{
            'bg-amber-100 text-amber-700': status === 'PENDING',
            'bg-emerald-100 text-emerald-700': status === 'APPROVED',
            'bg-red-100 text-red-700': status === 'DECLINED',
            'bg-gray-100 text-gray-700': !status,
          }"
        >
          {{ status || "N/A" }}
        </span>
      </div>
      <p class="text-gray-600 text-sm mb-3 leading-relaxed">
        {{
          tools.truncate(
            campaign?.campaign.campaignAbout || "No description available.",
            100
          )
        }}
      </p>

      <div class="flex flex-wrap gap-2 mb-5">
        <span
          v-for="platform in campaign.socialMediaPlatform || []"
          :key="platform"
          class="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
        >
          {{ platform }}
        </span>
      </div>

      <div class="text-sm text-gray-700 mb-5 space-y-2">
        <p class="flex items-center">
          <strong class="min-w-[120px]">Budget:</strong>
          <span>{{
            tools.formatCurrency(+campaign?.campaign.planningBudget) || "N/A"
          }}</span>
        </p>
        <p class="flex items-center">
          <strong class="min-w-[120px]">Content Type:</strong>
          <span>{{
            (campaign?.campaign.contentType &&
              campaign?.campaign.contentType.join(", ")) ||
            "N/A"
          }}</span>
        </p>
        <p class="flex items-center">
          <strong class="min-w-[120px]">Start Date:</strong>
          <span>{{ campaign?.campaign.startDate || "N/A" }}</span>
        </p>
        <p class="flex items-center">
          <strong class="min-w-[120px]">End Date:</strong>
          <span>{{ campaign?.campaign.endDate || "N/A" }}</span>
        </p>
      </div>

      <div class="flex gap-3">
        <a
          :href="campaign?.campaign.referenceLink || '#'"
          target="_blank"
          class="text-sm text-blue-500 hover:text-blue-600 transition-colors hover:underline"
        >
          View Reference
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "vue";

const props = defineProps({
  campaign: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "PENDING",
  },
});

const { campaign, status } = toRefs(props);
</script>

<style>
body {
  background-color: #f9fafb;
}
</style>
