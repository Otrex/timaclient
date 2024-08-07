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
          <NuxtLink
            v-for="campaign in bookmarks"
            :key="campaign.publicId"
            :to="{
              params: {
                id: campaign.campaignRecord.publicId,
                type: $route.params.type,
              },
              name: 'Explore - Campaign',
            }"
          >
            <DashboardCampaignCard
              :image="campaign.campaignRecord.creative.thumbnail"
              :brand="campaign.campaignRecord.overview.name"
              :budget="campaign.campaignRecord.overview.plannedBudget"
              :category="campaign.campaignRecord.creative.creativeTone"
              :description="campaign.campaignRecord.overview.briefDescription"
              :deadline="campaign.campaignRecord.creative.endDate"
              :completion="campaign.campaignRecord.status || 0"
              :public-id="campaign.campaignRecord.publicId"
              :title="campaign.campaignRecord.overview.name"
              :bookmark-id="campaign.id"
              :is-bookmark="true"
              @refresh="reRun('influencer')"
            />
          </NuxtLink>
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
                  publicId: influencer.userPublicId,
                  applicationId: null,
                },
              }"
            >
              <DashboardInfluencerCard
                :name="influencer.userName"
                :socialMedia="influencer.socialMediaPlatforms"
                :profilePicture="influencer.insight.profilePictureUrl"
                :cover="influencer.profilePicture"
                :earnedMedia="influencer.insight.followers"
                :engagements="influencer.insight.avgEngagement"
                :comments="influencer.insight.totalComments"
                :likes="influencer.insight.totalLikes"
                :saved="influencer.insight.totalMedia"
                :date="String(influencer.applicationDate)"
                :public-id="influencer.userPublicId"
                :is-bookmark="true"
              />
            </NuxtLink>
          </template>
        </div>
      </UtLoadPresenter>
    </UtPermit>
  </div>
</template>

<script setup lang="ts">
import type { Core } from "~/lib/interfaces";
import type {
  GetApprovedInfluencers,
  GetBookmarks,
  GetInfluencersBookmark,
} from "~/lib/interfaces/response";

definePageMeta({
  name: "Bookmark",
});

const api = useAPI();
const authStore = useAuthStore();
const bookmarks = ref<Core.InfluencerBookmark[]>([]);
const infleuncerBookmarks = ref<GetApprovedInfluencers["data"]>([]);

function trx(data: any) {
  if (!data) return data;
  data.socialMediaPlatforms = JSON.parse(data.socialMediaPlatforms);
  return data;
}

const { state, execute } = useRequestState({
  action: () => api.getBookmarks(),
  onSuccess(response) {
    bookmarks.value = response.data;
  },
});

const { state: bookmarkState, execute: bookmarkExecute } = useRequestState({
  action: () => api.getBookmarkedInfluencers(),
  onSuccess(response) {
    infleuncerBookmarks.value = response.data.map(trx);
  },
});

const reRun = (reRunType: "influencer" | "agency") => async () => {
  console.log("Entered");

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
