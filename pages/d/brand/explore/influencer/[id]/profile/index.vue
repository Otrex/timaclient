<template>
  <div
    v-if="state === RequestState.LOADING"
    class="flex items-center justify-center min-h-[50vh]"
  >
    <div class="flex flex-col items-center gap-4">
      <div
        class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      ></div>
      <p class="text-gray-600 text-sm">Loading profile information...</p>
    </div>
  </div>
  <div class="py-[1rem]" v-else>
    <template v-if="(influencer?.socialMediaAccounts || []).length">
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
              :engagement-rate="Math.round(sm?.data?.avgEngagement || 0)"
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
                {{
                  tools.formatNumber(Math.round(metrics.engagementRate || 0))
                }}
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
            noCity
            :loading-countries="
              tools.requestState(getCountriesData) === RequestState.LOADING
            "
            :loading-cities="
              tools.requestState(getCitiesData) === RequestState.LOADING
            "
            :countries="countryData"
            :cities="cityData"
          />
        </div>
        <div class="w-full">
          <StatsAudienceAgeRange
            :loading="
              tools.requestState(getAgeAudienceData) === RequestState.LOADING
            "
            :data="ageGenderData"
          />
        </div>
      </div>

      <!-- <section class="bg-[#F1F9FF] mb-5 rounded-lg p-5 gap-5 items-center">
      <p class="text-base mb-5 dark:text-black">Audience Age range</p>
      <div><UiBar class="w-full" :data="[]" /></div>
    </section> -->

      <section class="bg-[#FFFDF9] mb-5 rounded-lg p-5 gap-5 items-center">
        <p class="text-base mb-5 dark:text-black">Likes History</p>
        <div>
          <UiBar
            class="w-full"
            no-labels
            :data="
            activePlatformData?.data.likeHistory?.map((e: any) => ({
              x: e.date.toLocaleDateString(),
              y: e.likes,
            })) || []
          "
          />
        </div>
      </section>

      <section class="bg-[#FFFDF9] mb-5 rounded-lg p-5 gap-5 items-center">
        <p class="text-base mb-5 dark:text-black">Comments History</p>
        <div>
          <UiBar
            class="w-full"
            no-labels
            :data="
            activePlatformData?.data.commentsHistory?.map((e: any) => ({
              x: e.date.toLocaleDateString(),
              y: e.comments,
            })) || []
          "
          />
        </div>
      </section>

      <section class="bg-[#FFFDF9] mb-5 rounded-lg p-5 gap-5 items-center">
        <p class="text-base mb-5 dark:text-black">Views History</p>
        <div>
          <UiBar
            class="w-full"
            no-labels
            :data="
            activePlatformData?.data.viewsHistory?.map((e: any) => ({
              x: e.date.toLocaleDateString(),
              y: e.views,
            })) || []
          "
          />
        </div>
      </section>

      <section class="mb-5 rounded-lg p-5 gap-5 items-center">
        <p class="text-base mb-5">Trending Posts</p>

        <div>
          <table
            class="min-w-full bg-white dark:border-gray-800 dark:bg-transparent border border-gray-200"
          >
            <thead class="bg-gray-50 dark:text-white dark:bg-transparent">
              <tr>
                <th
                  class="py-3 px-6 text-left text-base font-medium text-gray-700 dark:text-white dark:border-gray-800 border-b border-gray-200"
                >
                  Rank
                </th>
                <th
                  class="py-3 px-6 text-left text-base font-medium text-gray-700 border-b dark:text-white dark:border-gray-800 border-gray-200"
                >
                  Post Date
                </th>
                <th
                  class="py-3 px-6 whitespace-nowrap text-left text-base font-medium text-gray-700 border-b dark:text-white dark:border-gray-800 border-gray-200"
                >
                  Post Description / Caption
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
              </tr>
            </thead>

            <tbody
              v-if="
                activePlatformData &&
                activePlatformData?.data?.trendingPosts?.length
              "
            >
              <tr
                class="hover:bg-gray-50"
                v-for="(item, idx) in activePlatformData?.data?.trendingPosts ||
                []"
                :key="idx"
              >
                <td class="py-4 px-6 border-b border-gray-200 text-gray-900">
                  {{ idx + 1 }}
                </td>
                <td class="py-4 px-6 border-b border-gray-200 text-gray-900">
                  {{ tools.formatDate(item.date) }}
                </td>
                <td class="py-4 px-6 border-b border-gray-200 text-gray-900">
                  {{ item.description }}
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
    </template>
    <template v-else>
      <div class="flex items-center justify-center py-8 text-gray-500">
        <span class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span class="font-bold">
            Influencer hasn't added any social media platforms yet</span
          >
        </span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { DemographyType, RequestState } from "~/lib/enums";
import type { Core } from "~/lib/interfaces";
import type { AgeGenderData, LocaleData } from "~/lib/interfaces/core";
import type { GetInfluencerProfileResponse } from "~/lib/interfaces/response";
import { tools } from "#build/imports";
import { X } from "lucide-vue-next";

