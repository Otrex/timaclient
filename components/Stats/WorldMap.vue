<template>
  <div class="var bg-[--bg] py-[1.5rem] rounded-md w-full overflow-clip">
    <h4 class="pl-3 mb-3">Country distribution</h4>
    <canvas class="w-full h-screen aspect-[1119/643]" ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import * as countriesM from "world-atlas/countries-110m.json";
import { Chart } from "chart.js";
import { topojson } from "chartjs-chart-geo";

const props = defineProps<{
  bg?: string;
}>();

const bg = computed(() => props.bg || "#FFFDF9");
const canvas = ref<HTMLCanvasElement>();
onMounted(async () => {
  const $countriesM = countriesM as any;
  const countries = (
    topojson.feature($countriesM, $countriesM.objects.countries) as any
  ).features.reverse();

  // const world = await fetch(
  //   "https://cdn.jsdelivr.net/npm/visionscarto-world-atlas@0.1.0/world/110m.json"
  // ).then((d) => d.json());
  // const countries = (topojson.feature(world, world.objects.countries) as any)
  //   .features as any;

  const _2d = canvas.value?.getContext("2d")!;
  const chart = new Chart(_2d, {
    type: "choropleth",
    data: {
      labels: countries.map((d: any) => d.properties.name),
      datasets: [
        {
          label: "Countries",
          data: countries.map((d: any) => ({
            feature: d,
            value: Math.random(),
          })),
        },
      ],
    },
    options: {
      showOutline: true,
      showGraticule: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        projection: {
          axis: "y",
          projection: "equirectangular", // "naturalEarth1",
          projectionScale: 1.2,
          bounds: "ticks",
          grid: {
            lineWidth: 0,
          },
        },
      },
    },
  });
});
</script>

<style scoped>
.var {
  --bg: v-bind("bg");
}
</style>
