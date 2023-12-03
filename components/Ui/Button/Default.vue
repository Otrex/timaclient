<template>
  <button v-bind="$attrs" :class="[variants[props.variant]]">
    <slot> {{ props.label }} </slot>
  </button>
</template>

<script setup lang="ts">
interface IProps {
  variant: "primary" | "secondary";
  leftIcon?: string;
  rightIcon?: string;
  slotted?: boolean;
  label?: string;
}
const props = defineProps<IProps>();

const variants = {
  primary: `bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 text-white rounded-[40px] disabled:bg-red-400`,
  secondary: `bg-transparent hover:bg-[#D9D9D9] outline outline-solid outline-[#D9D9D9] focus:ring-4 focus:ring-[#D9D9D9] text-black rounded-[9px]`,
};
</script>

<style></style>
