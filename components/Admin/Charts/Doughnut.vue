<template>
  <section class="rounded-md">
    <div class="flex justify-between">
      <h4 class="text-[20px] font-bold text-[#898989]">{{ label || "INC" }}</h4>
      <div><UtSvg name="love" dim w="21px" h="21px" /></div>
    </div>

    <!-- <UtLoadPresenter loading-message="Fetching age audience statistics"
            not-found-message="No audience statistics found" :data="props?.data?.length === 0"
            :state="props.loading ? constants.LOADING : 'IDLE'">
            
        </UtLoadPresenter> -->
    <Doughnut :data="data" class="inline-block w-full" :options="options" />
  </section>
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";

const props = defineProps<{
  label?: string;
  bg?: string;
  loading?: boolean;
  data: number[];
}>();

// const data = computed(() => ({
//   labels: ["Women", "Men"],
//   datasets: [
//     {
//       data: [52, 48],
//       backgroundColor: ["#2BA2FD", "#00487F"],
//       borderWidth: 0,
//       pointStyle: "circle",
//     },
//   ],
// }));

const options = ref<any>({
  responsive: true,
  aspectRatio: 1.2,
  cutout: "70%",
  plugins: {
    legend: {
      position: "bottom",
      align: "end",
      labels: {
        boxWidth: 22,
        boxHeight: 22,
      },
    },
  },
  // maintainAspectRatio: false
});
</script>

<style scoped></style>
