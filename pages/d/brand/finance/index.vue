<template>
  <div class="p-[1.25rem]">
    <div class="flex justify-end">
      <UiInputDropdown
        class="max-w-[17.5rem] inline-flex w-full"
        view-class="!py-1.5 !px-5"
        v-model="filter"
        :options="[
          'Last 7 days',
          'Last 14 days',
          'Last 30 days',
          'Last 90 days',
        ]"
      >
        <template #select="{ data, isOpen }">
          <div class="flex flex-row gap-2 items-center">
            <div>
              <UtSvg name="logo/calendar" class="w-[1.5rem] mb-1 h-[1.5rem]" />
            </div>
            <div class="text-center w-full text-gray-600">{{ data }}</div>
          </div>
        </template>
      </UiInputDropdown>
    </div>
    <section class="flex flex-col my-5 sm:flex-row gap-5">
      <div class="bg-gray-100 w-full p-6 rounded-lg">
        <h4 class="font-semibold">Budget</h4>
        <div class="w-[18.75rem]">
          <Doughnut :data="ddata" class="inline-block" :options="doptions" />
        </div>
      </div>
      <div class="bg-gray-100 w-full p-6 rounded-lg">
        <h4 class="font-semibold mb-5">Campaigns</h4>
        <div class="mb-5">
          <p class="uppercase text-sm">ALL Campaigns</p>
          <p class="text-[#058EF8] font-semibold">120</p>
        </div>
        <div class="mb-5">
          <p class="uppercase text-sm">Total Spent</p>
          <p class="text-[#058EF8] font-semibold">120</p>
        </div>
      </div>
      <div class="bg-gray-100 w-full p-6 rounded-lg">
        <h4 class="font-semibold mb-5">Platforms</h4>
        <div class="mb-5">
          <p class="uppercase text-sm">ALL Platforms</p>
          <p class="text-[#058EF8] font-semibold">120</p>
        </div>
        <div class="mb-5">
          <p class="uppercase text-sm">Total Spent</p>
          <p class="text-[#058EF8] font-semibold">120</p>
        </div>
      </div>
    </section>

    <section>
      <div
        class="flex flex-col items-center mb-5 justify-between gap-5 sm:flex-row"
      >
        <h3 class="text-lg font-semibold">Campaign</h3>

        <div class="max-w-[31.25rem] w-full">
          <UiInputText
            type="search"
            class="w-full text-sm"
            placeholder="Search"
          />
        </div>
      </div>
      <div>
        <table class="w-full">
          <thead class="text-left">
            <th class="py-3">Campaign Name</th>
            <th>Total Amount</th>
            <th>Amount Paid</th>
            <th>Status</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="flex flex-row items-center gap-3">
                  <div
                    class="w-[2.4rem] h-[2.4rem] bg-gray-100 rounded-lg overflow-hidden"
                  ></div>
                  <div class="text-sm">
                    <p>Nike lebron shoe</p>
                    <p class="text-[0.875rem]">TIMA subscription</p>
                  </div>
                </div>
              </td>
              <td>$11,223</td>
              <td>$11,223</td>
              <td>
                <DStatusView status="ongoing" />
              </td>
              <td>
                <div class="inline-flex items-center">
                  <UiButtonDefault
                    variant="primary"
                    class="text-sm py-2 px-5"
                    label="Pay Now"
                  />
                  <button
                    class="p-2 ml-2 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full transition-colors duration-200 active:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mt-14">
      <div
        class="flex flex-col items-center mb-5 justify-between gap-5 sm:flex-row"
      >
        <h3 class="text-lg font-semibold">Platforms</h3>

        <div class="max-w-[31.25rem] w-full">
          <UiInputText
            type="search"
            class="w-full text-sm"
            placeholder="Search"
          />
        </div>
      </div>
      <div>
        <table class="w-full">
          <thead class="text-left">
            <th class="py-3">Platform</th>
            <th>Budget</th>
            <th>Amount Spent</th>
            <th>Status</th>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="inline-flex flex-row items-center gap-3">
                  <div
                    class="w-[2.4rem] h-[2.4rem] bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <UtSvg name="socials/tiktok" />
                  </div>
                  <div class="text-sm">Tiktok</div>
                </div>
              </td>
              <td>$11,223</td>
              <td>$11,223</td>
              <td>
                <DStatusView status="ongoing" class="w-full" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { watchThrottled } from "@vueuse/core";
import { Doughnut } from "vue-chartjs";
import type { Core } from "~/lib/interfaces";
import defs from "~/utils/defs";

definePageMeta({
  name: "BrandFinance",
});

