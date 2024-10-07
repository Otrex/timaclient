<template>
  <div class="mb-4" :style="style">
    <div class="flex justify-between">
      <div>
        <h3 class="text-base font-semibold">{{ title }}</h3>
        <p class="text-sm text-gray-500">{{ message }}</p>
        <div class="flex items-center text-sm text-gray-400 mt-2">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 7V3M16 7V3M5 11h14M5 19h14M7 23h10a2 2 0 002-2v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z">
            </path>
          </svg>
          <span>{{ time }}</span>
        </div>
        <div>
          <span class="flex items-center">
            <span class="w-2 h-2 rounded-full mr-1 bg-[--status]">&nbsp;</span>
            <span class="text-[--status] text-sm">{{ status }}</span>
          </span>
        </div>
      </div>

      <div>
        <NuxtLink :to="`/dashboard/${route.params.type}/campaigns/applications/${2}/schedule-post`"
          v-if="props.status === 'Accepted'"
          class="text-[#545454] text-base leading-[18.75px] border border-[#BBBBBB] rounded-lg p-4">
          Schedule Post
        </NuxtLink>
        <NuxtLink :to="`/dashboard/${route.params.type}/campaigns/applications/${2}/content-revision`"
          v-if="props.status === 'Rejected'"
          class="text-[#545454] text-base leading-[18.75px] border border-[#BBBBBB] rounded-lg p-4">
          Review</NuxtLink>
        <NuxtLink :to="`/dashboard/${route.params.type}/campaigns/applications/${2}/content-revision`"
          v-if="props.status === 'Draft'"
          class="text-[#545454] text-base leading-[18.75px] border border-[#BBBBBB] rounded-lg p-4">Schedule
          Submit Content</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  message: String,
  time: String,
  status: String,
  style: String,
});

const route = useRoute();

</script>
