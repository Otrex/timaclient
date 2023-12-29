<template>
  <NuxtNotifications v-bind="appConfig.notification" />
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<style></style>
