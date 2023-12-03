<template>
  <div class="inline-block">
    <input
      type="checkbox"
      v-bind="$attrs"
      :class="[shapeMap[props.shape || 'circle'], ' w-[20px] h-[20px]']"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  shape?: "circle" | "square";
}>();

const shapeMap = {
  circle: "rounded-full",
  square: "rounded-[5px]",
};
</script>

<style></style>
