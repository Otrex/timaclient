<template>
  <button v-bind="$attrs" :class="[variants[props.variant], 'pad']">
    <slot> {{ props.label }} </slot>
  </button>
</template>

<script setup lang="ts">
interface IProps {
  variant:
    | "primary"
    | "secondary"
    | "inverse-primary"
    | "info-outline"
    | "info";
  leftIcon?: string;
  rightIcon?: string;
  slotted?: boolean;
  label?: string;
  p?: string;
}
const props = defineProps<IProps>();

const variants = {
  primary: `bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 text-white rounded-[40px] disabled:bg-red-400`,
  secondary: `bg-transparent hover:bg-[#D9D9D9] outline outline-solid outline-[#D9D9D9] focus:ring-4 focus:ring-[#D9D9D9] text-black rounded-[9px]`,
  "info-outline": `inf leading-0 border border-solid border-[--clr-blue-500] rounded-[0.625rem] text-[--clr-blue-500]`,
  info: `bg-[--clr-blue-100] inf rounded-[0.625rem] text-[--clr-blue-700]`,
  "inverse-primary": `hover:bg-slate-50 focus:ring-4 text-[#EC2B29] focus:ring-red-100 text-white rounded-[40px] disabled:opacity-[.5]`,
};
</script>

<style scoped>
.pad.inf {
  padding: v-bind("props.p");
}
</style>
