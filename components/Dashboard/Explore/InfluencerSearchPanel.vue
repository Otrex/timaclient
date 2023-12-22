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
        type="single"
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
        type="single"
        value="youtube"
        main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
      >
        <UtSvg name="socials/youtube-lg" class="w-[1.9375rem] h-[1.3125rem]" />
      </UiInputOption>
      <UiInputOption
        name="socials"
        type="single"
        value="tiktok"
        main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
      >
        <UtSvg name="socials/tiktok-lg" class="w-[1.9375rem] h-[1.3125rem]" />
      </UiInputOption>
      <UiInputOption
        name="socials"
        type="single"
        value="facebook"
        main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
      >
        <UtSvg name="socials/facebook-lg" class="w-[1.9375rem] h-[1.3125rem]" />
      </UiInputOption>
      <UiInputOption
        type="single"
        name="socials"
        value="twitter"
        main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
      >
        <UtSvg name="socials/twitter-lg" class="w-[1.9375rem] h-[1.3125rem]" />
      </UiInputOption>
      <UiInputOption
        name="socials"
        type="single"
        value="linkedin"
        main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
      >
        <UtSvg name="socials/linkedin-lg" class="w-[1.9375rem] h-[1.3125rem]" />
      </UiInputOption>
    </div>

    <div
      class="grid md:grid-cols-3 items-end sm:gap-x-[1.75rem] md:gap-x-[3rem] gap-y-[1.75rem]"
    >
      <div>
        <label class="block mb-[0.875rem]">Influencer location</label>
        <UiInputSelect
          :options="tools.generationOptions(['Main page', 'story'])"
          class="w-full"
          placeholder="-- Select --"
        />
      </div>
      <div>
        <label class="block mb-[0.875rem]">Influencer size</label>
        <UiInputSelect
          :options="tools.generationOptions(['0 - 3', '4 - 5'])"
          class="w-full"
          placeholder="-- Select --"
        />
      </div>
      <div>
        <label class="block mb-[0.875rem]">Audience location</label>
        <UiInputSelect
          :options="tools.generationOptions(['Main page', 'story'])"
          class="w-full"
          placeholder="-- Select --"
        />
      </div>
      <div>
        <label class="block mb-[0.875rem]">Audience age range</label>
        <UiInputSelect
          :options="tools.generationOptions(['Main page', 'story'])"
          class="w-full"
          placeholder="-- Select --"
        />
      </div>
      <div>
        <label class="block mb-[0.875rem]">Audience Gender</label>
        <UiInputSelect
          :options="tools.generationOptions(['Main page', 'story'])"
          class="w-full"
          placeholder="-- Select --"
        />
      </div>
      <div>
        <label class="block mb-[0.875rem]">Category</label>
        <UiInputSelect
          :options="tools.generationOptions(['Main page', 'story'])"
          class="w-full"
          placeholder="Select categories"
        />
      </div>
      <div>
        <label class="block mb-[0.875rem]">Max price per post</label>
        <UiInputTextSelect
          :options="tools.generationOptions(['NOK', 'story'])"
          class="w-full"
          placeholder="No greater than"
        />
      </div>
      <div class="flex flex-row gap-[0.75rem]">
        <div>
          <label class="block mb-[0.875rem]">Min. reach</label>
          <UiInputText class="w-full" placeholder="At least" />
        </div>
        <div>
          <label class="block mb-[0.875rem]">Max. reach</label>
          <UiInputText class="w-full" placeholder="Up to" />
        </div>
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
  modelValue?: {
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
