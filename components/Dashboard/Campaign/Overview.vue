<template>
  <div class="mt-[1.4375rem]">
    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Campaign name </label>
      </div>
      <div class="md:w-3/4">
        <UiInputText
          v-model="campaignStore.newCampaign.campaignName"
          :error-message="v$.campaignName?.$errors[0]?.$message.toString()"
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
          v-model="campaignStore.newCampaign.campaignAbout"
          :error-message="v$.campaignAbout?.$errors[0]?.$message.toString()"
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
          v-model="campaignStore.newCampaign.campaignWebsite"
          :error-message="v$.campaignWebsite?.$errors[0]?.$message.toString()"
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
          :options="currency"
          :error-message="v$.planningBudget?.$errors[0]?.$message.toString()"
          v-model="campaignStore.newCampaign.planningBudget"
          placeholder="Add Your Budget"
          type="number"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block"> Social media platforms </label>
      </div>
      <div class="md:w-3/4">
        <div
          :class="[
            'grid grid-cols-2 md:grid-cols-3 gap-[1.875rem]',
            v$.socialMediaPlatform?.$errors[0]?.$message.toString() &&
              'border border-red-500 border-solid rounded-[20px] p-3',
          ]"
        >
          <UiInputOption
            type="multi"
            v-model="campaignStore.newCampaign.socialMediaPlatform"
            name="social-option"
            value="instagram"
            main-class="!rounded-[1.25rem] text-center py-[1.4375rem]"
          >
            <UtSvg name="socials/instagram-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            name="social-option"
            v-model="campaignStore.newCampaign.socialMediaPlatform"
            value="tiktok"
            main-class="!rounded-[1.25rem] text-center py-[1.4375rem]"
          >
            <UtSvg name="socials/tiktok-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            name="social-option"
            v-model="campaignStore.newCampaign.socialMediaPlatform"
            value="twitter"
            main-class="!rounded-[1.25rem] text-center py-[1.4375rem]"
          >
            <UtSvg name="socials/twitter-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            name="social-option"
            v-model="campaignStore.newCampaign.socialMediaPlatform"
            value="youtube"
            main-class="!rounded-[1.25rem] text-center py-[1.4375rem]"
          >
            <UtSvg name="socials/youtube-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            name="social-option"
            v-model="campaignStore.newCampaign.socialMediaPlatform"
            value="facebook"
            main-class="!rounded-[1.25rem] text-center py-[1.4375rem]"
          >
            <UtSvg name="socials/facebook-lg" class="w-[3rem] h-[3rem]" />
          </UiInputOption>

          <UiInputOption
            type="multi"
            name="social-option"
            v-model="campaignStore.newCampaign.socialMediaPlatform"
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
import type { UseEventBusReturn } from "@vueuse/core";

const props = defineProps<{
  bus?: UseEventBusReturn<string, any>;
}>();

const rules = useValidationRules();
const campaignStore = useCampaignStore();
const currency = tools.generationOptions(["NGN", "USD"]).map((e) => ({
  ...e,
  label: e.label.toUpperCase(),
}));
const v$ = useValidator(
  rules.CREATE_CAMPAIGN_OVERVIEW,
  campaignStore.newCampaign,
  { $autoDirty: true }
);

async function proceed() {
  if (!(await v$.value.$validate())) return;
  navigateTo({
    query: {
      tab: constants.BRAND_INFLUENCERS,
    },
  });
}

props.bus?.on((message) => {
  if (message === "OVERVIEW") {
    proceed();
  }
});
</script>
