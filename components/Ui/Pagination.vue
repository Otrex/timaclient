<template>
  <div class="flex items-center text-base space-x-2">
    <!-- Previous Button -->
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed"
    >
      &larr;
    </button>

    <!-- Page Numbers -->
    <template v-for="page in visiblePages" :key="page">
      <button
        v-if="page !== '...'"
        @click="goToPage(page)"
        :class="[
          'px-3 py-1 rounded-md font-medium',
          currentPage === page
            ? 'bg-orange-100 text-orange-700'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200',
        ]"
      >
        {{ page }}
      </button>
      <span v-else class="px-3 py-1 text-gray-400">...</span>
    </template>

    <!-- Next Button -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed"
    >
      &rarr;
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Props for the component
interface Props {
  totalPages: number; // Total number of pages
  modelValue: number; // Current page (v-model)
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

// Current page synced with v-model
const currentPage = computed({
  get: () => props.modelValue,
  set: (value: number) => emit("update:modelValue", value),
});

// Function to go to a specific page
const goToPage = (page: number | string) => {
  if (+page >= 1 && +page <= props.totalPages) {
    currentPage.value = +page;
  }
};

// Compute the visible pages based on the current page and total pages
const visiblePages = computed(() => {
  if (props.totalPages <= 6) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1);
  }

  const pages: Array<number | string> = [];
  pages.push(1);

  if (currentPage.value > 3) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage.value - 1);
  const end = Math.min(props.totalPages - 1, currentPage.value + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage.value < props.totalPages - 2) {
    pages.push("...");
  }

  pages.push(props.totalPages);

  return pages;
});
</script>

<style scoped>
/* Add additional styles here if necessary */
</style>
