<template>
  <div v-if="props.userType === currentUserType" class="inline-block w-full">
    <slot></slot>
    <slot name="fallback"></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  userType: string;
}>();

const authStore = useAuthStore();
const currentUserType = computed(() => authStore.profile?.role);
</script>

<style></style>
