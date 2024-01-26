<template>
  <button
    @click="clickHandler"
    :class="[
      'text-[#A4A4A4] font-medium transition-all text-[1.125rem] hover:text-red-600 relative',
      active && 'active',
    ]"
  >
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
const route = useRoute();
const props = defineProps<{
  label: string;
  name: string;
  default?: boolean;
  disabled?: boolean;
}>();

const tabName = computed(() => props.name as string);
const currentTab = computed(() => route.query.tab as string);
const active = computed(
  () =>
    currentTab.value === tabName.value || (props.default && !route.query.tab)
);

function clickHandler() {
  if (props.disabled) return;
  navigateTo({
    query: {
      tab: tabName.value,
    },
  });
}
</script>

<style scoped>
.active {
  @apply text-[#111] dark:text-white after:block after:absolute after:bottom-[-.2rem];
}

.active::after {
  content: " ";
  transform: translateX(-50%);
  @apply w-[0.75rem] h-[0.3125rem] bg-[#008FFD] block left-[50%] rounded-[0.625rem];
}
</style>
