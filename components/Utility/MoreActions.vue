<template>
  <div ref="target" class="inline-block max-w-[30rem] relative">
    <button @click="open = !open" class="px-[.5rem]">
      <UtSvg name="actions" dim w="0.25rem" h="1.125rem" />
    </button>

    <transition>
      <div
        v-show="open"
        class="absolute z-10 right-0 top-[50%] min-w-[10rem] mt-[0.9375rem] tima-backdrop-shadow"
      >
        <div class="w-[10rem] p-[0.9375rem] bg-white dark:bg-slate-600 shadow">
          <button class="hover:bg-slate-200 px-3 py-1">Print Receipt</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
const props = defineProps<{
  dataId?: string | number;
}>();

const open = ref(false);
const target = ref<HTMLDivElement>();

onClickOutside(target, (event) => {
  open.value = false;
  console.log("clicked outside " + props.dataId);
});
</script>

<style></style>
