<template>
  <div
    :style="icolor"
    class="bg-[#F7F7F7] border-l-[10px] border-[--icolor] rounded-2xl flex justify-between p-6 min-h-[72px]"
  >
    <div>
      <h1 class="text-xl font-bold text-[#898989]">{{ label }}</h1>
    </div>

    <div>
      <h1 class="text-[32px] font-medium text-[#434343]">{{ value }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: string;
  indicator?: string;
}>();

const icolor = computed(() => {
  return `--icolor: ${props.indicator || "#3CC75B"} `;
});
</script>

<style></style>
