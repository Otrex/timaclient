<template>
  <div class="relative dev inline-flex flex-col w-full">
    <!-- Trigger Button -->
    <button
      class="flex items-center justify-between w-full rounded border bg-white text-left hover:border-gray-400 focus:ring-2 focus:ring-blue-500"
      :class="sizeClasses"
      @click="toggleDropdown"
    >
      <span class="pl-8">{{ selectedLabel || placeholder }}</span>
      <IconChevronDown class="w-4 h-4 text-gray-400 absolute right-2" />
      <IconCalendar class="absolute left-2 w-4 h-4 text-gray-400" />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute top-full mt-2 w-full bg-white border rounded shadow-lg z-10"
    >
      <ul class="max-h-40 overflow-auto">
        <li
          v-for="option in options"
          :key="option.value"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowDown as IconChevronDown,
  Calendar as IconCalendar,
} from "lucide-vue-next";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: false,
  },
  options: {
    type: Array as PropType<Array<{ label: string; value: string | number }>>,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Select an option",
  },
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "md",
  },
});
const isOpen = ref(false);
const selectedLabel = computed(() => {
  const selected = props.options.find(
    (option) => option.value === props.modelValue
  );
  return selected ? selected.label : null;
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: { label: string; value: string | number }) => {
  emits("update:modelValue", option.value);
  isOpen.value = false;
};

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "py-1 text-sm";
    case "lg":
      return "py-3 text-lg";
    default:
      return "py-2 text-md";
  }
});
</script>

<style scoped>
/* Optional: Tailwind can handle most of the styling, but you can include custom styles here if needed */
</style>
