<template>
  <div>
    <div
      class="mt-[0.6875rem] border border-solid dark:border-slate-600 border-[#dcf0ff] rounded p-[1.25rem]"
      style="background: rgba(228, 243, 255, 0.5)"
    >
      <div>
        <UiInputText
          search
          v-model="q"
          placeholder="Search Influencers"
          class="mr-[1.75rem] max-w-[26.9375rem] placeholder:text-[color:--clr-grey-500] w-full !border-[#808080ad]"
        />
        <!--<UiInputSelect
          class="max-w-[8.9375rem] w-full text-center border-[color:--clr-grey-500]"
          :options="tools.generationOptions(['all'])"
          v-model="filter"
        />-->
      </div>

      <section class="mt-[1.6rem]">
        <UtLoadPresenter
          loading-message="Fetching Influencers..."
          not-found-message="No Influencers"
          :state="tools.requestState(getApplicationsInfluencer)"
          :data="filteredApproved.length === 0"
        >
          <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-[1.1875rem]">
            <template v-for="(influencer, idx) in filteredApproved" :key="idx">
              <NuxtLink
                :to="{
                  name: 'Campaign >>> Influencers',
                  query: {
                    applicationId: influencer.applicationId,
                    publicId: influencer.userPublicId,
                  },
                }"
              >
                <DashboardInfluencerCard
                  :name="influencer.userName"
                  :socialMedia="influencer.socialMediaPlatforms"
                  :profilePicture="
                    influencer.insight.profilePictureUrl ||
                    influencer.profilePicture
                  "
                  :public-id="influencer.userPublicId"
                  :cover="influencer.profilePicture"
                  :earnedMedia="influencer.insight.followers"
                  :engagements="influencer.insight.avgEngagement"
                  :comments="influencer.insight.totalComments"
                  :likes="influencer.insight.totalLikes"
                  :saved="influencer.insight.totalMedia"
                  :date="String(influencer.applicationDate)"
                />
              </NuxtLink>
            </template>
          </div>
        </UtLoadPresenter>
      </section>
    </div>

    <div class="mt-[2.5rem]">
      <h3>Campaign Application</h3>
      <section class="mt-[1.5rem]">
        <UtLoadPresenter
          loading-message="Fetching pending applications"
          not-found-message="No pending applications"
          :state="tools.requestState(getCampaignPendingApplications)"
          :data="pendingApplication.length === 0"
        >
          <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-[1.1875rem]">
            <template
              v-for="application in pendingApplication"
              :key="application.applicationId"
            >
              <NuxtLink
                :to="{
                  name: 'Campaign Application Influencer',
                  params: {
                    id: application.applicationId,
                  },
                }"
              >
                <DashboardCampaignApplication
                  :id="application.applicationId"
                  type="Independent"
                  :name="application.username"
                  :socials="application.socialMediaPlatforms"
                  :profilePicture="application.profilePicture"
                  :questionAndAnswers="QandA(application)"
                  @accept="triggerAccept"
                />
              </NuxtLink>
            </template>
          </div>
          <UiModalConfirmAction
            :loading="state === constants.LOADING"
            @onapprove="accept"
            ref="confirmAccept"
          >
            <template #title>
              <div>Application Accept Notice</div>
            </template>
            <template #body>
              <div>Are you sure you want to accept this application?</div>
            </template>
          </UiModalConfirmAction>
          <!--
          <UtModal
            v-model:state="showCreateContract"
            m-width="37.75rem"
            content-class="mx-auto mt-[10%]"
            backdrop-color="rgba(0,0,0,.05)"
          >
            <ModalsCreateContract
              :influencer-name="tools.isCertain(action?.fullName)"
              :applicationId="tools.isCertain(action?.applicationId)"
              :brand-name="tools.isCertain(action?.campaignName)"
              :campaign-name="tools.isCertain(action?.campaignName)"
              :influencer-public-id="tools.isCertain(action?.submittedBy)"
              @submit="submitContract"
              :campaign-public-id="tools.isCertain(action?.campaignPublicId)"
            />
          </UtModal>
        -->
        </UtLoadPresenter>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Core } from "~/lib/interfaces";
import type { Application } from "~/lib/interfaces/core";

const q = ref("");

const api = useAPI();
const route = useRoute();
const { notify } = useNotification();

function trx(data: any) {
  if (!data) return data;
  data.socialMediaPlatforms = JSON.parse(data.socialMediaPlatforms);
  return data;
}

const filteredApproved = computed(() =>
  [...influencers.value].filter((e) =>
    e.userName.toLowerCase().includes(q.value.toLowerCase())
  )
);

const approvedFilter = (approved: Core.ApprovedCampaignInfluencer[]) => {};

function QandA(data: Application) {
  return [
    {
      question: "Have you worked with us before?",
      answer: data.collaboration,
    },
    {
      question: "Have you worked with us before?",
      answer: data.userExperience,
    },
  ];
}

const actionId = ref();
const pendingApplication = ref<Application[]>([]);
const getCampaignPendingApplications = useRequestState({
  immediately: true,
  action: () =>
    api.getCampaignApplicationsByStatus({
      campaignId: route.params.id as string,
      sortBy: "createdOn",
      status: "PENDING",
      sortIn: "DESC",
      page: 0,
      size: 10,
    }),
  onSuccess: (response) => {
    pendingApplication.value = response.data.map((e) => ({
      ...(e as any),
      socialMediaPlatforms: JSON.parse((e as any).socialMediaPlatform),
    }));
  },
  onError: (err) => {
    if (err.title) {
      notify({
        type: "error",
        title: err.title,
        text: err.description,
      });
    }
  },
});

const influencers = ref<Core.ApprovedCampaignInfluencer[]>([]);
const getApplicationsInfluencer = useRequestState({
  immediately: true,
  action: () =>
    api.getCampaignApplicationsByStatus({
      campaignId: route.params.id as string,
      sortBy: "createdOn",
      status: "APPROVED",
      sortIn: "DESC",
      page: 0,
      size: 10,
    }),
  onSuccess: (response) => {
    influencers.value = response.data.map(trx);
  },
  onError: (err) => {
    notify({
      type: "error",
      title: err.title,
      text: err.description,
    });
  },
});

const { state, execute: review } = useRequestState({
  action: (status: string) =>
    api.reviewApplication({
      applicationId: actionId.value,
      status,
    }),
  onSuccess(response) {
    notify({
      title: "Successfully Reviewed Application",
      text: response.message,
      type: "success",
    });
  },
  onError(error) {
    notify({
      title: "Review Failed",
      text: error.description,
      type: "error",
    });
  },
});

const confirmAccept = ref();
const triggerAccept = (id: string) => {
  actionId.value = id;
  confirmAccept.value.open();
};

const accept = async () => {
  await review("APPROVED");
  confirmAccept.value.close();
  getApplicationsInfluencer.execute();
  getCampaignPendingApplications.execute();
};
</script>

<style></style>
