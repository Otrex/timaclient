<template>
  <NuxtImg src="~/assets/img/avatar.png" />
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

const $src = computed(() => {
  if (props.src.startsWith("~")) {
    return props.src;
  } else {
    return props.src;
  }
});
const avatarUrl = "https://place.dog/300/200";
const { isLoading, error } = useImage({ src: props.src });
</script>

<style scoped>
.vars {
  --width: v-bind(props.width);
  --height: v-bind(props.height);
}
</style>
