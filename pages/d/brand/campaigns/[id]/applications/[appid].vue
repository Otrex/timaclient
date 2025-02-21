<template>
  <div class="p-[1.875rem]">
    <UtLoadPresenter
      loading-message="Fetching Application data"
      not-found-message="Application Data Not Found"
      :data="!!!application"
      :state="applicationRequestState"
    >
      <div class="flex items-start mb-[3.75rem] gap-[2.4375rem]">
        <div>
          <div class="rounded-full overflow-hidden w-[7.5625rem] h-[7.5625rem]">
            <UiImg
              v-if="application?.influencer?.profileImage"
              :src="application?.influencer?.profileImage"
              alt="profile picture"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <div class="flex-1">
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 class="font-semibold mb-2">Personal Information</h3>
              <div class="space-y-2">
                <p>
                  <span class="font-medium">Name:</span>
                  {{ application?.influencer?.firstName }}
                  {{ application?.influencer?.lastName }}
                </p>
                <!-- <p>
                  <span class="font-medium">Email:</span>
                  {{ application?.influencer?.emailAddress }}
                </p> -->
                <!-- <p>
                  <span class="font-medium">Phone:</span>
                  {{ application?.influencer?.phoneNumber }}
                </p> -->
                <p>
                  <span class="font-medium">Location:</span>
                  {{ application?.influencer?.city }},
                  {{ application?.influencer?.state }},
                  {{ application?.influencer?.country }}
                </p>
              </div>
            </div>
          </div>

          <div class="mb-5">
            <h3 class="font-semibold mb-2">Professional Details</h3>
            <div class="space-y-2">
              <p>
                <span class="font-medium">Industries:</span>
                {{ application?.influencer?.industries?.join(", ") }}
              </p>
              <p>
                <span class="font-medium">Completed Campaigns:</span>
                {{ application?.influencer?.totalCompletedCampaigns }}
              </p>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-semibold mb-2">Social Media Accounts</h3>
            <div class="grid grid-cols-3 gap-4">
              <div
                v-for="(account, index) in application?.influencer
                  ?.socialMediaAccounts"
                :key="index"
                class="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg"
              >
                <h4 class="font-medium mb-2">{{ account.platformName }}</h4>
                <p class="text-sm">Username: @{{ account.userName }}</p>
                <template v-if="account.data">
                  <p class="text-sm">Followers: {{ account.data.followers }}</p>
                  <p class="text-sm">
                    Avg. Engagement: {{ account.data.avgEngagement }}%
                  </p>
                  <p class="text-sm">Avg. Likes: {{ account.data.avgLikes }}</p>
                </template>
              </div>
            </div>
          </div>

          <!-- <div v-if="application?.influencer?.paymentInformation">
            <h3 class="font-semibold mb-2">Payment Information</h3>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <h4 class="font-medium mb-2">Bank Details</h4>
                <div class="space-y-1">
                  <p class="text-sm">
                    Bank:
                    {{
                      application.influencer.paymentInformation.bankDetails
                        .bankName
                    }}
                  </p>
                  <p class="text-sm">
                    Account Name:
                    {{
                      application.influencer.paymentInformation.bankDetails
                        .accountName
                    }}
                  </p>
                  <p class="text-sm">
                    Account Number:
                    {{
                      application.influencer.paymentInformation.bankDetails
                        .accountNumber
                    }}
                  </p>
                </div>
              </div>
              <div>
                <h4 class="font-medium mb-2">Platform Pricing</h4>
                <div class="space-y-1">
                  <p
                    v-for="(price, index) in application.influencer
                      .paymentInformation.platformPrices"
                    :key="index"
                    class="text-sm"
                  >
                    {{ price.platform }}: ${{ price.price }}
                  </p>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>

      <template
        v-if="
          ['APPROVED', 'REJECTED'].includes(
            application?.applicationStatus || 'PENDING'
          )
        "
      >
        <div
          :class="[
            'p-5 mb-5 rounded-md',
            application?.applicationStatus === 'APPROVED'
              ? 'bg-[rgba(255,166,0,0.365)] text-[orangered]'
              : 'bg-red-200 text-red-800',
          ]"
        >
          Note: This Application has been
          {{ application?.applicationStatus?.toLowerCase() }}
        </div>
      </template>

      <div class="w-full">
        <!--  <div
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
        </div> -->
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
          <UiButtonDefault
            variant="primary"
            class="py-[0.625rem] px-[2.5rem]"
            label="Accept"
            @click="triggerAccept"
          />
          <!-- <UiButtonDefault
            variant="primary"
            class="py-[0.625rem] px-[2.5rem]"
            label="Accept"
            @click="triggerCreateContract"
          /> -->
        </div>
      </div>
      <UtModal
        m-width="32.25rem"
        v-model:state="setPostModal"
        content-class="mx-auto mt-[10%]"
      >
        <div
          class="bg-white dark:bg-slate-700 shadow-md max-w-[43.75rem] w-full rounded-2xl"
        >
          <header class="text-center py-3 border-b px-3">
            <h3 class="font-bold !text-xl">Select post required</h3>
            <p class="text-sm">
              Enter the number of post required per platform
            </p>
          </header>
          <main class="p-6 pt-3">
            <div class="flex mb-3 flex-row justify-end items-center gap-2">
              <div class="text-sm">
                {{
                  [setPostModal?.firstName, setPostModal?.lastName]
                    .filter((e) => e)
                    .join(" ")
                }}
              </div>
              <div
                class="w-[1.5rem] h-[1.5rem] border rounded-full overflow-hidden"
              >
                <img
                  :src="setPostModal?.profileImage"
                  alt="Placeholder avatar"
                  class="object-cover w-full h-full"
                />
              </div>
            </div>
            <p class="text-sm mb-3">
              Input number of post required per platform:
            </p>

            <template v-if="setPostModal?.socialMediaAccounts?.length">
              <div class="grid grid-cols-5 items-center gap-2">
                <template v-for="(platform, idx) in platforms" :key="idx">
                  <div
                    class="mb-2 col-span-2 flex flex-row gap-1 items-center text-base whitespace-nowrap"
                  >
                    <UtSvg
                      dim
                      w="1.5rem"
                      h="1.5rem"
                      :name="`so/${platform.platformName.toLowerCase()}`"
                    />
                    {{ platform.platformName }} Posts:
                  </div>
                  <div class="col-span-3">
                    <UiInputText
                      type="number"
                      size="sm"
                      class="!py-2 text-base"
                      v-model="costForm[platform.platformName]"
                    />
                  </div>
                </template>
              </div>
            </template>
            <template v-else>
              <div
                class="flex flex-col items-center justify-center py-12 animate-fade-in"
              >
                <p class="text-gray-500 dark:text-gray-400 text-center text-lg">
                  No social media accounts connected
                </p>
                <p
                  class="text-gray-400 dark:text-gray-500 text-center text-sm mt-2"
                >
                  This influencer hasn't connected any social media platforms
                  yet
                </p>
              </div>
            </template>
            <div class="text-right my-1 font-semibold text-base">
              Total Amount: {{ tools.formatCurrency(totalCost) }}
            </div>
          </main>
          <footer class="flex border-t flex-row p-4 gap-2">
            <UiButtonDefault
              variant="outline-primary"
              class="w-full"
              label="Cancel"
              @click="setPostModal = false"
            />
            <UiButtonDefault
              variant="primary"
              class="w-full !py-2"
              label="Confirm"
              :disabled="state === 'LOADING'"
              :loading="state === 'LOADING'"
              @click="() => confirmAccept.open()"
            />
          </footer>
        </div>
      </UtModal>
      <UiModalConfirmAction
        :loading="state === 'LOADING'"
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
        :loading="state === 'LOADING'"
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
    </UtLoadPresenter>
  </div>
