<template>
  <div>
    <div>
      <UiButtonDefault
        v-show="!viewSearchFilter"
        @click="viewSearchFilter = true"
        variant="primary"
        class="px-3 py-1"
      >
        Open Search Filter
      </UiButtonDefault>
    </div>
    <section v-show="viewSearchFilter">
      <div class="flex flex-row justify-between">
        <p class="nl mb-[1.125rem]">Select a social media channel</p>
        <button
          @click="clearFilter"
          class="flex items-center active:bg-slate-100"
        >
          <UtSvg name="close" class="w-[0.8125rem] h-[0.8125rem] text-black" />
          &nbsp; Clear filter
        </button>
      </div>
      <div class="flex flex-wrap gap-[1.25rem] mb-[3.5rem]">
        <UiInputOption
          name="socials"
          type="single"
          v-model="form.socialMedia"
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
          v-model="form.socialMedia"
          value="youtube"
          main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
        >
          <UtSvg
            name="socials/youtube-lg"
            class="w-[1.9375rem] h-[1.3125rem]"
          />
        </UiInputOption>
        <UiInputOption
          name="socials"
          type="single"
          v-model="form.socialMedia"
          value="tiktok"
          main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
        >
          <UtSvg name="socials/tiktok-lg" class="w-[1.9375rem] h-[1.3125rem]" />
        </UiInputOption>
        <UiInputOption
          name="socials"
          type="single"
          v-model="form.socialMedia"
          value="facebook"
          main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
        >
          <UtSvg
            name="socials/facebook-lg"
            class="w-[1.9375rem] h-[1.3125rem]"
          />
        </UiInputOption>
        <UiInputOption
          type="single"
          name="socials"
          value="twitter"
          v-model="form.socialMedia"
          main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
        >
          <UtSvg
            name="socials/twitter-lg"
            class="w-[1.9375rem] h-[1.3125rem]"
          />
        </UiInputOption>
        <UiInputOption
          name="socials"
          type="single"
          value="linkedin"
          v-model="form.socialMedia"
          main-class="!rounded-[0.5625rem] h-full flex items-center justify-center w-full max-w-[3.6875rem] max-h-[2.8125rem]"
        >
          <UtSvg
            name="socials/linkedin-lg"
            class="w-[1.9375rem] h-[1.3125rem]"
          />
        </UiInputOption>
      </div>

      <div
        class="grid md:grid-cols-3 items-end sm:gap-x-[1.75rem] md:gap-x-[3rem] gap-y-[1.75rem]"
      >
        <!--<div>
          <label class="block mb-[0.875rem]">Influencer location</label>
          <UiInputSelect
            :options="tools.generationOptions(['Main page', 'story'])"
            class="w-full"
            placeholder="-- Select --"
          />
        </div>-->
        <div>
          <label class="block mb-[0.875rem]">Influencer size</label>
          <UiInputSelect
            :options="tools.generationOptions(campaignOpts.size || [])"
            class="w-full"
            v-model="form.size"
            placeholder="-- Select --"
          />
        </div>
        <div>
          <label class="block mb-[0.875rem]">Audience location</label>
          <UiInputSelect
            :options="optionsStore.$countries"
            class="w-full"
            v-model="form.location"
            placeholder="-- Select --"
          />
        </div>
        <div>
          <label class="block mb-[0.875rem]">Audience age range</label>
          <UiInputSelect
            :options="tools.generationOptions(campaignOpts.ageGroup || [])"
            class="w-full"
            v-model="form.ageGroup"
            placeholder="-- Select --"
          />
        </div>
        <div>
          <label class="block mb-[0.875rem]">Audience Gender</label>
          <UiInputSelect
            :options="tools.generationOptions(campaignOpts.gender || [])"
            class="w-full"
            v-model="form.gender"
            placeholder="-- Select --"
          />
        </div>
        <!--<div>
          <label class="block mb-[0.875rem]">Category</label>
          <UiInputSelect
            :options="tools.generationOptions(['Main page', 'story'])"
            class="w-full"
            placeholder="Select categories"
          />
        </div> -->
        <div>
          <label class="block mb-[0.875rem]">Max price per post</label>
          <UiInputTextSelect
            :options="tools.generationOptions(['USD', 'NGN'])"
            class="w-full"
            v-model="form.costPerPost"
            placeholder="No greater than"
          />
        </div>
        <!-- <div class="flex flex-row gap-[0.75rem]">
          <div>
            <label class="block mb-[0.875rem]">Min. reach</label>
            <UiInputText class="w-full" placeholder="At least" />
          </div>
          <div>
            <label class="block mb-[0.875rem]">Max. reach</label>
            <UiInputText class="w-full" placeholder="Up to" />
          </div>
        </div> 
        <div>&nbsp;</div> -->
        <div>
          <UiButtonDefault
            variant="primary"
            label="Search"
            @click="() => execute()"
            class="w-full py-[0.75rem]"
          />
        </div>
        <div>&nbsp;</div>
      </div>
    </section>

    <section>
      <div class="mt-3">
        <template v-if="state === constants.LOADING">
          <UtLoaderIndicator message="Fetching Your Influencers" />
        </template>
        <template v-else-if="influencers.length === 0 && state !== 'IDLE'">
          <div>
            <div class="my-[1.25rem]">
              <h1 class="font-bold mt-[1.25rem]">Search Result(s):</h1>
            </div>
            <div>No Influencers found</div>
          </div>
        </template>

        <template v-else-if="influencers.length">
          <div class="my-[1.25rem]">
            <h1 class="font-bold mt-[1.25rem]">Search Result(s):</h1>
          </div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
          >
            <template v-for="(influencer, idx) in influencers" :key="idx">
              <NuxtLink
                :to="{
                  name: 'Campaign >>> Influencers',
                }"
              >
                <DashboardInfluencerCard
                  :name="influencer.userName"
                  :socialMedia="influencer.socialMediaPlatforms"
                  :profilePicture="
                    influencer.insight.profilePictureUrl ||
                    influencer.profilePicture
                  "
                  :public-id="influencer.userPublicId"
                  :cover="influencer.profilePicture"
                  :earnedMedia="influencer.insight.followers"
                  :engagements="influencer.insight.avgEngagement"
                  :comments="influencer.insight.totalComments"
                  :likes="influencer.insight.totalLikes"
                  :saved="influencer.insight.totalMedia"
                  :date="String(influencer.applicationDate)"
                />
              </NuxtLink>
            </template>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Core } from "~/lib/interfaces";

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

const form = reactive<Partial<Core.ExploreInfluencerFilter>>({});

const api = useAPI();
const optionsStore = useOptionsStore();
const search = ref<Core.Campaign[]>([]);
const emits = defineEmits(["update:state"]);
const campaignOpts = computed(() => optionsStore.$campaignOptions[0] || []);
const viewSearchFilter = ref(false);
const influencers = ref<Core.ApprovedCampaignInfluencer[]>([]);

const {
  state,
  execute,
  clear: clearSearch,
} = useRequestState({
  action: () => api.searchInfluencers(form),
  onSuccess: (response) => {
    influencers.value = response.data.map((e) => ({
      ...e,
      socialMediaPlatforms: JSON.parse(e.socialMediaPlatforms as any),
    }));
  },
});

const clearFilter = () => {
  viewSearchFilter.value = false;
  clearSearch();
};
</script>

<style></style>
