<template>
  <div class="flex flex-row w-full max-w-[72.25rem] justify-between">
    <UtTabMenuItem
      v-for="(item, idx) in props.menuItems"
      :key="idx"
      :label="item.label"
      :name="item.name"
      :default="item.default"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  menuItems: {
    name: keyof typeof constants;
    label: string;
    default?: boolean;
    component: ReturnType<typeof resolveComponent>;
  }[];
}>();
</script>

<style></style>
