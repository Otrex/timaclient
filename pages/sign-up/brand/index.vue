<template>
  <div></div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: [
    async (to, from) => {
      return navigateTo({
        name: "SignUpBasicDetails",
      });
    },
  ],
});
</script>

<style></style>
