<template>
  <div class="p-[1.75rem]">
    <h2 class="text-[1.8rem] mt-[1.5rem] mb-[1.375rem]">Your Campaigns</h2>
    <template v-if="tools.requestState(getCampaigns) === constants.LOADING">
      <UtLoaderIndicator message="Fetching Your Campaigns" />
    </template>
    <template v-else-if="campaigns.length === 0">
      <UtNoResource message="No campaigns available" />
    </template>
    <template v-else>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <NuxtLink
          v-for="campaign in campaigns"
          :key="campaign.publicId"
          class="w-full"
          :to="{
            params: { id: campaign.publicId },
            name: 'Campaign',
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
            :completion="0"
          />
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Core } from "~/lib/interfaces";

definePageMeta({
  name: "BrandCampaign",
});

const api = useAPI();
const campaigns = ref<Core.Campaign[]>([]);
const profileStore = useProfileStore();
const getCampaigns = useRequestState({
  action: async () => {
    if (!profileStore.$profile?.companyName) return;
    return api.getBrandCampaigns({
      name: profileStore.$profile?.companyName!,
      size: 10,
      page: 0,
    });
  },
  onSuccess: (response) => {
    if (!response) return;
    campaigns.value = response.data;
  },
});

onMounted(() => {
  getCampaigns.execute();
});
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
