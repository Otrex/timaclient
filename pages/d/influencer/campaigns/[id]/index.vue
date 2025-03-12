<template>
  <div class="md:px-8 px-4">
    <transition mode="out-in">
      <div
        class="text-center h-[300px] relative"
        v-if="state === constants.LOADING"
      >
        <UtLoaderIndicator
          class="absolute inset-0"
          message="Fetching Campaign"
        />
      </div>
      <div class="h-[400px]" v-else-if="!campaign">
        <div class="h-[400px]">
          <UtNoResource message="Campaign not found" style="--height: 400px" />
        </div>
      </div>
      <div v-else>
        <div class="mb-[1.25rem] overflow-hidden h-[29.3125rem] relative">
          <button
            style="--tw-ring-opacity: 0.2"
            :class="[
              'absolute active:ring-4 rounded-md  right-[0.75rem] top-[0.75rem]',
              avgColor < 128
                ? 'active:ring-slate-100'
                : 'active:ring-slate-700',
            ]"
          >
            <UtSvg
              name="bookmark"
              :class="[
                'w-[1.5rem] h-[1.5rem]',
                avgColor > 128 ? 'text-black' : 'text-white',
              ]"
            />
          </button>
          <UiImg
            ref="image"
            class="w-full h-full object-cover"
            :src="(campaign.banner as string)"
            alt="campaign banner"
          />
        </div>

        <section>
          <h2 class="mb-[1rem] font-bold">Campaign Information</h2>
          <h3 class="mb-[1rem]">
            {{ campaign.campaignName || "Nike" }}
          </h3>
          <p class="mb-[1.4375rem]">
            {{ campaign.campaignAbout }}
          </p>

          <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
            <p class="nl" v-if="campaign.campaignWebsite">
              <b>Campaign website:</b> {{ campaign.campaignWebsite }}
            </p>
            <!-- <p class="nl" v-if="+campaign.planningBudget">
              <b>Planned Budget:</b>
              {{ tools.formatCurrency(+campaign.planningBudget) }}
            </p> -->

            <div>
              <p class="nl"><b>Social media platform:</b></p>
              <div
                v-for="(socials, idx) in campaign.socialMediaPlatform"
                :key="idx"
                class="border inline-flex rounded-md mr-2 items-center justify-center max-w-[3.125rem] p-[0.625rem] border-[--input-border-color]"
              >
                <UtSvg
                  :name="tools.resolveSocialsIcon(socials)"
                  class="h-[1.3125rem] max-w-[1.9375rem]"
                />
              </div>
            </div>
          </div>
        </section>

        <section class="mb-[1.75rem]">
          <h2 class="mb-[0.75rem] font-bold">Influencer requirement</h2>
          <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
            <p class="nl">
              <b>Category:</b>
              {{ (campaign.category || []).join(", ") }}
            </p>
            <p class="nl">
              <b>Audience size:</b>
              {{ (campaign.audienceSize || []).join(", ") }}
            </p>
            <p class="nl">
              <b>Audience gender:</b>
              {{ (campaign.audienceGender || []).join(", ") }}
            </p>
            <p class="nl">
              <b>Audience location:</b>
              {{ (campaign.audienceLocation || []).join(", ") }}
            </p>
          </div>
        </section>

        <section>
          <h2 class="mb-[0.75rem] font-bold">Creatives</h2>
          <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
            <!-- <p class="nl">
              <b>Payment type: </b> {{ campaign.creative.paymentType }}
            </p> -->
            <p class="nl">
              <b>Campaign start date:</b> {{ campaign.startDate }}
            </p>
            <p class="nl"><b>Campaign end date:</b> {{ campaign.endDate }}</p>
            <p class="nl">
              <b>Content type:</b> {{ (campaign.contentType || []).join(", ") }}
            </p>
            <p class="nl">
              <b>Content placement:</b>
              {{ (campaign.contentPlacement || []).join(", ") }}
            </p>
            <p class="nl">
              <b>Creative brief:</b> {{ campaign.creativeBrief }}
            </p>
            <p class="nl">
              <b>Creative tone:</b>
              {{
                typeof campaign.creativeTone == "string"
                  ? JSON.parse(campaign.creativeTone).join(", ")
                  : []
              }}
            </p>
            <p class="nl">
              <b>Campaign rules:</b>
              <span v-html="campaign.campaignRule"></span>
            </p>
            <p class="nl" v-if="campaign.referenceLink">
              <b>Sample content reference link:</b>
              <a :href="campaign.referenceLink">{{ campaign.referenceLink }}</a>
            </p>
            <p class="nl">
              <b>Campaign objective awareness:</b>
              {{ (campaign.campaignObjectiveAwareness as any).join(", ") }}
            </p>
            <p class="nl">
              <b>Campaign objective acquisition:</b>
              {{ (campaign.campaignObjectiveAcquisition as any).join(", ") }}
            </p>
          </div>
        </section>

        <section
          v-if="campaign.applicationStatus?.includes('not_applied')"
          class="text-center flex md:gap-8 gap-4 items-center justify-center"
        >
          <button @click="showReportForm = true" class="text-red-700">
            Report this campaign to TIMA
          </button>
          <UiButtonDefault
            @click="() => apply()"
            :loading="application === constants.LOADING"
            :disabled="application === constants.LOADING"
            variant="primary"
            class="py-[0.75rem] px-[3.75rem]"
            label="Apply to this campaign"
          />
        </section>

        <section
          v-else-if="campaign.applicationStatus === 'APPROVED'"
          class="flex justify-center mt-5"
        >
          <UiButtonDefault
            @click="
              () =>
                navigateTo({
                  name: 'InfluencerSubmitContent',
                })
            "
            variant="primary"
            class="py-[0.75rem] px-[3.75rem]"
            label="Submit Content"
          />
        </section>

        <section class="text-red-500 text-lg font-semibold text-center" v-else>
          You application is awaiting approval
        </section>
      </div>
    </transition>
    <AlertItem
      :isAlerting="alert.on"
      :alertType="alert.type"
      :alertMessage="alert.message"
      :alertTitle="alert.title"
    >
      <template #more="{ type }">
        <div v-if="type !== 'success'">
          <UiButtonDefault
            variant="primary"
            class="w-full py-2"
            @click="
              () =>
                navigateTo({
                  name:
                    alert.title === 'Payment information'
                      ? 'InfluencerSettingPayment'
                      : 'SignUpSocials',
                  query: { redirect: route.fullPath },
                })
            "
            :label="
              alert.title === 'Payment information'
                ? 'Update Payment Information'
                : 'Link Account'
            "
          />
        </div>
      </template>
    </AlertItem>

    <UtModal
      v-model:state="showReportForm"
      m-width="34.3125rem"
      content-class="mx-auto mt-[10%]"
    >
      <div class="bg-white dark:bg-gray-700 p-3 pb-5 px-5 rounded-2xl">
        <div class="flex items-center justify-between mb-2">
          <h1 class="text-xl max-w-[200px] leading-10">Reason</h1>
          <button class="" @click="showReportForm = false">
            <UtSvg name="cancel" dim w="1.5rem" h="1.5rem" />
          </button>
        </div>
        <div>
          <textarea
            cols="30"
            v-model="reportReason"
            class="w-full p-5 mb-5 min-h-[18.75rem] rounded-lg border dark:border-gray-600 dark:bg-gray-600/50"
          />
        </div>
        <div>
          <UiButtonDefault
            variant="primary"
            @click="() => report()"
            :loading="isReporting === constants.LOADING"
            :disabled="isReporting === constants.LOADING"
            class="w-full py-2"
            label="Submit"
          />
        </div>
      </div>
    </UtModal>

    <section>
      <h4 class="my-5">Similar Campaigns</h4>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-5 xl:grid-cols-4">
        <template
          v-for="campaign in similarCampaigns"
          :key="campaign.campaign_id"
        >
          <DashboardCampaignCard
            :publicId="campaign.campaign_id || ''"
            :title="campaign.campaignName"
            :image="(campaign.banner as string)"
            :category="campaign.category"
            :brand="campaign.companyName || ''"
            :description="campaign.campaignAbout"
            :budget="0"
            :deadline="campaign.endDate"
            :completion="campaign.statusProgress === 'APPROVED' ? 10 : 0"
          />
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { GetCampaign, GetCampaigns } from "~/lib/interfaces/response";
definePageMeta({
  name: "ViewInfluencerCampaign",
});

