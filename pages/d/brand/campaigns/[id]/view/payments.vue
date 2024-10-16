<template>
  <section class="mt-[0.375rem]">
    <div
      style="--clr: rgba(228, 243, 255, 0.5)"
      class="bg-[--clr] p-[1.25rem] mb-[1.5rem]"
    >
      <div class="flex flex-col gap-[1.25rem]">
        <StatsMetrics
          title="PAYMENTS"
          :socials="[]"
          :data="metric.data"
          justified
        />
      </div>
    </div>

    <div>
      <div class="mb-[1.875rem] flex gap-3">
        <div class="max-w-[26.9375rem] w-full">
          <UiInputText
            search
            placeholder="Search Transactions"
            class="mr-[1.75rem] placeholder:text-[color:--clr-grey-500] w-full border-[color:--clr-grey-500]"
          />
        </div>
        <UiInputSelect
          class="max-w-[8.9375rem] w-full text-center border-[color:--clr-grey-500]"
          v-model="searchFilter"
          :options="[
            { value: '', label: 'ALL' },
            ...optionsStore.$paymentStatus,
          ]"
        />
      </div>

      <div>
        <table class="w-full x-table no-clr">
          <thead>
            <th class="font-normal text-left">Influencer’s name</th>
            <th class="font-normal">Amount paid</th>
            <th class="font-normal">Balance</th>
            <th class="font-normal">Payment date</th>
            <th class="font-normal">Payment status</th>
            <th class="font-normal">Payment method</th>
            <th></th>
          </thead>
          <tbody>
            <template
              v-if="tools.requestState(getTransactions) === constants.LOADING"
            >
              <tr>
                <td colspan="6">
                  <UtLoaderIndicator message="Fetching Transactions" />
                </td>
              </tr>
            </template>
            <template v-else-if="transactions.length === 0">
              <tr>
                <td colspan="6">
                  <UtNoResource message="No transactions available" />
                </td>
              </tr>
            </template>
            <template
              v-for="transaction in transactions"
              :key="transaction.publicId"
            >
              <tr>
                <td>
                  <div class="flex gap-[1rem] items-center flex-row">
                    <div>
                      <div
                        class="bg-[#D9D9D9] rounded-full overflow-hidden aspect-square w-[1.875rem]"
                      >
                        <UiImg
                          class="w-full h-full object-cover"
                          :src="transaction.profilePicture"
                          v-if="transaction.profilePicture"
                          :alt="transaction.profilePicture"
                        />
                      </div>
                    </div>
                    <div>{{ transaction.name }}</div>
                  </div>
                </td>
                <td class="align-middle text-center">
                  {{ tools.formatCurrency(transaction.amount) }}
                </td>
                <td class="align-middle text-center">
                  {{ tools.formatCurrency(transaction.balance) }}
                </td>
                <td class="align-middle text-center">
                  {{ tools.formatDate(transaction.transactionDate) }}
                </td>
                <td class="align-middle text-center">
                  <template v-if="transaction.status === 'SUCCESS'">
                    <span class="text-[#2DBA62]">Successful</span>
                  </template>
                  <template v-else-if="transaction.status === 'PENDING'">
                    <span class="text-[#FFCA5B]">Pending</span>
                  </template>
                  <template v-else>
                    <span>--</span>
                  </template>
                </td>
                <td class="align-middle text-center">
                  {{ transaction.type }}
                </td>
                <td class="align-middle text-center">
                  <UtPayBalance :data-id="transaction.publicId" />
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Core } from "~/lib/interfaces";

definePageMeta({
  name: "ViewbrandCampaignPayments",
});

type Options = { value: number | string; label: string };
type Transactions = Core.CampaignTransaction & { profilePicture?: string };

const optionsStore = useOptionsStore();
const searchFilter = ref<string>("");

const metric = ref({
  title: "PAYMENTS",
  socials: [],
  data: [] as Options[],
});

const api = useAPI();

const getPaymentStats = useRequestState({
  action: () => api.getPaymentStats(),
  onSuccess: (response) => {
    metric.value.data = [
      {
        value: response.data.totalClientPaid,
        label: "Influencers Paid",
      },
      {
        value: tools.formatCurrency(response.data.totalBudget),
        label: "Total Budget",
      },
      {
        value: tools.formatCurrency(response.data.totalAmountPaid),
        label: "Money disbursed",
      },
      {
        value: tools.formatCurrency(response.data.totalBalance),
        label: "Outstanding payment",
      },
    ];
  },
});

const transactions = ref<Transactions[]>([]);
const getTransactions = useRequestState({
  action: () => api.getCampaignTransactions(),
  onSuccess: (response) => {
    transactions.value = response.data;
  },
});

onMounted(() => {
  getPaymentStats.execute();
  getTransactions.execute();
});
</script>

<style></style>
