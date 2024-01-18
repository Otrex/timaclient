<template>
  <img :src="state?.src" />
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

const image = ref(new Image());

const source = computed(() => {});

const avatarUrl = "https://place.dog/300/200";
const { isLoading, error, state } = useImage({ src: props.src });
</script>

<style scoped>
.vars {
  --width: v-bind(props.width);
  --height: v-bind(props.height);
}
</style>
