<template>
    <section class="rounded-md">
        <h4 class="text-[20px] font-bold text-[#898989]">Campaigns</h4>
        <!-- <UtLoadPresenter loading-message="Fetching age audience statistics"
            not-found-message="No audience statistics found" :data="props?.data?.length === 0"
            :state="props.loading ? constants.LOADING : 'IDLE'">
            
        </UtLoadPresenter> -->
        <Bar :data="dataset" class="inline-block w-full h-full" :options="options" />
    </section>
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";

const props = defineProps<{
    bg?: string;
    loading?: boolean;
    data: {
        male: number;
        female: number;
        percentage: number;
        ageRange: string;
    }[];
}>();

const dataset = computed(() => ({
    labels: props.data?.map((e) => e.ageRange),
    datasets: [
        {
            label: "Male",
            data: props.data?.map((e) => e.male),
            backgroundColor: "#AAD9FB",
            borderWidth: 0,
        },
        {
            label: "Female",
            data: props.data?.map((e) => e.female),
            backgroundColor: "#2AA2FD",
            borderWidth: 0,
        },
    ],
}));

const options = ref<any>({
    scales: {
        x: {
            stacked: true,
            gridLines: {
                display: false,
                drawOnChartArea: false,
                color: "black",
                zeroLineColor: "#fff",
                zeroLineWidth: 0
            },
        },
        y: {
            stacked: true,
            gridLines: {
                display: false,
                drawOnChartArea: false,
                color: "black",
                zeroLineColor: "#fff",
                zeroLineWidth: 0
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

<style scoped></style>