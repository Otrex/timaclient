<template>
  <div
    :class="statusClass"
    class="px-2.5 py-1 rounded-full inline-block text-center text-sm font-medium"
  >
    {{ status }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  status: "Active" | "Expired" | "Due" | "Canceled" | string;
}

const props = defineProps<Props>();

// Define the class based on the status
const statusClass = computed(() => {
  switch (props.status) {
    case "Active":
      return "bg-green-100 text-green-700";
    case "Expired":
      return "bg-red-100 text-red-700";
    case "Due":
      return "bg-blue-100 text-blue-700";
    case "Canceled":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
});
</script>

<style scoped>
/* Add additional styling if necessary */
</style>
