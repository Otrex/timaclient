<template>
  <div>
    <UtPermit :user-type="constants.INFLUENCER">
      <div class="px-[1.625rem] pt-[1.875rem] pb-[2.5rem]">
        <DashboardExploreSearchPanel
          v-model:state="viewSearchFilter"
          v-show="viewSearchFilter"
          class="mb-[3.75rem]"
        />
        <div class="flex flex-row justify-between">
          <h2 class="text-[2rem] mb-[1.375rem]">Recommended Campaigns</h2>
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
        </div>
        <template
          v-if="tools.requestState(getRecommended) === constants.LOADING"
        >
          <UtLoaderIndicator message="Fetching recommendations" />
        </template>
        <template v-else-if="recommended.length === 0">
          <div>
            <UtNoResource message="No Recommended Campaigns" />
          </div>
        </template>
        <template v-else>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1.0625rem]"
          >
            <div v-for="campaign in recommended" :key="campaign.campaign_id">
              <!-- <NuxtLink
                class="w-full"
                :to="{
                  params: {
                    id: campaign.campaign_id,
                    type: $route.params.type,
                  },
                  name: 'Explore - Campaign',
                }"
              > -->
              <DashboardCampaignCard
                :image="campaign.banner"
                :budget="0"
                :category="campaign.category"
                :description="campaign.campaignAbout"
                :deadline="campaign.endDate"
                :brand="campaign.companyName"
                :completion="campaign.statusProgress === 'APPROVED' ? 10 : 0"
                :public-id="campaign.campaign_id"
                :title="campaign.campaignName"
              />
              <!-- </NuxtLink> -->
            </div>
          </div>
        </template>

        <h2 class="text-[2rem] mt-[3rem] mb-[1.375rem]">
          Top Campaigns for the week
        </h2>
        <template v-if="tools.requestState(getTop) === constants.LOADING">
          <UtLoaderIndicator message="Fetching Top Campaigns" />
        </template>
        <template v-else-if="topCampaigns.length === 0">
          <div class="h-[18.75rem]">
            <div>
              <UtNoResource message="No Top Campaigns" />
            </div>
          </div>
        </template>
        <template v-else>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1.0625rem]"
          >
            <template v-for="campaign in topCampaigns" :key="campaign.publicId">
              <!-- <NuxtLink
                :to="{
                  params: { id: campaign.publicId, type: $route.params.type },
                  name: 'Explore - Campaign',
                }"
              > -->
              <DashboardCampaignCard
                :image="campaign.creative.thumbnail"
                :brand="campaign.overview.name"
                :budget="campaign.overview.plannedBudget"
                :category="campaign.creative.creativeTone"
                :description="campaign.overview.briefDescription"
                :deadline="campaign.creative.endDate"
                :completion="campaign.status || 0"
                :public-id="campaign.publicId"
                :title="campaign.overview.name"
              />
              <!-- </NuxtLink> -->
            </template>
          </div>
        </template>

        <h2 class="text-[2rem] mt-[3rem] mb-[1.375rem]">Other Campaigns</h2>

        <template
          v-if="tools.requestState(getAllCampaigns) === constants.LOADING"
        >
          <UtLoaderIndicator message="Fetching Other Campaigns" />
        </template>
        <template v-else-if="allCampaigns.length === 0">
          <div>
            <UtNoResource message="No Campaigns" />
          </div>
        </template>
        <template v-else>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1.0625rem]"
          >
            <template v-for="campaign in allCampaigns" :key="campaign.publicId">
              <!-- <NuxtLink
                :to="{
                  params: { id: campaign.publicId, type: $route.params.type },
                  name: 'Explore - Campaign',
                }"
              > -->
              <DashboardCampaignCard
                :image="campaign.creative.thumbnail"
                :brand="campaign.overview.name"
                :budget="campaign.overview.plannedBudget"
                :category="campaign.creative.creativeTone"
                :description="campaign.overview.briefDescription"
                :deadline="campaign.creative.endDate"
                :completion="campaign.status || 0"
                :public-id="campaign.publicId"
                :title="campaign.overview.name"
              />
              <!-- </NuxtLink> -->
            </template>
          </div>
        </template>
      </div>
    </UtPermit>
    <UtPermit :user-type="constants.AGENCY">
      <div class="px-[1.625rem] mb-[2.5rem] pt-[1.875rem] pb-[2.5rem]">
        <DashboardExploreInfluencerSearchPanel class="mb-[2rem]" />

        <section class="mb-[3.25rem]">
          <h2 class="text-[2rem] mb-[1.375rem]">The Buzz</h2>
          <div class="flex flex-col md:flex-row gap-[1.125rem]">
            <template v-for="(buzz, idx) in buzzes" :key="idx">
              <UiBuzzCard
                class="w-full"
                :title="buzz.title"
                :bg="buzz.bg"
                :influencers="buzz.influencers"
                :see-more="{
                  name: 'Influencers',
                  query: {
                    title: buzz.title,
                    type:
                      typeof buzz.influencers?.at(0) === 'string'
                        ? 'category'
                        : 'influencers',
                  },
                }"
              />
            </template>
          </div>
        </section>

        <section class="mb-[3.25rem]">
          <h2 class="text-[2rem] mb-[1.375rem]">Categories</h2>
          <div class="grid md:grid-cols-3 gap-[1.125rem]">
            <template v-for="(buzz, idx) in categories" :key="idx">
              <UiBuzzCard
                class="w-full"
                :title="buzz.title"
                :bg="buzz.bg"
                :influencers="buzz.data.influencers"
                :see-more="{
                  name: 'Influencers',
                  query: {
                    title: buzz.title,
                    type: 'influencers',
                    category: buzz.data.category,
                  },
                }"
              />
            </template>
          </div>
        </section>
      </div>
    </UtPermit>
  </div>
