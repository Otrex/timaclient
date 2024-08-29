<template>
  <div class="flex flex-row items-center gap-4">
    <div>
      <UiImg src="" class="w-10 h-10 rounded-full" alt="image" />
    </div>
    <div class="text-[#545454]">
      <p>{{ title }}</p>
      <p class="text-sm">{{ sub }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  sub: {
    type: String,
  },
});
</script>

<style></style>
