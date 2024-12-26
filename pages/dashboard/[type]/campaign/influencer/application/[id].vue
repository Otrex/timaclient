<template>
  <div class="p-[1.875rem]">
    <UtLoadPresenter
      loading-message="Fetching Application data"
      not-found-message="Application Data Not Found"
      :data="!!!application"
      :state="applicationRequestState"
    >
      <div class="flex flex-row mb-[3.4375rem] items-center justify-between">
        <div>
          <h2 class="font-bold">Applicant profile</h2>
        </div>
        <div>
          <NuxtLink
            :to="{
              name: 'Campaign >>> Influencers',
              query: {
                publicId: application?.submittedBy,
                applicationId: application?.applicationId,
              },
            }"
          >
            <UiButtonDefault
              variant="info"
              class="!px-[1rem] !py-[0.375rem]"
              label="View Influencer Page"
            />
          </NuxtLink>
        </div>
      </div>

      <div class="flex items-center mb-[3.75rem] gap-[2.4375rem]">
        <div>
          <div class="rounded-full overflow-hidden w-[7.5625rem] h-[7.5625rem]">
            <UiImg
              v-if="application?.profilePicture"
              :src="application?.profilePicture"
              alt="profile picture"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td class="pb-[0.625rem]">
                  <p class="nl">Influencer name:</p>
                </td>
                <td class="pb-[0.625rem]">
                  <p>{{ application?.fullName }}</p>
                </td>
              </tr>
              <tr>
                <td class="pb-[0.625rem]"><p class="nl">Email address:</p></td>
                <td class="pb-[0.625rem]">
                  <p>{{ application?.email }}</p>
                </td>
              </tr>
              <tr>
                <td><p class="nl">Phone number:</p></td>
                <td>
                  <p>{{ application?.phoneNumber }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <template
        v-if="
          ['APPROVED', 'REJECTED'].includes(application?.status || 'PENDING')
        "
      >
        <div
          :class="[
            'p-5 mb-5 rounded-md',
            application?.status === 'APPROVED'
              ? 'bg-[rgba(255,166,0,0.365)] text-[orangered]'
              : 'bg-red-200 text-red-800',
          ]"
        >
          Note: This Application has been
          {{ application?.status?.toLowerCase() }}
        </div>
      </template>

      <section
        class="bg-[#F3FAFF] dark:bg-slate-600 gap-[1.875rem] flex flex-row rounded-[2.0625rem] p-[1.875rem]"
      >
        <div class="w-full">
          <p class="uppercase mb-[1.875rem]">Campaign Information</p>
          <article>
            <div class="flex mb-[3.125rem] md:flex-row gap-[3.125rem]">
              <div>
                <p class="nl">Campaign name:</p>
                <p class="text-[color:--clr-grey-400]">
                  {{ application?.campaignName }} campaign
                </p>
              </div>

              <div>
                <p class="nl">Campaign budget:</p>
                <p class="text-[color:--clr-grey-400]">
                  {{ tools.formatCurrency(application?.campaignBudget || 0) }}
                </p>
              </div>
            </div>

            <div class="max-w-[24.125rem] md:max-w-full mb-[3.125rem]">
              <p class="nl">Campaign description:</p>
              <p class="text-[color:--clr-grey-400]">
                {{ application?.campaignDescription }}
              </p>
            </div>
          </article>

          <p class="uppercase mb-[1.875rem]">Influencer’s Information</p>
          <article class="max-w-[24.125rem] md:max-w-full mb-[3.125rem]">
            <p class="nl">Influencers reason to be selected:</p>
            <p class="text-[color:--clr-grey-400]">
              {{ application?.userMotivationBrief }}
            </p>
          </article>

          <p class="uppercase mb-[1.875rem]">Campaign Content</p>
          <article class="max-w-[24.125rem] md:max-w-full mb-[3.125rem]">
            <p class="nl">Reference Link:</p>
            <p class="text-[color:--clr-grey-400]">No Reference Link</p>
          </article>
        </div>

        <div class="w-full">
          <div
            class="bg-[color:--clr-grey-700] mb-[2.5rem] rounded-[1.1875rem] p-[2.25rem]"
          >
            <p class="uppercase text-white mb-[1.875rem]">CONTENT SAMPLES</p>

            <div class="bg-[color:--clr-grey-400] rounded-md overflow-hidden">
              <div
                tabindex="1"
                class="w-full h-[23.4375rem] overflow-hidden z-[1] relative video-content-bg flex items-center justify-center"
              >
                <div class="absolute inset-0">
                  <iframe
                    src="http://localhost:3000"
                    class="w-full h-full bg-white"
                  ></iframe>
                </div>
                <UtSvg
                  name="play"
                  dim
                  w="3.75rem"
                  h="3.75rem"
                  class="text-white"
                />
              </div>
            </div>
          </div>
          <div
            v-if="!application?.approvedBy"
            class="flex justify-end gap-5 items-center"
          >
            <UiButtonDefault
              class="py-[0.625rem] px-[2.5rem]"
              variant="inverse-primary"
              label="Decline"
              @click="triggerDecline"
            />
            <!--<UiButtonDefault
              variant="primary"
              class="py-[0.625rem] px-[2.5rem]"
              label="Accept"
              @click="triggerAccept"
            /> -->
            <UiButtonDefault
              variant="primary"
              class="py-[0.625rem] px-[2.5rem]"
              label="Accept"
              @click="triggerCreateContract"
            />
          </div>
        </div>
        <UtModal v-model:state="contractModal" backdrop-color="rgba(0,0,0,.3)">
          <ModalsCreateContract
            :influencer-name="tools.isCertain(application?.fullName)"
            :application-id="tools.isCertain(application?.applicationId)"
            :brand-name="tools.isCertain(application?.campaignName)"
            :campaign-name="tools.isCertain(application?.campaignName)"
            :influencer-public-id="tools.isCertain(application?.submittedBy)"
            :campaign-public-id="tools.isCertain(application?.campaignPublicId)"
            :name="application?.fullName"
            @submit="closeContractModal"
          />
        </UtModal>
        <UiModalConfirmAction
          :loading="state === constants.LOADING"
          @onapprove="decline"
          ref="confirmDecline"
        >
          <template #title>
            <div>Application Decline Notice</div>
          </template>
          <template #body>
            <div>Are you sure you want to decline this application?</div>
          </template>
        </UiModalConfirmAction>
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
      </section>
    </UtLoadPresenter>
  </div>
</template>

<script setup lang="ts">
import type { Application } from "~/lib/interfaces/core";

definePageMeta({
  name: "Campaign Application Influencer",
});

const api = useAPI();
const route = useRoute();
const contractModal = ref(false);
const confirmAccept = ref();
const confirmDecline = ref();
const application = ref<Application>();
const { notify } = useNotification();

const { state: applicationRequestState } = useRequestState({
  action: () => api.getApplicationById(route.params.id as string),
  immediately: true,
  onSuccess(response) {
    application.value = response.data;
  },
});

const { state, execute: review } = useRequestState({
  action: (status: string) =>
    api.reviewApplication({
      status,
      applicationId: route.params.id as string,
    }),
  onSuccess(response) {
    application.value = response.data;
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

const triggerAccept = () => {
  confirmAccept.value.open();
};

const triggerCreateContract = () => {
  contractModal.value = true;
};

const triggerDecline = () => {
  confirmDecline.value.open();
};

const decline = () => {
  review("REJECTED").then(() => {
    confirmDecline.value.close();
  });
};
const accept = () => {
  review("APPROVED").then(() => {
    confirmAccept.value.close();
  });
};

const closeContractModal = () => {};
</script>

<style></style>
