<template>
  <div>
    <div class="flex flex-row justify-between">
      <p class="nl mb-[1.125rem]">Select a social media channel</p>
      <button
        @click="emits('update:state', false)"
        class="flex items-center active:bg-slate-100"
      >
        <UtSvg
          name="close"
          class="w-[0.8125rem] h-[0.8125rem] dark:text-white text-black"
        />
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
        type="single"
        name="socials"
        value="linkedin"
        main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
      >
        <UtSvg name="socials/linkedin-lg" class="w-[1.9375rem] h-[1.3125rem]" />
      </UiInputOption>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-3 items-end gap-x-[3rem] gap-y-[1.75rem]"
    >
      <div>
        <label class="block mb-[0.875rem]">Category</label>
        <UiInputSelect
          :options="tools.generationOptions(categories)"
          class="w-full"
          v-model="form.category"
          placeholder="-- Select --"
        />
      </div>
      <div>
        <label class="block mb-[0.875rem]">Campaign type</label>
        <UiInputSelect
          :options="tools.generationOptions(size)"
          class="w-full"
          v-model="form.size"
          placeholder="-- Select --"
        />
      </div>
      <div>
        <label class="block mb-[0.875rem]">Budget range</label>
        <UiInputSelect
          :options="tools.generationOptions(budgetRange)"
          class="w-full"
          placeholder="-- Select --"
          disabled
        />
      </div>
      <div>
        <label class="block mb-[0.875rem]">Audience demographics</label>
        <UiInputSelect
          :options="tools.generationOptions(ageGroup)"
          class="w-full"
          v-model="form.age"
          placeholder="-- Select --"
        />
      </div>
      <div>
        <label class="block mb-[0.875rem]">Campaign status</label>
        <UiInputSelect
          :options="locations"
          class="w-full"
          v-model="form.location"
          placeholder="-- Select --"
        />
      </div>
      <div>
        <UiButtonDefault
          variant="primary"
          label="Search"
          :loading="state === constants.LOADING"
          :disabled="state === constants.LOADING"
          class="w-full py-[0.75rem]"
          @click="() => execute()"
        />
      </div>
    </div>

    <div class="mt-3">
      <template v-if="state === constants.LOADING">
        <UtLoaderIndicator message="Fetching Your Campaigns" />
      </template>
      <template v-else-if="search.length === 0">
        <div>&nbsp;</div>
      </template>
      <template v-else>
        <div class="my-[1.25rem]">
          <h1 class="font-bold mt-[1.25rem]">Search Result(s):</h1>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
        >
          <NuxtLink
            v-for="campaign in search"
            :key="campaign.publicId"
            class="w-full"
            :to="{
              params: { id: campaign.publicId },
              name: 'Explore - Campaign',
            }"
          >
            <DashboardCampaignCard
              class="w-full"
              no-max-w
              :image="campaign.creative.thumbnail"
              :brand="campaign.overview.name"
              :budget="campaign.overview.plannedBudget"
              :category="campaign.creative.creativeTone"
              :description="campaign.overview.briefDescription"
              :deadline="campaign.creative.endDate"
              :public-id="campaign.publicId"
              :title="campaign.overview.name"
              :completion="campaign.status || 0"
            />
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Core } from "~/lib/interfaces";

const props = defineProps<{
  modelValue?: {
    category: string;
    campaignType: string;
    budgetRange: string;
    audienceDemography: string;
    campaignStatus: string;
  };
  state?: boolean;
}>();

const api = useAPI();
const optionsStore = useOptionsStore();
const search = ref<Core.Campaign[]>([]);

const form = reactive({
  age: "",
  size: "",
  category: "",
  location: "",
});

const { state, execute } = useRequestState({
  action: () =>
    api.getCampaigns({
      age: form.age,
      type: "filter",
      size: form.size,
      location: form.location,
      category: form.category,
    }),
  onSuccess: (response) => {
    search.value = response.data;
  },
});

const categories = computed(() => optionsStore.$industries);

const ageGroup = computed(
  () => optionsStore.$campaignOptions[0]?.ageGroup || []
);

const contentType = computed(
  () => optionsStore.$creativesOptions[0]?.contentType || []
);

const budgetRange = computed(
  () => optionsStore.$campaignOptions[0]?.monthlyIncome || []
);

const locations = computed(() => optionsStore.$countries);

const size = computed(() => optionsStore.$campaignOptions[0]?.size || []);

const emits = defineEmits(["update:state"]);
</script>

<style></style>
