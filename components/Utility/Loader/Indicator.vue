<template>
  <div
    ref="container"
    :style="styleVar"
    class="h-[--height] flex items-center justify-center"
  >
    <div>
      <h1 class="text-center text-4xl mb-3">...&#x23F3; Searching...</h1>
      <div class="flex justify-center">
        <div class="text-center flex gap-3 items-center">
          <UtSvg name="sunshine" class="spinner w-[1.5rem] h-[1.5rem]" />
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: "Fetching Your Data",
  }
);

const { container, styleVar } = useHeight(300);
</script>

<style></style>
