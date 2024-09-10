<template>
  <div class="relative flex flex-row gap-3">
    <div :class="!editable && 'select-none'" class="w-full">
      <div
        :class="editable && '-z-10'"
        class="w-full h-full absolute top-0 left-0"
      >
        &nbsp;
      </div>
      <slot :disabled="!editable"></slot>
    </div>
    <button
      class="z-50 flex items-center justify-center bottom-1 p-2 w-[40px] h-[40px] rounded-full cursor-pointer"
      @click="$emit('update:editable', !editable)"
      :class="editable && '!bg-grey-200'"
    >
      <UtSvg name="edit-fresh" class="w-[24px] h-[24px] cursor-pointer" />
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  position: {
    type: String,
    default: "right",
  },
  editable: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:editable"]);
</script>

<style></style>
