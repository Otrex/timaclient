<template>
  <div class="px-[1.625rem] mb-[2.5rem] pt-[1.875rem] pb-[2.5rem]">
    <DashboardExploreInfluencerSearchPanel
      class="mb-[2rem] overflow-y-auto -mx-6 max-h-[80vh]"
    />

    <section class="mb-[3.25rem]">
      <h2 class="text-[2rem] mb-[1.375rem]">The Buzz</h2>
      <div class="flex flex-col md:flex-row gap-[1.125rem]">
        <template v-for="(buzz, idx) in buzzes" :key="idx">
          <NuxtLink
            class="w-full h-full"
            :to="{
              name: 'BrandViewSpecialInfluencers',
              params: {
                type: buzz.value,
              },
            }"
          >
            <UiBuzzCard
              class="w-full h-full"
              :title="buzz.title"
              :bg="buzz.bg"
              :influencers="buzz.influencers"
              :loading="buzz.loading"
              :see-more="{
                name: 'BrandViewSpecialInfluencers',
                params: {
                  type: buzz.value,
                },
                query: {
                  title: buzz.title,
                  type:
                    typeof buzz.influencers?.at(0) === 'string'
                      ? 'category'
                      : 'influencers',
                },
              }"
            />
          </NuxtLink>
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
              name: 'BrandViewSpecialInfluencers',
              params: {
                type: buzz.title,
              },
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
</template>

<script setup lang="ts">
import type { Influencer } from "~/lib/interfaces/core";

definePageMeta({
  name: "DashboardBrandExplore",
});
const buzzes = ref([
  {
    title: "Recommended on the block",
    bg: { from: "#00EAFF", to: "#3C8CE7" },
    influencers: [] as Influencer[],
    value: "recommended",
    loading: true,
  },
  {
    title: "Top 100 influencers for the week",
    bg: { from: "#ABDCFF", to: "#0396FF" },
    influencers: [] as Influencer[],
    value: "top100",
    loading: true,
  },
  // {
  //   title: "Top categories for the week",
  //   bg: { from: "#65FDF0", to: "#1D6FA3" },
  //   influencers: [] as string[],
  // },
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
const api = useAPI();
const categories = ref<Buzz[]>([]);
const MAX_INFLUENCER_DISPLAY = 5;
const filterToRequired = tools.truncateList(MAX_INFLUENCER_DISPLAY);

useRequestState({
  immediately: true,
  action: () => api.getLatestInfluencers(),
  onSuccess: (response) => {
    buzzes.value[0].influencers = filterToRequired(response.data);
    buzzes.value[0].loading = false;
  },
  onError: (error) => {
    buzzes.value[0].loading = false;
  },
});

useRequestState({
  immediately: true,
  action: async () => {
    const res = await api.getTopInfluencerCategories();

    return Promise.all(
      filterToRequired(res.data).map(async (j, i) => {
        const res = await api.getInfluencersByCategory(j.category);
        return {
          title: j.category,
          bg: bgColor[i - 1 < 0 ? 0 : i - 1],
          data: {
            category: j.category,
            influencers: filterToRequired(res.data).map((m) => {
              return {
                publicId: m.id,
                username: m.userName,
                email: m.emailAddress,
                profilePicture: m.profileImage,
                phoneNumber: m.phoneNumber,
                fullName: [m.firstName, m.lastName].filter((e) => e).join(" "),
              };
            }),
          },
        };
      })
    );
  },
  onSuccess: (response) => {
    categories.value = response as any;
  },
  onError: (error) => {
    console.log(error);
  },
});

useRequestState({
  immediately: true,
  action: () =>
    api.getTopInfluencers({
      page: 1,
      size: 5,
    }),
  onSuccess: (response) => {
    buzzes.value[1].influencers = filterToRequired(response.data);
    buzzes.value[1].loading = false;
  },
  onError: (error) => {
    buzzes.value[1].loading = false;
  },
});
</script>

<style></style>