const colorExtract = useImageColorExtract();
const image = ref<HTMLImageElement>();
const avgColor = ref(0);

const api = useAPI();
const route = useRoute();
const campaign = ref<GetCampaign["data"]>();
const showReportForm = ref(false);
const reportReason = ref("");
const { notify } = useNotification();

const authStore = useAuthStore();

const alert = reactive({
  on: false,
  type: "success",
  title: "Application submitted successfully",
  message: "",
});

const { execute: getCampaign, state } = useRequestState({
  immediately: true,
  action: () => api.viewCampaign(route.params.id as string),
  onSuccess: (response: any) => {
    campaign.value = response.data;
  },
});

async function extractColor() {
  if (campaign.value?.banner) {
    const value = await colorExtract.getAverageColor(
      campaign.value?.banner as string
    );
    avgColor.value = value;
  }
}

watch(
  () => campaign.value?.banner,
  async () => {
    if (campaign.value?.banner) {
      const value = await colorExtract.getAverageColor(
        campaign.value!.banner as string
      );
      avgColor.value = value;
    }
  }
);

const similarCampaigns = ref<GetCampaigns["data"]>([]);
useRequestState({
  immediately: true,
  action: () =>
    api.getSimilarCampaigns({
      campaign_id: route.params.id as string,
    }),
  onSuccess: (response: any) => {
    similarCampaigns.value = response.data;
  },
});

