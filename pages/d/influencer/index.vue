<template>
  <div>
    <div class="px-[1.625rem] pt-[1.875rem] pb-[2.5rem]">
      <DExploreInfluencerSearch
        v-model:state="viewSearchFilter"
        v-show="viewSearchFilter"
        class="mb-[3.75rem]"
      />
      <section v-show="!viewSearchFilter" class="flex justify-end">
        <div class="flex flex-row items-center">
          <UiButtonDefault
            @click="viewSearchFilter = true"
            class="border border-l-0 !px-10 !gap-5 py-2 flex items-center"
            variant="primary"
          >
            <UtSvg name="filter" dim w="20px" h="20px" />
            Filter
          </UiButtonDefault>
        </div>
      </section>

      <template
        v-if="
          tools.requestState(getRecommended) == constants.LOADING ||
          recommended.length > 0
        "
      >
        <div class="flex flex-row justify-between">
          <h4 class="mb-5 font-semibold text-xl">Recommended Campaigns</h4>
        </div>
        <template
          v-if="tools.requestState(getRecommended) === constants.LOADING"
        >
          <UtLoaderIndicator message="Fetching recommendations" />
        </template>
        <template v-else-if="recommended.length === 0">
          <div>
            <UtNoResource
              message="No Recommended Campaigns"
              style="--height: 400px"
            />
          </div>
        </template>
        <template v-else>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[1.0625rem]"
          >
            <div v-for="campaign in recommended" :key="campaign.campaign_id">
              <NuxtLink
                class="w-full"
                :to="{
                  params: { id: campaign.campaign_id },
                  name: 'ViewInfluencerCampaign',
                }"
              >
                <DashboardCampaignCard
                  :image="(campaign.banner as string)"
                  :budget="0"
                  :category="campaign.category"
                  :description="campaign.campaignAbout"
                  :deadline="campaign.endDate"
                  :brand="(campaign as any).companyName || ''"
                  :completion="campaign.statusProgress === 'APPROVED' ? 10 : 0"
                  :public-id="(campaign.campaign_id as string)"
                  :title="campaign.campaignName"
                />
              </NuxtLink>
            </div>
          </div>
        </template>
      </template>

      <h4 class="my-5 font-semibold text-xl">Top Campaigns for the week</h4>
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
          <template
            v-for="campaign in topCampaigns"
            :key="(campaign.campaign_id as string)"
          >
            <NuxtLink
              class="w-full"
              :to="{
                params: { id: campaign.campaign_id },
                name: 'ViewInfluencerCampaign',
              }"
            >
              <DashboardCampaignCard
                :image="(campaign.banner as string)"
                :budget="0"
                :category="campaign.category"
                :description="campaign.campaignAbout"
                :deadline="campaign.endDate"
                :brand="(campaign as any).companyName || ''"
                :completion="campaign.statusProgress === 'APPROVED' ? 10 : 0"
                :public-id="(campaign.campaign_id as string)"
                :title="campaign.campaignName"
              />
            </NuxtLink>
          </template>
        </div>
      </template>

      <h4 class="my-5 font-semibold text-xl">Other Campaigns</h4>

      <template
        v-if="tools.requestState(getAllCampaigns) === constants.LOADING"
      >
        <UtLoaderIndicator message="Fetching Other Campaigns" />
      </template>
      <template v-else-if="allCampaigns.length === 0">
        <div>
          <UtNoResource message="No Campaigns" style="--height: 400px" />
        </div>
      </template>
      <template v-else>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1.0625rem]"
        >
          <template
            v-for="campaign in allCampaigns"
            :key="(campaign.campaign_id as string)"
          >
            <NuxtLink
              class="w-full"
              :to="{
                params: { id: campaign.campaign_id },
                name: 'ViewInfluencerCampaign',
              }"
            >
              <DashboardCampaignCard
                :image="(campaign.banner as string)"
                :budget="0"
                :category="campaign.category"
                :description="campaign.campaignAbout"
                :deadline="campaign.endDate"
                :brand="campaign.companyName || ''"
                :completion="campaign.statusProgress === 'APPROVED' ? 10 : 0"
                :public-id="(campaign.campaign_id as string)"
                :title="campaign.campaignName"
              />
            </NuxtLink>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GetCampaigns } from "~/lib/interfaces/response";

definePageMeta({
  name: "InfluencerDashboard",
  middleware: [
    function (to, from) {
      const options = useOptionsStore();
      options.getIndustries().catch((err) => {
        alert("failed to fetch industries");
        console.log(err);
      });
    },
  ],
});

const api = useAPI();

const viewSearchFilter = ref<boolean>(false);
const allCampaigns = ref<GetCampaigns["data"]>([]);
const recommended = ref<GetCampaigns["data"]>([]);
const topCampaigns = ref<GetCampaigns["data"]>([]);

const getRecommended = useRequestState({
  immediately: true,
  action: () => api.getInfluencerCampaigns({ recommended: true }),
  onSuccess: (response: any) => {
    recommended.value = response.data;
  },
});

const getTop = useRequestState({
  immediately: true,
  action: () => api.getInfluencerCampaigns({ top: true }),
  onSuccess: (response: any) => {
    topCampaigns.value = response.data;
  },
});

const getAllCampaigns = useRequestState({
  immediately: true,
  action: () => api.getInfluencerCampaigns({}),
  onSuccess(response: any) {
    allCampaigns.value = response.data;
  },
});
</script>

<style></style>
