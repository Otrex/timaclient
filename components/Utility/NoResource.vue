<template>
  <div class="text-center">{{ message }}</div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ message?: string }>(), {
  message: "No Resources available",
});
</script>

<style></style>
