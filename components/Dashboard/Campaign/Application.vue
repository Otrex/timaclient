<template>
  <article
    class="border border-solid border-[#E7E7E7] px-[1.25rem] py-[0.9375rem]"
  >
    <div class="flex flex-row mb-[1.5625rem] justify-between">
      <div class="flex flex-row gap-[0.75rem]">
        <div class="flex flex-row items-center">
          <div class="w-[2rem] h-[2rem] rounded-full overflow-hidden">
            <img
              :src="props.profilePicture"
              alt="profile picture"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <p class="nl">{{ props.name }}</p>
          <p class="sm text-[color:--clr-grey-300]">{{ props.type }}</p>
        </div>
      </div>
      <div class="flex items-center">
        <div class="flex gap-[0.75rem]">
          <template v-for="(social, idx) in socials" :key="idx">
            <UtSvg :name="social" w="1.3125rem" h="1.3125rem" dim />
          </template>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-[2.25rem]">
      <template v-for="(qa, idx) in props.questionAndAnswers" :key="idx">
        <div>
          <p class="nl mb-[1.3125rem]">Q: {{ qa.question }}</p>
          <p class="nl">A: {{ qa.answer }}</p>
        </div>
      </template>
    </div>

    <div class="flex mt-[2rem] mb-[.5rem]">
      <UiButtonDefault
        @click="$emit('accept', props.id)"
        label="Accept"
        variant="primary"
        class="px-[1rem]"
      />
      <UiButtonDefault
        label="View"
        @click="$emit('view', props.id)"
        variant="inverse-primary"
        class="px-[1rem]"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number | string;
  name: string;
  type: string;
  socials: string[];
  profilePicture: string;
  questionAndAnswers: {
    question: string;
    answer: string;
  }[];
}>();

const socials = computed(() => props.socials.map((s) => `socials/${s}-lg`));
</script>

<style></style>
