<template>
  <div class="inline-block">
    <select
      :class="[
        props.errorMessage && '!border-red-600',
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
    <transition>
      <div
        v-show="props.errorMessage"
        class="text-red-600 text-left text-[0.875rem]"
      >
        {{ props.errorMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: { label: string; value: string }[];
  placeholder?: string;
  modelValue?: string;
  errorMessage?: string;
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
