<template>
  <div
    class="bg-[#F5F7FB] sticky dark:bg-slate-800 flex flex-col justify-between md:w-1/3 h-full p-[1.5rem]"
  >
    <div>
      <h4 class="text-center text-[1.4375rem] mb-[2rem]">{{ props.title }}</h4>
      <div class="mb-5">
        <slot> </slot>
      </div>
    </div>
    <div class="self-center mb-[2.5rem] gap-3">
      <button
        v-if="!props.hideBack"
        class="text-red-600 rounded-[1.25rem] mr-[0.3125rem] active:ring-4 min-w-[9.375rem] py-[0.625rem]"
        @click="emits('back')"
      >
        Go Back
      </button>
      <button
        class="bg-red-600 rounded-[1.25rem] text-white active:ring-4 min-w-[9.375rem] py-[0.625rem] active:ring-red-400"
        @click="emits('next')"
      >
        {{ label || "Next" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["cancel", "next", "back"]);
const props = defineProps<{
  title: string;
  hideBack?: boolean;
  label?: string;
}>();
</script>

<style></style>
