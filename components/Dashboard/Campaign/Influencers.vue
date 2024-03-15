<template>
  <div class="mt-[1.4375rem]">
    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Category <sub class="md:block">(select all that apply)</sub>
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          class="w-full"
          :error-message="
            v$.influencerCategory?.$errors[0]?.$message.toString()
          "
          v-model="campaignStore.influencer.influencerCategory"
          :options="tools.generationOptions(industries)"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Audience size <sub class="md:block">(select all that apply)</sub>
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          class="w-full"
          :error-message="v$.audienceSize?.$errors[0]?.$message.toString()"
          :options="tools.generationOptions(options?.size || [])"
          v-model="campaignStore.influencer.audienceSize"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Audience Gender <sub class="md:block">(select all that apply)</sub>
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          class="w-full"
          :error-message="v$.audienceGender?.$errors[0]?.$message.toString()"
          v-model="campaignStore.influencer.audienceGender"
          :options="tools.generationOptions(options?.gender || [])"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Audience Age group <sub class="md:block">(select all that apply)</sub>
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          class="w-full"
          v-model="campaignStore.influencer.audienceAgeGroup"
          :error-message="v$.audienceAgeGroup?.$errors[0]?.$message.toString()"
          :options="tools.generationOptions(options?.ageGroup || [])"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Audience Location <sub class="md:block">(select all that apply)</sub>
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          v-model="campaignStore.influencer.audienceLocation"
          :error-message="v$.audienceLocation?.$errors[0]?.$message.toString()"
          class="w-full"
          :options="locations"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Core } from "~/lib/interfaces";
import type { UnPartial } from "~/lib/interfaces/utils";

const rules = useValidationRules();
const optionsStore = useOptionsStore();
const campaignStore = useCampaignStore();

const options = computed(() => optionsStore.$campaignOptions[0]);
const industries = computed(() => optionsStore.$industries);
const locations = computed(() => optionsStore.$countries);

const v$ = useValidator(
  rules.CREATE_CAMPAIGN_INFLUENCERS,
  campaignStore.influencer as UnPartial<Core.Campaign["influencer"]>,
  { $autoDirty: true }
);

defineExpose({
  next: async () => {
    const v = await v$.value.$validate();
    if (!v) return;
    navigateTo({
      query: {
        tab: constants.BRAND_CREATIVE,
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
