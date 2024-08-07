<template>
  <div class="p-[1.875rem]">
    <div class="mb-3">
      <h1><b>Influencers Title:</b> {{ route.query.title }}</h1>
      <h1 v-if="route.query.category">
        <b>Category:</b> {{ route.query.category }}
      </h1>
    </div>

    <UtLoadPresenter
      :state="isLoading ? constants.LOADING : 'IDLE'"
      loading-message="Fetching Influencers"
      not-found-message="No Influencers found"
      :data="!!influencers.length"
    >
      <div class="grid md:grid-cols-3 gap-3">
        <template v-if="isInfluencers">
          <template v-for="(influencer, idx) in influencers" :key="idx">
            <NuxtLink
              :to="{
                name: 'Campaign >>> Influencers',
                query: {
                  publicId: influencer.publicId,
                  applicationId: null,
                },
              }"
            >
              <UiInfluencerInfo v-bind="influencer" />
            </NuxtLink>
          </template>
        </template>
        <template v-else>
          <template v-for="(category, idx) in categories" :key="idx">
            <NuxtLink
              :to="{
                query: {
                  title: category,
                  type: 'influencers',
                  category: category,
                  refresh: 1,
                  back: route.fullPath,
                },
                replace: true,
              }"
            >
              <div
                :style="`--color: ${tools.getRandomHexColor([
                  '#ffffff',
                  '#000000',
                ])}`"
                class="p-4 font-semibold bg-[--color] border border-solid border-slate-200"
              >
                {{ category }}
              </div>
            </NuxtLink>
          </template>
        </template>
      </div>
    </UtLoadPresenter>
  </div>
</template>

<script setup lang="ts">
import type { Influencer } from "~/lib/interfaces/core";

definePageMeta({
  name: "Influencers",
});

const route = useRoute();
const api = useAPI();
const isInfluencers = computed(
  () => (route.query.type as string) === "influencers"
);
const influencers = ref<Influencer[]>([]);
const categories = ref<string[]>([]);

const isLoading = computed(() =>
  [getNewInfluencers, getTopInfluencers, getTopCategories]
    .map(({ state }) => state.value)
    .some((e) => e === constants.LOADING)
);

const getNewInfluencers = useRequestState({
  action: () => api.getLatestInfluencers(),
  onSuccess: (response) => {
    influencers.value = response.data;
  },
});

const getTopInfluencers = useRequestState({
  action: () =>
    api.getTopInfluencers({
      page: 0,
      size: 20,
    }),
  onSuccess: (response) => {
    influencers.value = response.data;
  },
});

const getTopCategories = useRequestState({
  action: async () =>
    api.getInfluencersByCategory(route.query.category as string),
  onSuccess: (response) => {
    influencers.value = response.data;
  },
});

const getCategories = useRequestState({
  action: async () => api.getTopCategories(),
  onSuccess: (response) => {
    categories.value = response.data;
  },
});

watch(
  () => route.query.refresh,
  () => {
    load();
    if ("refresh" in route.query) {
      getCategories.execute();
    }
  }
);

const load = () => {
  if (route.query.title === "New influencers on the block") {
    getNewInfluencers.execute();
  }

  if (route.query.title === "Top 100 influencers for the week") {
    getTopInfluencers.execute();
  }

  if (route.query.type === "influencers" && route.query.category) {
    getTopCategories.execute();
  }

  if (route.query.type === "category") {
    getCategories.execute();
  }
};

onMounted(load);
</script>

<style></style>
