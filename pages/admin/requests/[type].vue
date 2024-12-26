<template>
  <NuxtLayout name="admin">
    <template #main>
      <div class="px-5">
        <div class="flex gap-2 mb-5">
          <NuxtLink
            active-class="link-style-active"
            class="link-style"
            :to="{ params: { type: 'brands' } }"
            :class="route.params.type == 'brands' && 'link-style'"
          >
            Brands
          </NuxtLink>
          <NuxtLink
            class="link-style"
            active-class="link-style-active"
            :to="{ params: { type: 'influencers' } }"
          >
            Influencers
          </NuxtLink>
        </div>

        <NuxtPage />
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped>
.link-style {
  @apply rounded-lg text-sm px-3 dark:bg-gray-800/50;
}

.link-style-active {
  @apply dark:bg-gray-900;
}
</style>
