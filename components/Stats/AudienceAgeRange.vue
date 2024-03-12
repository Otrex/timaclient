<template>
  <section class="var bg-[--bg] dark:bg-slate-500 p-[1.5rem] rounded-md">
    <h4 class="pl-3">Audience Age range</h4>
    <UtLoadPresenter
      loading-message="Fetching age audience statistics"
      not-found-message="No audience statistics found"
      :data="props.data.length === 0"
      :state="props.loading ? constants.LOADING : 'IDLE'"
    >
      <Bar :data="dataset" class="inline-block" :options="options" />
    </UtLoadPresenter>
  </section>
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";

const props = defineProps<{
  bg?: string;
  loading?: boolean;
  aspectRatio?: number;
  data: {
    male: number;
    female: number;
    percentage: number;
    ageRange: string;
  }[];
}>();

const dataset = computed(() => ({
  labels: props.data.map((e) => e.ageRange),
  datasets: [
    {
      label: "Male",
      data: props.data.map((e) => e.male),
      backgroundColor: "#AAD9FB",
      borderWidth: 0,
    },
    {
      label: "Female",
      data: props.data.map((e) => e.female),
      backgroundColor: "#2AA2FD",
      borderWidth: 0,
    },
  ],
}));

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
  aspectRatio: props.aspectRatio || 1.5,
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
        font: {
          size: 13,
        },
      },
    },
  },
});

const bg = computed(() => props.bg || "#FFFDF9");
</script>

<style scoped>
.var {
  --bg: v-bind("bg");
}
</style>
