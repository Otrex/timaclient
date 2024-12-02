<template>
  <div v-if="state === constants.LOADING">L O A D I N G . . .</div>
  <div class="py-[1rem]" v-else>
    <p class="font-semibold text-base mb-[0.75rem]">Social Media Platform</p>

    <div class="flex flex-col md:flex-row mb-[2rem] gap-[1.25rem]">
      <template
        v-for="(sm, idx) in influencer?.socialMediaAccounts || []"
        :key="idx"
      >
        <NuxtLink
          :to="{ query: { platform: sm.platformName.toLowerCase() } }"
          class="md:w-1/3 w-full"
          :class="
            isActive(sm.platformName.toLowerCase())
              ? '!border-blue-500 rounded-xl !border-2'
              : ''
          "
        >
          <DashboardCampaignDataSocialCard
            :social="sm.platformName.toLowerCase()"
            :followers="sm?.data?.followers || 0"
            :engagement-rate="sm?.data?.avgEngagement || 0"
            :likes="sm?.data?.avgLikes || 0"
          />
        </NuxtLink>
      </template>
    </div>

    <div class="mb-5">
      <p class="font-semibold text-base mb-[0.75rem]">
        Content Engagement Overview
      </p>

      <div class="bg-[#F1F9FF] rounded-xl flex md:flex-row flex-col p-6">
        <div class="w-full flex items-center flex-row gap-3 md:w-1/3">
          <UtSvg name="thumbs" dim w="2rem" h="2rem" />
          <div>
            <p class="-mb-2 dark:text-black">
              {{ tools.formatNumber(metrics.likes || 0) }}
            </p>
            <span class="text-[#777] text-xs">Average Likes</span>
          </div>
        </div>
        <div class="w-full flex flex-row gap-3 md:w-1/3">
          <UtSvg name="xeye" dim w="2rem" h="2rem" />
          <div>
            <p class="-mb-2 dark:text-black">
              {{ tools.formatNumber(metrics.engagementRate || 0) }}
            </p>
            <span class="text-[#777] text-xs">Average Views</span>
          </div>
        </div>
        <div class="w-full flex flex-row gap-3 md:w-1/3">
          <UtSvg name="comments" dim w="2rem" h="2rem" />
          <div>
            <p class="-mb-2 dark:text-black">
              {{ tools.formatNumber(metrics.followers || 0) }}
            </p>
            <span class="text-[#777] text-xs">Average followers</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex mb-[1.125rem] flex-col md:flex-row gap-[1.125rem]">
      <div class="w-full py-5">
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
        <!-- <StatsAudienceAgeRange
          :loading="
            tools.requestState(getAgeAudienceData) === constants.LOADING
          "
          :data="ageGenderData"
        /> -->
      </div>
      <div class="w-full">
        <StatsEthnicity />
      </div>
    </div>

    <section class="bg-[#F1F9FF] mb-5 rounded-lg p-5 gap-5 items-center">
      <p class="text-base mb-5 dark:text-black">Audience Age range</p>
      <div><UiBar class="w-full" :data="[]" /></div>
    </section>

    <section class="bg-[#FFFDF9] mb-5 rounded-lg p-5 gap-5 items-center">
      <p class="text-base mb-5 dark:text-black">Likes History</p>
      <div><UiBar class="w-full" :data="[]" /></div>
    </section>

    <section class="bg-[#FFFDF9] mb-5 rounded-lg p-5 gap-5 items-center">
      <p class="text-base mb-5 dark:text-black">Comments History</p>
      <div><UiBar class="w-full" :data="[]" /></div>
    </section>

    <section class="bg-[#FFFDF9] mb-5 rounded-lg p-5 gap-5 items-center">
      <p class="text-base mb-5 dark:text-black">Views History</p>
      <div><UiBar class="w-full" :data="[]" /></div>
    </section>

    <section class="mb-5 rounded-lg p-5 gap-5 items-center">
      <p class="text-base mb-5">Trending Posts</p>
      <div>
        <table
          class="min-w-full bg-white dark:border-gray-800 dark:bg-transparent border border-gray-200"
        >
          <thead class="bg-gray-50 dark:text-white dark:bg-transparent">
            <th
              class="py-3 px-6 text-left text-base font-medium text-gray-700 dark:text-white dark:border-gray-800 border-b border-gray-200"
            >
              Rank
            </th>
            <th
              class="py-3 px-6 text-left text-base font-medium text-gray-700 border-b dark:text-white dark:border-gray-800 border-gray-200"
            >
              Post Title
            </th>
            <th
              class="py-3 px-6 text-left text-base font-medium text-gray-700 border-b dark:text-white dark:border-gray-800 border-gray-200"
            >
              Post Date
            </th>
            <th
              class="py-3 px-6 text-left text-base font-medium text-gray-700 border-b dark:text-white dark:border-gray-800 border-gray-200"
            >
              Likes
            </th>
            <th
              class="py-3 px-6 text-left text-base font-medium text-gray-700 border-b dark:text-white dark:border-gray-800 border-gray-200"
            >
              Comments
            </th>
            <th
              class="py-3 px-6 text-left text-base font-medium text-gray-700 border-b dark:text-white dark:border-gray-800 border-gray-200"
            >
              Views
            </th>
            <th
              class="py-3 px-6 text-left text-base font-medium text-gray-700 border-b dark:text-white dark:border-gray-800 border-gray-200"
            >
              URL
            </th>
          </thead>

          <tbody v-if="postData.length > 0">
            <tr
              class="hover:bg-gray-50"
              v-for="(item, idx) in postData"
              :key="idx"
            >
              <td class="py-4 px-6 border-b border-gray-200 text-gray-900">
                {{ item.sn }}
              </td>
              <td class="py-4 px-6 border-b border-gray-200 text-gray-900">
                {{ item.title }}
              </td>
              <td class="py-4 px-6 border-b border-gray-200 text-gray-900">
                {{ item.date }}
              </td>
              <td class="py-4 px-6 border-b border-gray-200 text-gray-900">
                {{ tools.formatNumber(item.likes) }}
              </td>
              <td class="py-4 px-6 border-b border-gray-200 text-gray-900">
                {{ tools.formatNumber(item.comments) }}
              </td>
              <td class="py-4 px-6 border-b border-gray-200 text-gray-900">
                {{ tools.formatNumber(item.views) }}
              </td>
              <td class="py-4 px-6 border-b border-gray-200 text-blue-500">
                <a :href="item.link" target="_blank">Link</a>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="100%">
                <div class="flex py-10 justify-center items-center">
                  No Data
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="bg-[#FFFDF9] mb-5 rounded-lg p-5 gap-5 items-center">
      <div>
        <apexchart
          type="heatmap"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { DemographyType } from "~/lib/enums";
