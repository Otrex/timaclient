<template>
  <div class="p-10">
    <div
      class="flex flex-wrap gap-y-6 md:gap-y-0 -mx-3 min-h-[179px] max-h-[179px]"
    >
      <div class="w-full md:w-6/12 px-3">
        <div
          class="bg-[#F7FCFF] border border-[#2BA2FD33] rounded-lg px-8 py-6 h-full flex items-center w-full"
        >
          <div class="flex items-center justify-between w-full">
            <div class="flex gap-2 justify-between">
              <div
                class="bg-[#058EF8] px-3 py-2 flex items-center rounded-full"
              >
                <UtSvg name="wallet" dim w="30px" h="30px" />
              </div>

              <div>
                <h1 class="font-semibold text-xl text-[#333333]">My Wallet</h1>
                <p class="flex items-end gap-2 text-[#333333]">
                  <span class="text-base text-[#545454]"> USD </span>
                  {{ formatMoney(wallet) }}
                </p>
              </div>
            </div>

            <div>
              <UiButtonDefault
                class="w-full px-3 py-2"
                variant="primary"
                @click="pinModal.set = true"
              >
                <div class="flex gap-3">
                  <UtSvg name="send" dim w="21px" h="21px" />
                  <span>Withdraw</span>
                </div>
              </UiButtonDefault>
            </div>
          </div>
        </div>
      </div>

      <div class="w-4/12 md:w-2/12 px-3">
        <button
          @click="activeTab = 0"
          :class="['cardTab', activeTab === 0 && 'active']"
        >
          <div class="text-center">
            <h1 class="font-semibold text-xl">100</h1>
            <p class="text-base text-[#545454]">Total transactions</p>
          </div>
        </button>
      </div>

      <div class="w-4/12 md:w-2/12 px-3">
        <button
          @click="activeTab = 1"
          :class="['cardTab', activeTab === 1 && 'active']"
        >
          <div class="text-center">
            <h1 class="font-semibold text-xl">100</h1>
            <p class="text-base text-[#545454]">Completed Payment</p>
          </div>
        </button>
      </div>

      <div class="w-4/12 md:w-2/12 px-3">
        <button
          @click="activeTab = 2"
          :class="['cardTab', activeTab === 2 && 'active']"
        >
          <div class="text-center">
            <h1 class="font-semibold text-xl">100</h1>
            <p class="text-base text-[#545454]">Pending Payment</p>
          </div>
        </button>
      </div>
    </div>

    <!-- chart -->

    <div class="mt-10" v-if="activeTab === 0">
      <Bar
        :data="data"
        class="inline-block w-full min-h-[200px] md:min-h-[561px] md:max-h-[561px]"
        :options="options"
      />
    </div>

    <!-- table -->

    <div class="mt-10">
      <div
        class="flex mb-[1.875rem] flex-row items-center justify-between w-full"
      >
        <div class="w-7/12">
          <h1 class="text-[1.25rem] text-[#545454] text-xl w-full">
            Transactions
          </h1>
        </div>

        <div class="md:max-w-[431px] md:w-5/12 flex justify-end">
          <UiInputText
            search
            placeholder="Search completed payment"
            class="bg-transparent placeholder:text-[color:--clr-grey-500] w-full border-[color:--clr-grey-500]"
          />
        </div>
      </div>

      <div class="border border-[#BBBBBB] rounded-xl">
        <table class="w-full rounded-xl">
          <thead class="">
            <tr>
              <th class="font-normal text-left">Campaign name</th>
              <th class="font-normal">Brand name</th>
              <th class="font-normal">Amount</th>
              <th class="font-normal">Transaction date</th>
              <th class="font-normal">Expected payment date</th>
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
                  {{
                    tools.formatDate(transaction.transactionDate || new Date())
                  }}
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

    <!-- modals -->
    <UtModal
      v-model:state="pinModal.set"
      m-width="40.25rem"
      content-class="rounded-xl mx-auto md:!mt-auto"
      backdrop-color="rgba(0,0,0,.05)"
    >
      <div v-if="withdrawState === 'init'" class="bg-white p-6 rounded-lg">
        <div class="flex justify-between">
          <div>
            <h1 class="font-semibold text-xl text-[#333333]">Withdraw</h1>
            <p class="text-sm text-[#545454]">Send funds from your wallet</p>
          </div>

          <div @click="pinModal.set = false" class="cursor-pointer">
            <UtSvg name="cancel" class="text-black" dim w="24px" h="24px" />
          </div>
        </div>

        <div class="my-4 h-px border border-[#BBBBBB]"></div>

        <div>
          <div
            class="flex items-center border border-[#BBBBBB] rounded-xl p-2 gap-2 w-full"
          >
            <div>
              <UtSvg name="dollar" class="text-black" dim w="24px" h="24px" />
            </div>

            <div class="w-full">
              <input
                class="block w-full outline-none shadow-none border-none focus:border-none focus:shadow-none focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div class="py-2 w-full flex items-center justify-end">
            <h1 class="text-[#777777] text-base">
              Available <span class="text-[#545454] text-2xl">$0</span>
            </h1>
          </div>
        </div>

        <div>
          <div
            class="cursor-pointer flex items-center justify-between border border-[#BBBBBB] rounded-xl py-2 px-4 gap-2 w-full"
          >
            <div class="w-full">
              <h1 class="text-[#545454] text-base">John David Kano</h1>
              <p class="text-sm text-[#545454]">
                <span class="">. Guaranty Trust bank</span>
                <span class="">. 2000524190</span>
                <span class="">. NGN</span>
              </p>
            </div>

            <div>
              <UtSvg
                name="chevron-down"
                class="text-black"
                dim
                w="14px"
                h="14px"
              />
            </div>
          </div>
        </div>

        <div>
          <div class="my-6 flex items-center justify-end">
            <UiButtonDefault
              variant="primary"
              class="py-2 px-8"
              label="Withdraw"
              @click=""
            />
          </div>
        </div>
      </div>

      <div v-if="withdrawState === 'pin'" class="bg-white">
        <ModalsSetPin
          title="Enter Transaction Pin"
          description="Please create a PIN for secure transactions"
          @submit="onSubmit"
          label="Create"
        />
      </div>
    </UtModal>
  </div>
