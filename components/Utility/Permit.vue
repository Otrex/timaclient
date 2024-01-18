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

const profileStore = useProfileStore();
const currentUserType = computed(() => profileStore.$profile?.userType);
</script>

<style></style>
