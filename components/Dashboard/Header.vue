<template>
  <div
    class="w-full flex md:flex-row items-center justify-between py-[1rem] px-[1.75rem] border-b-[0.025rem] border-solid border-[#D6D6D6] dark:border-slate-900"
  >
    <div>
      <slot name="left">
        <h2>{{ routeName }}</h2>
      </slot>
    </div>
    <div>
      <slot name="middle"></slot>
    </div>
    <div class="flex flex-row gap-[0.125rem] items-center">
      <div class="flex items-center"><DashboardNotification /></div>
      <div class="flex items-center"><DashboardUserMenu /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const routeName = computed(() => tools.capitalize(route.name as string));
</script>

<style></style>
