<template>
  <svg v-bind="$attrs" aria-hidden="true">
    <use v-bind="attrs" />
  </svg>
</template>

<script setup lang="ts">
export interface ISvgIconProps {
  name: string;
  xColor?: string;
}

const props = defineProps<ISvgIconProps>();
const attrs = computed(() => ({
  href: `#${props.name}`,
  [props.xColor || "fill"]: "currentColor",
}));
</script>
