<template>
  <div class="inline">
    {{ showFull ? text : truncateDescription(text, max) }}
    <button
      v-if="text?.split(' ').length > max && showBtn"
      @click.prevent.capture="showFull = !showFull"
      class="text-indigo-600 text-sm underline hover:text-indigo-800 ml-1 font-medium"
    >
      {{ showFull ? "Show less" : "View more" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  text?: string;
  max?: number;
  showBtn?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  max: 10,
  showBtn: true,
});

const showFull = ref(false);

const truncateDescription = (text?: string, limit: number = 50): string => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "...";
};
</script>
