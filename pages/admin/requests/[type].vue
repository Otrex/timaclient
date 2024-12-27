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
