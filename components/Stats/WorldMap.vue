<template>
  <div class="var bg-[--bg] py-[1.5rem] rounded-md w-full overflow-clip">
    <h4 class="pl-3 mb-3">Country distribution</h4>
    <canvas
      class="w-full h-screen aspect-[1119/643] mb-[2.1875rem]"
      ref="canvas"
    ></canvas>

    <div class="px-[3.5625rem]">
      <table class="w-full">
        <tbody>
          <template v-for="(set, idx) in data.datasets" :key="idx">
            <tr :style="`--bg-clr: ${set.bgColor}`">
              <td class="max-w-[300px]">
                <div
                  class="whitespace-nowrap max-w-[300px] w-full py-[0.75rem] mr-[1.25rem] inline-block"
                >
                  <p>{{ set.label }}</p>
                </div>
              </td>
              <td class="w-full">
                <div class="w-full flex flex-row items-center gap-[0.625rem]">
                  <div
                    class="w-full rounded flex items-center gap-[0.625rem] h-[0.875rem]"
                  >
                    <div
                      :style="restorer(set.stats)"
                      class="bg-[--bg-clr] h-full w-[--w]"
                    ></div>
                    <p class="nl text-[color:var(--clr-grey-300)]">
                      {{ set.stats }}%
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as countriesM from "world-atlas/countries-110m.json";
import { Chart } from "chart.js";
import { topojson } from "chartjs-chart-geo";

const props = defineProps<{
  bg?: string;
  data: {
    name: string;
    value: string | number;
  }[];
}>();

const bg = computed(() => props.bg || "#FFFDF9");
const canvas = ref<HTMLCanvasElement>();

const RIBBON_COLORS = ["#58E48C", "#EF4E4D", "#FFD784", "#55B4FE"];

const data = ref({
  datasets: [
    {
      label: "Nigeria",
      bgColor: "#58E48C",
      stats: 60,
    },
    {
      label: "United Kingdom",
      bgColor: "#EF4E4D",
      stats: 20,
    },
    {
      label: "Netherlands",
      bgColor: "#FFD784",
      stats: 100,
    },
    {
      label: "South Africa",
      bgColor: "#55B4FE",
      stats: 5,
    },
  ],
});

function restorer(data: number): string {
  return `--w: ${(data / (highestDataset.value?.stats || 1)) * 100}%`;
}

function findHighestStats(data: Array<{ stats: number; [key: string]: any }>) {
  if (data.length === 0) {
    return null;
  }

  return data.reduce(
    (max, current) => (current.stats > max.stats ? current : max),
    data[0]
  );
}
const highestDataset = computed(() => findHighestStats(data.value.datasets));

onMounted(async () => {
  const $countriesM = countriesM as any;
  const $$countries = (
    topojson.feature($countriesM, $countriesM.objects.countries) as any
  ).features.reverse();

  const _2d = canvas.value?.getContext("2d")!;

  const countries = $$countries
    .map((c: any) => {
      const n_country = props.data.find((el) => el.name === c.properties.name);
      if (n_country) {
        return {
          ...c,
          dataValue: n_country.value,
        };
      } else {
        return {
          ...c,
          dataValue: 0,
        };
      }
    })
    .filter((el: any) => el);

  const chart = new Chart(_2d, {
    type: "choropleth",
    data: {
      labels: countries.map((d: any) => d.properties.name),
      datasets: [
        {
          label: "Countries",
          data: countries.map((d: any) => ({
            feature: d,
            value: d.dataValue,
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
          projectionScale: 1.3,
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
