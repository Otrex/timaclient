<template>
  <section class="var bg-[--bg] p-[1.3125rem] rounded-md">
    <h4 class="pl-3">Audience Gender Distribution</h4>
    <Doughnut :data="data" class="inline-block" :options="options" />
  </section>
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";

const props = defineProps<{
  bg?: string;
}>();

const bg = computed(() => props.bg || "#FFFDF9");

const data = ref({
  labels: ["Women", "Men"],
  datasets: [
    {
      data: [100, 50],
      backgroundColor: ["#2BA2FD", "#00487F"],
      borderWidth: 0,
      pointStyle: "circle",
    },
  ],
});

const options = ref<any>({
  responsive: true,
  aspectRatio: 1.5,
  cutout: "70%",
  plugins: {
    legend: {
      position: "top",
      align: "start",
      labels: {
        boxWidth: 22,
        boxHeight: 22,
      },
    },
  },
});
</script>

<style scoped>
.var {
  --bg: v-bind("bg");
}
</style>
