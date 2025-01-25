<template>
  <div class="relative mt-0.5 inline-flex flex-col">
    <!-- Trigger Button -->
    <button
      class="flex items-center justify-between w-full px-3 py-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-left hover:border-gray-400 focus:ring-2 focus:ring-blue-500"
      :class="sizeClasses"
      @click="toggleDropdown"
    >
      <span class="pl-8 px-5" :class="!selectedLabel && 'text-gray-400'">{{
        selectedLabel || placeholder
      }}</span>
      <IconChevronDown class="w-4 h-4 text-gray-400 float-right ml-2 right-2" />
      <IconCalendar class="absolute w-4 h-4 text-gray-400" />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute top-full mt-2 w-full overflow-clip bg-white dark:bg-gray-800 dark:border-gray-600 border rounded-xl shadow-lg z-10"
    >
      <ul class="max-h-40 overflow-auto">
        <li
          v-for="option in options"
          :key="option.value"
          class="px-4 py-2 cursor-pointer capitalize text-gray-600 dark:text-gray-400 hover:dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-300"
          :class="sizeClasses"
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
  ChevronDown as IconChevronDown,
  Calendar as IconCalendar,
} from "lucide-vue-next";
import { onMounted, onUnmounted } from "vue";

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

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".relative")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "py-1 text-[0.8125rem]";
    case "lg":
      return "py-3 text-[1.125rem]";
    default:
      return "py-2 text-[1rem]";
  }
});
</script>

<style scoped>
/* Optional: Tailwind can handle most of the styling, but you can include custom styles here if needed */
</style>
