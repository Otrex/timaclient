<template>
  <div>
    <NuxtLayout name="admin-dashboard">
      <template #main>
        <NuxtPage :transition="{
          name: 'page',
          mode: 'out-in',
        }" />
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "AdminLayout"
});
</script>

<style></style>