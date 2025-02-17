<template>
  <section v-if="state === 'LOADING'">
    <div class="flex flex-col items-center justify-center min-h-[60vh]">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"
      ></div>
      <div class="text-gray-600 text-lg font-medium">
        Loading campaign data...
      </div>
      <div class="text-gray-400 text-sm mt-2">
        Please wait while we fetch your statistics
      </div>
    </div>
  </section>
  <section v-else>
    <div
      style="--clr: rgba(228, 243, 255, 0.5)"
      class="bg-[--clr] rounded-b-md p-[1.25rem] mt-[0.375rem]"
    >
      <div class="flex flex-col gap-[1.25rem]">
        <template v-for="(metric, idx) in metrics" :key="idx">
          <StatsMetrics
            :title="metric.title"
            :socials="metric.socials"
            :data="metric.data"
          />
        </template>
      </div>
    </div>

    <div
      class="flex flex-col mb-[1.25rem] lg:flex-row gap-[1.25rem] mt-[1.25rem]"
    >
      <div class="w-full">
        <StatsAudienceAgeRange
          :loading="true"
          :data="ageGenderData"
          bg="rgba(228, 243, 255, 0.5)"
          class="w-full"
        />
      </div>
      <div class="w-full">
        <StatsAudienceGenderDistribution
          v-bind="audienceGenderPie"
          bg="rgba(228, 243, 255, 0.5)"
        />
      </div>
    </div>

    <div class="w-full">
      <StatsWorldMap
        v-if="countryDistribution?.length"
        :data="countryDistribution || []"
        bg="rgba(228, 243, 255, 0.5)"
        class="w-full"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { DemographyType } from "~/lib/enums";
import { Core } from "~/lib/interfaces";
import type { AgeGenderData } from "~/lib/interfaces/core";
import type { GetCampaignAnalytics } from "~/lib/interfaces/response";

definePageMeta({
  name: "ViewBrandCampaignAnalytics",
});

const metrics = ref([
  {
    title: "MAIN KPIS",
    socials: ["instagram", "tiktok"],
    data: [
      {
        label: "Account",
        value: 0,
      },
      {
        label: "Followers",
        value: tools.formatNumber(0),
      },
    ],
  },
  {
    title: "Interactions summary",
    socials: ["instagram", "tiktok"],
    data: [
      {
        label: "Engagement",
        value: "0%",
      },
      {
        label: "Reach",
        value: "0",
      },
      {
        label: "Likes",
        value: "0",
      },
      {
        label: "Comment",
        value: "0",
      },
      {
        label: "Shared",
        value: "0",
      },
      {
        label: "Impressions",
        value: "0",
      },
    ],
  },

  {
    title: "AUDIENCE DISTRIBUTION SUMMARY",
    socials: ["instagram", "tiktok"],
    data: [
      {
        label: "Top country",
        value: "Nigeria",
      },
      {
        label: "Top city",
        value: "Lagos",
      },
      {
        label: "Top gender",
        value: "Women",
      },
      {
        label: "Top age",
        value: "20-30",
      },
    ],
  },

  {
    title: "Budget",
    socials: ["instagram", "tiktok"],
    data: [
      {
        label: "Campaign budget",
        value: tools.formatCurrency(3_000_000),
      },
      {
        label: "Amount spent",
        value: tools.formatCurrency(1_000_000),
      },
    ],
  },
]);

const api = useAPI();
const route = useRoute();
const { notify } = useNotification();
const influencers = ref<Core.Application[]>([]);
// Depricate
const ageGenderData = ref<AgeGenderData[]>([]);

const campaignAnalytics = ref<GetCampaignAnalytics["data"] | null>(null);

const { state, execute } = useRequestState({
  immediately: true,
  action: () => api.fetchCampaignAnalytics(route.params.id as any),
  onSuccess(response) {
    campaignAnalytics.value = response.data;
    metrics.value[2].socials = response.data.socialMediaPlatform;
    metrics.value[2].data = [
      {
        label: "Top Countries",
        value: response.data.audienceLocation.join(", "),
      },
      {
        label: "Top Genders",
        value: response.data.audienceGender.join(", "),
      },
    ];

    metrics.value[3].data = [
      {
        label: "Campaign budget",
        value: tools.formatCurrency(+(response.data.planningBudget || 0)),
      },
      {
        label: "Amount spent",
        value: "Not given",
      },
    ];
  },
});

const getApplicationsInfluencer = useRequestState({
  immediately: true,
  action: () =>
    api.getApplicantsByCampaign(route.params.id as string, {
      sortBy: "createdOn",
      sortIn: "DESC",
      page: 0,
      size: 10,
    }),
  onSuccess: (response) => {
    influencers.value = response.data;
    response.data.map((a) => getAgeAudienceData.execute(a.submittedBy));
  },
  onError: (err) => {
    console.log(err);

    // notify({
    //   type: "error",
    //   title: err.title,
    //   text: err.description,
    // });
  },
});

const getKPI = useRequestState({
  immediately: true,
  action: () => api.getCampaignKPI(route.params.id as string),
  onSuccess(response) {
    const data = response.data;
    metrics.value[0].data[0].value = data.accounts;
    metrics.value[0].data[1].value = tools.formatNumber(data.followers);
  },
});

const getInteractionSummary = useRequestState({
  immediately: true,
  action: () => api.getCampaignInteractionSummary(route.params.id as string),
  onSuccess(response) {
    const data = response.data;
    metrics.value[1].data[0].value = tools.formatNumber(data.engagement);
    metrics.value[1].data[1].value = tools.formatNumber(data.reach);
    metrics.value[1].data[2].value = tools.formatNumber(data.likes);
    metrics.value[1].data[3].value = tools.formatNumber(data.comments);
    metrics.value[1].data[4].value = tools.formatNumber(data.shared);
    metrics.value[1].data[5].value = tools.formatNumber(data.impressions);
  },
});

const audienceGenderPie = ref({
  men: 0,
  women: 0,
});

const countryDistribution = ref<{ name: string; value: string | number }[]>();

const getCampaignDistributions = useRequestState({
  immediately: true,
  action: () => api.getCampaignDistribution(route.params.id as string),
  onSuccess(response) {
    audienceGenderPie.value = {
      men:
        response.data.audienceDistributionGraph.genderPie.find(
          (e) => e.name == "Male"
        )?.value || 0,
      women:
        response.data.audienceDistributionGraph.genderPie.find(
          (e) => e.name == "Female"
        )?.value || 0,
    };

    metrics.value[2].data[0].value =
      response.data.audienceDistributionSummary.topCountry;
    metrics.value[2].data[1].value =
      response.data.audienceDistributionSummary.topCity;
    metrics.value[2].data[2].value =
      response.data.audienceDistributionSummary.topGender;
    metrics.value[2].data[3].value =
      response.data.audienceDistributionSummary.topAge;

    countryDistribution.value = response.data.audienceDistributionGraph.country;
  },
});
</script>

<style></style>
