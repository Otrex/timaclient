<template>
  <span
    class="text-center inline-block text-sm capitalize py-2.5 px-5 rounded-3xl"
    :class="[color, sizeClass]"
  >
    {{ status }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: string;
  size?: "sm" | "md" | "lg";
}>();

const color = computed(() => {
  switch (props.status) {
    case "active":
    case "ongoing":
      return "text-green-600 bg-green-100";
    case "inactive":
      return "text-red-600";
    case "pending":
      return "text-yellow-600";
    case "completed":
      return "text-green-600";
    case "rejected":
      return "text-red-600";
    case "approved":
      return "text-green-600";
    case "pending_approval":
      return "text-yellow-600";
    case "pending_payment":
      return "text-yellow-600";
    case "pending_review":
      return "text-yellow-600";
    case "pending_approval_payment":
      return "text-yellow-600";
    default:
      return "bg-gray-200";
  }
});

const sizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "text-xs py-1.5 px-3";
    case "lg":
      return "text-base py-3 px-6";
    case "md":
    default:
      return "text-sm py-2.5 px-5";
  }
});
</script>

<style></style>
