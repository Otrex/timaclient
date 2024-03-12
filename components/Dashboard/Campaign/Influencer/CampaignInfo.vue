<template>
  <div class="mt-[0.8125rem]">
    <div class="bg-[#2B2B2B] p-5 pb-3">
      <!-- <p class="text-[color:--clr-grey-300] mb-[1rem]">
        Campaign experiences (45)
      </p> -->

      <UtLoadPresenter
        :state="tools.requestState(influencerExperiences)"
        loading-message="Fetching experiences"
        text-class="text-white max-h-[250px]"
        not-found-message="No experiences found"
        :data="!experiences.length"
      >
        <div
          :class="[
            displayPartially
              ? 'max-h-[4.375rem] overflow-y-clip'
              : 'max-h-screen overflow-y-auto',
          ]"
          class="grid transition-all md:grid-cols-1 lg:grid-cols-3 gap-x-[1.25rem] items-center gap-y-[1.375rem]"
        >
          <div v-for="(campaign, idx) in experiences" :key="idx">
            <div
              :data-id="campaign.id"
              @click="selectCampaign(campaign.id)"
              :class="[
                'flex items-center hover:border-2 border-red-700 border-solid relative bg-white flex-row gap-[0.75rem]',
                campaign.active && 'border-2 border-red-700 border-solid',
              ]"
            >
              <div>
                <div class="w-[3rem] h-[3rem] overflow-hidden rounded-md">
                  <UiImg
                    class="w-full h-full object-cover"
                    src="https://s3-alpha-sig.figma.com/img/5ebb/b7ac/d173c2ab9eac7e4886e5e3181567352f?Expires=1704067200&Signature=KT81KiEiH1ZoXZSZ3Zxg9uzkEriY~c3Cq34kSW-hV~f06XAZYV4RFOg-5fQNkVnKwFsVMXb6poL~3mozCr-evXFxSkhIenFxxFFWMADwan4GTkihcbxn2rVBGau4REue0fRmRraiT2OlPB-JuChvSMLtmBe~ja4RtpcFXiHXjVYjdNf6KBdPKXvlsDVX145tR4wEDmUqCMxHCET~mouPeecHxteV3oJEoAXyK5vtN6vmzs6sxhKQr8bsOKk7uykAUwGcHMWdHttz1ibwjpwocfRcZAScuLrCSZ~7Z-5K6UbU5cxNo0BSsKotjK0TBLhUTyNEtd1P6-6hWrNZhSyV4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    alt=""
                  />
                </div>
              </div>
              <div>
                <p
                  style="text-overflow: ellipsis"
                  class="nl w-full pr-3 whitespace-nowrap"
                >
                  {{ campaign.name }}
                </p>
                <p class="sm text-[color:--clr-grey-300]">
                  {{ tools.formatDate(campaign.startDate) }} -
                  {{ tools.formatDate(campaign.endDate) }}
                </p>
              </div>

              <div
                class="absolute bottom-0 right-0 p-1 pr-2"
                v-if="campaign.active"
              >
                <UtSvg
                  name="check-sq"
                  dim
                  w="1rem"
                  h="1rem"
                  class="text-red-700 bg-white rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </UtLoadPresenter>

      <div class="text-center">
        <button
          @click="displayPartially = !displayPartially"
          class="text-white inline-flex flex-row items-center hover:text-red-700 text-[0.75rem]"
        >
          {{ displayPartially ? "See more" : "Hide all" }}
          <UtSvg
            name="down-caret"
            dim
            w="0.75rem"
            h="0.75rem"
            class="ml-1 rounded-full transition-all"
            :class="[displayPartially || 'rotate-[180deg]']"
          />
        </button>
      </div>
    </div>

    <UtLoadPresenter
      :state="tools.requestState(getCampaignInfo)"
      loading-message="Fetching campaign details..."
      text-class="max-h-[250px]"
      not-found-message="Please select a campaign experience"
      :data="!campaignInfo"
    >
      <div
        class="bg-[#454545] mb-[1.3125rem] text-white px-[1rem] py-[1.25rem]"
      >
        <p>{{ campaignInfo?.brandName }} - {{ campaignInfo?.overview.name }}</p>

        <p class="nl">
          {{ campaignInfo?.overview.briefDescription }}
        </p>
      </div>

      <div class="flex flex-wrap gap-[3.75rem] mb-[1.875rem]">
        <div class="inline-flex flex-row gap-[0.625rem] items-center">
          <div>
            <UtSvg name="yellow-eye" dim w="1rem" h="1rem" />
          </div>
          <div>
            <p class="nl">{{ tools.formatNumber(reach) }}</p>
            <p class="sm text-[color:--clr-grey-300]">Reach</p>
          </div>
        </div>

        <div class="inline-flex flex-row gap-[0.625rem] items-center">
          <div>
            <UtSvg name="bad-message" dim w="1rem" h="1rem" />
          </div>
          <div>
            <p class="nl">
              {{ tools.formatNumber(comments) }}
            </p>
            <p class="sm text-[color:--clr-grey-300]">Comments</p>
          </div>
        </div>

        <div class="inline-flex flex-row gap-[0.625rem] items-center">
          <div>
            <UtSvg name="like" dim w="1rem" h="1rem" />
          </div>
          <div>
            <p class="nl">{{ tools.formatNumber(likes) }}</p>
            <p class="sm text-[color:--clr-grey-300]">Likes</p>
          </div>
        </div>

        <div class="inline-flex flex-row gap-[0.625rem] items-center">
          <div>
            <UtSvg name="bookmark-solid" dim w="1rem" h="1rem" />
          </div>
          <div>
            <p class="nl">{{ tools.formatNumber(saves) }}</p>
            <p class="sm text-[color:--clr-grey-300]">Saved</p>
          </div>
        </div>

        <div class="inline-flex flex-row gap-[0.625rem] items-center">
          <div>
            <UtSvg name="share" dim w="1rem" h="1rem" />
          </div>
          <div>
            <p class="nl">{{ tools.formatNumber(shares) }}</p>
            <p class="sm text-[color:--clr-grey-300]">Share</p>
          </div>
        </div>

        <div class="inline-flex flex-row gap-[0.625rem] items-center">
          <div>
            <UtSvg name="video-watch" dim w="1rem" h="1rem" />
          </div>
          <div>
            <p class="nl">{{ tools.formatNumber(impressions) }}</p>
            <p class="sm text-[color:--clr-grey-300]">Impressions</p>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-[3.75rem] mb-[1.875rem]">
        <div>
          <p class="sm text-[color:--clr-grey-300]">Social Media Platform</p>
          <div class="inline-flex flex-wrap gap-[0.625rem]">
            <UtSvg
              dim
              v-for="(socials, idx) in campaignInfo?.overview
                .socialMediaPlatforms || []"
              w="1.3125rem"
              :name="tools.resolveSocialsIcon(socials)"
              h="1.3125rem"
              :key="idx"
            />
          </div>
        </div>

        <div>
          <p class="sm text-[color:--clr-grey-300]">Date accepted</p>
          <p class="nl">
            {{ tools.formatDate(new Date()) }}
          </p>
        </div>
      </div>

      <div class="flex flex-wrap gap-[3.75rem] mb-[1.875rem]">
        <div>
          <p class="sm text-[color:--clr-grey-300]">Planned Budget</p>
          <p class="nl">
            {{
              tools.formatCurrency(
                campaignInfo?.overview.plannedBudget || 0,
                "₦"
              )
            }}
          </p>
        </div>
        <!--
        <div>
          <p class="sm text-[color:--clr-grey-300]">Agreed payment</p>
          <p class="nl">{{ tools.formatCurrency(100000, "₦") }}</p>
        </div>

        <div>
          <p class="sm text-[color:--clr-grey-300]">Initial payment</p>
          <p class="nl">{{ tools.formatCurrency(50000, "₦") }}</p>
        </div>

        <div>
          <p class="sm text-[color:--clr-grey-300]">Balance to be paid</p>
          <p class="nl">{{ tools.formatCurrency(50000, "₦") }}</p>
        </div>
