<template>
  <section class="bg-[#FFFDF9] p-[1.3125rem] rounded-md">
    <h4 class="pl-3">Audience Age range</h4>
    <Bar :data="data" class="inline-block" :options="options" />
  </section>
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";
const data = ref({
  labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
  datasets: [
    {
      label: "Men",
      data: [10, 40, 15, 67, 50],
      backgroundColor: "#AAD9FB",
      borderWidth: 0,
    },
    {
      label: "Women",
      data: [15, 10, 25, 55, 40],
      backgroundColor: "#2AA2FD",
      borderWidth: 0,
    },
  ],
});

const options = ref<any>({
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
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
        bottom: 30, // Adjust the bottom padding
      },
      labels: {
        boxWidth: 13,
        fontSize: 8, // Adjust the box width as needed
      },
    },
  },
});
</script>

<style></style>
