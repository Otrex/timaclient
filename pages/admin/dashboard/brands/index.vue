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
            <div v-if="field === 'transactions'">
              <UiTransactionView
                :image="item.image"
                :title="item.brand"
                :sub="item.sub"
              />
            </div>
            <div v-if="field === 'status'">
              <span
                :class="[
                  item.toLowerCase() === 'onboarded' && 'text-[#3CC75B]',
                  item.toLowerCase() === 'pending' && 'text-[#F3DC0F]',
                ]"
                >{{ item }}</span
              >
            </div>
            <div v-else-if="field === 'action'">
              <UiTransactionAction :transaction="row" />
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
  name: "Admin Brands",
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

const filter = ref("all");
const tabFilters = ref("all");
const thead = ["Name", "Brand", "Start Date", "End Date", "Status"].map(
  (e) => ({
    label: e,
    key: e.toLowerCase().replace(" ", "_"),
  })
);

const data = ref<any[]>([]);

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

const tbody = [
  {
    name: "John Doe",
    brand: "Coca Cola",
    start_date: "Oct 24, 2024",
    end_date: "Oct 24, 2024",
    status: "Onboarded",
    id: 1,
  },
  {
    name: "Jane Smith",
    brand: "Pepsi",
    start_date: "Nov 15, 2023",
    end_date: "Dec 31, 2023",
    status: "Pending",
    id: 2,
  },
];

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
</script>

<style></style>
