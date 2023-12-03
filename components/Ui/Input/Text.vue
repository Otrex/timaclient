<template>
  <input
    v-bind="$attrs"
    @input="update"
    :value="props.modelValue"
    :class="[
      $attrs.class,
      'px-[24px] py-[12px] rounded-[40px] text-[19px] placeholder:text-[#999999]',
    ]"
  />
</template>
<script lang="ts" setup>
const props = defineProps<{
  modelValue: string;
}>();

const emits = defineEmits(["update:modelValue"]);

function update(e: any) {
  emits("update:modelValue", e.target.value);
}
</script>
