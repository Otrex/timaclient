<template>
  <div class="fixed">
    <transition>
      <UiLoaderLinear v-show="requestsStore?.hasActiveRequests" />
    </transition>

    <NuxtLoadingIndicator color="red" :duration="500" />
  </div>
</template>

<script setup lang="ts">
const requestsStore = useRequestsStore();
</script>

<style></style>
