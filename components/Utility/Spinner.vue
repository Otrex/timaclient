<template>
  <div class="loading-screen">
    <div class="spinner" :style="st"></div>
    <p v-if="!noText">Loading...</p>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  size: {
    type: String,
    default: "40px",
  },
  noText: {
    type: Boolean,
    default: false,
  },
});

const st = computed(
  () => `
  width: ${props.size};
  height: ${props.size};
`
);
</script>

<style scoped>
.loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
