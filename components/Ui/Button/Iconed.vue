<template>
  <button v-bind="$attrs" :class="[variants[props.variant]]">
    <div class="items-center gap-[0.625rem] inline-flex">
      <div v-if="props.leftIcon">
        <UtSvg :name="props.leftIcon" class="w-[1.5rem] h-[1.5rem]" />
      </div>
      <div>
        <slot> {{ props.label }} </slot>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
interface IProps {
  variant: "primary" | "secondary" | "default" | "outline-plain";
  leftIcon?: string;
  rightIcon?: string;
  slotted?: boolean;
  label?: string;
}
const props = defineProps<IProps>();

const variants = {
  "outline-plain":
    "border border-gray-500 dark:border-white text-left rounded-lg px-3 pr-5",
  default: `bg-slate-400 hover:bg-slate-600 focus:ring-4 focus:ring-slate-300 text-white rounded-[40px] disabled:bg-slate-200`,
  primary: `bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 text-white rounded-[40px] disabled:bg-red-400`,
  secondary: `bg-transparent hover:bg-[#D9D9D9] outline outline-solid outline-[#D9D9D9] focus:ring-4 focus:ring-[#D9D9D9] text-black rounded-[9px]`,
};
</script>

<style></style>
