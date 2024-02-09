<template>
  <div
    class="var p-[1.25rem] pt-[2.5rem] rounded-[1.25rem] bg-gradient-to-br from-[--from] to-[--to]"
  >
    <h3 class="text-white text-[1.5rem]">{{ props.title }}</h3>
    <div
      class="flex flex-wrap gap-[0.75rem] mx-auto justify-center max-w-[15rem] w-full mt-[2.0625rem] mb-[3.75rem]"
    >
      <div
        class="w-[4rem] overflow-clip rounded-[0.625rem] aspect-square"
        v-for="(influencer, idx) in props.influencers"
        :key="idx"
      >
        <img
          :src="influencer.profilePicture"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
    <div class="text-right text-white text-[0.875rem]">
      <a class="underline underline-offset-2">See more</a>
    </div>
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
  influencers?: Influencer[];
}>();

const bg = computed(() => ({
  from: props.bg?.from,
  to: props.bg?.to,
}));
</script>

<style scoped>
/* .dark div {
  background: yellow;
} */

.var {
  --from: v-bind("bg.from");
  --to: v-bind("bg.to");
}
</style>
