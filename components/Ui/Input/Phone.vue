<template>
  <div class="inline-block !rounded-[40px]">
    <vue3-reactive-tel-input
      divInputClass="w-full outline-none"
      class="outline outline-[#BBBBBB] !rounded-[40px] !border-none"
      :inputClass="[
        inputClass,
        'focus:border-none !rounded-tr-[40px] w-full text-[19px] p-[12px] !rounded-br-[40px]',
      ]"
      dropdownStyle="border-radius: 40px 0px 0px 40px; padding: 0px 20px"
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
