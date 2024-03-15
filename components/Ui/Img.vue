<template>
  <img
    src="/favicon/favicon-16x16.png"
    class="bg-img pulse object-cover"
    v-if="loading"
  />
  <img
    src="/favicon/favicon-16x16.png"
    class="bg-img error object-cover"
    v-else-if="error"
  />
  <img :src="state?.src" :class="[$attrs.class]" v-else />
</template>

<script setup lang="ts">
import { useImage } from "@vueuse/core";
const props = withDefaults(
  defineProps<{
    src?: string;
    lazy?: boolean;
    width?: number | string;
    height?: number | string;
  }>(),
  {
    width: "100%",
    height: "auto",
  }
);

const resolveSrc = (src: string) => src;
const loading = ref(true);

const { isLoading, error, state } = useImage({
  src: resolveSrc(props.src || ""),
});

watch(
  () => isLoading.value,
  () => {
    if (!isLoading.value) {
      setTimeout(() => {
        loading.value = isLoading.value;
      }, 2000);
    }
  }
);
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

.bg-img {
  background-image: url("/favicon/favicon-16x16.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-blend-mode: overlay;
  filter: grayscale(1);
  object-fit: cover !important;
}

.pulse {
  animation-name: pulse;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
</style>
