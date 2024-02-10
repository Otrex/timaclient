<template>
  <div class="p-[1.875rem]">
    <h1><b>Influencers Title:</b> {{ route.query.title }}</h1>
    <h1 v-if="route.query.category">
      <b>Category:</b> {{ route.query.category }}
    </h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Influencers",
});

const route = useRoute();
</script>

<style></style>
