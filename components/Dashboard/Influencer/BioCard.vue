<template>
  <UtLoadPresenter
    not-found-message="Influencer data not found"
    loading-message="Fetching Influencer details"
    :data="influencer === null"
    :state="state!"
  >
    <section
      class="bg-[#F7F7F7] dark:bg-slate-300 dark:text-black p-[1.25rem] h-full rounded-md"
    >
      <div class="flex flex-row mb-[2.5rem] justify-between">
        <div class="flex flex-row gap-[0.75rem] items-center">
          <div class="flex items-center">
            <div class="w-[4rem] h-[4rem] rounded-full overflow-hidden">
              <UiImg
                :src="influencer?.profileImage"
                class="w-full h-full object-cover"
                alt="user profile"
              />
            </div>
          </div>
          <div>
            <h4 class="font-bold">
              {{
                [
                  influencer?.firstName,
                  influencer?.otherName,
                  influencer?.lastName,
                ]
                  .filter((e) => e)
                  .join(" ")
              }}
            </h4>
            <p class="nl mb-[0.75rem]">{{ influencer?.userName }}</p>
            <UiInputStars :length="6" v-model="stars" :disabled="false" />
          </div>
        </div>

        <div class="text-right">
          <div>
            <button
              :disabled="
                tools.requestState(addBookmark) === RequestState.LOADING
              "
              @click="addBookmark.execute()"
              class="active:ring-2 inline-block hover:bg-slate-50 rounded-md active:ring-slate-100"
            >
              <UtSvg
                name="bookmark-solid"
                v-if="tools.requestState(addBookmark) !== RequestState.LOADING"
                class="text-[#999]"
                w="1.3125rem"
                h="1.3125rem"
                dim
              />

              <UtSvg
                v-else
                name="sunshine"
                class="spinner text-[#999]"
                w="1.3125rem"
                h="1.3125rem"
                dim
              />
            </button>
          </div>
          <!-- <div class="w-[9.375rem]">
            <Doughnut :data="data" class="inline-block" :options="options" />
          </div> -->
        </div>
      </div>

      <div class="bg-[--clr-blue-100] mb-[1.5rem] py-[1.0625rem] text-center">
        Campaigns completed:
        {{ (influencer as any)?.totalCompletedCampaigns }}
      </div>

      <div class="mb-[2.1875rem]" v-if="(influencer as any)?.bio">
        <p class="nl font-bold">Bio</p>
        <p class="nl">
          {{ (influencer as any)?.bio }}
        </p>
      </div>

      <div class="mb-[1rem]">
        <p class="nl">Languages: <b>English</b></p>
      </div>

      <div class="pb-[1.25rem]">
        <p class="nl">Categories</p>
        <div class="flex flex-wrap gap-3">
          <template v-for="(category, idx) in categories" :key="idx">
            <div
              class="text-[0.875rem] rounded text-white bg-[#696969] px-[0.6875rem] py-[0.125rem]"
            >
              {{ category }}
            </div>
          </template>
        </div>
      </div>

      <div>
        <p class="nl">Average Cost Per Post:</p>
        <div class="flex flex-wrap gap-3">
          <template
            v-for="(platformPrice, idx) in influencer?.paymentInformation
              ?.platformPrices || []"
            :key="idx"
          >
            <div
              class="text-[0.875rem] flex flex-row gap-3 items-center rounded py-[0.125rem]"
            >
              <UtSvg
                dim
                w="1.8rem"
                h="1.8rem"
                :name="`so/${platformPrice.platform.toLowerCase()}`"
              />
              <b>{{ tools.formatCurrency(platformPrice.price) }}</b>
            </div>
          </template>
        </div>
      </div>
    </section>
  </UtLoadPresenter>
</template>

<script setup lang="ts">
// import { Doughnut } from "vue-chartjs";
import { RequestState } from "~/lib/enums";
import { tools } from "#build/imports";

import type {
  GetApplication,
  GetInfluencerProfileResponse,
  GetSearchInfluencer,
} from "~/lib/interfaces/response";

const stars = ref(0);
const data = ref({
  labels: ["Hot", "Warm", "Cold"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      borderWidth: 0,
      pointStyle: "circle",
    },
  ],
});

const { notify } = useNotification();
const api = useAPI();
const result = ref<GetApplication["data"] | GetSearchInfluencer["data"]>();

const addBookmark = useRequestState({
  action: () =>
    api.bookmarkInfluencer({
      title: result.value?.username || "Bookmark",
      bookmarkPublicId: props.publicId
        ? props.publicId
        : (result.value as any)?.submittedBy!,
    }),
  onSuccess: (response) => {
    notify({
      type: "success",
      title: "Bookmarked!!",
      text: response.message,
    });
  },
  onError: (error) => {
    notify({
      type: "error",
      title: error.title,
      text: error.description,
    });
  },
});

const options = ref<any>({
  responsive: true,
  rotation: -90,
  aspectRatio: 1.5,
  circumference: 180,
  plugins: {
    legend: {
      position: "right",
      itemSpacing: 2,
      labels: {
        boxWidth: 10,
        fontSize: 8, // Adjust the box width as needed
        pointStyle: "circle",
      },
    },
  },
});

const influencer = inject<GetInfluencerProfileResponse["data"] | null>(
  "influencer"
);

const categories = computed(() => influencer?.value?.industries || []);

const state = inject<string | undefined>("loading");
</script>
<style></style>
