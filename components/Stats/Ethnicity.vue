<template>
  <section
    class="bg-[#FFFDF9] dark:text-white dark:bg-slate-500 p-[1.3125rem] rounded-md"
  >
    <h4 class="pl-3">Ethnicity</h4>
    <Doughnut :data="data" class="inline-block" :options="options" />
  </section>
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";

const data = ref({
  labels: ["Hot", "African American", "Asian", "Hispanic"],
  datasets: [
    {
      data: [100, 50, 100, 45],
      backgroundColor: ["#AAD9FB", "#36A2EB", "#00477E", "#0077D3"],
      borderWidth: 0,
      pointStyle: "circle",
    },
  ],
});

const options = ref<any>({
  responsive: true,
  aspectRatio: 1.5,
  plugins: {
    legend: {
      position: "left",
      labels: {
        boxWidth: 22,
        boxHeight: 22,
      },
    },
  },
});
</script>

<style></style>
