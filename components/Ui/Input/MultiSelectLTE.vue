<template>
  <div class="min-w-64 relative">
    <!-- Search Input -->
    <div
      @click="open = !open"
      class="flex flex-row bg-gray-100 py-3 rounded-3xl"
    >
      <div class="flex flex-wrap px-4 gap-3 w-full">
        <template v-if="entries.length">
          <span v-for="(entry, idx) in entries" :key="idx">
            <div class="flex flex-row gap-1 items-center">
              <slot name="entry" :entry="entry">{{ entry }}</slot>
              <button @click="() => removeEntry(entry)">
                <UtSvg name="cancel" dim w="1.7rem" h="1.7rem" />
              </button>
            </div>
          </span>
        </template>
        <template v-else>
          {{ placeholder || "Select your desired option" }}
        </template>
      </div>
      <div class="px-4">
        <UtSvg name="down-caret" dim w=".7rem" h=".7rem" />
      </div>
    </div>

    <!-- Dropdown Menu -->
    <div
      v-show="open"
      class="absolute w-full mt-2 px-4 py-4 bg-gray-50 rounded-md shadow-lg"
    >
      <template v-if="options.length">
        <ul>
          <li
            v-for="(option, index) in options"
            :key="index"
            @click="() => makeSelection(option)"
            class="flex items-center px-4 py-2 cursor-pointer rounded-md hover:border hover:bg-gray-100"
          >
            <slot name="option" :option="option">{{ option }}</slot>
          </li>
        </ul>
      </template>
      <template v-else> No Options Available </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false);
const props = withDefaults(
  defineProps<{
    options: any[];
    modelValue?: any;
    placeholder?: string;
  }>(),
  {
    placeholder: "",
    options: () => [],
  }
);

const entries = ref<any[]>([]);

const emit = defineEmits(["update:modelValue"]);

function makeSelection(option: any) {
  open.value = false;
  entries.value.push(option);
  emit("update:modelValue", entries.value);
}

function removeEntry(entry: any) {
  entries.value = entries.value.filter((e) => e !== entry);
  emit("update:modelValue", entries.value);
}

onMounted(() => {
  entries.value =
    typeof props.modelValue === "string"
      ? [props.modelValue]
      : props.modelValue;
});
</script>

<style scoped>
/* Customize the dropdown if needed */
</style>
