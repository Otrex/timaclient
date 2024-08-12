<template>
    <div class="px-14">
        <div class="flex flex-col gap-11 md:grid md:grid-cols-3">
            <AdminStatusCard />
            <AdminStatusCard />
            <AdminStatusCard />
        </div>

        <div class="flex flex-col md:flex-row gap-[50px] mt-10 ">
            <div class="w-full md:w-8/12">
                <AdminChartsBar :data="chartData" />
            </div>

            <div class="w-full md:w-4/12">
                <div class="bg-[#F7F7F7] rounded-xl p-6">
                    <h1 class="text-[20px] font-bold text-[#898989]">Top Campaigns</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

definePageMeta({
    name: "Admin Campaign",
    middleware: [async () => { }],
});

const chartData = ref<{
    ageRange: string;
    male: number;
    female: number;
    percentage: number;
}[]>();

onMounted(() => {
    chartData.value = [
        {
            ageRange: 'Jan',
            male: 30,
            female: 30,
            percentage: 50,
        },
        {
            ageRange: 'Feb',
            male: 30,
            female: 30,
            percentage: 50,
        },
        {
            ageRange: 'Mar',
            male: 30,
            female: 30,
            percentage: 50,
        },
        {
            ageRange: 'April',
            male: 30,
            female: 30,
            percentage: 50,
        },
        {
            ageRange: 'May',
            male: 30,
            female: 30,
            percentage: 50,
        },
        {
            ageRange: 'June',
            male: 30,
            female: 30,
            percentage: 50,
        },
        {
            ageRange: 'July',
            male: 30,
            female: 30,
            percentage: 50,
        },
        {
            ageRange: 'Aug',
            male: 30,
            female: 30,
            percentage: 50,
        },
        {
            ageRange: 'Sept',
            male: 30,
            female: 30,
            percentage: 50,
        },
        {
            ageRange: 'Oct',
            male: 30,
            female: 30,
            percentage: 50,
        },
        {
            ageRange: 'Nov',
            male: 30,
            female: 30,
            percentage: 50,
        },
        {
            ageRange: 'Dec',
            male: 30,
            female: 30,
            percentage: 50,
        },
    ]
})


</script>

<style></style>
