<template>
  <div
    class="var p-[1.25rem] pt-[2.5rem] rounded-[1.25rem] bg-gradient-to-br from-[--from] to-[--to]"
  >
    <h3 class="text-white text-[1.5rem]">{{ props.title }}</h3>
    <template v-if="$props.influencers && $props.influencers.length > 0">
      <div
        class="flex flex-wrap gap-[0.75rem] mx-auto justify-center max-w-[15rem] w-full mt-[2.0625rem] mb-[3.75rem]"
      >
        <div
          class="w-[4rem] overflow-clip rounded-[0.625rem] aspect-square"
          v-for="(influencer, idx) in props.influencers"
          :key="idx"
        >
          <template v-if="typeof influencer === 'string'">
            <div
              class="w-full relative tag h-full p-5 flex items-center justify-center text-[0.75rem] bg-red-600 text-white"
            >
              {{ init(influencer) }}
              <div class="absolute tag-item bg-black">{{ influencer }}</div>
            </div>
          </template>
          <template v-else>
            <!--  <img
              :src="influencer.profilePicture"
              class="w-full h-full object-cover"
            /> -->
            <UiImg
              :src="influencer.profilePicture"
              class="w-full h-full object-cover"
            />
          </template>
        </div>
      </div>
      <div class="text-right text-white text-[0.875rem]">
        <a class="underline underline-offset-2">See more</a>
      </div>
    </template>
    <template v-else>
      <div
        class="h-[calc(100%_-_2.5rem)] text-white flex items-center justify-center"
      >
        No Influencers
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Influencer } from "~/lib/interfaces/core";

const props = defineProps<{
  bg: {
    from: string;
    to: string;
  };
  title: string;
  images?: string[];
  influencers?: (Influencer | string)[];
}>();

const bg = computed(() => ({
  from: props.bg?.from,
  to: props.bg?.to,
}));

function init(string: string) {
  return string.slice(0, 2);
}
</script>

<style scoped>
/* .dark div {
  background: yellow;
} */

.var {
  --from: v-bind("bg.from");
  --to: v-bind("bg.to");
}

.tag:hover .tag-item {
  display: block;
}
.tag .tag-item {
  display: none;
}
</style>