</template>

<script setup lang="ts">
import { watchThrottled } from "@vueuse/core";
import type { Core } from "~/lib/interfaces";
import { Bar } from "vue-chartjs";
import defs from "~/utils/defs";
import { SET_TRANSACTION_PIN } from "~/lib/validation/rules";

definePageMeta({
  name: "Finance",
  middleware: [async () => {}],
});

const api = useAPI();
const wallet = ref<any>(null);

onMounted(async () => {
  try {
    console.log([await api.getWalletTransactions()]);
    const { data } = await api.getWalletAddress();

    wallet.value = data.balance;
  } catch (error) {}
});

const withdrawState = ref<"init" | "pin" | "suucess">("init");

/* tab logic */
const activeTab = ref(0);

/* modal logic */
const auth = useAuthStore();
const { notify } = useNotification();

const pinModal = reactive({
  set: false,
  confirm: false,
  pin: "",
});

function onSubmit(pin: string) {
  pinModal.pin = pin;
  pinModal.confirm = true;
}

async function onConfirm(pin: string) {
  // execute();
}

const { execute, state, v$ } = useRequestState({
  validation: {
    config: { $autoDirty: true },
    rule: SET_TRANSACTION_PIN,
    form: pinModal,
  },
  action: () =>
    api.createTransactionPin({
      transactionPIN: pinModal.pin,
    }),
  onSuccess(response) {
    notify({
      type: "success",
      title: "Request Successful",
      text: "Transaction Pin created",
    });
    pinModal.set = false;
  },
  onError(error) {
    notify({
      type: "error",
      title: error.title,
      text: error.description,
    });
  },
});

/* charts logic */

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

/* charts grouping logic */
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

/* transactions list logic */
const route = useRoute();

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

function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
</script>

<style>
/* tab styles */
.cardTab {
  @apply bg-[#F7FCFF];
  @apply border border-[#2BA2FD33];
  @apply rounded-lg px-3 py-6 h-full flex items-center justify-center w-full;
}

.cardTab.active {
  @apply border border-[#2BA2FD99];
}

/* table Styles */
table thead {
  @apply bg-transparent;
  @apply rounded-xl;
}

table thead th {
  @apply px-2 py-4;
  @apply text-[#545454] text-base;
}

table thead th:first-child {
  padding-left: 0.8rem;
  border-radius: 0.2rem 0 0 0.2rem;
}

table thead th:last-child {
  border-radius: 0 0.2rem 0.2rem 0;
}

table tbody tr td {
  @apply !py-10 px-4;
  @apply text-[#545454];
}

.dark table thead th {
  background: rgba(228, 243, 255, 0.5);
}

table.no-clr thead th {
  background: transparent;
  color: var(--clr-grey-300);
}
</style>
