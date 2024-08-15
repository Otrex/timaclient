<template>
    <section class="rounded-md">
        <h4 class="text-[20px] font-bold text-[#898989]">Campaigns</h4>
        <!-- <UtLoadPresenter loading-message="Fetching age audience statistics"
            not-found-message="No audience statistics found" :data="props?.data?.length === 0"
            :state="props.loading ? constants.LOADING : 'IDLE'">
            
        </UtLoadPresenter> -->
        <Doughnut :data="dataset" class="inline-block w-full" :options="options" />
    </section>
</template>

<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'

const props = defineProps<{
    bg?: string;
    loading?: boolean;
    data: number[];
}>();

const dataset = computed(() => ({
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: props.data
        }
    ],
}));

const options = ref<any>({
    responsive: true,
    // maintainAspectRatio: false
});
</script>

<style scoped></style>