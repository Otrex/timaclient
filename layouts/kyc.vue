<template>
  <div class="w-full h-screen flex flex-row">
    <div class="flex-1 bg-[#F3FAFF] pt-[120px] px-[60px] max-w-[480px]">
      <div>
        <slot name="sidebar"></slot>
      </div>
    </div>
    <div class="flex-1 dark:bg-black dark:text-white">
      <div>
        <div class="p-[40px] flex flex-row items-center pt-[35px]">
          <NuxtLink :to="props.prev || '/'">
            <UtSvg name="long-back" class="w-[24px] h-[12px]" />
          </NuxtLink>
          <div class="w-full">
            <slot name="topnav"></slot>
          </div>
        </div>
        <div class="px-[40px]">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{ prev?: string | object }>();
</script>
