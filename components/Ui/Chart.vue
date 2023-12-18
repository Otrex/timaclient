<template>
  <div class="inline-block" :key="key">
    <apexchart
      :width="200"
      :height="200"
      :type="type"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script setup lang="ts">
import type { ApexOptions } from "apexcharts";
defineProps<{
  type:
    | "line"
    | "area"
    | "bar"
    | "histogram"
    | "pie"
    | "donut"
    | "radialBar"
    | "rangeBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "radar"
    | "polarArea";
  options: ApexOptions;
  series: Record<string, any>[] | string[];
}>();

const key = ref(0);
onMounted(() => {
  key.value += 1;
});
</script>
