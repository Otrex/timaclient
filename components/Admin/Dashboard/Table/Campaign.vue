<template>
    <section class="mt-[0.375rem]">
        <div>
            <div>
                <table class="w-full x-table no-clr">
                    <thead>
                        <th class="font-normal text-left">Name</th>
                        <th class="font-normal">Brand</th>
                        <th class="font-normal">Start Date</th>
                        <th class="font-normal">End Date</th>
                        <th class="font-normal">Status</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <template v-if="false">
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
                        <template v-for="transaction in transactions" :key="transaction.publicId">
                            <tr class="border-b border-[#D6D5D5] last:border-none p-6">
                                <td class="text-left">
                                    {{ transaction.name }}
                                </td>
                                <td class="align-middle text-center">
                                    {{ tools.formatCurrency(transaction.amount) }}
                                </td>
                                <td class="align-middle text-center">
                                    {{ tools.formatDate(transaction.transactionDate) }}
                                </td>
                                <td class="align-middle text-center">
                                    {{ tools.formatDate(transaction.transactionDate) }}
                                </td>
                                <td class="align-middle text-center uppercase">
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

type Options = { value: number | string; label: string };
type Transactions = Core.CampaignTransaction & { profilePicture?: string };
const searchFilter = ref<string>("");
const metric = ref({
    title: "PAYMENTS",
    socials: [],
    data: [] as Options[],
});
const transactions = ref<Transactions[]>([]);

onMounted(() => {
    metric.value.data = [
        {
            value: 300000,
            label: "Influencers Paid",
        },
        {
            value: 40000000,
            label: "Total Budget",
        },
        {
            value: 2500000,
            label: "Money disbursed",
        },
        {
            value: 1230000,
            label: "Outstanding payment",
        },
    ];

    transactions.value = [
        {
            profilePicture: 'fhfhfhfhfhf',
            transactionDate: new Date(),
            reference: 'dhdhdhdhd',
            amount: 10000,
            balance: 2000000,
            status: 'SUCCESS',
            publicId: 'dhdhdhdhdddhd',
            type: 'brand',
            name: 'Predict To Bet',
        },
        {
            profilePicture: 'fhfhfhfhfhf',
            transactionDate: new Date(),
            reference: 'dhdhdhdhd',
            amount: 10000,
            balance: 2000000,
            status: 'SUCCESS',
            publicId: 'dhdhdhdhdddhd',
            type: 'brand',
            name: 'Predict To Bet',
        },
        {
            profilePicture: 'fhfhfhfhfhf',
            transactionDate: new Date(),
            reference: 'dhdhdhdhd',
            amount: 10000,
            balance: 2000000,
            status: 'SUCCESS',
            publicId: 'dhdhdhdhdddhd',
            type: 'brand',
            name: 'Predict To Bet',
        }
    ];
});
</script>

<style>
.x-table tbody tr td {
    /* padding: 0.8rem 0.3rem; */
    @apply py-6 px-4;
}
</style>