-->
        <div>
          <p class="sm text-[color:--clr-grey-300]">Mode of payment</p>
          <p class="nl">{{ campaignInfo?.creative.paymentType }}</p>
        </div>
      </div>
    </UtLoadPresenter>
    <!--
    <div class="flex flex-wrap gap-[3.75rem] mb-[1.875rem]">
      <div>
        <p class="sm text-[color:--clr-grey-300]">Publication type</p>
        <p class="nl">Video</p>
      </div>
    </div>
    
    <div class="mb-[1.875rem]">
      <p class="sm text-[color:--clr-grey-300] mb-[0.375rem]">Content posted</p>
      <div class="grid grid-cols-3 gap-[0.75rem]">
        <div
          tabindex="1"
          class="aspect-[250/327] overflow-hidden z-[1] relative video-content-bg flex items-center justify-center"
        >
          <div class="absolute inset-0 z-[-1]">
            <UiImg
              src="https://s3-alpha-sig.figma.com/img/128e/110a/3e644d9a1277ab2f9c0f9b05ffa9a7d9?Expires=1704067200&Signature=a9H4L822~YsdF~aTRgwIMMiBy2eEdBZwxvuyd2BfM2BVvc7P2l2u80e~GNhfv98VhL1rGNn6zoupI8qwZUkcTNWqOuXiIpebNwzhjvFgtWZgPdu4RlzlxojLyWCu5h0sjhxdqxbcSUXuEq1NEmhocnCpvWYsYowj4Y5mrADkdKlozIr96tmQa03gDS9F3e6OROzAzum9qY5dOxuHL9BaQUutHjqunb9VhO1wa~b3~UU1ikDanmPKr2vAaqqanqTnhU9~Nj8dhy3TYUO-eY-3v9M-CcHCDiWy4v1BoSlqMSsIbWOCvtMfF9QunOgNQ15LnnQ-fA~RDg~DOTzd7vripA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="video cover"
              class="w-full h-full"
            />
          </div>
          <UtSvg name="play" dim w="3.75rem" h="3.75rem" class="text-white" />
        </div>

        <div
          tabindex="1"
          class="aspect-[250/327] overflow-hidden z-[1] relative video-content-bg flex items-center justify-center"
        >
          <div class="absolute inset-0 w-full aspect-[250/327] z-[-1]">
            <UiImg
              src="https://s3-alpha-sig.figma.com/img/dc6e/0ce5/024bad9890f34be89b61b0a4eaa4f996?Expires=1704067200&Signature=EHrt5q7UG~qet2QaOKFpP8nmgQd8Px2a37yUy-A1IeFLv~xw8bwKtcaWtXobZODqNxErZ0e2DHlClrcqjue4zHKHmKXm-CmuEDfe9ZyNwWfRBv3kNDUZjaZDvrjwT5dmLqGCrVVDpkKLHRAPuCoJQnP5zbSBVvrLMMT9mfm0F9VgvYQ98lva4pg7h9cGl7sfxUn3DeqOlC5TvgtP15jmKRAmsCKlU6iCO1ixzLDAhdtQZBNnWXzbWCZyKj2opj8hP0hlEwELNc4MTXiRfypg0DkzH5uU1jzsemjRg6djMT-HTYU3VhGwTAgkZiUE7PJDbvh9cQnlfhGd1kXqmvecDw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="video cover"
              class="w-full h-full"
            />
          </div>
          <UtSvg name="play" dim w="3.75rem" h="3.75rem" class="text-white" />
        </div>

        <div
          tabindex="1"
          class="aspect-[250/327] overflow-hidden z-[1] relative video-content-bg flex items-center justify-center"
        >
          <div class="absolute inset-0 w-full aspect-[250/327] z-[-1]">
            <UiImg
              src="https://s3-alpha-sig.figma.com/img/dc6e/0ce5/024bad9890f34be89b61b0a4eaa4f996?Expires=1704067200&Signature=EHrt5q7UG~qet2QaOKFpP8nmgQd8Px2a37yUy-A1IeFLv~xw8bwKtcaWtXobZODqNxErZ0e2DHlClrcqjue4zHKHmKXm-CmuEDfe9ZyNwWfRBv3kNDUZjaZDvrjwT5dmLqGCrVVDpkKLHRAPuCoJQnP5zbSBVvrLMMT9mfm0F9VgvYQ98lva4pg7h9cGl7sfxUn3DeqOlC5TvgtP15jmKRAmsCKlU6iCO1ixzLDAhdtQZBNnWXzbWCZyKj2opj8hP0hlEwELNc4MTXiRfypg0DkzH5uU1jzsemjRg6djMT-HTYU3VhGwTAgkZiUE7PJDbvh9cQnlfhGd1kXqmvecDw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="video cover"
              class="w-full h-full"
            />
          </div>
          <UtSvg name="play" dim w="3.75rem" h="3.75rem" class="text-white" />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ApiError } from "~/lib/core/Api";
