<template>
  <svg
    v-bind="$attrs"
    :class="['inline-block dim', props.dim && 'w-[--width] h-[--height]']"
    aria-hidden="true"
  >
    <use v-bind="attrs" />
  </svg>
</template>

<script setup lang="ts">
export interface ISvgIconProps {
  name: string;
  xColor?: string;
  w?: string;
  h?: string;
  dim?: boolean;
}

const props = defineProps<ISvgIconProps>();
const attrs = computed(() => ({
  href: `#${props.name}`,
  [props.xColor || "fill"]: "currentColor",
}));
const dimensions = computed(() => ({
  w: props.w || "auto",
  h: props.h || "auto",
}));
</script>
<style scoped>
.dim {
  --width: v-bind("dimensions.w");
  --height: v-bind("dimensions.h");
}
</style>
