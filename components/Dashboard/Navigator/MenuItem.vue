<template>
  <NuxtLink
    :to="props.to"
    exact-active-class="!text-[#0077D3]"
    class="px-[1.3125rem] text-[#00365C] dark:text-[#bbb] flex justify-between items-center py-[0.75rem] hover:bg-[#CCE9FF] hover:rounded dark:hover:bg-slate-700"
  >
    <div class="flex items-center gap-[0.625rem] flex-row">
      <div class="flex items-center">
        <UtSvg :name="props.icon" class="w-[1.2rem] h-[1.2rem]" />
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
}>();
</script>

<style></style>
