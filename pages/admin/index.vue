<template>
  <div>Hello</div>
</template>

<script lang="ts" setup>
definePageMeta({
  name: "AdminRedirect",
  middleware: [
    async () => {
      return navigateTo("/admin/dashboard");
    },
  ],
});
</script>

<style></style>
