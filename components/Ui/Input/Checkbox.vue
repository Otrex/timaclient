<template>
  <div class="inline-block">
    <input
      type="checkbox"
      v-bind="$attrs"
      :class="[shapeMap[props.shape || 'circle'], ' w-[1.25rem] h-[1.25rem]']"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  shape?: "circle" | "square";
}>();

const shapeMap = {
  circle: "rounded-full",
  square: "rounded-[0.3125rem]",
};
</script>

<style></style>
