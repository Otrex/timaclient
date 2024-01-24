<template>
  <div>
    <textarea
      v-bind="$attrs"
      v-model="data"
      :class="[
        props.errorMessage && '!border-red-600',
        $attrs.class,
        'px-[1.5rem] w-full py-[0.75rem] dark:text-black rounded-[1.25rem] text-[1.1875rem] placeholder:text-[#999999]',
      ]"
    ></textarea>
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
const props = defineProps<{ modelValue?: string; errorMessage?: string }>();
const emits = defineEmits(["update:modelValue"]);

const data = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>

<style></style>
