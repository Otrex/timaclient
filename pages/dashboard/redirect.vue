<template>
  <div>Invalid User Type</div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Redirect",
  middleware: ["options", "dashboard", "permission", "redirect"],
});
</script>

<style></style>
