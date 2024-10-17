<template>
  <div class="px-14">
    <div class="flex flex-col gap-11 md:grid md:grid-cols-3">
      <template v-for="(item, idx) in statusCard" :key="idx">
        <AdminStatusCard
          :label="item.label"
          :value="item.value"
          :indicator="item.indicator"
        />
      </template>
    </div>

    <div class="flex flex-col md:flex-row gap-[50px] mt-10">
      <div class="w-full md:w-8/12 h-full">
        <h4 class="text-[20px] font-bold text-[#898989]">Brands</h4>
        <Bar
          :data="dataset"
          class="inline-block w-full h-full max-h-[300px]"
          :options="options"
        />
      </div>

      <div class="w-full md:w-4/12 h-full">
        <div class="bg-[#F7F7F7] rounded-xl p-6 h-full">
          <h1 class="text-[20px] font-bold text-[#898989]">Top Brands</h1>

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
    </div>

    <section class="mt-10 flex flex-row gap-[50px]">
      <div class="sm:w-2/3">
        <UtDataTable
          label="Brands"
          variant="secondary"
          :searchField="{}"
          :thead="thead"
          :page="pageData"
          :loading="state === constants.LOADING"
          @update:page="onPageChange"
          v-model:tabFilters="tabFilters"
          :tbody="tbody"
          :secondaryTabFilters="[
            {
              label: 'All',
              value: 'all',
            },
            {
              label: 'Onboarded',
              value: 'onboarded',
            },
            {
              label: 'Pending',
              value: 'pending',
            },
          ]"
          :tclass="{
            thead: 'font-bold text-left align-middle',
            tbody: 'text-center py-2',
          }"
        >
          <template #tbody="{ item, row, field }">
            <div v-if="field === 'created_at'">
              {{ new Date(item).toLocaleDateString() }}
            </div>
            <div v-if="field === 'name'">
              {{ item || "---" }}
            </div>
            <div v-if="field === 'status'">
              <span
                :class="[
                  item === 'PROFILE_APPROVED' && 'text-[#3CC75B]',
                  item === 'REGISTERED' && 'text-[#F3DC0F]',
                ]"
                >{{ statusMap[item] || item }}</span
              >
            </div>
            <div v-else-if="field === 'action'">
              <template v-if="item.profileSetupProgress === 'PROFILE_APPROVED'">
                ---
              </template>
              <template v-else>
                <select
                  v-if="!item.loading"
                  @change="(e) => updateStatus(e, item)"
                >
                  <option value="APPROVE">Approve</option>
                  <option value="DECLINE">Disaprove</option>
                </select>
                <UtSpinner v-else />
              </template>
            </div>
          </template>
        </UtDataTable>
      </div>
      <div class="sm:w-1/3">
        <div class="w-full">
          <div class="bg-[#F7F7F7] rounded-xl p-6">
            <AdminChartsDoughnut :data="DoughnutChartData" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Bar } from "vue-chartjs";

definePageMeta({
  name: "AdminBrands",
});

const statusMap: Record<string, string> = {
  PROFILE_APPROVED: "Onboarded",
  REGISTERED: "Pending",
  PROFILE_REJECTED: "Rejected",
  INDUSTRY_SELECTED: "Pending",
  PROFILE_SETUP: "Pending",
  PROFILE_IN_REVIEW: "Pending (In Review)",
};

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

const filter = ref("all");
const tabFilters = ref("all");
const thead = ["Name", "Phone", "Email", "Created At", "Status", "Action"].map(
  (e) => ({
    label: e,
    key: e.toLowerCase().replace(" ", "_"),
  })
);

const data = ref<any[]>([]);

async function updateStatus(e: any, item: any) {
  item.loading = true;
  await api
    .reviewUser({
      user_id: item.id,
      review: e.target.value,
    })
    .finally(() => {
      item.loading = false;
    });
}

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

const tbody = ref<
  {
    name: string;
    phone: string;
    created_at: string | Date;
    email: string;
    id: string;
    status: string;
    action: any;
  }[]
>([]);

const pageData = ref({
  page: 1,
  limit: 10,
  total: 10,
});

function onPageChange(e: number) {
  let prev = pageData.value.page;
  pageData.value.page = e;
  execute().catch(() => {
    pageData.value.page = prev;
  });
}
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

onMounted(() => {
  chartData.value = [
    {
      ageRange: "Jan",
      male: Math.floor(Math.random() * 100),
      female: Math.floor(Math.random() * 100),
      percentage: 50,
    },
    {
      ageRange: "Feb",
      male: Math.floor(Math.random() * 100),
      female: Math.floor(Math.random() * 100),
      percentage: 50,
    },
    {
      ageRange: "Mar",
      male: Math.floor(Math.random() * 100),
      female: Math.floor(Math.random() * 100),
      percentage: 50,
    },
    {
      ageRange: "April",
      male: Math.floor(Math.random() * 100),
      female: Math.floor(Math.random() * 100),
      percentage: 50,
    },
    {
      ageRange: "May",
      male: Math.floor(Math.random() * 100),
      female: Math.floor(Math.random() * 100),
      percentage: 50,
    },
    {
      ageRange: "June",
      male: Math.floor(Math.random() * 100),
      female: Math.floor(Math.random() * 100),
      percentage: 50,
    },
    {
      ageRange: "July",
      male: Math.floor(Math.random() * 100),
      female: Math.floor(Math.random() * 100),
      percentage: 50,
    },
    {
      ageRange: "Aug",
      male: Math.floor(Math.random() * 100),
      female: Math.floor(Math.random() * 100),
      percentage: 50,
    },
    {
      ageRange: "Sept",
      male: Math.floor(Math.random() * 100),
      female: Math.floor(Math.random() * 100),
      percentage: 50,
    },
    {
      ageRange: "Oct",
      male: Math.floor(Math.random() * 100),
      female: Math.floor(Math.random() * 100),
      percentage: 50,
    },
    {
      ageRange: "Nov",
      male: Math.floor(Math.random() * 100),
      female: Math.floor(Math.random() * 100),
      percentage: 50,
    },
    {
      ageRange: "Dec",
      male: Math.floor(Math.random() * 100),
      female: Math.floor(Math.random() * 100),
      percentage: 50,
    },
  ];
});

const api = useAPI();

const {} = useRequestState({
  action: () => api.getAdminOverview(),
  immediately: true,
  onSuccess: (response) => {
    statusCard.value.forEach((e) => {
      if (e.label === "Onboarded") {
        e.value = "" + response.brandStats.verified;
      }

      if (e.label === "Pending") {
        e.value =
          "" + (response.brandStats.inReview + response.brandStats.registered);
      }

      if (e.label === "Total") {
        e.value = "" + response.brandStats.total;
      }

      pageData.value.total = response.brandStats.total;
    });
  },
});

const { state, execute } = useRequestState({
  action: () =>
    api.fetchAdminUsers({
      limit: pageData.value.limit,
      page: pageData.value.page,
      role: "BRAND",
    }),
  immediately: true,
  onSuccess: (response) => {
    // pageData.value.total = response.totalUsers;
    pageData.value.page = response.page;
    pageData.value.limit = response.limit;

    tbody.value = response.data.map((e: any) => {
      return {
        name: e.profile.companyName,
        phone: e.phoneNumber,
        email: e.emailAddress,
        created_at: new Date(e.profile.createdAt),
        status: e.profile.profileSetupProgress,
        action: e.profile,
        id: e.id,
      };
    });
  },
});
</script>

<style></style>
