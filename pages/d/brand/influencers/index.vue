<template>
  <div class="p-6">
    <div class="flex items-center justify-end mb-4">
      <div>
        <UiInputText
          v-model="search"
          placeholder="Search for influencers"
          @keydown.enter="() => searches.execute()"
        />
        <small>Press enter to search</small>
      </div>
    </div>
    <template v-if="searches.state.value == 'LOADING'">
      <div class="flex flex-col items-center justify-center py-12 px-4">
        <div class="flex space-x-2 animate-pulse">
          <div
            v-for="i in 3"
            :key="i"
            :class="[
              'w-3 h-3 bg-gray-500 rounded-full',
              i > 1 ? `animation-delay-${(i - 1) * 200}` : '',
            ]"
          ></div>
        </div>
        <p class="mt-4 text-gray-500">Searching for influencers...</p>
      </div>
    </template>

    <div v-for="(section, index) in sections" :key="index" class="mb-4">
      <template
        v-if="section.state !== RequestState.LOADING && section.data.length > 0"
      >
        <h2 class="font-semibold text-lg mb-3">{{ section.title }}</h2>

        <template v-if="section.state.value == RequestState.LOADING">
          <div class="flex flex-col items-center justify-center py-12 px-4">
            <div class="flex space-x-2 animate-pulse">
              <div
                v-for="i in 3"
                :key="i"
                :class="[
                  'w-3 h-3 bg-gray-500 rounded-full',
                  i > 1 ? `animation-delay-${(i - 1) * 200}` : '',
                ]"
              ></div>
            </div>
            <p class="mt-4 text-gray-500">
              Loading {{ section.loadingText }}...
            </p>
          </div>
        </template>

        <div class="grid grid-cols-1 sm:grid-cols-3">
          <template
            v-for="influencer in section.data"
            :key="influencer.publicId"
          >
            <NuxtLink
              :to="{
                name: 'BrandInfluencerProfile',
                params: { id: influencer.publicId },
              }"
            >
              <UiInfluencerInfo v-bind="influencer" />
            </NuxtLink>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RequestState } from "~/lib/enums";

definePageMeta({ name: "BrandViewInfluencers" });

const api = useAPI();
const topInfluencers = ref<any[]>([]);
const recommended = ref<any[]>([]);
const influencers = ref<any[]>([]);
const search = ref("");
const searchResults = ref<any[]>([]);

const mapInfluencerData = (item: any) => ({
  publicId: item.id || item.user_id,
  id: item?.id || item.user_id,
  username: item.userName,
  email: item.emailAddress,
  profilePicture: item?.profile?.profileImage || item.profileImage,
  phoneNumber: item.phoneNumber,
  fullName: [
    item?.profile?.firstName || item.firstName,
    item.profile?.lastName || item.lastName,
  ]
    .filter((e) => e)
    .join(" "),
});

const { state: topInfluencing } = useRequestState({
  immediately: true,
  action: () => api.getBrandInfluencers({ page: 1, limit: 6, top: true }),
  onSuccess: ({ data }) => {
    topInfluencers.value = data.map(mapInfluencerData);
  },
});

const { state: recommending } = useRequestState({
  immediately: true,
  action: () =>
    api.getBrandInfluencers({ page: 1, limit: 6, recommended: true }),
  onSuccess: ({ data }) => {
    recommended.value = data.map(mapInfluencerData);
  },
});

const { state: influencing } = useRequestState({
  immediately: true,
  action: () => api.getBrandInfluencers({ page: 1, limit: 20 }),
  onSuccess: ({ data }) => {
    influencers.value = data.map(mapInfluencerData);
  },
});

const searches = useRequestState({
  immediately: false,
  action: () => api.searchInfluencers({ name: search.value }),
  onSuccess: (response) => {
    console.log(response);

    searchResults.value = response.data.map(mapInfluencerData);
  },
  onError: (error) => {
    console.log(error);
  },
});

const sections = computed(() => [
  {
    title: "Search Results",
    state: searches.state,
    data: searchResults.value,
    loadingText: "search Results",
    emptyTitle: "No Search Results",
    emptyText:
      "We don't have any result influencers for you at the moment. Check back later for new top influencers.",
  },
  {
    title: "Top Influencers",
    state: topInfluencing.value,
    data: topInfluencers.value,
    loadingText: "top influencers",
    emptyTitle: "No Top Influencers",
    emptyText:
      "We don't have any top influencers for you at the moment. Check back later for new top influencers.",
  },
  {
    title: "Recommended Influencers",
    state: recommending.value,
    data: recommended.value,
    loadingText: "recommendations",
    emptyTitle: "No Recommended Influencers",
    emptyText:
      "We don't have any recommended influencers for you at the moment. Check back later for new recommendations.",
  },
  {
    title: "Other Influencers",
    state: influencing.value,
    data: influencers.value,
    loadingText: "other influencers",
    emptyTitle: "No Other Influencers",
    emptyText:
      "We don't have any influencers for you at the moment. Check back later.",
  },
]);
</script>

<style></style>
