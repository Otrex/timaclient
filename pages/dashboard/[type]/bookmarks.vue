<template>
  <div class="p-[1.875rem]">
    <UtPermit :user-type="constants.INFLUENCER">
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
                :completion="campaign.status || 0"
                :public-id="campaign.publicId"
                :title="campaign.overview.name"
                :is-bookmark="true"
                @re-update="reRun('influencer')"
              />
            </NuxtLink>
          </template>
        </div>
      </UtLoadPresenter>
    </UtPermit>
    <UtPermit :user-type="constants.AGENCY">
      <UtLoadPresenter
        loading-message="Fetching Bookmarks"
        not-found-message="No bookmarks found"
        :data="infleuncerBookmarks.length === 0"
        :state="bookmarkState"
      >
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1.0625rem]"
        >
          <template v-for="(influencer, idx) in infleuncerBookmarks" :key="idx">
            <NuxtLink
              :to="{
                name: 'Campaign >>> Influencers',
                query: {
                  publicId: influencer.publicId,
                  applicationId: null,
                },
              }"
            >
              <DashboardInfluencerCard
                :name="influencer.fullName"
                :socialMedia="[]"
                :profilePicture="influencer.profilePicture"
                :cover="influencer.profilePicture"
                :earnedMedia="0"
                :engagements="0"
                :comments="0"
                :likes="0"
                :saved="0"
                :date="String()"
              />
            </NuxtLink>
          </template>
        </div>
      </UtLoadPresenter>
    </UtPermit>
  </div>
</template>

<script setup lang="ts">
import type {
  GetBookmarks,
  GetInfluencersBookmark,
} from "~/lib/interfaces/response";

definePageMeta({
  name: "Bookmark",
});

const api = useAPI();
const authStore = useAuthStore();
const bookmarks = ref<GetBookmarks["data"]>([]);
const infleuncerBookmarks = ref<GetInfluencersBookmark["data"]>([]);

const { state, execute } = useRequestState({
  action: () => api.getBookmarks(),
  onSuccess(response) {
    bookmarks.value = response.data;
  },
});

const { state: bookmarkState, execute: bookmarkExecute } = useRequestState({
  action: () => api.getBookmarkedInfluencers(),
  onSuccess(response) {
    infleuncerBookmarks.value = response.data;
  },
});

const reRun = (reRunType: "influencer" | "agency") => async () => {
  if (reRunType === "influencer") {
    await execute();
  } else {
    await bookmarkExecute();
  }
};

onMounted(() => {
  if (authStore.authorization.userType === constants.INFLUENCER) {
    execute();
  } else {
    bookmarkExecute();
  }
});
</script>

<style></style>