import type { Core } from "~/lib/interfaces";
import type { GetCampaign } from "~/lib/interfaces/response";

type Experience = Core.InfluencerCampaignExperience & {
  active: boolean;
  id: number;
  name: string;
};

const props = defineProps<{ publicId: string }>();
const displayPartially = ref(true);

const campaignInfo = ref<GetCampaign["data"]>();

function selectCampaign(index: number) {
  let selectedPosition = -1;
  let selected: Experience | undefined;
  experiences.value.forEach((campaign, idx) => {
    campaign.active = false;
    if (campaign.id == index) {
      campaign.active = true;
      selectedPosition = idx;
      selected = campaign;
    }
  });

  if (selectedPosition !== -1 && selected) {
    experiences.value.splice(selectedPosition, 1); // Remove the element from its current position
    experiences.value.unshift(selected); // Add the element to the beginning of the list
    getCampaignInfo.execute(selected.campaignId);
    getCampaignMetrics.execute(props.publicId);
  }
}

const api = useAPI();
const experiences = ref<Experience[]>([]);

const influencerExperiences = useRequestState({
  immediately: true,
  action: () =>
    api.getInfluencerCampaignExperience({
      influencerPublicId: props.publicId,
    }),
  onSuccess(response) {
    experiences.value = response.data.map((e, i) => ({
      ...e,
      name: e.campaignName,
      active: false,
      id: Math.random(),
    }));

    selectCampaign(experiences.value[0].id);
  },
});

const getCampaignInfo = useRequestState({
  action: async (id: string) => api.getCampaign(id),
  onSuccess: (response) => {
    campaignInfo.value = response.data;
  },
});

const getMetric = (name?: string) => {
  return (
    campaignMetrics.value.find((m) => m.name == name) || {
      total_value: { value: 0 },
    }
  );
};

const comments = computed(() => getMetric("comments")?.total_value.value || 0);
const likes = computed(() => getMetric("likes")?.total_value.value || 0);
const saves = computed(() => getMetric("saves")?.total_value.value || 0);
const shares = computed(() => getMetric("shares")?.total_value.value || 0);
const reach = computed(() => getMetric("reach")?.total_value.value || 0);

const impressions = computed(
  () => getMetric("impressions")?.total_value.value || 0
);

const campaignMetrics = ref<Core.CampaignMetrics[]>([]);
const getCampaignMetrics = useRequestState({
  action: (id: string) => api.getCampaignMetrics(id),
  onSuccess: (response) => {
    campaignMetrics.value = response.data;
  },
});
</script>

<style scoped>
.video-content-bg {
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    url(<path-to-image>), lightgray 50% / cover no-repeat;
}
</style>
