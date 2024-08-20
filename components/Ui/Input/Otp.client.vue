<template>
  <HOtpInput
    :length="props.length"
    :type="props.type"
    :value="modelValue"
    @on-finish="handleFinish"
    @on-change="handleChange"
    wrapperClassName="otp-input"
    aria-autocomplete="none"
    autocomplete="off"
    :inputClassName="`i-vars ${props.inputClass} tm-input`"
    :outlined="true"
    ref="otpInput"
    :only-number="true"
    :allow-paste="allowPaste"
    inputmode="numeric"
    autocorrect="off"
    spellcheck="false"
  />
</template>

<script setup>
import pkg from "@healerlab/vue3-simple-otp-input";
const { HOtpInput } = pkg;

const otpInput = ref();
const props = defineProps({
  size: {
    default: "4.375rem",
    type: String,
  },
  length: {
    type: Number,
    default: 4,
  },
  gap: {
    default: "2.1875rem",
    type: String,
  },
  type: {
    default: "text",
    type: String,
  },
  modelValue: {
    type: String,
  },
  inputClass: {
    type: String,
  },
  allowPaste: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(["finish", "change", "update:modelValue"]);

function handleFinish(otpCode) {
  emits("finish", otpCode);
}

function handleChange(otpCode) {
  emits("change", otpCode);
  emits("update:modelValue", otpCode);
}
</script>

<style scoped>
.otp-input {
  --i-gap: v-bind("props.gap");
  @apply inline-flex gap-[calc(var(--i-gap)_*_(1_/_3))] md:gap-[--i-gap];
}
.otp-input :deep(input) {
  --i-size: v-bind("props.size");
  @apply w-[calc(var(--i-size)_*_(2_/_3))] md:w-[--i-size] aspect-square;
  outline: none !important;
  border: 0.0625rem solid black !important;
  text-align: center;
}
.otp-input :deep(input):active {
  outline: 0.0625rem solid black;
}
.otp-input :deep(input):first-child {
  margin-left: 0;
}
.otp-input :deep(input):focus {
  outline: none;
}
.otp-input :deep(span) {
  padding: 0 0rem 0 0.625rem;
  font-size: 1.875rem;
}
</style>