</template>

<script setup lang="ts">
import type { Influencer } from "~/lib/interfaces/core";
import type {
  GetCampaigns,
  GetInfluencerCampaignsResponse,
} from "~/lib/interfaces/response";

definePageMeta({
  name: "Explore",
});

const api = useAPI();
const route = useRoute();

const search = ref({
  category: "",
  campaignType: "",
  budgetRange: "",
  audienceDemography: "",
  campaignStatus: "",
});

const MAX_INFLUENCER_DISPLAY = 5;
const allCampaigns = ref<GetCampaigns["data"]>([]);
const buzzes = ref([
  {
    title: "New influencers on the block",
    bg: { from: "#00EAFF", to: "#3C8CE7" },
    influencers: [] as Influencer[],
  },
  {
    title: "Top 100 influencers for the week",
    bg: { from: "#ABDCFF", to: "#0396FF" },
    influencers: [] as Influencer[],
  },
  {
    title: "Top categories for the week",
    bg: { from: "#65FDF0", to: "#1D6FA3" },
    influencers: [] as string[],
  },
]);

const bgColor = [
  { from: "#FEB692", to: "#EA5455" },
  { from: "#FCCF31", to: "#F55555" },
  { from: "#FAD7A1", to: "#E96D71" },
];

type Buzz = {
  bg: (typeof bgColor)[0];
  title: string;
  data: { category: string; influencers: Influencer[] };
};

const categories = ref<Buzz[]>([]);
const viewSearchFilter = ref<boolean>(false);
const recommended = ref<GetInfluencerCampaignsResponse["data"]>([]);
const topCampaigns = ref<GetCampaigns["data"]>([]);
const filterToRequired = tools.truncateList(MAX_INFLUENCER_DISPLAY);

const getRecommended = useRequestState({
  action: () => api.getInfluencerCampaigns({ type: "recommendation" }),
  onSuccess: (response) => {
    console.log(response);

    recommended.value = response.data;
  },
});

const getTop = useRequestState({
  action: () => api.getInfluencerCampaigns({ type: "top" }),
  onSuccess: (response) => {
    topCampaigns.value = response.data;
  },
});

const getNewInfluencers = useRequestState({
  action: () => api.getLatestInfluencers(),
  onSuccess: (response) => {
    buzzes.value[0].influencers = filterToRequired(response.data);
  },
});

const getTopInfluencers = useRequestState({
  action: () =>
    api.getTopInfluencers({
      page: 0,
      size: 5,
    }),
  onSuccess: (response) => {
    buzzes.value[1].influencers = filterToRequired(response.data);
  },
});

const getAllCampaigns = useRequestState({
  action: () =>
    api.getInfluencerCampaigns({
      age: "",
      type: "filter",
      size: "",
      location: "",
      category: "",
    } as any),
  onSuccess(response) {
    allCampaigns.value = response.data;
  },
});

const getTopCategories = useRequestState({
  action: async () => {
    const response = await api.getTopCategories();
    const influencers = await Promise.all(
      response.data.map((j) => {
        return api.getInfluencersByCategory(j);
      })
    );

    return [response.data || [], influencers.map((e) => e.data) || []] as const;
  },
  onSuccess: ([$categories, influencers]) => {
    buzzes.value[2].influencers = $categories; // This uses the 5 count number of category to display
    categories.value = influencers.map((influencer, i) => {
      return {
        title: `${$categories[i]} Influencers`,
        data: { category: $categories[i], influencers: influencer },
        bg: bgColor[i % 3],
      };
    });
  },
});

const initForInfluencers = () => {
  getRecommended.execute();
  getAllCampaigns.execute();
  getTop.execute();
};

const initForBrands = () => {
  getNewInfluencers.execute();
  getTopInfluencers.execute();
  getTopCategories.execute();
};

onMounted(() => {
  if (route.params.type !== constants.INFLUENCER) {
    initForBrands();
  } else {
    initForInfluencers();
  }
});
</script>

<style></style>
