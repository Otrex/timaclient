<template>
  <section
    class="flex flex-col md:flex-row md:pr-[0] h-full overflow-y-auto md:overflow-hidden gap-[1.4375rem]"
  >
    <aside
      class="w-full md:w-1/3 py-[1.4375rem] px-[1.4375rem] md:px-0 md:pl-[1.4375rem]"
    >
      <!--Change to applicant Id once the endpoint is ready-->
      <DashboardInfluencerBioCard class="mb-3" />

      <section>
        <UiButtonDefault
          @click="openCampaigns = true"
          class="w-full py-2"
          variant="primary"
          label="Invite"
        />
      </section>

      <UtModal v-model:state="openCampaigns">
        <div class="p-6 bg-white max-h-[80vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium mb-4">Select Campaign</h3>
            <X class="w-5 h-5" @click="openCampaigns = false" />
          </div>
          <UtLoadPresenter
            :empty="!!!campaigns?.length"
            notFoundMessage="No Campaigns have been created"
            :state="state"
          >
            <template #loading>
              <UiLoading />
            </template>
            <div class="grid grid-cols-2 gap-4">
              <DashboardCampaignCard
                v-for="(cam, i) in campaigns"
                :key="i"
                @click="() => openInviter(cam)"
                :publicId="cam.campaign_id"
                :title="cam.campaignName"
                :image="cam.banner"
                :category="cam.category"
                :brand="authStore?.profile?.companyName!"
                :description="cam.campaignAbout || ''"
                :budget="+cam.planningBudget"
                :deadline="cam.endDate"
                :status="cam.statusProgress"
                :completion="0"
              />
            </div>
          </UtLoadPresenter>
        </div>
      </UtModal>

      <UtModal
        m-width="43.75rem"
        backdrop-color="rgba(0,0,0,.3)"
        v-model:state="openInvite"
      >
        <ModalsInviteInfluencer
          :campaign_id="invitingCampaign?.campaign_id"
          :influencer_id="(route.params.id as string)"
          :controller="openInvite"
          @close="closeInviter"
        />
      </UtModal>
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
const campaigns = ref<any[]>([]);

const { state: fetch, execute: getCampaigns } = useRequestState({
  immediately: true,
  action: () => api.getBrandCampaigns({}),
  onSuccess(response) {
    campaigns.value = response.data as any;
  },
});

// New
const influencer = ref<GetInfluencerProfileResponse["data"] | null>(null);
const { state } = useRequestState({
  immediately: true,
  action: () => api.getInfluencerById(route.params.id as string),
  onSuccess(response) {
    influencer.value = {
      ...response.data,
      audienceDemographics: tools.parseAudienceDemographics(
        response.data.audienceDemographics
      ),
    };
  },
});

provide("influencer", influencer);
provide("loading", state);
const openCampaigns = ref(false);
const invitingCampaign = ref<any>(null);
const openInvite = ref(false);
const authStore = useAuthStore();

function openInviter(campaign: any) {
  console.log(
    campaign,
    openInvite.value,
    invitingCampaign.value,
    openCampaigns
  );

  invitingCampaign.value = campaign;
  openInvite.value = true;
}

function closeInviter() {
  openInvite.value = false;
  invitingCampaign.value = null;
}

// watch(
//   () => openInvite,
//   () => {
//     if (!openInvite.value) {
//       invitingCampaign.value = null;
//       openCampaigns.value = false;
//     }
//   }
// );
</script>

<style></style>
