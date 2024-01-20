<template>
  <div class="overflow-hidden h-screen">
    <NuxtLoadingIndicator color="red" :duration="500" />
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import "virtual:svg-icons-register";
</script>
