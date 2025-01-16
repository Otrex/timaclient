<template>
  <div class="px-8">
    <div class="text-lg font-bold mb-3">{{ label }}</div>

    <div class="grid grid-cols-1 sm:grid-cols-3">
      <template v-for="influencer in influencers" :key="influencer.publicId">
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "BrandViewSpecialInfluencers",
});

const api = useAPI();
const route = useRoute();
const influencers = ref<any>();

const mapInfluencerData = (item: any) => ({
  publicId: item.id,
  username: item.userName,
  email: item.emailAddress,
  profilePicture: item.profile.profileImage,
  phoneNumber: item.phoneNumber,
  fullName: [item.profile.firstName, item.profile.lastName]
    .filter((e) => e)
    .join(" "),
});

const label = computed(() => {
  const type = route.params.type as string;
  switch (type) {
    case "top100":
      return "Top Influencers";
    case "recommended":
      return "Recommended Influencers";
    case "trending":
      return "Trending Influencers";
    default:
      return "Influencers";
  }
});

const topInfluencing = useRequestState({
  immediately: false,
  action: () => api.getBrandInfluencers({ page: 1, limit: 6, top: true }),
  onSuccess: ({ data }) => {
    influencers.value = data.map(mapInfluencerData);
  },
});

const recommending = useRequestState({
  immediately: false,
  action: () =>
    api.getBrandInfluencers({ page: 1, limit: 6, recommended: true }),
  onSuccess: ({ data }) => {
    influencers.value = data.map(mapInfluencerData);
  },
});

onMounted(() => {
  const type = route.params.type as string;

  if (type === "top100") {
    topInfluencing.execute();
  } else if (type === "recommended") {
    recommending.execute();
  } else if (type === "trending") {
    recommending.execute();
  }
});
</script>

<style></style>
