<template>
  <div class="flex items-center justify-center space-x-2">
    <button
      @click="prevPage"
      :disabled="currentPage === 1 || disabled"
      class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 mr-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      Prev
    </button>

    <template v-for="page in visiblePages" :key="page">
      <button
        @click="goToPage(page)"
        :disabled="disabled"
        :class="[
          'px-3 py-2 text-sm font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
          currentPage === page
            ? '!bg-red-600 text-white border-indigo-600'
            : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50',
        ]"
      >
        {{ page }}
      </button>
    </template>

    <button
      @click="nextPage"
      :disabled="currentPage === totalPages || disabled"
      class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 ml-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
  },
  total: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:currentPage"]);

const totalPages = computed(() => {
  return Math.ceil(props.total / props.limit);
});

const visiblePages = computed(() => {
  const maxVisiblePages = 7;
  let start = Math.max(1, props.currentPage - Math.floor(maxVisiblePages / 2));
  let end = Math.min(totalPages.value, start + maxVisiblePages - 1);

  if (end - start + 1 < maxVisiblePages) {
    start = Math.max(1, end - maxVisiblePages + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const prevPage = () => {
  if (props.currentPage > 1) {
    emit("update:currentPage", props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit("update:currentPage", props.currentPage + 1);
  }
};

const goToPage = (page) => {
  emit("update:currentPage", page);
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

button {
  margin: 0 0.25rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}
</style>
