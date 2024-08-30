<template>
    <div class="p-10">
        <div class="flex flex-wrap -mx-3 min-h-[179px] max-h-[179px]">
            <div class="md:w-6/12 px-3">
                <div class="bg-[#F7FCFF] border border-[#2BA2FD] rounded-lg px-3 py-6 h-full flex items-center w-full">
                    <div class="flex items-center justify-between w-full">
                        <div class="flex gap-2 justify-between">
                            <div class="bg-[#058EF8] px-3 py-2 flex items-center rounded-full">
                                <UtSvg name="wallet" dim w="30px" h="30px" />
                            </div>

                            <div>
                                <h1 class="font-semibold text-xl text-[#333333]">My Wallet</h1>
                                <p class="flex items-end gap-2 text-[#333333]">
                                    <span class="text-base text-[#545454]">
                                        USD
                                    </span>
                                    625,417.58
                                </p>
                            </div>
                        </div>

                        <div>
                            <UiButtonDefault class="w-full px-3 py-2" variant="primary">
                                <div class="flex gap-3">
                                    <UtSvg name="send" dim w="21px" h="21px" />
                                    <span>Withdraw</span>
                                </div>
                            </UiButtonDefault>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-2/12 px-3">
                <div
                    class="bg-[#F7FCFF] border border-[#2BA2FD] rounded-lg px-3 py-6 h-full flex items-center justify-center w-full">
                    <div class="text-center">
                        <h1 class="font-semibold text-xl">100</h1>
                        <p class="text-base text-[#545454]">Total transactions</p>
                    </div>
                </div>
            </div>

            <div class="w-2/12 px-3">
                <div
                    class="bg-[#F7FCFF] border border-[#2BA2FD] rounded-lg px-3 py-6 h-full flex items-center justify-center w-full">
                    <div class="text-center">
                        <h1 class="font-semibold text-xl">100</h1>
                        <p class="text-base text-[#545454]">Completed Payment</p>
                    </div>
                </div>
            </div>

            <div class="w-2/12 px-3">
                <div
                    class="bg-[#F7FCFF] border border-[#2BA2FD] rounded-lg px-3 py-6 h-full flex items-center justify-center w-full">
                    <div class="text-center">
                        <h1 class="font-semibold text-xl">100</h1>
                        <p class="text-base text-[#545454]">Pending Payment</p>
                    </div>
                </div>
            </div>
        </div>


        <!-- table -->

        <div class="mt-10">
            <div class="flex mb-[1.875rem] flex-row items-center justify-between w-full">
                <div class="w-7/12">
                    <h1 class="text-[1.25rem] text-[#545454] text-xl w-full ">Transactions</h1>
                </div>

                <div class="max-w-[431px] w-5/12 flex justify-end">
                    <UiInputText search placeholder="Search completed payment"
                        class="bg-transparent placeholder:text-[color:--clr-grey-500] w-full border-[color:--clr-grey-500]" />
                </div>
            </div>

            <div class="border border-[#BBBBBB] rounded-xl">
                <table class="w-full rounded-xl">
                    <thead class="">
                        <th class="font-normal text-left">Campaign name</th>
                        <th class="font-normal">Brand name</th>
                        <th class="font-normal">Earning</th>
                        <th class="font-normal">Balance</th>
                        <th class="font-normal">Payment date</th>
                        <th class="font-normal">Payment status</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <template v-if="tools.requestState(getTransactions) === constants.LOADING ||
                            tools.requestState(searchTransactions) === constants.LOADING
                            ">
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
                        <template v-else v-for="(transaction, idx) in searchFilter(transactions)" :key="idx">
                            <tr>
                                <td>
                                    <div class="flex gap-[1rem] items-center flex-row">
                                        <div>
                                            <div
                                                class="bg-[#D9D9D9] rounded-md overflow-hidden aspect-square w-[1.875rem]">
                                                <UiImg class="w-full h-full object-cover"
                                                    :src="transaction.campaignImage" v-if="transaction.campaignImage"
                                                    :alt="transaction.campaignName" />
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
import { onMounted, ref } from "vue";
import type { Core } from "~/lib/interfaces";

definePageMeta({
    name: "Finance",
    middleware: [async () => { }],
});

onMounted(() => {

});

const route = useRoute();
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
</script>

<style>
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