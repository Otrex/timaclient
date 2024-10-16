<template>
  <div class="app">
    <apexchart
      width="550"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <div>
      <button @click="updateChart">Update!</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const chartOptions = ref<any>({
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
});
const series = ref<any>([
  {
    name: "series-1",
    data: [30, 40, 45, 50, 49, 60, 70, 81],
  },
]);

function updateChart() {
  const max = 90;
  const min = 20;
  const newData = series.value[0].data.map(() => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });

  const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];

  // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
  chartOptions.value = {
    colors: [colors[Math.floor(Math.random() * colors.length)]],
  };
  // In the same way, update the series option
  series.value = [
    {
      data: newData,
    },
  ];
}
</script>

<style></style>
