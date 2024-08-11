<template>
    <div class="bg-[#F7F7F7] border-l-[10px] border-[#3CC75B] rounded-2xl flex justify-between p-6 min-h-[72px]">
        <div>
            <h1 class="text-xl font-bold text-[#898989]">
                Complete
            </h1>
        </div>

        <div>
            <h1 class="text-[32px] font-medium text-[#434343]">
                34
            </h1>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    social: string;
    followers: number;
    engagementRate: number;
    likes: number;
}>();

const socials = computed(() => `socials/${props.social}-lg`);
</script>

<style></style>