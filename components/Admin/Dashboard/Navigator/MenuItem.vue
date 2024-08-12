<template>
    <NuxtLink :to="props.to" exact-active-class="!text-[#0077D3]" :class="[
        'px-[1.3125rem] transition-all cursor-default text-[#00365C] dark:text-[#bbb] flex justify-between items-center py-[0.75rem] hover:bg-[#CCE9FF] hover:rounded dark:hover:bg-slate-700',
        props.loading &&
        'border border-l-8 rounded-md border-solid border-red-600',
    ]">
        <div class="flex items-center gap-[0.625rem] flex-row">
            <div class="flex items-center">
                <UtSvg :name="props.icon" v-if="!props.loading" class="w-[1.25rem] h-[1.25rem]" />
                <UtSvg name="sunshine" v-else class="spinner w-[1.2rem] h-[1.2rem]" />
            </div>
            <div class="text-[1.05rem]">
                {{ props.label }}
            </div>
        </div>
        <div>
            <slot name="right"></slot>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
    to?: any;
    label: string;
    icon: string;
    loading?: boolean;
}>();
</script>

<style></style>