<template>
  <div>
    <div class="flex flex-row justify-between">
      <p class="nl mb-[1.125rem]">Select a social media channel</p>
      <button class="flex items-center active:bg-slate-100">
        <UtSvg name="close" class="w-[0.8125rem] h-[0.8125rem] text-black" />
        &nbsp; Clear filter
      </button>
    </div>
    <div class="flex flex-wrap gap-[1.25rem] mb-[3.5rem]">
      <UiInputOption
        name="socials"
        value="instagram"
        main-class="!rounded-[0.5625rem] flex items-center justify-center w-full max-w-[3.6875rem] h-[2.8125rem]"
      >
        <UtSvg
          name="socials/instagram-lg"
          class="w-[1.9375rem] h-[1.3125rem]"
        />
      </UiInputOption>
      <UiInputOption
        name="socials"
        value="youtube"
        main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
      >
        <UtSvg name="socials/youtube-lg" class="w-[1.9375rem] h-[1.3125rem]" />
      </UiInputOption>
      <UiInputOption
        name="socials"
        value="tiktok"
        main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
      >
        <UtSvg name="socials/tiktok-lg" class="w-[1.9375rem] h-[1.3125rem]" />
      </UiInputOption>
      <UiInputOption
        name="socials"
        value="facebook"
        main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
      >
        <UtSvg name="socials/facebook-lg" class="w-[1.9375rem] h-[1.3125rem]" />
      </UiInputOption>
      <UiInputOption
        name="socials"
        value="twitter"
        main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
      >
        <UtSvg name="socials/twitter-lg" class="w-[1.9375rem] h-[1.3125rem]" />
      </UiInputOption>
      <UiInputOption
        name="socials"
        value="linkedin"
        main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
      >
        <UtSvg name="socials/linkedin-lg" class="w-[1.9375rem] h-[1.3125rem]" />
      </UiInputOption>
    </div>

    <div class="grid grid-cols-3 items-end gap-x-[3rem] gap-y-[1.75rem]">
      <div>
        <label class="block mb-[0.875rem]">Category</label>
        <UiInputSelect
          :options="tools.generationOptions(['Main page', 'story'])"
          class="w-full"
          placeholder="-- Select --"
        />
      </div>
      <div>
        <label class="block mb-[0.875rem]">Campaign type</label>
        <UiInputSelect
          :options="tools.generationOptions(['Main page', 'story'])"
          class="w-full"
          placeholder="-- Select --"
        />
      </div>
      <div>
        <label class="block mb-[0.875rem]">Budget range</label>
        <UiInputSelect
          :options="tools.generationOptions(['Main page', 'story'])"
          class="w-full"
          placeholder="-- Select --"
        />
      </div>
      <div>
        <label class="block mb-[0.875rem]">Audience demographics</label>
        <UiInputSelect
          :options="tools.generationOptions(['Main page', 'story'])"
          class="w-full"
          placeholder="-- Select --"
        />
      </div>
      <div>
        <label class="block mb-[0.875rem]">Campaign status</label>
        <UiInputSelect
          :options="tools.generationOptions(['Main page', 'story'])"
          class="w-full"
          placeholder="-- Select --"
        />
      </div>
      <div>
        <UiButtonDefault
          variant="primary"
          label="Search"
          class="w-full py-[0.75rem]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    category: string;
    campaignType: string;
    budgetRange: string;
    audienceDemography: string;
    campaignStatus: string;
  };
}>();
// Do it one one
const form = computed({
  get() {
    return props.modelValue;
  },
  set(value) {},
});
</script>

<style></style>
