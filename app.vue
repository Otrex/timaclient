<template>
  <div class="overflow-hidden w-full h-screen">
    <NuxtLayout>
      <NuxtLoadingIndicator color="red" :duration="500" />
      <NuxtPage class="w-full" />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import "virtual:svg-icons-register";
</script>
