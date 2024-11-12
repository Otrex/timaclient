<template>
  <Bar :data="dataset" class="w-full h-full max-h-[300px]" :options="options" />
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";

const props = defineProps<{
  bg?: string;
  loading?: boolean;
  data: {
    values: { [key: string]: number };
    ageRange: string;
  }[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  colors?: { [key: string]: string };
}>();

const dataset = computed(() => {
  const labels = Object.keys(props.data[0]?.values || {});
  return {
    labels: props.data?.map((e) => e.ageRange),
    datasets: labels.map((label) => ({
      label,
      data: props.data?.map((e) => e.values[label]),
      backgroundColor: props.colors?.[label] || "#AAD9FB",
      borderWidth: 0,
    })),
  };
});

const options = ref<any>({
  scales: {
    x: {
      stacked: true,
      title: {
        display: true,
        text: props.xAxisLabel || "",
      },
      gridLines: {
        display: false,
        drawOnChartArea: false,
        color: "black",
        zeroLineColor: "#fff",
        zeroLineWidth: 0,
      },
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: props.yAxisLabel || "",
      },
      gridLines: {
        display: false,
        drawOnChartArea: false,
        color: "black",
        zeroLineColor: "#fff",
        zeroLineWidth: 0,
      },
    },
  },
  responsive: true,
  aspectRatio: 1.5,
  plugins: {
    legend: {
      itemSpacing: 10,
      position: "top",
      align: "start",
      padding: {
        bottom: 30,
      },
      labels: {
        boxWidth: 13,
        font: {
          size: 13,
        },
      },
    },
  },
});

const bg = computed(() => props.bg || "#FFFDF9");
</script>

<style scoped></style>
