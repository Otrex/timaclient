<template>
  <div class="mt-[1.4375rem]">
    <!-- <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block"> Payment type </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelect
          class="w-full"
          v-model="campaignStore.newCampaign"
          :error-message="v$.paymentType?.$errors[0]?.$message.toString()"
          :options="tools.generationOptions(optionsStore.$paymentMethods)"
        />
      </div>
    </div> -->

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Campaign start date
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputText
          v-model="campaignStore.newCampaign.startDate"
          :error-message="v$.startDate?.$errors[0]?.$message.toString()"
          class="max-w-[19.625rem] w-full"
          type="date"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Campaign end date
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputText
          v-model="campaignStore.newCampaign.endDate"
          :error-message="v$.endDate?.$errors[0]?.$message.toString()"
          class="max-w-[19.625rem] w-full"
          type="date"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Content type </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          class="w-full"
          v-model="campaignStore.newCampaign.contentType"
          :error-message="v$.contentType?.$errors[0]?.$message.toString()"
          :options="tools.generationOptions(dataOptions?.contentType || [])"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Content placement
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          class="w-full"
          :error-message="v$.contentPlacement?.$errors[0]?.$message.toString()"
          v-model="campaignStore.newCampaign.contentPlacement"
          :options="
            tools.generationOptions(dataOptions?.contentPlacement || [])
          "
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Creative brief </label>
      </div>
      <div class="md:w-3/4">
        <UiInputTextArea
          v-model="campaignStore.newCampaign.creativeBrief"
          :error-message="v$.creativeBrief?.$errors[0]?.$message.toString()"
          class="w-full h-[9.125rem]"
          placeholder="Brief"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Creative tone </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          v-model="campaignStore.newCampaign.creativeTone as string[]"
          :error-message="v$.creativeTone?.$errors[0]?.$message.toString()"
          :options="tools.generationOptions(dataOptions?.creativeTone || [])"
          class="w-full"
          placeholder="-- Select --"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Campaign rules </label>
      </div>
      <div class="md:w-3/4">
        <UiInputTextArea
          v-model="campaignStore.newCampaign.campaignRule"
          :error-message="v$.campaignRule?.$errors[0]?.$message.toString()"
          class="w-full h-[9.125rem]"
          placeholder="Enter your campaign rules"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-[90%] block"> Sample content reference link </label>
      </div>
      <div class="md:w-3/4">
        <UiInputText
          class="w-full"
          v-model="campaignStore.newCampaign.referenceLink"
          placeholder="Sample content reference link"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block leading-5">
          Campaign objective: awareness
          <sub class="md:block mt-1">(select up to 3)</sub>
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          class="w-full"
          v-model="campaignStore.newCampaign.campaignObjectiveAwareness as string[]"
          :error-message="
            v$.campaignObjectiveAwareness?.$errors[0]?.$message.toString()
          "
          :options="
            tools.generationOptions(dataOptions?.objectiveAwareness || [])
          "
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4">
        <label class="w-full block leading-5">
          Campaign objective: acquisition
          <sub class="md:block mt-1">(select up to 3)</sub>
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          class="w-full"
          v-model="campaignStore.newCampaign.campaignObjectiveAcquisition as string[]"
          :error-message="
            v$.campaignObjectiveAcquisition?.$errors[0]?.$message.toString()
          "
          :options="
            tools.generationOptions(dataOptions?.objectiveAcquisition || [])
          "
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4">
        <label class="w-full block">
          Campaign thumbnail
          <p class="sm md:block max-w-[90%]">
            (it should be jpg/ png and not more 10 mb)
          </p>
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputUpload
          type="thumb"
          :error-message="v$.banner?.$errors[0]?.$message.toString()"
          v-model:file="campaignStore.newCampaign.banner as File"
          class="w-full"
        />
      </div>
    </div>

    <div class="tima__form pb-[1.875rem]">
      <div class="md:w-1/4">
        <UiInputSwitch size="lg" v-model="campaignStore.newCampaign.viewType" />
      </div>
      <div class="md:w-3/4">
        <h6 class="text-[1.4375rem]">Make campaign public</h6>
        <span>
          Influencers from all member platforms around the world can view and
          participate in this campaign. Additionally, you will have the option
          to personally invite influencers to join
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UseEventBusReturn } from "@vueuse/core";
import type { UnPartial } from "~/lib/interfaces/utils";
import type { Core } from "~/lib/interfaces";

const props = defineProps<{
  bus?: UseEventBusReturn<string, any>;
}>();

const rules = useValidationRules();
const campaignStore = useCampaignStore();
const optionsStore = useOptionsStore();

const dataOptions = computed(() => optionsStore.$creativesOptions);

const v$ = useValidator(
  rules.CREATE_CAMPAIGN_CREATIVE(campaignStore.newCampaign),
  campaignStore.newCampaign,
  { $autoDirty: true }
);

async function proceed() {
  const v = await v$.value.$validate();
  if (!v) return;

  navigateTo({
    query: { tab: constants.BRAND_PREVIEW },
  });
}

props.bus?.on((message) => {
  if (message === "CREATIVE_SUMMARY") {
    proceed();
  }
});
</script>

<style scoped>
.tima__form {
  @apply flex md:flex-row flex-col w-full mb-[1.75rem];
}
</style>
