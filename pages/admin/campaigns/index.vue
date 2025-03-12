<template>
  <NuxtLayout name="admin">
    <template #main>
      <div class="px-14">
        <!-- <div class="text-right mt-6 mb-[3.75rem]">
          <UiInputDropdown
            class="max-w-[17.5rem] inline-flex w-full"
            v-model="filter"
            :options="[
              'Last 7 days',
              'Last 14 days',
              'Last 30 days',
              'Last 90 days',
            ]"
          >
            <template #select="{ data, isOpen }">
              <div class="flex flex-row gap-2 justify-between items-center">
                <div class="flex items-center">
                  <UtSvg name="calendar" class="w-[1.5rem] h-[1.5rem]" />
                </div>
                <div class="text-[#828282]">{{ data }}</div>
                <div class="flex items-center">
                  <UtSvg
                    name="down-caret"
                    class="w-[1rem] h-[1rem] transition-all"
                    :class="isOpen && 'rotate-180'"
                  />
                </div>
              </div>
            </template>
            <template #item="{ data }">
              <button class="w-full py-2 px-2 hover:bg-gray-100">
                {{ data }}
              </button>
            </template>
          </UiInputDropdown>
        </div> -->

        <div class="flex flex-col gap-11 md:grid md:grid-cols-3">
          <template v-for="(item, idx) in statusCard" :key="idx">
            <AdminStatusCard
              :label="item.label"
              :value="item.value"
              :indicator="item.indicator"
            />
          </template>
        </div>

        <!-- <div
          class="flex flex-col items-stretch justify-stretch md:flex-row gap-[50px] mt-10"
        >
          <div class="w-full md:w-8/12 h-full max-h-[320px]">
            <Bar
              :data="dataset"
              class="inline-block w-full h-full max-h-[300px]"
              :options="options"
            />
          </div>

          <div class="w-full md:w-4/12 h-full">
            <div class="bg-[#F7F7F7] rounded-xl self-stretch p-6 h-full">
              <div class="flex items-center justify-between">
                <h1 class="text-[20px] font-bold text-[#898989]">
                  Top Campaigns
                </h1>
                <div><UtSvg name="love" dim w="21px" h="21px" /></div>
              </div>

              <div role="spacer" class="mt-5"></div>

              <div class="-my-6" v-for="(item, idx) in topCampaign">
                <div class="flex items-center gap-[9px] py-6">
                  <UiImg
                    src="/assets/svg/like.svg"
                    alt="logo"
                    class="w-[30px] h-[30px] rounded-full"
                  />

                  <p class="text-[13px] font-medium text-[#3D3D3D]">
                    {{ item.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <section class="flex flex-col md:flex-row gap-[50px] mt-10">
          <div class="w-full">
            <UtDataTable
              label="Campaigns"
              variant="secondary"
              :searchField="{}"
              :thead="thead"
              :page="pageData"
              :loading="state === constants.LOADING"
              @update:page="onPageChange"
              v-model:tabFilters="tabFilters"
              @update:tabFilters="execute"
              :tbody="tbody"
              :secondaryTabFilters="[
                {
                  label: 'All',
                  value: 'all',
                },
                {
                  label: 'Approved',
                  value: 'APPROVED',
                },
                {
                  label: 'Pending',
                  value: 'PENDING',
                },
                {
                  label: 'Declined',
                  value: 'DECLINED',
                },
              ]"
              :tclass="{
                thead: 'font-bold text-left align-middle',
                tbody: 'text-center align-middle py-2',
              }"
            >
              <template #tbody="{ item, row, field }">
                <div v-if="field === 'created_at'">
                  {{ new Date(item).toLocaleDateString() }}
                </div>
                <div v-if="field === 'details'" class="min-w-[12.5rem]">
                  <div class="flex flex-row gap-2 items-center">
                    <div>
                      <img
                        :src="item.banner"
                        class="w-[30px] h-[30px] object-cover rounded-full"
                      />
                    </div>
                    <div>{{ item.name || "---" }}</div>
                  </div>
                </div>
                <div v-if="field === 'about'" class="min-w-[12.5rem] text-left">
                  {{ tools.trunc(item, 10) || "---" }}
                </div>
                <div class="flex flex-wrap gap-2" v-if="field === 'category'">
                  <span v-if="!item.length">
                    <i class="text-base">No Categories</i>
                  </span>
                  <span
                    class="rounded-md bg-gray-300 border px-1 whitespace-nowrap py-[2px]"
                    v-for="(it, i) in item || []"
                  >
                    {{ it }}
                  </span>
                </div>
                <div v-if="field === 'timing'" class="text-left px-1">
                  <template v-if="item.start && item.end">
                    <div>
                      <b>From: </b
                      >{{
                        item.start && new Date(item.start).toLocaleDateString()
                      }}
                    </div>
                    <div>
                      <b>To: </b
                      >{{
                        item.start && new Date(item.end).toLocaleDateString()
                      }}
                    </div>
                  </template>
                  <div v-else class="text-center">-</div>
                </div>
                <div v-if="field === 'status'">
                  <span
                    :class="[
                      'capitalize rounded-xl px-2 py-1 text-xs',
                      item === 'APPROVED' && 'text-white bg-[#3CC75B]',
                      (item === 'PENDING' || !item) &&
                        'text-black bg-[#F3DC0F]',
                      item === 'DECLINED' && 'text-white bg-red-500',
                    ]"
                    >{{ item || "PENDING" }}</span
                  >
                </div>
                <!-- <div v-else-if="field === 'action'">
                  <template v-if="item.statusProgress === 'APPROVED'">
                    <i class="text-base">No Actions</i>
                  </template>
                  <template v-else>
                    <select
                      class="bg-transparent text-base py-1 px-2 rounded-xl text-gray-500 outline outline-gray-400"
                      v-if="!item.loading"
                      @change="(e) => updateStatus(e, item)"
                    >
                      <option default>- Actions -</option>
                      <option value="APPROVED">Approve</option>
                      <option value="DECLINED">Disaprove</option>
                    </select>
                    <UtSpinner size="18px" :noText="true" v-else />
                  </template>
                </div> -->
              </template>
            </UtDataTable>
          </div>

          <!-- <div class="w-full md:w-4/12">
            <div class="bg-[#F7F7F7] rounded-xl p-6">
              <AdminChartsDoughnut :data="DoughnutChartData" />
            </div>
          </div> -->
        </section>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Bar } from "vue-chartjs";

