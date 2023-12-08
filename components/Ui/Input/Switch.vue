<template>
  <div class="inline-block inx">
    <label
      :class="[
        'flex items-center w-[--box-size] transition-all rounded-[--radius] p-[--pad]',
        props.modelValue ? 'bg-gray-400' : 'bg-gray-400',
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
          'w-[--size] h-[--size] transition-all shadow  rounded-full bg-white dark:bg-[#444]',
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
  size?: "sm" | "lg";
}>();

const sizeMap = {
  lg: "1.5rem",
  sm: "0.75rem",
};

const size = computed(() => sizeMap[props.size || "sm"]);

const update = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<style scoped>
.inx {
  --pad: calc(0.13rem);
  --size: v-bind("size");
  --radius: calc(v-bind("size") - var(--pad));
  --box-size: calc((2 * v-bind("size")) + (var(--pad) * 2));
}
</style>
