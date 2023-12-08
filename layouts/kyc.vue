<template>
  <div class="w-full h-screen flex flex-row">
    <div
      class="flex-1 overflow-auto h-full bg-[--clr-light-blue] dark:bg-slate-700 dark:text-white pt-[7.5rem] px-[3.75rem] max-w-[30rem]"
    >
      <div>
        <slot name="sidebar"></slot>
      </div>
    </div>
    <div class="flex-1 overflow-auto h-full dark:bg-slate-800 dark:text-white">
      <div class="relative">
        <div
          class="p-[2.5rem] dark:bg-slate-800 bg-white sticky top-0 flex flex-row items-center pt-[2.1875rem]"
        >
          <NuxtLink :to="props.prev || '/'">
            <UtSvg name="long-back" class="w-[1.5rem] h-[0.75rem]" />
          </NuxtLink>
          <div class="w-full">
            <slot name="topnav"></slot>
          </div>
        </div>
        <div class="px-[2.5rem]">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{ prev?: string | object }>();
</script>