definePageMeta({
  name: "AdminCampaigns",
  middleware: [async () => {}],
});

const api = useAPI();
const filter = ref("Last 7 days");
const pageData = ref({
  page: 1,
  limit: 10,
  total: 10,
});

const statusCard = ref([
  {
    label: "Onboarded",
    value: "26",
    indicator: "#3CC75B",
  },
  {
    label: "Pending",
    value: "26",
    indicator: "#F3DC0F",
  },
  {
    label: "Deals",
    value: "26",
    indicator: "#1713EB",
  },
]);

const data = ref<any[]>([]);
const tabFilters = ref<any>("all");
const thead = ["Details", "About", "Category", "Timing", "Status"].map((e) => ({
  label: e,
  key: e.toLowerCase().replace(" ", "_"),
}));
const tbody = ref<any>([]);

const dataset = computed(() => ({
  labels: data.value?.map((e) => e.ageRange),
  datasets: [
    {
      label: "Male",
      data: data.value?.map((e) => e.male),
      backgroundColor: "#AAD9FB",
      borderWidth: 0,
    },
    {
      label: "Female",
      data: data.value?.map((e) => e.female),
      backgroundColor: "#2AA2FD",
      borderWidth: 0,
    },
  ],
}));

const options = ref<any>({
  scales: {
    x: {
      stacked: true,
      gridLines: {
        display: false,
        drawOnChartArea: false,
        color: "black",
        zeroLineColor: "#fff",
        zeroLineWidth: 0,
      },
    },
    y: {
      stacked: true,
      gridLines: {
        display: false,
        drawOnChartArea: false,
        color: "black",
        zeroLineColor: "#fff",
        zeroLineWidth: 0,
      },
    },
  },
  responsive: true,
  aspectRatio: 1.5,
  plugins: {
    legend: {
      itemSpacing: 10,
      position: "top",
      align: "start",
      padding: {
        bottom: 30, // Adjust the bottom padding
      },
      labels: {
        boxWidth: 13,
        font: {
          size: 13,
        },
      },
    },
  },
});

const chartData = ref<
  {
    ageRange: string;
    male: number;
    female: number;
    percentage: number;
  }[]
>();

const DoughnutChartData = ref<number[]>([40, 20, 80, 10]);

const topCampaign = ref([
  { name: "Explore Africa" },
  { name: "Shake & Win" },
  { name: "Knock Knock" },
  { name: "Crypto Savings" },
  { name: "BBNaija" },
]);

function onPageChange(e: number) {
  let prev = pageData.value.page;
  pageData.value.page = e;
  execute().catch(() => {
    pageData.value.page = prev;
  });
}

async function updateStatus(e: any, item: any) {
  item.loading = true;
  await api
    .reviewCampaign(item.campaign_id, {
      review: e.target.value,
    })
    .finally(() => {
      item.loading = false;
      execute();
    });
}

const { state, execute } = useRequestState({
  action: () =>
    api.getAdminCampaigns({
      limit: pageData.value.limit,
      page: pageData.value.page,
      ...(tabFilters.value !== "all"
        ? { statusProgress: tabFilters.value }
        : {}),
    }),
  immediately: true,
  onSuccess: (response) => {
    pageData.value.total = response.totalCount;
    pageData.value.page = response.page;
    pageData.value.limit = response.limit;

    tbody.value = response.data.map((e) => {
      return {
        details: {
          banner: e.banner,
          name: e.campaignName,
        },
        about: e.campaignAbout,
        category: e.category,
        timing: {
          start: e.startDate,
          end: e.endDate,
        },
        status: e.statusProgress,
        action: { ...e, loading: false },
        id: e.campaign_id,
      };
    });
  },
});

onMounted(() => {
  chartData.value = [
    {
      ageRange: "Jan",
      male: 30,
      female: 30,
      percentage: 50,
    },
    {
      ageRange: "Feb",
      male: 30,
      female: 30,
      percentage: 50,
    },
    {
      ageRange: "Mar",
      male: 30,
      female: 30,
      percentage: 50,
    },
    {
      ageRange: "April",
      male: 30,
      female: 30,
      percentage: 50,
    },
    {
      ageRange: "May",
      male: 30,
      female: 30,
      percentage: 50,
    },
    {
      ageRange: "June",
      male: 30,
      female: 30,
      percentage: 50,
    },
    {
      ageRange: "July",
      male: 30,
      female: 30,
      percentage: 50,
    },
    {
      ageRange: "Aug",
      male: 30,
      female: 30,
      percentage: 50,
    },
    {
      ageRange: "Sept",
      male: 30,
      female: 30,
      percentage: 50,
    },
    {
      ageRange: "Oct",
      male: 30,
      female: 30,
      percentage: 50,
    },
    {
      ageRange: "Nov",
      male: 30,
      female: 30,
      percentage: 50,
    },
    {
      ageRange: "Dec",
      male: 30,
      female: 30,
      percentage: 50,
    },
  ];
});
</script>

<style></style>
