<template>
  <div>
    <div
      class="mt-[0.6875rem] p-[1.25rem]"
      style="background: rgba(228, 243, 255, 0.5)"
    >
      <div class="flex flex-row">
        <UiInputText
          search
          placeholder="Search Influencers"
          class="mr-[1.75rem] max-w-[26.9375rem] placeholder:text-[color:--clr-grey-500] w-full !border-[#808080ad]"
        />

        <!-- ewfwe -->
        <!--<UiInputSelect
          class="max-w-[8.9375rem] w-full text-center border-[color:--clr-grey-500]"
          :options="tools.generationOptions(['all'])"
          v-model="filter"
        />-->
        <div>
          <UiButtonDefault
            variant="primary"
            label="Invite"
            class="py-2 md:!px-20 sm:!px-10 !px-6"
            @click="invite = true"
          />
        </div>
      </div>

      <UtModal
        m-width="43.75rem"
        backdrop-color="rgba(0,0,0,.3)"
        v-model:state="invite"
      >
        <ModalsInviteInfluencer @close="invite = false" />
      </UtModal>

      <section class="mt-[2rem]">
        <UtLoadPresenter
          loading-message="Fetching Influencers..."
          not-found-message="No Influencers"
          :state="tools.requestState(getApplicationsInfluencer)"
          :data="influencers.length === 0"
        >
          <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-[1.1875rem]">
            <template v-for="(influencer, idx) in influencers" :key="idx">
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
              <DashboardCampaignApplication
                :id="application.application_id"
                type="Independent"
                :name="
                  [
                    application?.userProfile?.firstName,
                    application?.userProfile?.lastName,
                  ]
                    .filter((e) => e)
                    .join(' ')
                "
                :socials="[]"
                :profilePicture="application?.userProfile?.profilePicture"
                :questionAndAnswers="QandA([] as any[])"
                @accept="triggerAccept"
                @create-contract="triggerCreateContract"
              />
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
        </UtLoadPresenter>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Core } from "~/lib/interfaces";
import type { Application } from "~/lib/interfaces/core";
import type { GetInfluencerApplicationsResponse } from "~/lib/interfaces/response";

definePageMeta({
  name: "ViewbrandCampaignInfluencers",
});

const filter = ref("all");
const api = useAPI();
const route = useRoute();
const { notify } = useNotification();
const showCreateContract = ref(false);

const invite = ref<boolean>(false);

function trx(data: any) {
  if (!data) return data;
  data.socialMediaPlatforms = JSON.parse(data.socialMediaPlatforms);
  return data;
}

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
const action = ref<Application>();
const pendingApplication = ref<GetInfluencerApplicationsResponse["data"]>([]);
const getCampaignPendingApplications = useRequestState({
  immediately: true,
  action: () =>
    api.getCampaignApplicants({
      campaign_id: route.params.id as string,
      applicationStatus: "PENDING",
    }),
  onSuccess: (response) => {
    pendingApplication.value = response.data;
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
    getCampaignPendingApplications.execute();
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

const confirmCreateContract = ref();
const triggerCreateContract = (id: string) => {
  actionId.value = id;
  action.value = pendingApplication.value.find((e) => e.applicationId === id);
  showCreateContract.value = true;
};

const accept = () => {
  review("APPROVED").then(() => {
    confirmAccept.value.close();
  });
};

const submitContract = () => {
  ///
  showCreateContract.value = false;
};
</script>

<style></style>
