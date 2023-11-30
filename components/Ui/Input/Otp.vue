<template>
  <HOtpInput
    :length="6"
    :type="props.type"
    :value="modelValue"
    @on-finish="handleFinish"
    @on-change="handleChange"
    wrapperClassName="otp-input"
    :inputClassName="inputClass"
    :outlined="true"
    ref="otpInput"
    :only-number="true"
    :allow-paste="allowPaste"
  />
</template>

<script setup>
import { HOtpInput } from "@healerlab/vue3-simple-otp-input";

const otpInput = ref();
const props = defineProps({
  size: {
    default: "70px",
    type: String,
  },
  gap: {
    default: "35px",
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
  gap: 35px;
  gap: v-bind("props.gap");
}
.otp-input :deep(input) {
  outline: none;
  width: 70px;
  width: v-bind("props.size");
  aspect-ratio: 1/1;
  border: none;
  text-align: center;
}
.otp-input :deep(input):active {
  outline: 1px solid black;
}
.otp-input :deep(input):first-child {
  margin-left: 0;
}
.otp-input :deep(input):focus {
  outline: none;
}
.otp-input :deep(span) {
  padding: 0 0px 0 10px;
  font-size: 30px;
}
</style>
