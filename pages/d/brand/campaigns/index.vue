<template>
  <div class="px-8 pb-20">
    <div class="text-right mt-2">
      <UiButtonDefault
        variant="primary"
        class="py-2 px-8"
        label="New Campaign"
        @click="
          navigateTo({
            name: 'DashboardCampaignsCreate',
          })
        "
      />
    </div>
    <div class="mt-8">
      <div class="flex flex-wrap gap-4">
        <NuxtLink
          v-for="(tag, index) in tags"
          :key="index"
          :to="{ query: { status: tag.status } }"
          class="flex flex-row mt-2 gap-4"
        >
          <span class="capitalize">{{ tag.status }}</span>
          <div>
            <span
              :class="[
                currenttab === tag.status && 'text-[#0077C1] !bg-[#2BA2FD]/50',
              ]"
              class="border aspect-square border-[#2BA2FD]/20 p-[0.625rem] rounded-[0.5rem]"
              >{{ tag.count }}</span
            >
          </div>
        </NuxtLink>
      </div>
    </div>

    <div class="mt-10">
      <div class="flex justify-between items-center gap-4">
        <h2>All Campaigns</h2>

        <div class="flex flex-row items-center gap-4">
          <UiInputText
            search
            placeholder="Search Campaigns"
            class="mr-[1.75rem] max-w-[26.9375rem] placeholder:text-[color:--clr-grey-400] placeholder:text-base !py-2 w-full border-[color:--clr-grey-500]"
          />
          <select
            class="py-2 rounded-3xl px-3 border border-slate-300"
            name="filter"
            v-model="filter"
            id=""
          >
            <option value="all" default>All</option>
            <option value="APPROVED">Active</option>
            <option value="PENDING">Pending</option>
            <option value="DECLINED">Declined</option>
          </select>
        </div>
      </div>
    </div>

    <UtLoadPresenter
      :empty="!!!campaigns.length"
      notFoundMessage="No Campaigns have been created"
      :state="state"
    >
      <template #loading>
        <UiLoading />
      </template>
      <div class="my-10">
        <section
          class="grid mb-10 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6 xl:grid-cols-4"
        >
          <template v-for="(cam, i) in campaigns" :key="i">
            <DashboardCampaignCard
              @click="viewCampaign(cam as any)"
              :publicId="cam.campaign_id"
              :title="cam.campaignName"
              :image="cam.banner"
              :category="cam.category"
              :brand="authStore.profile?.companyName!"
              :description="cam.campaignAbout"
              :budget="+cam.planningBudget"
              :deadline="cam.endDate"
              :completion="0"
            />
          </template>
        </section>

        <UtPaginate
          :disabled="state === constants.LOADING"
          v-model:currentPage="pageData.page"
          :total="pageData.total"
          :limit="pageData.limit"
        />
      </div>
    </UtLoadPresenter>
  </div>
</template>

<script setup lang="ts">
import type { Core } from "~/lib/interfaces";
import type { GetCampaignsResponse } from "~/lib/interfaces/response";

definePageMeta({
  name: "DashboardBrandCampaigns",
});

type Pagination = Omit<
  GetCampaignsResponse["data"],
  "data" | "message" | "statusCode"
>;

const api = useAPI();
const route = useRoute();
const authStore = useAuthStore();
const currenttab = computed(() => (route.query.status as string) || "all");
const campaigns = ref<GetCampaignsResponse["data"]["data"]>([]);
const pageData = reactive<Pagination>({
  total: 0,
  limit: 10,
  page: 1,
});
const filter = ref<string>("all");
const tags = [
  { status: "all", count: 60, active: true },
  { status: "active", count: 30, active: false },
  { status: "pending", count: 20, active: false },
  { status: "completed", count: 10, active: false },
  { status: "incomplete", count: 5, active: false },
  { status: "contents", count: 120, active: false },
];

const addedFilter = computed(() => {
  if (route.query.status === "all") {
    return undefined;
  }

  if (route.query.status === "active") {
    return "APPROVED";
  }

  if (route.query.status === "pending") {
    return "PENDING";
  }

  if (route.query.status === "incomplete") {
    return "DECLINED";
  }
});

watch(addedFilter, () => {
  execute();
});

function viewCampaign(campaign: Core.Campaign) {
  navigateTo({
    name: "ViewBrandCampaignAnalytics",
    params: { id: campaign.campaign_id },
  });
}

const { state, execute } = useRequestState({
  action: () =>
    api.getBrandCampaigns({
      page: pageData.page,
      limit: pageData.limit,
      statusProgress: addedFilter.value,
    }),
  immediately: true,
  onSuccess: (response) => {
    const { data, ...others } = response;
    campaigns.value = response.data;
    Object.assign(pageData, others);
  },
  onError: (error) => {
    console.log(error);
  },
});
</script>

<style></style>
