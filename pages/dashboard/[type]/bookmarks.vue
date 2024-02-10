<template>
  <div class="p-[1.875rem]">
    <UtLoadPresenter
      loading-message="Fetching Bookmarks"
      not-found-message="No bookmarks found"
      :data="bookmarks.length === 0"
      :state="state"
    >
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1.0625rem]"
      >
        <template v-for="campaign in bookmarks" :key="campaign.publicId">
          <NuxtLink
            :to="{
              params: { id: campaign.publicId, type: $route.params.type },
              name: 'Explore - Campaign',
            }"
          >
            <DashboardCampaignCard
              :image="campaign.creative.thumbnail"
              :brand="campaign.overview.name"
              :budget="campaign.overview.plannedBudget"
              :category="campaign.creative.creativeTone"
              :description="campaign.overview.briefDescription"
              :deadline="campaign.creative.endDate"
              :completion="0"
              :public-id="campaign.publicId"
              :title="campaign.overview.name"
              :is-bookmark="true"
              @re-update="reRun"
            />
          </NuxtLink>
        </template>
      </div>
    </UtLoadPresenter>
  </div>
</template>

<script setup lang="ts">
import type { GetBookmarks } from "~/lib/interfaces/response";

definePageMeta({
  name: "Bookmark",
});

const api = useAPI();
const bookmarks = ref<GetBookmarks["data"]>([]);

const { state, execute } = useRequestState({
  action: () => api.getBookmarks(),
  immediately: true,
  onSuccess(response) {
    bookmarks.value = response.data;
  },
});

async function reRun() {
  await execute();
}
</script>

<style></style>
