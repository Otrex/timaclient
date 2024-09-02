<template>
  <span :class="['inline-flex px-5 py-2 !capitalize rounded-[30px]', color]">
    {{ status.toLowerCase() }}
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{ status: string }>();
const color = computed(() => {
  if (props.status === "ACCEPTED") return "bg-[#2DBA62] text-white";
  if (props.status === "PENDING") return "bg-[#FFCA5B] text-white";
  if (props.status === "REJECTED") return "bg-[#EC2B29] text-white";

  return "bg-gray-300 text-gray-700";
});
</script>

<style></style>
