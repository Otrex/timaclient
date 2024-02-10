<template>
  <article
    class="border border-solid bg-white dark:bg-slate-900 border-[#E7E7E7] dark:border-slate-600"
  >
    <div class="max-h-[9.5625rem] overflow-hidden">
      <UiImg
        :src="props.cover"
        class="w-full h-full object-cover object-center"
      />
    </div>
    <div class="px-[1.25rem] py-[2.125rem]">
      <div class="flex flex-row justify-between mb-[1.25rem]">
        <div class="flex gap-[0.75rem] items-center">
          <div
            class="inline-block w-[2rem] h-[2rem] overflow-hidden rounded-full"
          >
            <UiImg
              :src="props.profilePicture"
              class="w-full h-full object-cover"
              alt="profile picture"
            />
          </div>
          <p class="inline-block nl">
            {{ props.name }}
          </p>
        </div>
        <div class="flex gap-[0.75rem]">
          <template v-for="(social, idx) in socials" :key="idx">
            <UtSvg :name="social" w="1.3125rem" h="1.3125rem" dim />
          </template>
        </div>
      </div>

      <div
        class="grid grid-cols-3 md:gap-x-[1.3125rem] mb-[1rem] gap-y-[0.75rem]"
      >
        <div>
          <p class="sm">{{ props.earnedMedia }}</p>
          <p class="sm text-[color:--clr-grey-300]">Earned media</p>
        </div>
        <div>
          <p class="sm">{{ props.engagements }}%</p>
          <p class="sm text-[color:--clr-grey-300]">Engagement</p>
        </div>
        <div>
          <p class="sm">{{ props.likes }}%</p>
          <p class="sm text-[color:--clr-grey-300]">Likes</p>
        </div>
        <div>
          <p class="sm">{{ props.comments }}%</p>
          <p class="sm text-[color:--clr-grey-300]">Comments</p>
        </div>
        <div>
          <p class="sm">{{ props.saved }}%</p>
          <p class="sm text-[color:--clr-grey-300]">Saved</p>
        </div>
      </div>
      <div>
        <p class="sm text-[--clr-grey-300]">
          {{ tools.formatDate(props.date) }}
        </p>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  socialMedia: string[];
  earnedMedia: number;
  engagements: number;
  likes: number;
  comments: number;
  saved: number;
  date: string;
  cover: string;
  profilePicture: string;
}>();

const socials = computed(() => props.socialMedia.map((s) => `socials/${s}-lg`));
</script>

<style></style>
