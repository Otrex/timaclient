<template>
  <input
    v-bind="$attrs"
    @input="update"
    :value="props.modelValue"
    :class="[
      $attrs.class,
      'px-[1.5rem] py-[0.75rem] dark:text-black rounded-[2.5rem] text-[1.1875rem] placeholder:text-[#999999]',
    ]"
  />
</template>
<script lang="ts" setup>
const props = defineProps<{
  modelValue?: string;
}>();

const emits = defineEmits(["update:modelValue"]);

function update(e: any) {
  emits("update:modelValue", e.target.value);
}
</script>
