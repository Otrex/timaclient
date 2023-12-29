<template>
  <div>
    <transition>
      <UiLoaderLinear v-show="requestsStore.hasActiveRequests" />
    </transition>
    <NuxtLoadingIndicator color="red" :duration="500" />
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import "virtual:svg-icons-register";

const app = useNuxtApp();
const requestsStore = useRequestsStore();
</script>