const { execute: report, state: isReporting } = useRequestState({
  action: () =>
    api.reportCampaign(route.params.id as string, reportReason.value),
  onSuccess: (response: any) => {
    notify({
      title: "Report sent",
      text: "Report has been successfully sent",
      type: "success",
    });

    showReportForm.value = false;
    getCampaign();
  },
  onError: (response) => {
    notify({
      title: "Error",
      text: response.__error?.response?.data?.message,
      type: "error",
    });
  },
});

const { state: application, execute: apply } = useRequestState({
  action: () => {
    if (
      !authStore.profile?.socialMediaAccounts ||
      authStore.profile?.socialMediaAccounts.length === 0
    ) {
      throw new Error("Social media accounts not found");
    }

    if (
      !authStore.profile?.paymentInformation ||
      Object.keys(authStore.profile?.paymentInformation).length === 0
    ) {
      throw new Error("Payment information not found");
    }
    return api.applyToCampaign(route.params.id as string);
  },
  onSuccess: () => {
    getCampaign();
    alert.on = true;
    alert.type = "success";
    alert.message = "Application submitted successfully";

    // navigateTo({
    //   name: "ViewInfluencerCampaign",
    //   params: { id: route.params.id },
    // });
  },
  onError: (response) => {
    if (
      ("message" in response &&
        response.message === "Payment information not found") ||
      response.__error?.response?.data?.message?.includes(
        "Payment Information"
      ) ||
      response.__error?.response?.data?.message?.includes("Payment information")
    ) {
      alert.on = true;
      alert.type = "error";
      alert.title = "Payment information";
      alert.message =
        "Please add your payment information to apply to this campaign";
      return;
    }

    alert.on = true;
    alert.type = "error";
    alert.title =
      response.__error?.response?.data?.message ===
      "You have already applied to this campaign"
        ? "Application already sent"
        : "Social media account not found";
    alert.message =
      response.__error?.response?.data?.message ||
      `Connect your
required social media’ account to
join this campaign`;
  },
});

onMounted(() => {
  try {
    extractColor();
    getCampaign();
  } catch (error) {}
});
</script>

<style></style>
