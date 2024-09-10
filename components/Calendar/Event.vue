<template>
  <div class="relative h-full">
    <div @click="onOpen" class="bg-[#BBE1FF] h-full rounded-lg">
      <div class="bg-[#65BCFF]/80 border-b border-dashed border-black px-4 py-2 rounded-t-lg">
        {{ time }}
      </div>
      <div class="w-[calc(100%-10px)] p-3">
        {{ title }}
      </div>
    </div>
    <Teleport to="body">
      <div v-if="open" class="absolute max-w-[43.75rem] z-10 w-full"
        :style="{ left: position.x + 'px', top: position.y + 'px' }">
        <CalendarEditEvent @close="open = false" />
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  time: String,
  title: String,
});
const position = ref({
  x: 0,
  y: 0,
});

const open = ref(false);

function onOpen(e: MouseEvent) {
  position.value = {
    x: e.clientX,
    y: e.clientY,
  };
  open.value = !open.value;
}
</script>

<style></style>
