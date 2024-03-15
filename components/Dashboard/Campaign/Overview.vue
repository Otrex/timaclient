<template>
  <div class="mt-[1.4375rem]">
    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Campaign name </label>
      </div>
      <div class="md:w-3/4">
        <UiInputText
          v-model="campaignStore.overview.name"
          :error-message="v$.name?.$errors[0]?.$message.toString()"
          placeholder="Write campaign name here"
          class="w-full"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> About campaign </label>
      </div>
      <div class="md:w-3/4">
        <UiInputTextArea
          v-model="campaignStore.overview.briefDescription"
          :error-message="v$.briefDescription?.$errors[0]?.$message.toString()"
          class="w-full h-[9.125rem]"
          placeholder="Brief"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Campaign website <sub class="md:block">(if available)</sub>
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputText
          v-model="campaignStore.overview.website"
          :error-message="v$.website?.$errors[0]?.$message.toString()"
          placeholder="Add campaign website"
          class="w-full"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Planned Budget </label>
      </div>
      <div class="md:w-3/4">
        <UiInputTextSelect
          :options="tools.generationOptions(['NGN', 'USD'])"
          :error-message="v$.plannedBudget?.$errors[0]?.$message.toString()"
          v-model="campaignStore.overview.plannedBudget"
          placeholder="Add Your Budget"
          type="number"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Cost per post </label>
      </div>
      <div class="md:w-3/4">
        <UiInputTextSelect
          :options="tools.generationOptions(['NGN', 'USD'])"
          :error-message="v$.costPerPost?.$errors[0]?.$message.toString()"
          v-model="campaignStore.overview.costPerPost"
          placeholder="Add Cost/Post"
          type="number"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block"> Social media platforms</label>
      </div>
      <div class="md:w-3/4">
        <div
          :class="[
            'grid grid-cols-2 md:grid-cols-3 gap-[1.875rem]',
            v$.socialMediaPlatforms?.$errors[0]?.$message.toString() &&
              'border border-red-500 border-solid rounded-[20px] p-3',
          ]"
        >
          <UiInputOption
            type="multi"
            v-model="campaignStore.overview.socialMediaPlatforms"
            name="social-option"
            value="instagram"
            main-class="!rounded-[1.25rem] text-center py-[1.4375rem]"
          >
            <UtSvg name="socials/instagram-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            name="social-option"
            v-model="campaignStore.overview.socialMediaPlatforms"
            value="tiktok"
            main-class="!rounded-[1.25rem] text-center py-[1.4375rem]"
          >
            <UtSvg name="socials/tiktok-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            name="social-option"
            v-model="campaignStore.overview.socialMediaPlatforms"
            value="twitter"
            main-class="!rounded-[1.25rem] text-center py-[1.4375rem]"
          >
            <UtSvg name="socials/twitter-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            name="social-option"
            v-model="campaignStore.overview.socialMediaPlatforms"
            value="youtube"
            main-class="!rounded-[1.25rem] text-center py-[1.4375rem]"
          >
            <UtSvg name="socials/youtube-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            name="social-option"
            v-model="campaignStore.overview.socialMediaPlatforms"
            value="facebook"
            main-class="!rounded-[1.25rem] text-center py-[1.4375rem]"
          >
            <UtSvg name="socials/facebook-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            name="social-option"
            v-model="campaignStore.overview.socialMediaPlatforms"
            value="linkedin"
            main-class="!rounded-[1.25rem] text-center py-[1.4375rem]"
          >
            <UtSvg name="socials/linkedin-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>
        </div>
        <template
          v-if="v$.socialMediaPlatforms?.$errors[0]?.$message.toString()"
        >
          <div class="text-sm text-red-500">
            {{ v$.socialMediaPlatforms?.$errors[0]?.$message }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UnPartial } from "~/lib/interfaces/utils";
import type { Core } from "~/lib/interfaces";

const rules = useValidationRules();
const campaignStore = useCampaignStore();

const v$ = useValidator(
  rules.CREATE_CAMPAIGN_OVERVIEW,
  campaignStore.overview as UnPartial<Core.Campaign["overview"]>,
  { $autoDirty: true }
);

defineExpose({
  next: async () => {
    const v = await v$.value.$validate();
    if (!v) return;
    navigateTo({
      query: {
        tab: constants.BRAND_INFLUENCERS,
      },
    });
  },
});
</script>

<style scoped>
.tima__form {
  @apply flex md:flex-row flex-col w-full mb-[1.75rem];
}
</style>
