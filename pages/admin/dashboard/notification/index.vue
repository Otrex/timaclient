<template>
    <div class="px-6">
        <div class="flex items-center justify-between">
            <h1 class="text-[22px] font-semibold text-[#333333]">
                Notification
            </h1>

            <div class="text-right mt-6 mb-[3.75rem]">
                <UiInputDropdown class="max-w-[17.5rem] flex w-full" v-model="filter" :options="[
                    'Last 7 days',
                    'Last 14 days',
                    'Last 30 days',
                    'Last 90 days',
                ]">
                    <template #select="{ data, isOpen }">
                        <div class="flex flex-row gap-2 justify-between items-center">
                            <div class="flex items-center">
                                <UtSvg name="calendar" class="w-[1.5rem] h-[1.5rem]" />
                            </div>
                            <div class="text-[#828282]">{{ data }}</div>
                            <div class="flex items-center">
                                <UtSvg name="down-caret" class="w-[1rem] h-[1rem] transition-all"
                                    :class="isOpen && 'rotate-180'" />
                            </div>
                        </div>
                    </template>
                    <template #item="{ data }">
                        <button class="w-full py-2 px-2 hover:bg-gray-100">
                            {{ data }}
                        </button>
                    </template>
                </UiInputDropdown>
            </div>
        </div>


        <div class="rounded-xl p-6 border border-[#D8D8D8] flex flex-col my-6">
            <div class="flex justify-between items-center py-8 border-b border-[#BBBBBB] last:border-none"
                v-for="item of notificationData">
                <div>
                    <div :class="{
                    'bg-[#30DE80]': item.type === 'registration',
                    'bg-[#FFBB00]': item.type === 'withdrawal',
                }" class="text-white p-3 inline-block rounded-lg">
                        {{ item.type }}
                    </div>

                    <div role="separator" class="my-2"></div>

                    <h1 class="text-[#545454] text-lg font-semibold mb-2">
                        {{ item.title }}
                    </h1>

                    <div role="separator" class="my-2"></div>

                    <p class="text-[#777777] text-base font-normal">
                        {{ item.content }}
                    </p>

                    <div role="separator" class="my-2"></div>

                    <div class="flex gap-2">
                        <UtSvg name="clock" dim w="24px" h="24px" />
                        <p class="text-[#777777]">
                            {{ item.createdAt }}
                        </p>
                    </div>
                </div>

                <div>
                    <button class="border border-[#BBBBBB] text-[#BBBBBB] py-3 px-10 rounded-xl"
                        @click="() => { modalState = true }">
                        Review
                    </button>
                </div>
            </div>
        </div>

        <!-- modal -->

        <div class="">
            <UtModal v-model:state="modalState" m-width="815px" content-class="mx-auto mt-[10%]"
                backdrop-color="rgba(0,0,0,.3)">
                <div class="bg-white rounded-2xl py-6">
                    <div class="border-b border-[#D8D8D8] pb-4 px-10">
                        <h1 class="font-semibold text-xl mb-4">New User</h1>
                        <p class="text-sm text-[#595959] ">New User Registration</p>
                    </div>

                    <div class="mt-4 px-10">
                        <h1 class="font-semibold text-base text-[#545454] mb-4">Hello Admin,</h1>
                        <p class="text-[#545454] text-base mb-4">We are excited to inform you that a new user has just
                            joined
                            our
                            platform. Please find the details below:</p>
                    </div>

                    <div class="bg-[#F1F9FF] px-14 py-7">
                        <div class="flex justify-between items-center w-6/12">
                            <ul>
                                <li class="py-3 list-disc text-base text-[#545454]"> Username:</li>
                                <li class="py-3 list-disc text-base text-[#545454]"> Email:</li>
                                <li class="py-3 list-disc text-base text-[#545454]"> Phone Number:</li>
                                <li class="py-3 list-disc text-base text-[#545454]"> User Role:</li>
                                <li class="py-3 list-disc text-base text-[#545454]"> Registration Date:</li>
                            </ul>

                            <ul>
                                <li class="py-3 text-base text-[#545454]"> Soma</li>
                                <li class="py-3 text-base text-[#545454]"> Soma@yahoo.com</li>
                                <li class="py-3 text-base text-[#545454]"> +234 8109999123</li>
                                <li class="py-3 text-base text-[#545454]"> Influencer</li>
                                <li class="py-3 text-base text-[#545454]"> 24/10/2024</li>
                            </ul>
                        </div>
                    </div>

                    <div class="flex justify-end py-14 px-10">
                        <div class="w-6/12 flex gap-x-8">
                            <UiButtonDefault class="w-full py-[0.875rem]" label="Accept" variant="primary" />
                            <UiButtonDefault class="w-full py-[0.875rem]" label="Decline" variant="secondary" />
                        </div>
                    </div>
                </div>
            </UtModal>
        </div>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const notificationData = ref([
    {
        type: 'registration',
        title: 'New Registration: Somadina Onyeka',
        content: `Hello Admin, We are excited to inform you that a new user has just joined our platform.`,
        createdAt: '24 Oct 2024 at 9:29 AM'
    },
    {
        type: 'withdrawal',
        title: 'Withdrawal Request: Khaby Lame',
        content: `Hello Admin, A withdrawal request has been submitted on the platform.`,
        createdAt: '24 Oct 2024 at 9:29 AM'
    },
    {
        type: 'withdrawal',
        title: 'Withdrawal Request: Khaby Lame',
        content: `Hello Admin, A withdrawal request has been submitted on the platform.`,
        createdAt: '24 Oct 2024 at 9:29 AM'
    },
]);

const filter = ref("Last 28 days");
const modalState = ref(false);

definePageMeta({
    name: "Admin Notification",
    middleware: [async () => { }],
});

onMounted(() => { })
</script>

<style></style>
