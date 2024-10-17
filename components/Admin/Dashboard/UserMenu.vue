<template>
  <div
    class="inline-flex items-center gap-[0.5rem] px-[0.875rem] py-[0.5625rem] rounded-md hover:outline-slate-200 hover:outline outline-solid dark:hover:bg-slate-600 active:ring-4 active:ring-slate-200 flex-row"
  >
    <div class="flex items-center gap-[0.5rem]">
      <div>
        <div
          class="w-[2.375rem] h-[2.375rem] overflow-hidden bg-[#FFCC9D] rounded-full"
        >
          <UiImg
            :src="tools.removeDuplicateURL(props.image)"
            class="object-cover w-[2.375rem] h-[2.375rem]"
            alt="avatar"
            lazy
          />
        </div>
      </div>
      <div class="select-none whitespace-nowrap">
        <div>{{ props.name.trim() || "Admin" }}</div>
        <!--<div class="text-xs">{{ props.type }}</div>-->
      </div>
    </div>
    <!--    <div>
        <UtSvg name="down-caret" class="w-[0.75rem] h-[0.375rem] m-[0.375rem]" />
      </div> -->
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    image?: string;
    type: string;
  }>(),
  {
    image: "~/assets/img/avatar.png",
  }
);
</script>

<style></style>