import type { Core } from "~/lib/interfaces";
import type { AgeGenderData, LocaleData } from "~/lib/interfaces/core";
import type { GetInfluencerProfileResponse } from "~/lib/interfaces/response";

const props = defineProps<{ publicId: string }>();
const api = useAPI();

const MAX_DATA_COUNT = 5;
const cityData = ref<LocaleData[]>([]);
const countryData = ref<LocaleData[]>([]);
const ageGenderData = ref<AgeGenderData[]>([]);
const instagramSMData = ref<Core.SocialMediaInsight>();

const truncList = tools.truncateList(MAX_DATA_COUNT);

definePageMeta({
  name: "BrandInfluencerProfile",
});

const route = useRoute();

const influencer = ref<GetInfluencerProfileResponse["data"] | null>(null);

const metrics = computed(() => {
  return {
    followers: influencer.value?.socialMediaAccounts
      .map((sm) => sm.data?.followers || 0)
      .reduce((a, b) => a + b, 0),
    engagementRate: influencer.value?.socialMediaAccounts
      .map((sm) => sm.data?.avgEngagement || 0)
      .reduce((a, b) => a + b, 0),
    likes: influencer.value?.socialMediaAccounts
      .map((sm) => sm.data?.avgLikes || 0)
      .reduce((a, b) => a + b, 0),
  };
});
const { state } = useRequestState({
  immediately: true,
  action: async () => {
    const response = await api.getInfluencerById(route.params.id as string);
    const promises = response.data.socialMediaAccounts.map(async (sm, idx) => {
      try {
        if (sm.platformName.toLowerCase() === "instagram") {
          const res = await api.socials.getInstagramByUsername(sm.userName);
          return [
            "instagram",
            {
              avgEngagement: res["Engagement Rate"],
              avgLikes: res["Average Likes"],
              followers: res["Followers"],
            },
          ];
        }

        if (sm.platformName.toLowerCase() === "tiktok") {
          const res = await api.socials.getTiktokByUsername(sm.userName);
          return [
            "tiktok",
            {
              avgEngagement: res.engagement_metrics?.average_likes_per_video,
              avgLikes: res.engagement_metrics?.total_likes,
              followers: res.follower_count,
            },
          ];
        }

        if (sm.platformName.toLowerCase() === "twitter") {
          const res = await api.socials.getXByUsername(sm.userName);
          return [
            "twitter",
            {
              avgEngagement: res["Engagement Rate"],
              avgLikes: res["Average Likes"],
              followers: res.Followers,
            },
          ];
        }

        if (sm.platformName.toLowerCase() === "youtube") {
          const res = await api.socials.getYoutubeByUsername(sm.userName);
          return [
            "youtube",
            {
              avgEngagement: res.engagement_rate,
              avgLikes: res.total_likes,
              followers: res.subscriber_count,
            },
          ];
        }
      } catch (error) {}
    });

    const res = await Promise.all(promises);

    const rres = Object.fromEntries(res.filter((r) => r !== undefined));

    response.data.socialMediaAccounts = response.data.socialMediaAccounts.map(
      (r) => {
        const { platformName } = r;
        return {
          ...r,
          data: rres[platformName.toLowerCase()] || {},
        };
      }
    );

    return response;
  },
  onSuccess(response) {
    influencer.value = response.data;
  },
});

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

