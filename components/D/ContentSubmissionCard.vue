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
              'bg-red-500': item.contentStatus?.toLowerCase() === 'declined',
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
    <div
      v-if="item.contentStatus?.toLowerCase() != 'declined'"
      class="px-6 py-4"
    >
      <button
        @click="openContentLink(item.contentLink)"
        class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 font-medium underline"
      >
        View Content
      </button>
    </div>
    <div v-else class="px-6 py-4">
      <button
        @click="openRejectionModal = true"
        class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 font-medium underline"
      >
        Reason for Rejection
      </button>
    </div>

    <UtModal
      v-model:state="openRejectionModal"
      backdrop-color="rgba(0, 0, 0, 0.5)"
    >
      <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-sm mx-auto">
        <div class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Reason for Rejection
        </div>
        <div class="text-gray-700 dark:text-gray-300">
          {{ item.rejectionReason }}
        </div>
        <div class="mt-6 flex justify-end">
          <UiButtonDefault
            variant="primary"
            label="Close"
            @click="openRejectionModal = false"
          />
        </div>
      </div>
    </UtModal>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const openRejectionModal = ref(false);
const openContentLink = (link: string) => {
  window.open(link, "_blank");
};
</script>
