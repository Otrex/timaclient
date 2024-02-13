<template>
  <div class="p-[1.25rem]">
    <div class="grid grid-cols-4 gap-[1.25rem] mb-[1.25rem]">
      <div
        class="bg-[rgba(228,_243,_255,_0.5)] rounded-[0.75rem] aspect-[310/214] flex items-center justify-center"
      >
        <div class="text-center">
          <h3 class="text-[2.1875rem]">100</h3>
          <p>Total transactions</p>
        </div>
      </div>

      <div
        class="bg-[rgba(228,_243,_255,_0.5)] rounded-[0.75rem] aspect-[310/214] flex items-center justify-center"
      >
        <div class="text-center">
          <h3 class="text-[2.1875rem]">90</h3>
          <p>Complete Payment</p>
        </div>
      </div>

      <div
        class="bg-[rgba(228,_243,_255,_0.5)] rounded-[0.75rem] aspect-[310/214] flex items-center justify-center"
      >
        <div class="text-center">
          <h3 class="text-[2.1875rem]">10</h3>
          <p>Yet to be balanced</p>
        </div>
      </div>
    </div>

    <div
      class="p-[1.5625rem] mb-[2.625rem] bg-[rgba(228,_243,_255,_0.5)] rounded-[0.75rem]"
    >
      <div class="flex flex-row justify-between mb-[0.75rem] items-center">
        <div>
          <h1>Payment graph</h1>
        </div>
        <div>
          <select
            class="border-none dark:bg-[rgba(228,_243,_255,_0.5)] rounded-md"
          >
            <option value="2023">2023</option>
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
              :options="tools.generationOptions(['all'])"
              v-model="filter"
            />
          </div>
        </div>
      </div>

      <div>
        <table class="w-full x-table">
          <thead>
            <th class="font-normal text-left">Campaign name</th>
            <th class="font-normal">Brand name</th>
            <th class="font-normal">Earning</th>
            <th class="font-normal">Balance</th>
            <th class="font-normal">Payment date</th>
            <th class="font-normal">Payment status</th>
            <th></th>
          </thead>
          <tbody>
            <template
              v-if="tools.requestState(getTransactions) === constants.LOADING"
            >
              <UtLoaderIndicator message="Fetching transactions" />
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
              v-for="(transaction, idx) in transactions"
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
import { Bar } from "vue-chartjs";
import type { Core } from "~/lib/interfaces";

definePageMeta({
  name: "Payment",
});

const filter = ref("all");
const data = ref({
  labels: [
    "Label 1",
    "Label 2",
    "Label 3",
    "Label 4",
    "Label 5",
    "Label 6",
    "Label 7",
    "Label 8",
    "Label 9",
    "Label 10",
    "Label 11",
  ],
  datasets: [
    {
      label: "Product 1",
      data: [10, 40, 15, 67, 0, 51, 0, 10, 30, 30, 40],
      backgroundColor: "#AAD9FB",
      borderWidth: 0,
    },
    {
      label: "Product 2",
      data: [15, 10, 25, 55, 40, 55, 66, 10, 29, 10, 50],
      backgroundColor: "#2AA2FD",
      borderWidth: 0,
    },
    {
      label: "Product 3",
      data: [15, 10, 25, 0, 40, 55, 66, 0, 29, 10, 50],
      backgroundColor: "#FFB009",
      borderWidth: 0,
    },
    {
      label: "Product 4",
      data: [100, 10, 0, 0, 40, 0, 66, 0, 29, 10, 50],
      backgroundColor: "#AA7506",
      borderWidth: 0,
    },
    {
      label: "Product 5",
      data: [0, 10, 25, 0, 40, 55, 66, 0, 29, 10, 50],
      backgroundColor: "#FFE5AD",
      borderWidth: 0,
    },
  ],
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
  aspectRatio: 1156 / 561,
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
</script>

<style></style>
