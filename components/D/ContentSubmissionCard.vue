<template>
  <div class="rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800">
    <img class="w-full" :src="item.campaignInfo.banner" alt="Campaign Banner" />
    <div class="px-6 py-4 flex flex-row justify-between items-start">
      <div>
        <div class="font-bold text-xl mb-0.5 dark:text-white">
          {{ item.campaignInfo.campaignName }}
        </div>
        <p class="text-gray-700 dark:text-gray-300 text-base">
          {{ item.campaignInfo.creativeBrief }}
        </p>
      </div>

      <div>
        <div class="flex items-center mt-4">
          <span
            class="w-3 h-3 rounded-full mr-2"
            :class="{
              'bg-green-500': item.contentStatus?.toLowerCase() === 'approved',
              'bg-red-500': item.contentStatus?.toLowerCase() === 'rejected',
              'bg-yellow-500': item.contentStatus?.toLowerCase() === 'pending',
            }"
          >
          </span>
          <span class="text-sm text-gray-600 dark:text-gray-400">
            {{
              item.contentStatus.charAt(0).toUpperCase() +
              item.contentStatus.slice(1)
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="px-6 pt-4 pb-2">
      <span
        v-for="category in item.campaignInfo.category"
        :key="category"
        class="inline-block bg-gray-100 dark:bg-gray-700 border dark:border-gray-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2"
      >
        #{{ category }}
      </span>
    </div>
    <div class="px-6 py-4">
      <button
        @click="openContentLink(item.contentLink)"
        class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 font-medium underline"
      >
        View Content
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});
const openContentLink = (link: string) => {
  window.open(link, "_blank");
};
</script>