</template>

<script setup lang="ts">
import type { GetInfluencerApplicationsResponse } from "~/lib/interfaces/response";
import type { GetBrandInfluencer } from "~/lib/interfaces/response";

const setPostModal = ref<GetBrandInfluencer["data"][0] | false | null>(false);

definePageMeta({
  name: "CampaignApplicationInfluencer",
});

type Application = GetInfluencerApplicationsResponse["data"][0] & {
  campaign: Awaited<ReturnType<typeof api.getBrandCampaign>>["data"];
  influencer: Awaited<ReturnType<typeof api.getInfluencerById>>["data"];
};

const api = useAPI();
const route = useRoute();
const contractModal = ref(false);
const confirmAccept = ref();
const confirmDecline = ref();
const costForm = reactive<any>({});
const application = ref<Partial<Application>>({});
const { notify } = useNotification();

const { state: applicationRequestState } = useRequestState({
  immediately: true,
  action: async () => {
    let barrel: Partial<Application> = {};

    const response = await api.getCampaignApplicants({
      campaign_id: route.params.id as string,
      applicationStatus: "PENDING",
    });

    barrel = {
      ...(response.data.find((e) => e.application_id == route.params.appid) ||
        {}),
    };

    if (barrel.campaign_id) {
      const res = await api.getBrandCampaign(barrel.campaign_id);
      barrel.campaign = res.data;
    }

    if (barrel.influencer_id) {
      const res = await api.getInfluencerById(barrel.influencer_id);
      barrel.influencer = res.data;
    }

    return barrel;
  },
  onSuccess: (response) => {
    application.value = response;
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

const totalCost = computed(() => {
  return Object.entries(costForm).reduce((acc, [key, value]) => {
    const prices = setPostModal.value?.paymentInformation?.platformPrices || [];
    const platformPrice = prices.find((e: any) => e.platform === key);

    if (value && platformPrice) {
      return acc + +value * +platformPrice.price;
    }
    return acc;
  }, 0);
});

const platforms = computed(() => {
  const el = setPostModal.value?.socialMediaAccounts || [];
  let list: any[] = [];

  el.forEach((e: any) => {
    if (list.find((e: any) => e.platformName === e.platformName)) {
      return;
    }

    list.push(e);
  });

  return list;
});

const { state, execute: review } = useRequestState({
  action: (status: "APPROVED" | "DECLINED" | "PENDING") => {
    return api.reviewInfluencerApplication({
      campaign_id: route.params.id as string,
      influencer_id: application.value?.influencer_id as string,
      status,
    });
  },
  onSuccess(response) {
    notify({
      title: "Successfully Reviewed Application",
      text: "You have successfully reviewed this application",
      type: "success",
    });

    setTimeout(() => {
      navigateTo({
        name: "ViewbrandCampaignInfluencers",
        params: {
          id: route.params.id,
        },
      });
    }, 1000);
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
  setPostModal.value = application.value.influencer;

  // confirmAccept.value.open();
};

const triggerCreateContract = () => {
  accept();
};

const triggerDecline = () => {
  confirmDecline.value.open();
};

const decline = () => {
  review("DECLINED").then(() => {
    confirmDecline.value.close();
  });
};
const accept = () => {
  review("APPROVED").then(() => {
    confirmAccept.value.close();
    setPostModal.value = false;
  });
};

const closeContractModal = () => {};
</script>

<style></style>
