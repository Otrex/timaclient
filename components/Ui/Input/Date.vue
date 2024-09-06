<template>
  <div class="relative">
    <div class="relative">
      <input
        class="w-full h-full border rounded py-[0.625rem] pl-10"
        :value="display"
        @click="showCalendar = !showCalendar"
      />
      <UtSvg
        name="calendar"
        class="w-[1.125rem] absolute left-0 top-[50%] ml-3 transform -translate-y-[50%] h-[1.125rem]"
      />
    </div>
    <div
      class="absolute right-0 mt-2 bg-white z-[100] flex"
      v-if="showCalendar"
    >
      <DatePicker v-model.range="range" mode="date" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";

const props = defineProps({
  modelValue: {
    type: [Date, Array, Object],
    default: () => new Date(),
  },
});

const showCalendar = ref(false);

const display = computed(() => {
  if (typeof props.modelValue == "object") {
    return `${props.modelValue.start?.toDateString()} - ${props.modelValue.end?.toDateString()}`;
  } else {
    return props.modelValue;
  }
});

const emits = defineEmits(["update:modelValue"]);

const range = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>
