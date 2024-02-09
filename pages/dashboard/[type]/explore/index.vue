<template>
  <div>
    <UtPermit :user-type="constants.INFLUENCER">
      <div class="px-[1.625rem] pt-[1.875rem] pb-[2.5rem]">
        <DashboardExploreSearchPanel
          v-model:state="viewSearchFilter"
          v-show="viewSearchFilter"
          class="mb-[3.75rem]"
        />
        <div class="flex flex-row justify-between">
          <h2 class="text-[2rem] mb-[1.375rem]">Recommended Campaigns</h2>
          <div>
            <UiButtonDefault
              v-show="!viewSearchFilter"
              @click="viewSearchFilter = true"
              variant="primary"
              class="px-3 py-1"
            >
              Open Search Filter
            </UiButtonDefault>
          </div>
        </div>
        <template
          v-if="tools.requestState(getRecommended) === constants.LOADING"
        >
          <div class="text-center">
            <UtSvg name="sunshine" class="spinner w-[1.5rem] h-[1.5rem]" />
            Fetching recommendations
          </div>
        </template>
        <template v-else-if="recommended.length === 0">
          <div>No Recommended Campaigns</div>
        </template>
        <template v-else>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1.0625rem]"
          >
            <div v-for="campaign in recommended" :key="campaign.publicId">
              <NuxtLink
                class="w-full"
                :to="{
                  params: { id: campaign.publicId, type: $route.params.type },
                  name: 'Explore - Campaign',
                }"
              >
                <DashboardCampaignCard
                  :image="campaign.creative.thumbnail"
                  :budget="campaign.overview.plannedBudget"
                  :category="campaign.creative.creativeTone"
                  :description="campaign.overview.briefDescription"
                  :deadline="campaign.creative.endDate"
                  :brand="campaign.overview.name"
                  :completion="0"
                  :public-id="campaign.publicId"
                  :title="campaign.overview.name"
                />
              </NuxtLink>
            </div>
          </div>
        </template>

        <h2 class="text-[2rem] mt-[1.5rem] mb-[1.375rem]">
          Top Campaigns for the week
        </h2>
        <template v-if="tools.requestState(getTop) === constants.LOADING">
          <div class="text-center">
            <UtSvg name="sunshine" class="spinner w-[1.5rem] h-[1.5rem]" />
            Fetching Top Campaigns
          </div>
        </template>
        <template v-else-if="topCampaigns.length === 0">
          <div>No Top Campaigns</div>
        </template>
        <template v-else>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1.0625rem]"
          >
            <template v-for="campaign in topCampaigns" :key="campaign.publicId">
              <NuxtLink
                :to="{
                  params: { id: campaign.publicId, type: $route.params.type },
                  name: 'Explore - Campaign',
                }"
              >
                <DashboardCampaignCard
                  :image="campaign.creative.thumbnail"
                  :brand="campaign.overview.name"
                  :budget="campaign.overview.plannedBudget"
                  :category="campaign.creative.creativeTone"
                  :description="campaign.overview.briefDescription"
                  :deadline="campaign.creative.endDate"
                  :completion="0"
                  :public-id="campaign.publicId"
                  :title="campaign.overview.name"
                />
              </NuxtLink>
            </template>
          </div>
        </template>
      </div>
    </UtPermit>
    <UtPermit :user-type="constants.AGENCY">
      <div class="px-[1.625rem] mb-[2.5rem] pt-[1.875rem] pb-[2.5rem]">
        <DashboardExploreInfluencerSearchPanel class="mb-[3.75rem]" />

        <section class="mb-[3.25rem]">
          <h2 class="text-[2rem] mb-[1.375rem]">The Buzz</h2>
          <div class="flex flex-row gap-[1.125rem]">
            <template v-for="(buzz, idx) in buzzes" :key="idx">
              <UiBuzzCard
                class="w-full"
                :title="buzz.title"
                :bg="buzz.bg"
                :influencers="buzz.influencers"
              />
            </template>
          </div>
        </section>

        <section class="mb-[3.25rem]">
          <h2 class="text-[2rem] mb-[1.375rem]">Categories</h2>
          <div class="flex flex-row gap-[1.125rem]">
            <template v-for="(buzz, idx) in categories" :key="idx">
              <UiBuzzCard
                class="w-full"
                :title="buzz.title"
                :bg="buzz.bg"
                :images="buzz.images"
              />
            </template>
          </div>
        </section>
      </div>
    </UtPermit>
  </div>
