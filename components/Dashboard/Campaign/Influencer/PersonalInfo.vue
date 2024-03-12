<template>
  <div class="py-[1rem]">
    <p class="sm text-[color:--clr-grey-300] mb-[0.75rem]">
      Social Media Platform
    </p>

    <div class="flex flex-col md:flex-row mb-[2rem] gap-[1.25rem]">
      <div class="md:w-1/3 w-full">
        <DashboardCampaignDataSocialCard
          social="instagram"
          :followers="instagramSMData?.followers || 0"
          :engagement-rate="instagramSMData?.avgEngagement || 0"
          :likes="instagramSMData?.totalLikes || 0"
        />
      </div>
      <!-- <div class="w-full">
        <DashboardCampaignDataSocialCard
          social="tiktok"
          :followers="3550000"
          :engagement-rate="10"
          :likes="600000"
        />
      </div>
      <div class="w-full">
        <DashboardCampaignDataSocialCard
          social="twitter"
          :followers="4000000"
          :engagement-rate="10"
          :likes="600000"
        />
      </div> -->
    </div>

    <!--<div class="flex mb-[1.125rem] flex-col md:flex-row gap-[1.125rem]">
      <div class="w-full">
        <StatsIncome />
      </div>
      <div class="w-full">
        <StatsEthnicity />
      </div>
    </div> -->

    <div class="flex mb-[2.625rem] flex-col items-center gap-[1.125rem]">
      <div class="w-full">
        <StatsAudienceAgeRange
          :loading="
            tools.requestState(getAgeAudienceData) === constants.LOADING
          "
          :data="ageGenderData"
          bg="rgba(228, 243, 255, 0.5)"
          :aspect-ratio="16 / 7"
        />
      </div>
      <div class="w-full">
        <StatsLocale
          :loading-countries="
            tools.requestState(getCountriesData) === constants.LOADING
          "
          :loading-cities="
            tools.requestState(getCitiesData) === constants.LOADING
          "
          :countries="countryData"
          :cities="cityData"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DemographyType } from "~/lib/enums";
import type { Core } from "~/lib/interfaces";
import type { AgeGenderData, LocaleData } from "~/lib/interfaces/core";

const props = defineProps<{ publicId: string }>();
const api = useAPI();

const MAX_DATA_COUNT = 5;
const cityData = ref<LocaleData[]>([]);
const countryData = ref<LocaleData[]>([]);
const ageGenderData = ref<AgeGenderData[]>([]);
const instagramSMData = ref<Core.SocialMediaInsight>();

const truncList = tools.truncateList(MAX_DATA_COUNT);

const getCountriesData = useRequestState({
  immediately: true,
  action: () =>
    api.getDemographyInsights({
      type: DemographyType.COUNTRY,
      influencerId: props.publicId,
      socialMedia: "Instagram",
    }),
  onSuccess(response) {
    countryData.value = truncList(response.data).map((d) => ({
      percentage: d.value3 || 0,
      name: d.name,
    }));
  },
});

const getCitiesData = useRequestState({
  immediately: true,
  action: () =>
    api.getDemographyInsights({
      type: DemographyType.CITY,
      influencerId: props.publicId,
      socialMedia: "Instagram",
    }),
  onSuccess(response) {
    cityData.value = truncList(response.data).map((d) => ({
      percentage: d.value3 || 0,
      name: d.name,
    }));
  },
});

const getAgeAudienceData = useRequestState({
  immediately: true,
  action: () =>
    api.getDemographyInsights({
      type: DemographyType.AGE_GENDER,
      influencerId: props.publicId,
      socialMedia: "Instagram",
    }),
  onSuccess(response) {
    ageGenderData.value = response.data.map((d) => ({
      ageRange: d.name,
      male: d.value2 || 0,
      female: d.value1 || 0,
      percentage: d.value3 || 0,
    }));
  },
});

const getSocialInsight = useRequestState({
  immediately: true,
  action: () => api.getSocialInsightById(props.publicId, "Instagram"),
  onSuccess(response) {
    instagramSMData.value = response.data;
  },
});
</script>

<style></style>
