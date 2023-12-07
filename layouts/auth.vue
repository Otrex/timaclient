<template>
  <div class="w-full h-screen flex flex-row">
    <div class="flex-1 dark:bg-black dark:text-white">
      <div>
        <div class="p-[2.5rem] flex flex-row items-center pt-[2.1875rem]">
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
