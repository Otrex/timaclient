<template>
  <select
    class="px-[1.5rem] py-[0.75rem] rounded-[2.5rem] text-[1.1875rem] placeholder:text-[#999999]"
    v-bind="$attrs"
  >
    <option v-if="props.placeholder" class="text-[#999999]">
      {{ props.placeholder }}
    </option>
    <option
      v-for="(option, idx) in props.options"
      :key="idx"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: { label: string; value: string }[];
  placeholder?: string;
}>();
</script>

<style></style>