const postData = ref<
  Array<{
    sn: number;
    title: string;
    description?: string;
    date: string;
    likes: number;
    comments: number;
    views: number;
    link: string;
  }>
>([]);

function isActive(tab: string) {
  return route.query.platform == tab;
}

// Heat map
const chartOptions = ref({
  chart: {
    height: 350,
    type: "heatmap",
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#008FFB"],
  title: {
    text: "Views by day/hour",
  },
});

const series = ref([
  {
    name: "Monday",
    data: Array.from({ length: 18 }, () => ({
      x: Math.floor(Math.random() * 90),
      y: Math.floor(Math.random() * 90),
    })),
  },
  {
    name: "Tuesday",
    data: Array.from({ length: 18 }, () => ({
      x: Math.floor(Math.random() * 90),
      y: Math.floor(Math.random() * 90),
    })),
  },
  {
    name: "Wednesday",
    data: Array.from({ length: 18 }, () => ({
      x: Math.floor(Math.random() * 90),
      y: Math.floor(Math.random() * 90),
    })),
  },
  {
    name: "Thursday",
    data: Array.from({ length: 18 }, () => ({
      x: Math.floor(Math.random() * 90),
      y: Math.floor(Math.random() * 90),
    })),
  },
  {
    name: "Friday",
    data: Array.from({ length: 18 }, () => ({
      x: Math.floor(Math.random() * 90),
      y: Math.floor(Math.random() * 90),
    })),
  },
  {
    name: "Saturday",
    data: Array.from({ length: 18 }, () => ({
      x: Math.floor(Math.random() * 90),
      y: Math.floor(Math.random() * 90),
    })),
  },
  {
    name: "Sunday",
    data: Array.from({ length: 18 }, () => ({
      x: Math.floor(Math.random() * 90),
      y: Math.floor(Math.random() * 90),
    })),
  },
]);
</script>

<style></style>
