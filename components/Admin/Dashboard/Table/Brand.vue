<template>
    <section class="mt-[0.375rem]">
        <div>
            <div>
                <table class="w-full x-table no-clr">
                    <thead>
                        <th class="font-normal text-left">Name</th>
                        <th class="font-normal">Phone Number</th>
                        <th class="font-normal">Campaign</th>
                        <th class="font-normal">Status</th>
                        <th class="font-normal">Brand</th>
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
                                <td>
                                    <div class="flex gap-2 items-center justify-start">
                                        <UiImg src="/assets/svg/like.svg" alt="logo"
                                            class="w-[48px] h-[48px] rounded-full" />
                                        <div>
                                            <p class="text-base text-[#545454]">Efe Money</p>
                                            <p class="text-sm text-[#777777]">money@gmail.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle text-center">
                                    {{ tools.formatCurrency(transaction.amount) }}
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
                                <td class="align-middle text-center">
                                    {{ tools.formatDate(transaction.transactionDate) }}
                                </td>

                                <td class="flex gap-2">
                                    <button class="border border-[#BBBBBB] text-[#545454] p-2.5 rounded-2xl"
                                        @click="() => { modalState = true }">
                                        see details
                                    </button>

                                    <button class="border border-[#BBBBBB] text-[#545454] p-2.5 rounded-lg">
                                        <UtSvg name="delete" dim w="21px" h="21px" />
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>

                <!-- Modal -->

                <UtModal v-model:state="modalState" m-width="949px" content-class="mx-auto mt-[10%]"
                    backdrop-color="rgba(0,0,0,.03)">
                    <div class="bg-white p-6 rounded-2xl">
                        <div class="flex items-center justify-between mb-2">
                            <h1 class="text-[32px] leading-10">Brand Insight</h1>
                            <button class="" @click="() => { modalState = false }">
                                <UtSvg name="cancel" dim w="40px" h="40px" />
                            </button>
                        </div>

                        <div class="mb-6">
                            <div class="flex gap-2 items-center justify-start">
                                <UiImg src="/assets/svg/like.svg" alt="logo" class="w-[32px] h-[32px] rounded-full" />
                                <div>
                                    <p class="text-lg text-[#545454]">Efe Money</p>
                                </div>
                            </div>
                        </div>

                        <table class="w-full x-table no-clr">
                            <thead class="bg-[#F7F7F7]">
                                <th class="text-2xl font-normal text-left">Campaign Name</th>
                                <th class="text-2xl font-normal">Campaign Details</th>
                                <th class="text-2xl font-normal">Start Date</th>
                                <th class="text-2xl font-normal">End Date</th>
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
                                        <td>
                                            {{ "Unity Drive" }}
                                        </td>
                                        <td class="flex justify-center">
                                            <div class="max-w-[257px]">
                                                {{ `Raise awareness about sustainable living and encourage individuals
                                                to
                                                adopt
                                                eco - friendly habits.` }}
                                            </div>
                                        </td>
                                        <td class="">
                                            {{ tools.formatDate(transaction.transactionDate) }}
                                        </td>
                                        <td class="">
                                            {{ tools.formatDate(transaction.transactionDate) }}
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>

                </UtModal>
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
const modalState = ref(false);

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
    @apply !py-10 px-4;
    @apply text-[#595959];
}
</style>