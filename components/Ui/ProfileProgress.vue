<template>
  <div class="inline-block max-w-[9.375rem] w-full">
    <div class="w-full h-[10px] overflow-hidden rounded-md bg-[#E0E0E0]">
      <div
        class="bg-[#30DE80] w-[--width] h-full rounded-md"
        :style="`--width: ${percent}%`"
      >
        &nbsp;
      </div>
    </div>
    <div class="text-left text-sm text-[#545454]">{{ percent }}% Complete</div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  percent: {
    type: Number,
    default: 0,
  },
});
</script>

<style></style>
