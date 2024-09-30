<template>
  <div class="flex flex-row items-center gap-3">
    <NuxtLink :to="back">
      <svg
        width="26"
        height="15"
        viewBox="0 0 26 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.94612 1.5L1 7.5L6.94612 13.5M25 7.5H1.16653"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </NuxtLink>

    {{ label || "Dashboard" }}
  </div>
</template>
<script setup lang="ts">
defineProps({
  label: String,
  back: String,
});
</script>
