<template>
  <div
    class="border border-gray-300 dark:bg-gray-800 dark:border-gray-600 overflow-clip min-h-[9.1875rem] shadow-sm rounded-2xl flex gap-3 justify-between flex-col bg-white"
    :class="[!link && 'p-4']"
  >
    <div
      class="flex flex-col justify-between h-full"
      :class="link ? ' px-4 py-4' : 'h-full min-h-[7.187rem] '"
    >
      <h3 class="text-sm font-medium text-[#667185] mb-2">{{ title }}</h3>
      <p class="text-2xl font-bold mb-2">{{ value }}</p>
      <p v-if="description" class="text-sm text-gray-500">
        {{ description }}
      </p>
    </div>
    <a
      v-if="link"
      href="#"
      class="py-2 flex items-center justify-between bg-[#F9FAFB] dark:bg-gray-700 px-4"
    >
      <span
        class="text-blue-500 dark:text-blue-200 text-sm font-medium hover:underline"
      >
        {{ link }}
      </span>

      <ChevronRight class="size-5 dark:text-blue-200 text-blue-500" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
interface Props {
  title: string;
  value: string;
  description?: string;
  link?: string;
}

defineProps<Props>();
</script>

<style></style>
