<template>
  <div class="inline-block !rounded-[2.5rem]">
    <vue3-reactive-tel-input
      divInputClass="w-full outline-none"
      class="!border !border-[#6B7280] !rounded-[2.5rem]"
      :inputClass="[
        inputClass,
        'focus:border-none !rounded-tr-[2.5rem] w-full text-[1.1875rem] p-[0.75rem] !rounded-br-[2.5rem]',
      ]"
      dropdownStyle="border-radius: 2.5rem 0px 0px 2.5rem; padding: 0px 1.25rem"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
import { Vue3ReactiveTelInput } from "vue3-reactive-tel-input";

const props = defineProps({
  modelValue: String,
  inputClass: {
    type: String,
    default: "",
  },
});
</script>

<style></style>
