<template>
  <div class="min-w-64 relative">
    <!-- Search Input -->
    <div
      @click="open = !open"
      class="flex flex-row bg-gray-100 py-3 rounded-3xl"
    >
      <div class="flex flex-wrap px-4 w-full">
        <template v-if="entries.length">
          <span v-for="(entry, idx) in entries" :key="idx">
            <slot name="entry" :entry="entry"></slot>
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
      v-if="open"
      class="absolute w-full mt-2 px-4 bg-gray-100 rounded-md shadow-lg"
    >
      <template v-if="options.length">
        <ul>
          <li
            v-for="(option, index) in options"
            :key="index"
            class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
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
    entries: any[];
    options: any[];
    placeholder?: string;
  }>(),
  {
    placeholder: "",
    options: () => [],
    entries: () => [],
  }
);
</script>

<style scoped>
/* Customize the dropdown if needed */
</style>
