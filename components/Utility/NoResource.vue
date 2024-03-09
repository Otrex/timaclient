<template>
  <div
    ref="container"
    :style="styleVar"
    class="flex items-center justify-center h-[--height]"
  >
    <div class="text-center">
      <div class="inline-block">
        <h1 class="text-4xl mb-3">Nothing Found</h1>
      </div>
      <h4 class="bg-[--clr-light-blue] font-medium dark:bg-slate-800 rounded">
        {{ message }}
      </h4>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ message?: string }>(), {
  message: "No Resources available",
});

const { container, styleVar } = useHeight();
</script>

<style></style>
