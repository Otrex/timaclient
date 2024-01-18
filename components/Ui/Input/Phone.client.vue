<template>
  <div class="inline-block !rounded-[2.5rem]">
    <vue3-reactive-tel-input
      divInputClass="w-full outline-none dark:text-black"
      :class="[
        '!border !border-[#6B7280] dark:text-black !rounded-[2.5rem]',
        props.errorMessage && '!border-red-600',
      ]"
      :inputClass="[
        inputClass,
        'focus:border-none !rounded-tr-[2.5rem] w-full text-[1.1875rem] p-[0.75rem] !rounded-br-[2.5rem]',
      ]"
      dropdownStyle="border-radius: 2.5rem 0px 0px 2.5rem; padding: 0px 1.25rem"
      v-bind="$attrs"
    />
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

<script setup>
import { Vue3ReactiveTelInput } from "vue3-reactive-tel-input";
const props = defineProps({
  errorMessage: String,
  inputClass: {
    type: String,
    default: "",
  },
});
</script>

<style></style>
