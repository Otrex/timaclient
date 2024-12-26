<template>
  <div
    class="dark:bg-gray-600 rounded-lg px-5 py-3 border dark:border-gray-700"
  >
    <div>
      <NuxtLink
        active-class="link-style-active"
        class="link-style"
        :to="{ params: { type: 'brands' } }"
      >
        All Requests
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "admin.requests.all",
});
const route = useRoute();
const type = computed(() => route.params.type as string);
</script>

<style scoped>
.link-style {
  @apply rounded-lg text-sm px-3 dark:bg-gray-800/50;
}

.link-style-active {
  @apply dark:bg-gray-900;
}
</style>