const filter = ref("");
const doptions = ref<any>({
  responsive: true,
  rotation: -90,
  aspectRatio: 1.5,
  circumference: 180,
  cutout: "80%",

  plugins: {
    legend: {
      position: "right",
      itemSpacing: 2,
      labels: {
        boxWidth: 20,
        fontSize: 8, // Adjust the box width as needed
        pointStyle: "circle",
      },
    },
  },
});

const ddata = ref({
  labels: ["Spent", "Available"],
  datasets: [
    {
      data: [300, 50],
      backgroundColor: ["#F02727", "#058EF8"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      borderWidth: 0,
      pointStyle: "circle",
    },
  ],
});

const BG_COLORS = ["#AAD9FB", "#2AA2FD", "#FFB009", "#AA7506", "#FFE5AD"];
const paymentYear = ref("2024");

const data = ref({
  labels: defs.monthsOfYear.map((e) => e.short),
  datasets: [] as Core.DataSet[],
});

const options = ref<any>({
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  responsive: true,
  aspectRatio: 1156 / 500,
  barPercentage: 0.8,
  categoryPercentage: 0.8,
  plugins: {
    legend: {
      itemSpacing: 10,
      position: "bottom",
      padding: {
        bottom: 30, // Adjust the bottom padding
      },
      labels: {
        boxWidth: 13,
        fontSize: 8, // Adjust the box width as needed
      },
    },
  },
});

const api = useAPI();
const transactions = ref<Core.InfluencerTransaction[]>([]);
const getTransactions = useRequestState({
  action: () => api.getInfluencerTransactions(),
  immediately: true,
  onSuccess: (response) => {
    transactions.value = response.data;
  },
});

const searchQuery = ref<string>("");
const searchStatus = ref<string>("");
const searchTransactions = useRequestState({
  action: () => api.getInfluencerTransactionsByStatus(searchStatus.value),
  immediately: true,
  onSuccess: (response) => {
    transactions.value = response.data;
  },
});

const search = () => {
  if (searchStatus.value && searchStatus.value !== "ALL") {
    searchTransactions.execute();
  } else {
    getTransactions.execute();
  }
};

const searchFilter = (inf: Core.InfluencerTransaction[]) => {
  const regex = new RegExp(searchQuery.value, "i");
  return inf.filter((str) => regex.test(str.campaignName));
};

const paymentStats = ref<Core.InfluencerPaymentStats>();
const getStats = useRequestState({
  action: () => api.getInfluencerPaymentStats(),
  immediately: true,
  onSuccess: (response) => {
    paymentStats.value = response.data;
  },
});

function groupByMonth(data: Core.MonthData[]) {
  const grouped: Core.GroupedData = {};
  data.forEach((month) => {
    if (!grouped[month.name]) {
      grouped[month.name] = [];
    }

    grouped[month.name].push(month);
  });

  return grouped;
}

function groupByTitle(data: Core.PaymentStatistics[]) {
  const grouped: Core.GroupedData = {};

  data.forEach((month) => {
    month.legends.forEach((legend) => {
      if (!grouped[legend.title]) {
        grouped[legend.title] = [];
      }
      grouped[legend.title].push({
        legend: legend,
        ...month,
      });
    });
  });

  return grouped;
}

function regroup(data: Core.PaymentStatistics[]) {
  const $data = groupByTitle(data);
  const $result: Record<string, Core.GroupedData> = {};

  for (const title in { ...$data }) {
    const el = $data[title];
    $result[title] = groupByMonth(el);
  }

  return $result;
}

function generateBarColors(data: Core.PaymentStatistics[]) {
  const legend = tools.findLargestArray(data.map((e) => e.legends)) || [];
  if (legend && legend.length > BG_COLORS.length) {
    const newColors = new Array(legend.length - BG_COLORS.length).fill(null);
    newColors.map((e) => tools.getRandomHexColor(BG_COLORS));
    BG_COLORS.push(...newColors);
  }

  return legend;
}

const getPaymentStatistics = useRequestState({
  action: () => api.getPaymentStatistics(paymentYear.value),
  immediately: true,
  onSuccess: (response) => {
    const largestLegend = generateBarColors(response.data);
    const $data = regroup(response.data);
    const datasets: Core.DataSet[] = [];
    for (let i = 0; i < largestLegend.length; i++) {
      const legend = largestLegend[i];
      datasets.push({
        borderWidth: 0,
        label: legend.title,
        backgroundColor: BG_COLORS[i],
        data: [...defs.monthsOfYear].map((e) => {
          const month = $data[legend.title][e.short];
          return month ? month[0].legend.value : 0;
        }),
      });
    }
    data.value = {
      labels: defs.monthsOfYear.map((e) => e.short),
      datasets,
    };
  },
});

watchThrottled(
  paymentYear,
  () => {
    getPaymentStatistics.execute();
  },
  { throttle: 1000 }
);
</script>

<style></style>
