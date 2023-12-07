<template>
  <div
    class="inline-block border border-solid border-[#999] rounded-[2.5rem] pr-[0.375rem] pl-[1.5rem] py-[0.375rem]"
  >
    <div class="flex justify-between w-full">
      <div class="flex items-center text-[#999] gap-[1.0625rem]">
        <div v-if="props.icon">
          <UtSvg :name="props.icon" class="w-[1.5625rem] h-[1.5625rem]" />
        </div>
        <p>{{ props.label }}</p>
      </div>
      <div class="flex-1 max-w-[9.75rem]">
        <button
          @click="$emit('action')"
          class="bg-[#F59594] py-[0.375rem] text-white max-w-[9.75rem] w-full rounded-[2.5rem]"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: string;
  label: string;
}>();
const $emit = defineEmits(["action"]);
</script>

<style></style>