</template>

<script setup lang="ts">
import type { Influencer } from "~/lib/interfaces/core";
import type { GetCampaigns } from "~/lib/interfaces/response";

definePageMeta({
  name: "Explore",
});

const api = useAPI();
const route = useRoute();

const search = ref({
  category: "",
  campaignType: "",
  budgetRange: "",
  audienceDemography: "",
  campaignStatus: "",
});

const MAX_INFLUENCER_DISPLAY = 5;

const buzzes = ref([
  {
    title: "New influencers on the block",
    bg: { from: "#00EAFF", to: "#3C8CE7" },
    influencers: [] as Influencer[],
  },
  {
    title: "Top 100 influencers for the week",
    bg: { from: "#ABDCFF", to: "#0396FF" },
    images: [
      "https://s3-alpha-sig.figma.com/img/32d5/5881/e65f8cc2154698c97396551fb8ff99f3?Expires=1704067200&Signature=lctRoe33YBx-ZKtIcy9sV-1jbYDXsPUEJLFn1LgGkST1lZ7hHe8I4ozIim8Mg8DxvJs-t0hMLnVaJSn6IsYO-nr2XkKTtDJxf3qnthcDbgmepW1fpTWo6RzucXIY-abWBb-x1jB1crOPEbzzQei~-h-7rmSZvTkfLPyibFBqZ7atS5Zo1sap7Yh2pgjUnRyfXNTK-8ITD6aTHJvjkN~VrwTFJt4S1~8WbU79Cdibzf5FRYDoYgTH4skTGxUwLAkdIfZcWZpatryijP2Tk7z1oUdJHOW664YQJ~ADQXGhO9aO~F4XWWf9ebGm-I7uPMaumL4j4XNN6wr20lZiEb6mYA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1704067200&Signature=niAH7vYHmNuDIVjOTXo0YYiGgMTcL6uO1Al3Zi06qOzWV6fhmzLZX50Dg37qhhIuy~0VOgtiVemWTOXNFGYUnbpZu9TAsQ8178jWWHPxdfirhgpLMbQ7CCnn5z0j~6Z5zfl87kFbzlQFxmdzG5NDMvjsWC3qDLEFRPuccn~7fCOfiLMiuCaB3wzKhccr--uaxnxHaTk1w2yP3slSV4q8smI9aGIKkGv7ddebMu5RUrzqy1AdsICbOncr5yajEWFU-Oa-jBm8nbPGeIRLBZyPQhLO85b5J7EirQuUxCQjenjBUrXlp8t2PWDUIlqjBQalZvmJzGCJBdyWi5uN~H8KSA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/17c5/c2c5/8197e7a481cc597b5c2e5c41b2e7d9c7?Expires=1704067200&Signature=HWQBq2C6nSOxkBNMd1RJc9RpGh5AK-Tlb6q1rksuEMi3tRSy5SnbsKkNdv4cyyyx843-QYIo3JcesGOGUyRrcdkZy9epO-lF4A~~wNjFhRLF-s7VPJTiyky6ViHPffwIOnG4Lm3hNSNvdDOVVeF7V2sl8jUAE-e~xBD6DwBw~uf0Q-22UiU925f~AHV7wcYpyJltywUTuOh0FxOGu7rmziqJAC8oYXUWr7xNruw-4ezVJja9O4FA5TrTtXMwuXFRZxyFUOcKYLQErSlinPJh4hDd~iTSAv3k1Ye-Mu9LePVLm-Rc5PvVcZ~pJGTqqiJvH0x8X9aebg-Xr0Cce1OIew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/054b/0612/57d3493b65b102b195ab45bae13d31e3?Expires=1704067200&Signature=GM3mF8Lpz-DUtN64JXZ09yxuiNfwSse1t7fN4XG55EUQ3xo4YbGKgbALE~hwrzK2pn1kdfLGcXvnpeRH24J7rc7CdXr53InKFaZLpedK8Cvuh2SyTVfFXVT8CO2H6we0UZBdg10cZeJQ-F23TRutB23BGysB4yRAqUmokLwrpJTg~PH6ZpBHoCrhHWExscT4cKf1XoynAN0UlKlG1cQ~zTWDUre3V9vlRoR8P9fbtWMeg0UmoBwwwEYPoftDA5zHJ4TVzzZHjuwR6t0zroSf2F3R0hp7LDKJA4HNOM~xEbQwtbW8tz0UGyYCUlkHp2NeYf4~2uW2n~ea7xyw7R6-JA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/59f0/9bb1/d5c20440e4dd644295a5c845cbe2942f?Expires=1704067200&Signature=Z3Kq3Iw4JCgtUzGcDg2mION3ZADbCmSZkN5MDQ~thU69HI5o6HZ9ELlG8JVNqbOv2ZIR1BmYzcRbX-NsaWbkzHo9xafOXTw3RrG8zhHEODyGevuZwdOLXIaNQdZzmqPZpf3RErKEBYaEuyHMlpdL~aa9wDsv0G1Q49PfPv3ZpW8Z3Hhc2Y88n~psrVwDW~pmu-YYZNSqD00mRBFyf-9Hw1CbCxMqMqQvQ~wDTqTfXSnScTBkddVCAoSqL~rokhbJEn8g56c~SG-yzYBToDmXfpbFdF37XzhHW2d-ZiCmDUfRWlxyVVHr4Ar-CBJ2ZpRusuZh8I~AwZnPL1HcZVeDrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    ],
  },
  {
    title: "Top categories for the week",
    bg: { from: "#65FDF0", to: "#1D6FA3" },
    images: [
      "https://s3-alpha-sig.figma.com/img/32d5/5881/e65f8cc2154698c97396551fb8ff99f3?Expires=1704067200&Signature=lctRoe33YBx-ZKtIcy9sV-1jbYDXsPUEJLFn1LgGkST1lZ7hHe8I4ozIim8Mg8DxvJs-t0hMLnVaJSn6IsYO-nr2XkKTtDJxf3qnthcDbgmepW1fpTWo6RzucXIY-abWBb-x1jB1crOPEbzzQei~-h-7rmSZvTkfLPyibFBqZ7atS5Zo1sap7Yh2pgjUnRyfXNTK-8ITD6aTHJvjkN~VrwTFJt4S1~8WbU79Cdibzf5FRYDoYgTH4skTGxUwLAkdIfZcWZpatryijP2Tk7z1oUdJHOW664YQJ~ADQXGhO9aO~F4XWWf9ebGm-I7uPMaumL4j4XNN6wr20lZiEb6mYA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1704067200&Signature=niAH7vYHmNuDIVjOTXo0YYiGgMTcL6uO1Al3Zi06qOzWV6fhmzLZX50Dg37qhhIuy~0VOgtiVemWTOXNFGYUnbpZu9TAsQ8178jWWHPxdfirhgpLMbQ7CCnn5z0j~6Z5zfl87kFbzlQFxmdzG5NDMvjsWC3qDLEFRPuccn~7fCOfiLMiuCaB3wzKhccr--uaxnxHaTk1w2yP3slSV4q8smI9aGIKkGv7ddebMu5RUrzqy1AdsICbOncr5yajEWFU-Oa-jBm8nbPGeIRLBZyPQhLO85b5J7EirQuUxCQjenjBUrXlp8t2PWDUIlqjBQalZvmJzGCJBdyWi5uN~H8KSA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/17c5/c2c5/8197e7a481cc597b5c2e5c41b2e7d9c7?Expires=1704067200&Signature=HWQBq2C6nSOxkBNMd1RJc9RpGh5AK-Tlb6q1rksuEMi3tRSy5SnbsKkNdv4cyyyx843-QYIo3JcesGOGUyRrcdkZy9epO-lF4A~~wNjFhRLF-s7VPJTiyky6ViHPffwIOnG4Lm3hNSNvdDOVVeF7V2sl8jUAE-e~xBD6DwBw~uf0Q-22UiU925f~AHV7wcYpyJltywUTuOh0FxOGu7rmziqJAC8oYXUWr7xNruw-4ezVJja9O4FA5TrTtXMwuXFRZxyFUOcKYLQErSlinPJh4hDd~iTSAv3k1Ye-Mu9LePVLm-Rc5PvVcZ~pJGTqqiJvH0x8X9aebg-Xr0Cce1OIew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/054b/0612/57d3493b65b102b195ab45bae13d31e3?Expires=1704067200&Signature=GM3mF8Lpz-DUtN64JXZ09yxuiNfwSse1t7fN4XG55EUQ3xo4YbGKgbALE~hwrzK2pn1kdfLGcXvnpeRH24J7rc7CdXr53InKFaZLpedK8Cvuh2SyTVfFXVT8CO2H6we0UZBdg10cZeJQ-F23TRutB23BGysB4yRAqUmokLwrpJTg~PH6ZpBHoCrhHWExscT4cKf1XoynAN0UlKlG1cQ~zTWDUre3V9vlRoR8P9fbtWMeg0UmoBwwwEYPoftDA5zHJ4TVzzZHjuwR6t0zroSf2F3R0hp7LDKJA4HNOM~xEbQwtbW8tz0UGyYCUlkHp2NeYf4~2uW2n~ea7xyw7R6-JA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/59f0/9bb1/d5c20440e4dd644295a5c845cbe2942f?Expires=1704067200&Signature=Z3Kq3Iw4JCgtUzGcDg2mION3ZADbCmSZkN5MDQ~thU69HI5o6HZ9ELlG8JVNqbOv2ZIR1BmYzcRbX-NsaWbkzHo9xafOXTw3RrG8zhHEODyGevuZwdOLXIaNQdZzmqPZpf3RErKEBYaEuyHMlpdL~aa9wDsv0G1Q49PfPv3ZpW8Z3Hhc2Y88n~psrVwDW~pmu-YYZNSqD00mRBFyf-9Hw1CbCxMqMqQvQ~wDTqTfXSnScTBkddVCAoSqL~rokhbJEn8g56c~SG-yzYBToDmXfpbFdF37XzhHW2d-ZiCmDUfRWlxyVVHr4Ar-CBJ2ZpRusuZh8I~AwZnPL1HcZVeDrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    ],
  },
]);

const recommended = ref<GetCampaigns["data"]>([]);
const topCampaigns = ref<GetCampaigns["data"]>([]);
const viewSearchFilter = ref<boolean>(false);

const getRecommended = useRequestState({
  action: () => api.getCampaigns({ type: "recommendation" }),
  onSuccess: (response) => {
    recommended.value = response.data;
  },
});

const getTop = useRequestState({
  action: () => api.getCampaigns({ type: "top" }),
  onSuccess: (response) => {
    topCampaigns.value = response.data;
  },
});

const getNewInfluencers = useRequestState({
  action: () => api.getLatestInfluencers(),
  onSuccess: (response) => {
    buzzes.value[0].influencers = response.data.filter(
      (i, idx) => idx < MAX_INFLUENCER_DISPLAY
    );
  },
});

const initForInfluencers = () => {
  getRecommended.execute();
  getTop.execute();
};

const initForBrands = () => {
  getNewInfluencers.execute();
};

onMounted(() => {
  if (route.params.type !== constants.INFLUENCER) {
    initForBrands();
  } else {
    initForInfluencers();
  }
});

const categories = ref([
  {
    title: "Travel Influencers",
    bg: { from: "#FEB692", to: "#EA5455" },
    images: [
      "https://s3-alpha-sig.figma.com/img/32d5/5881/e65f8cc2154698c97396551fb8ff99f3?Expires=1704067200&Signature=lctRoe33YBx-ZKtIcy9sV-1jbYDXsPUEJLFn1LgGkST1lZ7hHe8I4ozIim8Mg8DxvJs-t0hMLnVaJSn6IsYO-nr2XkKTtDJxf3qnthcDbgmepW1fpTWo6RzucXIY-abWBb-x1jB1crOPEbzzQei~-h-7rmSZvTkfLPyibFBqZ7atS5Zo1sap7Yh2pgjUnRyfXNTK-8ITD6aTHJvjkN~VrwTFJt4S1~8WbU79Cdibzf5FRYDoYgTH4skTGxUwLAkdIfZcWZpatryijP2Tk7z1oUdJHOW664YQJ~ADQXGhO9aO~F4XWWf9ebGm-I7uPMaumL4j4XNN6wr20lZiEb6mYA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1704067200&Signature=niAH7vYHmNuDIVjOTXo0YYiGgMTcL6uO1Al3Zi06qOzWV6fhmzLZX50Dg37qhhIuy~0VOgtiVemWTOXNFGYUnbpZu9TAsQ8178jWWHPxdfirhgpLMbQ7CCnn5z0j~6Z5zfl87kFbzlQFxmdzG5NDMvjsWC3qDLEFRPuccn~7fCOfiLMiuCaB3wzKhccr--uaxnxHaTk1w2yP3slSV4q8smI9aGIKkGv7ddebMu5RUrzqy1AdsICbOncr5yajEWFU-Oa-jBm8nbPGeIRLBZyPQhLO85b5J7EirQuUxCQjenjBUrXlp8t2PWDUIlqjBQalZvmJzGCJBdyWi5uN~H8KSA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/17c5/c2c5/8197e7a481cc597b5c2e5c41b2e7d9c7?Expires=1704067200&Signature=HWQBq2C6nSOxkBNMd1RJc9RpGh5AK-Tlb6q1rksuEMi3tRSy5SnbsKkNdv4cyyyx843-QYIo3JcesGOGUyRrcdkZy9epO-lF4A~~wNjFhRLF-s7VPJTiyky6ViHPffwIOnG4Lm3hNSNvdDOVVeF7V2sl8jUAE-e~xBD6DwBw~uf0Q-22UiU925f~AHV7wcYpyJltywUTuOh0FxOGu7rmziqJAC8oYXUWr7xNruw-4ezVJja9O4FA5TrTtXMwuXFRZxyFUOcKYLQErSlinPJh4hDd~iTSAv3k1Ye-Mu9LePVLm-Rc5PvVcZ~pJGTqqiJvH0x8X9aebg-Xr0Cce1OIew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/054b/0612/57d3493b65b102b195ab45bae13d31e3?Expires=1704067200&Signature=GM3mF8Lpz-DUtN64JXZ09yxuiNfwSse1t7fN4XG55EUQ3xo4YbGKgbALE~hwrzK2pn1kdfLGcXvnpeRH24J7rc7CdXr53InKFaZLpedK8Cvuh2SyTVfFXVT8CO2H6we0UZBdg10cZeJQ-F23TRutB23BGysB4yRAqUmokLwrpJTg~PH6ZpBHoCrhHWExscT4cKf1XoynAN0UlKlG1cQ~zTWDUre3V9vlRoR8P9fbtWMeg0UmoBwwwEYPoftDA5zHJ4TVzzZHjuwR6t0zroSf2F3R0hp7LDKJA4HNOM~xEbQwtbW8tz0UGyYCUlkHp2NeYf4~2uW2n~ea7xyw7R6-JA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/59f0/9bb1/d5c20440e4dd644295a5c845cbe2942f?Expires=1704067200&Signature=Z3Kq3Iw4JCgtUzGcDg2mION3ZADbCmSZkN5MDQ~thU69HI5o6HZ9ELlG8JVNqbOv2ZIR1BmYzcRbX-NsaWbkzHo9xafOXTw3RrG8zhHEODyGevuZwdOLXIaNQdZzmqPZpf3RErKEBYaEuyHMlpdL~aa9wDsv0G1Q49PfPv3ZpW8Z3Hhc2Y88n~psrVwDW~pmu-YYZNSqD00mRBFyf-9Hw1CbCxMqMqQvQ~wDTqTfXSnScTBkddVCAoSqL~rokhbJEn8g56c~SG-yzYBToDmXfpbFdF37XzhHW2d-ZiCmDUfRWlxyVVHr4Ar-CBJ2ZpRusuZh8I~AwZnPL1HcZVeDrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    ],
  },
  {
    title: "Technology Influencers",
    bg: { from: "#FCCF31", to: "#F55555" },
    images: [
      "https://s3-alpha-sig.figma.com/img/32d5/5881/e65f8cc2154698c97396551fb8ff99f3?Expires=1704067200&Signature=lctRoe33YBx-ZKtIcy9sV-1jbYDXsPUEJLFn1LgGkST1lZ7hHe8I4ozIim8Mg8DxvJs-t0hMLnVaJSn6IsYO-nr2XkKTtDJxf3qnthcDbgmepW1fpTWo6RzucXIY-abWBb-x1jB1crOPEbzzQei~-h-7rmSZvTkfLPyibFBqZ7atS5Zo1sap7Yh2pgjUnRyfXNTK-8ITD6aTHJvjkN~VrwTFJt4S1~8WbU79Cdibzf5FRYDoYgTH4skTGxUwLAkdIfZcWZpatryijP2Tk7z1oUdJHOW664YQJ~ADQXGhO9aO~F4XWWf9ebGm-I7uPMaumL4j4XNN6wr20lZiEb6mYA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1704067200&Signature=niAH7vYHmNuDIVjOTXo0YYiGgMTcL6uO1Al3Zi06qOzWV6fhmzLZX50Dg37qhhIuy~0VOgtiVemWTOXNFGYUnbpZu9TAsQ8178jWWHPxdfirhgpLMbQ7CCnn5z0j~6Z5zfl87kFbzlQFxmdzG5NDMvjsWC3qDLEFRPuccn~7fCOfiLMiuCaB3wzKhccr--uaxnxHaTk1w2yP3slSV4q8smI9aGIKkGv7ddebMu5RUrzqy1AdsICbOncr5yajEWFU-Oa-jBm8nbPGeIRLBZyPQhLO85b5J7EirQuUxCQjenjBUrXlp8t2PWDUIlqjBQalZvmJzGCJBdyWi5uN~H8KSA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/17c5/c2c5/8197e7a481cc597b5c2e5c41b2e7d9c7?Expires=1704067200&Signature=HWQBq2C6nSOxkBNMd1RJc9RpGh5AK-Tlb6q1rksuEMi3tRSy5SnbsKkNdv4cyyyx843-QYIo3JcesGOGUyRrcdkZy9epO-lF4A~~wNjFhRLF-s7VPJTiyky6ViHPffwIOnG4Lm3hNSNvdDOVVeF7V2sl8jUAE-e~xBD6DwBw~uf0Q-22UiU925f~AHV7wcYpyJltywUTuOh0FxOGu7rmziqJAC8oYXUWr7xNruw-4ezVJja9O4FA5TrTtXMwuXFRZxyFUOcKYLQErSlinPJh4hDd~iTSAv3k1Ye-Mu9LePVLm-Rc5PvVcZ~pJGTqqiJvH0x8X9aebg-Xr0Cce1OIew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/054b/0612/57d3493b65b102b195ab45bae13d31e3?Expires=1704067200&Signature=GM3mF8Lpz-DUtN64JXZ09yxuiNfwSse1t7fN4XG55EUQ3xo4YbGKgbALE~hwrzK2pn1kdfLGcXvnpeRH24J7rc7CdXr53InKFaZLpedK8Cvuh2SyTVfFXVT8CO2H6we0UZBdg10cZeJQ-F23TRutB23BGysB4yRAqUmokLwrpJTg~PH6ZpBHoCrhHWExscT4cKf1XoynAN0UlKlG1cQ~zTWDUre3V9vlRoR8P9fbtWMeg0UmoBwwwEYPoftDA5zHJ4TVzzZHjuwR6t0zroSf2F3R0hp7LDKJA4HNOM~xEbQwtbW8tz0UGyYCUlkHp2NeYf4~2uW2n~ea7xyw7R6-JA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/59f0/9bb1/d5c20440e4dd644295a5c845cbe2942f?Expires=1704067200&Signature=Z3Kq3Iw4JCgtUzGcDg2mION3ZADbCmSZkN5MDQ~thU69HI5o6HZ9ELlG8JVNqbOv2ZIR1BmYzcRbX-NsaWbkzHo9xafOXTw3RrG8zhHEODyGevuZwdOLXIaNQdZzmqPZpf3RErKEBYaEuyHMlpdL~aa9wDsv0G1Q49PfPv3ZpW8Z3Hhc2Y88n~psrVwDW~pmu-YYZNSqD00mRBFyf-9Hw1CbCxMqMqQvQ~wDTqTfXSnScTBkddVCAoSqL~rokhbJEn8g56c~SG-yzYBToDmXfpbFdF37XzhHW2d-ZiCmDUfRWlxyVVHr4Ar-CBJ2ZpRusuZh8I~AwZnPL1HcZVeDrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    ],
  },
  {
    title: "Food Influencers",
    bg: { from: "#FAD7A1", to: "#E96D71" },
    images: [
      "https://s3-alpha-sig.figma.com/img/32d5/5881/e65f8cc2154698c97396551fb8ff99f3?Expires=1704067200&Signature=lctRoe33YBx-ZKtIcy9sV-1jbYDXsPUEJLFn1LgGkST1lZ7hHe8I4ozIim8Mg8DxvJs-t0hMLnVaJSn6IsYO-nr2XkKTtDJxf3qnthcDbgmepW1fpTWo6RzucXIY-abWBb-x1jB1crOPEbzzQei~-h-7rmSZvTkfLPyibFBqZ7atS5Zo1sap7Yh2pgjUnRyfXNTK-8ITD6aTHJvjkN~VrwTFJt4S1~8WbU79Cdibzf5FRYDoYgTH4skTGxUwLAkdIfZcWZpatryijP2Tk7z1oUdJHOW664YQJ~ADQXGhO9aO~F4XWWf9ebGm-I7uPMaumL4j4XNN6wr20lZiEb6mYA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1704067200&Signature=niAH7vYHmNuDIVjOTXo0YYiGgMTcL6uO1Al3Zi06qOzWV6fhmzLZX50Dg37qhhIuy~0VOgtiVemWTOXNFGYUnbpZu9TAsQ8178jWWHPxdfirhgpLMbQ7CCnn5z0j~6Z5zfl87kFbzlQFxmdzG5NDMvjsWC3qDLEFRPuccn~7fCOfiLMiuCaB3wzKhccr--uaxnxHaTk1w2yP3slSV4q8smI9aGIKkGv7ddebMu5RUrzqy1AdsICbOncr5yajEWFU-Oa-jBm8nbPGeIRLBZyPQhLO85b5J7EirQuUxCQjenjBUrXlp8t2PWDUIlqjBQalZvmJzGCJBdyWi5uN~H8KSA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/17c5/c2c5/8197e7a481cc597b5c2e5c41b2e7d9c7?Expires=1704067200&Signature=HWQBq2C6nSOxkBNMd1RJc9RpGh5AK-Tlb6q1rksuEMi3tRSy5SnbsKkNdv4cyyyx843-QYIo3JcesGOGUyRrcdkZy9epO-lF4A~~wNjFhRLF-s7VPJTiyky6ViHPffwIOnG4Lm3hNSNvdDOVVeF7V2sl8jUAE-e~xBD6DwBw~uf0Q-22UiU925f~AHV7wcYpyJltywUTuOh0FxOGu7rmziqJAC8oYXUWr7xNruw-4ezVJja9O4FA5TrTtXMwuXFRZxyFUOcKYLQErSlinPJh4hDd~iTSAv3k1Ye-Mu9LePVLm-Rc5PvVcZ~pJGTqqiJvH0x8X9aebg-Xr0Cce1OIew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/054b/0612/57d3493b65b102b195ab45bae13d31e3?Expires=1704067200&Signature=GM3mF8Lpz-DUtN64JXZ09yxuiNfwSse1t7fN4XG55EUQ3xo4YbGKgbALE~hwrzK2pn1kdfLGcXvnpeRH24J7rc7CdXr53InKFaZLpedK8Cvuh2SyTVfFXVT8CO2H6we0UZBdg10cZeJQ-F23TRutB23BGysB4yRAqUmokLwrpJTg~PH6ZpBHoCrhHWExscT4cKf1XoynAN0UlKlG1cQ~zTWDUre3V9vlRoR8P9fbtWMeg0UmoBwwwEYPoftDA5zHJ4TVzzZHjuwR6t0zroSf2F3R0hp7LDKJA4HNOM~xEbQwtbW8tz0UGyYCUlkHp2NeYf4~2uW2n~ea7xyw7R6-JA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/59f0/9bb1/d5c20440e4dd644295a5c845cbe2942f?Expires=1704067200&Signature=Z3Kq3Iw4JCgtUzGcDg2mION3ZADbCmSZkN5MDQ~thU69HI5o6HZ9ELlG8JVNqbOv2ZIR1BmYzcRbX-NsaWbkzHo9xafOXTw3RrG8zhHEODyGevuZwdOLXIaNQdZzmqPZpf3RErKEBYaEuyHMlpdL~aa9wDsv0G1Q49PfPv3ZpW8Z3Hhc2Y88n~psrVwDW~pmu-YYZNSqD00mRBFyf-9Hw1CbCxMqMqQvQ~wDTqTfXSnScTBkddVCAoSqL~rokhbJEn8g56c~SG-yzYBToDmXfpbFdF37XzhHW2d-ZiCmDUfRWlxyVVHr4Ar-CBJ2ZpRusuZh8I~AwZnPL1HcZVeDrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    ],
  },
]);
</script>

<style></style>
