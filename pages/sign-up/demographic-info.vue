<template>
  <div>
    <NuxtLayout name="auth">
      <div class="text-right">
        <UiProfileProgress :percent="authStore.progress" />
      </div>

      <div class="pb-32 min-h-screen mb-32">
        <div class="mb-[3.75rem]">
          <h1 class="text-[2.4375rem] mb-[1.5rem]">
            Audience Demographic Information
          </h1>
          <p>
            Input demographic information (gender, age, & location) of your
            audience.
          </p>
        </div>

        <div
          class="pb-[40px] mx-auto flex flex-col items-center justify-center"
        >
          <div>
            <div class="">
              <p
                class="text-[#333333] dark:text-white text-xl text-[23.44px] text-left"
              >
                1. What is the gender distribution of your audience?
              </p>

              <UiInputGenderSlider v-model="form.genderDistribution" />
            </div>

            <div class="mt-8">
              <p
                class="text-[#333333] dark:text-white text-xl text-[23.44px] text-left"
              >
                2. What is the age distribution of your audience?
              </p>

              <div class="mt-4 flex flex-col gap-y-4">
                <div class="flex gap-x-4 items-center w-full">
                  <p>13-25 years:</p>
                  <input
                    type="range"
                    class="w-full"
                    v-model="form.ageDistribution['13-25']"
                    min="0"
                    max="100"
                  />
                  <p>{{ form.ageDistribution["13-25"] }}%</p>
                </div>

                <div class="flex gap-x-4 items-center">
                  <p>26-40 years:</p>
                  <input
                    type="range"
                    class="w-full"
                    v-model="form.ageDistribution['26-40']"
                    min="0"
                    max="100"
                  />
                  <p>{{ form.ageDistribution["26-40"] }}%</p>
                </div>

                <div class="flex gap-x-4 items-center">
                  <p>41-60 years:</p>
                  <input
                    type="range"
                    class="w-full"
                    v-model="form.ageDistribution['41-60']"
                    min="0"
                    max="100"
                  />
                  <p>{{ form.ageDistribution["41-60"] }}%</p>
                </div>

                <div class="flex gap-x-4 items-center">
                  <p>60+ years:</p>
                  <input
                    type="range"
                    class="w-full"
                    v-model="form.ageDistribution['60+']"
                    min="0"
                    max="100"
                  />
                  <p>{{ form.ageDistribution["60+"] }}%</p>
                </div>
              </div>
            </div>

            <div class="mt-8">
              <p
                class="text-[#333333] dark:text-white text-xl text-[23.44px] text-left"
              >
                3. Where is your audience located?
              </p>

              <div class="mt-4 flex flex-col gap-y-2">
                <div class="flex gap-x-4">
                  <input
                    type="radio"
                    class="w-6 h-6"
                    v-model="form.locationVariant"
                    value="global"
                  />
                  <p>Global</p>
                </div>

                <div class="flex gap-x-4">
                  <input
                    type="radio"
                    class="w-6 h-6"
                    v-model="form.locationVariant"
                    value="specific"
                  />
                  <p>Select country/region</p>
                </div>
                <div>
                  <div v-if="form.locationVariant === 'specific'">
                    <UiInputMultiSelectLte
                      v-model="form.audienceLocation"
                      :options="optionsStore.$countries"
                    >
                      <template #entry="{ entry }">
                        <div>{{ entry.label }}</div>
                      </template>
                      <template #option="{ option }">
                        <div>
                          {{ option.label }}
                        </div>
                      </template>
                    </UiInputMultiSelectLte>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tm__box-598px pb-[60px]">
          <UiButtonDefault
            @click="() => execute()"
            class="w-full py-[0.875rem] mb-[2rem]"
            label="Continue"
            variant="primary"
            :loading="state === constants.LOADING"
          />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "SignUpDemographicInfo",
  middleware: [
    async function () {
      try {
        await useOptionsStore().loadOptions();
      } catch (error) {
        useNotification().notify({
          type: "error",
          title: "Error",
          text: "Failed to load options",
        });
      }
    },
  ],
});

const { notify } = useNotification();
const openModal = ref<Record<string, boolean>>({});
const optionsStore = useOptionsStore();
const rules = useValidationRules();
const authStore = useAuthStore();

const form = reactive({
  genderDistribution: {
    male: 50,
    female: 50,
  },
  ageDistribution: {
    "13-25": 25,
    "26-40": 25,
    "41-60": 25,
    "60+": 25,
  },
  locationVariant: "global",
  audienceLocation: [],
});

const api = useAPI();

watch(
  () => form.locationVariant,
  () => {
    if (form.locationVariant === "global") {
      form.audienceLocation = [];
    }
  }
);

const { state, execute } = useRequestState({
  action: () =>
    api.updateAudienceDemographics({
      genderDistribution: {
        male: form.genderDistribution.male + "%",
        female: form.genderDistribution.female + "%",
      },
      ageDistribution: {
        "13-25": form.ageDistribution["13-25"] + "%",
        "26-40": form.ageDistribution["26-40"] + "%",
        "41-60": form.ageDistribution["41-60"] + "%",
        "60+": form.ageDistribution["60+"] + "%",
      },
      audienceLocation:
        form.locationVariant === "global"
          ? ["global"]
          : form.audienceLocation.map((e: any) => e.label),
    }),
  onSuccess(response) {
    notify({
      type: "success",
      title: "Successful!",
      text: "Demographics updated",
    });

    toProfileReview();
  },
  onError(error) {
    notify({
      type: "error",
      title: error.title,
      text: error.description,
    });
  },
});

function toProfileReview() {
  navigateTo({
    name: "SignUpInfluencerReviewProfile",
  });
}
</script>

<style></style>
