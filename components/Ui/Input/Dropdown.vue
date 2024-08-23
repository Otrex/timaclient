<template>
  <div
    tabindex="1"
    class="relative inline-block mb-[0.0125rem]"
    ref="dropdownRef"
  >
    <button
      @click="toggleDropdown"
      class="px-3 py-3 border border-gray-300 rounded-[10px] bg-white w-full cursor-pointer"
    >
      <slot
        name="select"
        :is-placeholder="!props.modelValue"
        :data="props.modelValue || props.placeholder"
        :isOpen="isOpen"
        >{{ props.modelValue || props.placeholder }}</slot
      >
    </button>
    <ul
      v-if="isOpen"
      class="absolute top-full w-full left-0 z-50 min-w-[160px] py-1 mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
    >
      <template v-for="(option, idx) in props.options" :key="idx">
        <li @click="() => selectOption(option)">
          <slot name="item" :data="option">{{ option }}</slot>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["update:modelValue", "change", "input"]);
const props = defineProps({
  placeholder: {
    type: String,
    default: "Select an option",
  },
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Number, Object],
    default: undefined,
  },
});

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: any) => {
  emit("update:modelValue", option);
  emit("change", option);
  isOpen.value = false;
};

const closeDropdown = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});

defineExpose({ selectOption });
</script>
