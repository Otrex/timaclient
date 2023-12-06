<template>
  <HOtpInput
    :length="props.length"
    :type="props.type"
    :value="modelValue"
    @on-finish="handleFinish"
    @on-change="handleChange"
    wrapperClassName="otp-input"
    :inputClassName="[inputClass, 'tm-input']"
    :outlined="true"
    ref="otpInput"
    :only-number="true"
    :allow-paste="allowPaste"
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
    default: false,
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
  display: inline-flex;
  gap: 2.1875rem;
  gap: v-bind("props.gap");
}
.otp-input :deep(input) {
  /* outline: none; */
  border: 0.0625rem solid black !important;
  width: 4.375rem;
  width: v-bind("props.size");
  aspect-ratio: 1/1;
  /* border: none; */
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
