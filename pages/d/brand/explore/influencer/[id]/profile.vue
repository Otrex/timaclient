<template>
  <section
    class="flex flex-col md:flex-row md:pr-[0] h-full overflow-y-auto md:overflow-hidden gap-[1.4375rem]"
  >
    <aside
      class="w-full md:w-1/3 py-[1.4375rem] px-[1.4375rem] md:px-0 md:pl-[1.4375rem]"
    >
      <!--Change to applicant Id once the endpoint is ready-->
      <DashboardInfluencerBioCard />
    </aside>
    <aside
      class="w-full md:w-2/3 md:h-full pt-[1.4375rem] md:overflow-auto md:pr-8"
    >
      <div
        class="inline-flex px-2 flex-row md:gap-10 gap-3 items-start mb-2 justify-between"
      >
        <UtTabNuxtLink name="BrandInfluencerProfile">
          Personal info
        </UtTabNuxtLink>
        <UtTabNuxtLink name="BrandInfluencerCampaignInfo">
          Campaign
        </UtTabNuxtLink>
        <UtTabNuxtLink name="BrandInfluencerReviews"> Reviews </UtTabNuxtLink>
        <UtTabNuxtLink name="BrandInfluencerMedia"> Media </UtTabNuxtLink>
      </div>
      <NuxtPage />
    </aside>
  </section>
</template>

<script setup lang="ts">
import type { GetInfluencerProfileResponse } from "~/lib/interfaces/response";

const route = useRoute();
const api = useAPI();

// New
const influencer = ref<GetInfluencerProfileResponse["data"] | null>(null);
const { state } = useRequestState({
  immediately: true,
  action: () => api.getInfluencerById(route.params.id as string),
  onSuccess(response) {
    influencer.value = response.data;
  },
});

provide("influencer", influencer);
provide("loading", state);
</script>

<style></style>