const props = defineProps<{ publicId: string }>();
const api = useAPI();

const authStore = useAuthStore();

const MAX_DATA_COUNT = 5;
const openCampaigns = ref(false);
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

const campaigns = ref<Core.Campaign[]>([]);
const { state } = useRequestState({
  immediately: true,
  action: async () => {
    const response = await api.getInfluencerById(route.params.id as string);
    const promises = response.data.socialMediaAccounts.map(async (sm, idx) => {
      try {
        if (sm.platformName.toLowerCase() === "instagram") {
          const [res, datares] = await Promise.all([
            api.socials.getInstagramByUsername(sm.userName),
            api.socials.getInstagramPostByUsername(sm.userName),
          ]);

          return [
            "instagram",
            {
              avgEngagement: res["Engagement Rate"],
              avgLikes: res["Average Likes"],
              followers: res["Followers"],
              history: datares,
              likeHistory: datares.map((d: any) => ({
                likes: d.Likes,
                date: new Date(d.Date),
              })),
              viewsHistory: datares.map((d: any) => ({
                views: d.Views,
                date: new Date(d.Date),
              })),
              commentsHistory: datares.map((d: any) => ({
                comments: d.Comments,
                date: new Date(d.Date),
              })),
              trendingPosts: datares.map((d: any) => ({
                likes: d.Likes,
                comments: d.Comments,
                views: d.Views,
                description: d.Caption,
                date: new Date(d.Date),
                link: null,
              })),
            },
          ];
        }

        if (sm.platformName.toLowerCase() === "tiktok") {
          const [res, datares] = await Promise.all([
            api.socials.getTiktokByUsername(sm.userName),
            api.socials.getTiktokPostByUsername(sm.userName),
          ]);

          return [
            "tiktok",
            {
              avgEngagement: res.engagement_metrics?.average_likes_per_video,
              avgLikes: res.engagement_metrics?.total_likes,
              followers: res.follower_count,
              history: datares.posts,
              likeHistory: datares?.posts?.map((d: any) => ({
                likes: d.like_count,
                date: new Date(d.publish_date),
              })),
              viewsHistory: datares?.posts?.map((d: any) => ({
                views: d.play_count,
                date: new Date(d.publish_date),
              })),
              commentsHistory: datares?.posts?.map((d: any) => ({
                comments: d.comment_count,
                date: new Date(d.publish_date),
              })),
              trendingPosts: datares?.posts?.map((d: any) => ({
                likes: d.like_count,
                comments: d.comment_count,
                views: d.play_count,
                description: d.description,
                date: new Date(d.publish_date),
                link: d.video_url,
              })),
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

    response.data.audienceDemographics = tools.parseAudienceDemographics(
      response.data.audienceDemographics
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

const { state: fetch, execute: getCampaigns } = useRequestState({
  immediately: true,
  action: () => api.getBrandCampaigns({}),
  onSuccess(response) {
    campaigns.value = response.data;
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

function getActivePlatform(platform: string) {
  return (influencer.value?.socialMediaAccounts || []).find(
    (media: any) => media.platformName.toLowerCase() == platform
  );
}

const activePlatformData = computed(() => {
  return (
    getActivePlatform(route.query.platform as string) ||
    (influencer.value?.socialMediaAccounts || []).at(0)
  );
});

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

interface DataItem {
  views: number | null;
  date: string;
}

function transformData(
  data: DataItem[]
): { name: string; data: { x: number; y: number }[] }[] {
  // Initialize arrays for each day of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayData: { [key: string]: number[] } = {};

  // Initialize day data
  for (const day of daysOfWeek) {
    dayData[day] = Array.from({ length: 24 }, () => 0); // Initialize 24 hours for each day
  }

  console.log({ data });

  // Aggregate data by day of the week and hour
  for (const item of data) {
    const date = new Date(item.date);
    const day = daysOfWeek[date.getUTCDay()];
    const hour = date.getUTCHours();
    dayData[day][hour]++;
  }

  // Transform aggregated data into series format
  const seriesData = daysOfWeek.map((day) => ({
    name: day,
    data: dayData[day].map((count, hour) => ({ x: hour, y: count * 3 })),
  }));

  return seriesData;
}

const series = ref(
  transformData(activePlatformData.value?.data?.viewsHistory || []).map(
    (e) => ({
      name: e.name,
      data: e.data.map((d) => ({
        x: d.x,
        y: d.y,
      })),
    })
  )
);

watch(
  () => activePlatformData.value?.data?.viewsHistory,
  (data) => {
    series.value = transformData(data || []).map((e) => ({
      name: e.name,
      data: e.data.map((d) => ({
        x: d.x,
        y: d.y,
      })),
    }));
  },
  { immediate: true }
);
const _series = ref([
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

watch(
  () => openCampaigns,
  () => {
    getCampaigns();
  }
);
</script>

<style></style>
