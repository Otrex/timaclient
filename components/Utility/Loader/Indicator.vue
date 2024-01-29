<template>
  <div class="text-center">
    <UtSvg name="sunshine" class="spinner w-[1.5rem] h-[1.5rem]" />
    {{ message }}
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: "Fetching Your Data",
  }
);
</script>

<style></style>
