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
          :error-message="v$.category?.$errors[0]?.$message.toString()"
          v-model="campaignStore.newCampaign.category"
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
          v-model="campaignStore.newCampaign.audienceSize"
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
          v-model="campaignStore.newCampaign.audienceGender"
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
          v-model="campaignStore.newCampaign.audienceAgeGroup"
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
          v-model="campaignStore.newCampaign.audienceLocation"
          :error-message="v$.audienceLocation?.$errors[0]?.$message.toString()"
          class="w-full"
          :options="locations"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Invite <sub class="md:block">(select influencer to invite)</sub>
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputMultiSelectLte
          v-model="campaignStore.newCampaign.invitees"
          :error-message="v$.audienceLocation?.$errors[0]?.$message.toString()"
          :options="prospectiveInvitees"
          class="w-full"
        >
          <template #entry="{ entry: option }">
            <div class="flex items-center gap-3">
              <div>
                <div
                  class="w-[2rem] h-[2rem] rounded-full border overflow-hidden"
                >
                  <img
                    :src="option.profile.profileImage"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                {{
                  [option.profile.firstName, option.profile.lastName]
                    .filter(Boolean)
                    .join(" ")
                }}
              </div>
            </div>
          </template>
          <template #option="{ option }">
            <div class="flex items-center gap-3">
              <div>
                <div
                  class="w-[2.5rem] h-[2.5rem] rounded-full border overflow-hidden"
                >
                  <img
                    :src="option.profile.profileImage"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                {{
                  [option.profile.firstName, option.profile.lastName]
                    .filter(Boolean)
                    .join(" ")
                }}
              </div>
            </div>
          </template>
        </UiInputMultiSelectLte>
      </div>
      <div class="self-center" v-show="state === constants.LOADING">
        <UtSvg name="sunshine" class="spinner w-[1.2rem] h-[1.2rem]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UseEventBusReturn } from "@vueuse/core";
import type { GetBrandInfluencer } from "~/lib/interfaces/response";

const props = defineProps<{
  bus?: UseEventBusReturn<string, any>;
}>();

const rules = useValidationRules();
const optionsStore = useOptionsStore();
const campaignStore = useCampaignStore();

const options = computed(() => optionsStore.$campaignOptions);
const industries = computed(() => optionsStore.$industries);
const locations = computed(() => optionsStore.$countries);

const prospectiveInvitees = ref<GetBrandInfluencer["data"]>([]);

const v$ = useValidator(
  rules.CREATE_CAMPAIGN_INFLUENCERS,
  campaignStore.newCampaign,
  { $autoDirty: true }
);

async function proceed() {
  const v = await v$.value.$validate();
  if (!v) return;
  navigateTo({
    query: {
      tab: constants.BRAND_CREATIVE,
    },
  });
}

props.bus?.on((message) => {
  if (message === "INFLUENCER_SUMMARY") {
    proceed();
  }
});

const api = useAPI();

const { state } = useRequestState({
  immediately: true,
  action: async () => api.getBrandInfluencers({}),
  onSuccess(response) {
    prospectiveInvitees.value = response.data;
  },
});
</script>

<style scoped>
.tima__form {
  @apply flex md:flex-row flex-col w-full mb-[1.75rem];
}
</style>
