<template>
  <div class="inline-block">
    <label
      :class="[
        'flex items-center w-[calc(1.5rem_+_0.25rem)] transition-all rounded-lg p-[0.125rem]',
        props.modelValue ? 'bg-gray-400' : 'bg-white',
      ]"
    >
      <input
        type="checkbox"
        :value="props.modelValue"
        @input="update"
        class="hidden"
      />
      <div
        :class="[
          'w-[0.75rem] transition-all shadow h-[0.75rem] rounded-full bg-white dark:bg-[#444]',
          props.modelValue ? 'transform translate-x-[100%]' : '',
        ]"
      ></div>
    </label>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

const props = defineProps<{
  modelValue?: any;
}>();
const update = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<style></style>
