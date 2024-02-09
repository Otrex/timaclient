<template>
  <transition mode="out-in">
    <img class="loading" v-if="isLoading" />
    <img src="/favicon/favicon-16x16.png" v-else-if="error" />
    <img :src="state?.src" ref="image" v-else />
  </transition>
</template>

<script setup lang="ts">
import { useImage } from "@vueuse/core";
const props = withDefaults(
  defineProps<{
    src: string;
    lazy?: boolean;
    width?: number | string;
    height?: number | string;
  }>(),
  {
    width: "100%",
    height: "auto",
  }
);

const image = ref();
defineExpose(image);
const { isLoading, error, state } = useImage({ src: props.src });
</script>

<style scoped>
.vars {
  --width: v-bind(props.width);
  --height: v-bind(props.height);
}
.loading {
  animation: loading 1.5s infinite ease-in-out;
  width: 100%;
  height: 100%;
}
</style>
