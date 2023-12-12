<template>
  <svg
    v-if="!checked"
    :class="sizeMap[size || 'lg']"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="$attrs"
  >
    <circle cx="16" cy="16" r="15.5" stroke="#000" />
    <path
      d="M8 16.9693L11.4664 20.4204C12.2931 21.2435 13.6462 21.1895 14.4378 20.3325C18.3973 16.0456 24.5584 10.395 25 10"
      stroke="#000"
      stroke-linecap="round"
    />
  </svg>
  <svg
    v-else
    :class="sizeMap[size || 'lg']"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="$attrs"
  >
    <circle cx="16" cy="16" r="16" fill="#30DE80" />
    <path
      d="M8 16.9693L11.4664 20.4204C12.2931 21.2435 13.6462 21.1895 14.4378 20.3325C18.3973 16.0456 24.5584 10.395 25 10"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ checked?: boolean; size?: "lg" | "sm" }>();

const sizeMap = {
  sm: "w-[20px] h-[20px]",
  lg: "",
};
</script>

<style></style>
