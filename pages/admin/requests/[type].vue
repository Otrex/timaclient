<template>
  <NuxtLayout name="admin">
    <template #main>
      <div class="px-5">
        <div class="flex gap-2 mb-5">
          <NuxtLink
            active-class="link-style-active"
            class="link-style"
            :to="{
              params: { type: 'brands' },
              name: 'admin.requests.all.requests',
            }"
            :class="route.params.type == 'brands' && 'link-style-active'"
          >
            Brands
          </NuxtLink>
          <NuxtLink
            class="link-style"
            active-class="link-style-active"
            :class="route.params.type == 'influencers' && 'link-style-active'"
            :to="{
              params: { type: 'influencers' },
              name: 'admin.requests.all.requests',
            }"
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
