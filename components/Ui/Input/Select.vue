<template>
  <select
    :class="[
      'px-[1.5rem] py-[0.75rem] dark:text-black rounded-[2.5rem] text-[1.1875rem] placeholder:text-[#999999]',
    ]"
    v-bind="$attrs"
    v-model="value"
  >
    <option v-if="props.placeholder" disabled selected class="text-[#999999]">
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
  modelValue?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue || props.placeholder;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style></style>
