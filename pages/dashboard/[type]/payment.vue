<template>
  <div class="p-[1.25rem]">
    <transition mode="out-in">
      <template v-if="tools.requestState(getStats) === constants.LOADING">
        <div class="mb-4">
          <div class="bg-[rgba(228,_243,_255,_0.5)] rounded-[0.75rem]">
            <UtLoaderIndicator message="Fetching Statistics" />
          </div>
        </div>
      </template>
      <template v-else-if="!paymentStats">
        <UtNoResource message="No statistics yet" />
      </template>
      <template v-else>
        <div class="grid sm:grid-cols-3 gap-[1.25rem] mb-[1.25rem]">
          <div
            class="bg-[rgba(228,_243,_255,_0.5)] py-[40px] rounded-[0.75rem] max-h-[200px] h-full flex items-center justify-center"
          >
            <div class="text-center">
              <h3 class="text-[2.1875rem]">
                {{ paymentStats.totalTransactions }}
              </h3>
              <p>Total transactions</p>
            </div>
          </div>

          <div
            class="bg-[rgba(228,_243,_255,_0.5)] rounded-[0.75rem] max-h-[200px] h-full flex items-center justify-center"
          >
            <div class="text-center">
              <h3 class="text-[2.1875rem]">
                {{ paymentStats.completedTransactions }}
              </h3>
              <p>Complete Payment</p>
            </div>
          </div>

          <div
            class="bg-[rgba(228,_243,_255,_0.5)] rounded-[0.75rem] max-h-[200px] h-full flex items-center justify-center"
          >
            <div class="text-center">
              <h3 class="text-[2.1875rem]">
                {{ paymentStats.pendingTransactions }}
              </h3>
              <p>Yet to be balanced</p>
            </div>
          </div>
        </div>
      </template>
    </transition>
    <div
      class="p-[1.5625rem] mb-[2.625rem] bg-[rgba(228,_243,_255,_0.5)] rounded-[0.75rem]"
    >
      <div class="flex flex-row justify-between mb-[0.75rem] items-center">
        <div>
          <h1>Payment graph</h1>
        </div>
        <div>
          <select
            v-model="paymentYear"
            class="border-none dark:bg-[rgba(228,_243,_255,_0.5)] rounded-md"
          >
            <template
              v-for="(year, idx) in tools.range(2010, new Date().getFullYear())"
              :key="idx"
            >
              <option :value="year">{{ year }}</option>
            </template>
          </select>
        </div>
      </div>

      <div>
        <Bar :data="data" class="inline-block" :options="options" />
      </div>
    </div>

    <div>
      <div class="flex mb-[1.875rem] flex-row items-center justify-between">
        <div class="text-[1.25rem]">Transactions</div>
        <div class="max-w-[40rem] w-full">
          <div class="whitespace-nowrap inline-flex justify-end w-full">
            <UiInputText
              search
              placeholder="Search Transactions"
              class="mr-[1.75rem] max-w-[26.9375rem] placeholder:text-[color:--clr-grey-500] w-full border-[color:--clr-grey-500]"
            />
            <UiInputSelect
              class="max-w-[8.9375rem] w-full text-center border-[color:--clr-grey-500]"
              :options="[
                { label: 'All', value: 'ALL' },
                { label: 'Partial', value: 'PARTIAL' },
                { label: 'Completed', value: 'COMPLETED' },
              ]"
              @change="search"
              v-model="searchStatus"
            />
          </div>
        </div>
      </div>

      <div>
        <table class="w-full x-table">
          <thead>
            <tr>
              <th class="font-normal text-left">Campaign name</th>
              <th class="font-normal">Brand name</th>
              <th class="font-normal">Earning</th>
              <th class="font-normal">Balance</th>
              <th class="font-normal">Payment date</th>
              <th class="font-normal">Payment status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template
              v-if="
                tools.requestState(getTransactions) === constants.LOADING ||
                tools.requestState(searchTransactions) === constants.LOADING
              "
            >
              <tr>
                <td colspan="7">
                  <UtLoaderIndicator message="Fetching transactions" />
                </td>
              </tr>
            </template>
            <template v-else-if="transactions.length === 0">
              <tr>
                <td colspan="7">
                  <UtNoResource message="No transactions yet" />
                </td>
              </tr>
            </template>
            <template
              v-else
              v-for="(transaction, idx) in searchFilter(transactions)"
              :key="idx"
            >
              <tr>
                <td>
                  <div class="flex gap-[1rem] items-center flex-row">
                    <div>
                      <div
                        class="bg-[#D9D9D9] rounded-md overflow-hidden aspect-square w-[1.875rem]"
                      >
                        <UiImg
                          class="w-full h-full object-cover"
                          :src="transaction.campaignImage"
                          v-if="transaction.campaignImage"
                          :alt="transaction.campaignName"
                        />
                      </div>
                    </div>
                    <div>{{ transaction.campaignName }}</div>
                  </div>
                </td>
                <td class="align-middle text-center">
                  {{ transaction.brandName }}
                </td>
                <td class="align-middle text-center">
                  {{ tools.formatCurrency(transaction.earning || 0) }}
                </td>
                <td class="align-middle text-center">
                  {{ tools.formatCurrency(transaction.balance) }}
                </td>
                <td class="align-middle text-center">
                  {{
                    tools.formatDate(transaction.transactionDate || new Date())
                  }}
                </td>
                <td class="align-middle text-center">
                  <template v-if="transaction.status === 'COMPLETED'">
                    <span class="text-[#2DBA62]">Completed</span>
                  </template>
                  <template v-else-if="transaction.status === 'PENDING'">
                    <span class="text-[#FFCA5B]">Yet to be balanced</span>
                  </template>
                  <template v-else-if="transaction.status === 'PARTIAL'">
                    <span class="text-blue-500">Part payment made</span>
                  </template>
                  <template v-else>
                    <span>--</span>
                  </template>
                </td>
                <td class="align-middle text-center">
                  <UtMoreActions :data-id="transaction.publicId" />
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchThrottled } from "@vueuse/core";
import { Bar } from "vue-chartjs";
import type { Core } from "~/lib/interfaces";
import defs from "~/utils/defs";

definePageMeta({
  name: "Payment",
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
