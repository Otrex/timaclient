<template>
  <div class="mt-[1.4375rem]">
    <div class="flex flex-row w-full mb-[1.75rem]">
      <div class="w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Campaign name </label>
      </div>
      <div class="w-3/4">
        <UiInputText class="w-full" placeholder="Write campaign name here" />
      </div>
    </div>

    <div class="flex flex-row w-full mb-[1.75rem]">
      <div class="w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> About campaign </label>
      </div>
      <div class="w-3/4">
        <UiInputTextArea class="w-full h-[9.125rem]" placeholder="Brief" />
      </div>
    </div>

    <div class="flex flex-row w-full mb-[1.75rem]">
      <div class="w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Campaign website <sub class="block">(if available)</sub>
        </label>
      </div>
      <div class="w-3/4">
        <UiInputText class="w-full" placeholder="Add campaign website" />
      </div>
    </div>

    <div class="flex flex-row w-full mb-[1.75rem]">
      <div class="w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Planned Budget </label>
      </div>
      <div class="w-3/4">
        <UiInputTextSelect
          :options="tools.generationOptions(['NGN', 'USD'])"
          placeholder="Add campaign website"
        />
      </div>
    </div>

    <div class="flex flex-row w-full mb-[1.75rem]">
      <div class="w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Cost per post </label>
      </div>
      <div class="w-3/4">
        <UiInputTextSelect
          :options="tools.generationOptions(['NGN', 'USD'])"
          placeholder="Add campaign website"
        />
      </div>
    </div>

    <div class="flex flex-row w-full mb-[1.75rem]">
      <div class="w-1/4 pt-2">
        <label class="w-full block"> Social media platforms</label>
      </div>
      <div class="w-3/4">
        <div class="grid md:grid-cols-3 gap-[1.875rem]">
          <UiInputOption
            type="multi"
            v-model="socials"
            value="instagram"
            main-class="!rounded-[1.25rem] text-center"
          >
            <UtSvg name="socials/instagram-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            v-model="socials"
            value="tiktok"
            main-class="!rounded-[1.25rem] text-center"
          >
            <UtSvg name="socials/tiktok-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            v-model="socials"
            value="twitter"
            main-class="!rounded-[1.25rem] text-center"
          >
            <UtSvg name="socials/twitter-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            v-model="socials"
            value="youtube"
            main-class="!rounded-[1.25rem] text-center"
          >
            <UtSvg name="socials/youtube-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            v-model="socials"
            value="facebook"
            main-class="!rounded-[1.25rem] text-center"
          >
            <UtSvg name="socials/facebook-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            v-model="socials"
            value="linkedin"
            main-class="!rounded-[1.25rem] text-center"
          >
            <UtSvg name="socials/linkedin-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const socials = ref([]);
</script>

<style></style>
