<template>
  <NuxtLayout name="admin">
    <template #main>
      <div class="flex pb-10 flex-col px-3 sm:px-8 gap-[1rem]">
        <div class="flex justify-end">
          <UiDateSelectInput
            size="md"
            v-model="dateRange"
            :options="
              ['last 7 days', 'last 30 days', 'last 90 days'].map((item) => ({
                label: item,
                value: item,
              }))
            "
          />
        </div>

        <div class="mb-4">
          <div
            class="grid grid-cols-1 md:grid-cols-3 mb-4 lg:grid-cols-4 items-center gap-4"
          >
            <template v-for="(item, idx) in cardData" :key="idx">
              <UiSubscriptionCard v-bind="item" />
            </template>
            <div class="space-y-4">
              <button
                class="flex items-center justify-center text-base w-full px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <LucideSettings class="w-5 h-5 mr-2" />
                Edit Plan Details
              </button>

              <button
                class="flex items-center justify-center w-full text-base px-4 py-2 text-white bg-red-700 rounded-lg hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring focus:ring-red-300"
              >
                <LucideAlertOctagon class="w-5 h-5 mr-2" />
                Deactivate Plan
              </button>
            </div>
          </div>
        </div>

        <div class="admin-table">
          <section
            class="border border-gray-300 dark:border-gray-600 rounded-2xl"
          >
            <header class="flex justify-between py-3.5 px-4 items-center gap-3">
              <h3>Subscribers</h3>
              <div class="flex items-center w-full max-w-[35rem] gap-3">
                <div class="relative w-full items-center">
                  <KitUiInput
                    id="search"
                    type="text"
                    placeholder="Search..."
                    class="pl-10 w-full dark:bg-gray-800 dark:!border-gray-600 dark:outline-gray-600"
                  />
                  <span
                    class="absolute start-0 dark:text-gray-500 inset-y-0 flex items-center justify-center px-3"
                  >
                    <Search class="size-5 text-muted-foreground" />
                  </span>
                </div>
                <div class="relative">
                  <KitUiDropdownMenu class="bg-white relative">
                    <KitUiDropdownMenuTrigger class="relative" as-child>
                      <KitUiButton
                        variant="outline"
                        class="rounded-2xl !py-[1.125rem] dark:bg-gray-800 !border-gray-300 dark:!border-gray-600"
                      >
                        <Filter />
                        Filter:<b class="capitalize" v-if="filter">{{
                          filter
                        }}</b>
                        <ChevronDown class="size-5" />
                      </KitUiButton>
                    </KitUiDropdownMenuTrigger>
                    <KitUiDropdownMenuContent
                      class="w-32 relative left-0 bg-white"
                    >
                      <div class="flex flex-col gap-2">
                        <KitUiButton
                          @click="filter = 'pending'"
                          class="w-full"
                          :class="filter == 'pending' ? 'bg-gray-200' : ''"
                        >
                          Pending
                        </KitUiButton>
                        <KitUiButton
                          @click="filter = 'approved'"
                          class="w-full"
                          :class="filter == 'approved' ? 'bg-gray-200' : ''"
                        >
                          Approved
                        </KitUiButton>
                      </div>
                    </KitUiDropdownMenuContent>
                  </KitUiDropdownMenu>
                </div>
              </div>
            </header>
            <table class="w-full">
              <thead class="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      @change="handleSelectAll"
                      class="ml-1"
                    />
                  </th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Billing cycle</th>
                  <th>Next billing date</th>
                  <th>Status</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in data" :key="index">
                  <td>
                    <input type="checkbox" ref="dataCheckbox" />
                  </td>
                  <td class="font-semibold">{{ item.username }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.billingCycle }}</td>
                  <td>{{ item.nextBillingDate }}</td>
                  <td>
                    <UiStatusPresent :status="item.status" />
                  </td>

                  <td>
                    <div>
                      <KitUiDropdownMenu class="bg-white relative">
                        <KitUiDropdownMenuTrigger class="relative" as-child>
                          <button
                            type="button"
                            aria-label="Menu"
                            class="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-gray-600 dark:text-gray-300 transition-colors hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                          >
                            <MoreVertical class="size-5" />
                          </button>
                        </KitUiDropdownMenuTrigger>
                        <KitUiDropdownMenuContent
                          class="relative left-0 w-full bg-white dark:!border-gray-600 text-base dark:bg-gray-800"
                        >
                          <div class="flex flex-col gap-2">
                            <button
                              class="w-full text-left text-base dark:text-gray-300 px-2 py-1.5 rounded-md hover:bg-gray-100 whitespace-nowrap dark:hover:bg-gray-700 transition-colors"
                            >
                              View User details
                            </button>
                            <button
                              class="w-full text-left text-base dark:text-gray-300 whitespace-nowrap rounded-md px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              Send Reminder
                            </button>
                            <button
                              @click="cancellingSubscription = true"
                              class="w-full text-left px-2 py-1.5 whitespace-nowrap text-base rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-600 dark:text-red-400"
                            >
                              Cancel Subscription
                            </button>
                          </div>
                        </KitUiDropdownMenuContent>
                      </KitUiDropdownMenu>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <footer
              class="flex border-t dark:border-gray-600 border-gray-300 flex-wrap justify-between py-3 px-4"
            >
              <div class="text-base">Page 1 of 30</div>
              <div>
                <UiPagination :total-pages="10" v-model="page.current" />
              </div>
            </footer> -->
          </section>
          <UtModal m-width="32rem" v-model:state="cancellingSubscription">
            <div
              class="flex flex-col p-6 bg-white rounded-2xl dark:bg-gray-700 shadow-md gap-4"
            >
              <div class="text-center">
                <h3 class="font-semibold text-lg">
                  Cancel user's subscription
                </h3>
                <p class="text-sm">
                  Lorem ipsum dolor sit amet consectetur. Id non vel interdum
                  quam facilisi augue nunc. Ac ut mauris scelerisque nisl vitae
                  massa sed tempor amet. Ultricies nunc purus enim tortor.
                </p>
              </div>

              <div>
                <label class="text-sm">
                  Why are you canceling this subscription?
                </label>
                <div>
                  <UiInputSelect
                    class="w-full"
                    placeholder="Select reason"
                    :options="[
                      {
                        label: 'I want to cancel my subscription',
                        value: 'I want to cancel my subscription',
                      },
                    ]"
                  />
                </div>
              </div>

              <footer class="flex mt-6 flex-row gap-3">
                <UiButtonDefault
                  variant="outline-primary"
                  @click="cancellingSubscription = false"
                  class="w-full text-base py-2"
                >
                  Cancel
                </UiButtonDefault>
                <UiButtonDefault
                  variant="primary"
                  class="w-full text-base py-2"
                >
                  Cancel Subscription
                </UiButtonDefault>
              </footer>
            </div>
          </UtModal>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { CardData } from "~/lib/api/types/responses";
import {
  Settings as LucideSettings,
  AlertOctagon as LucideAlertOctagon,
  Search,
  MoreVertical,
} from "lucide-vue-next";

definePageMeta({
  name: "admin.subscriptions.view",
});
onBeforeMount(() => {
  const { planId } = useRoute().params;
  const { data } = useFetch(`/api/admin/subscriptions/${planId}`);
  console.log(data.value);
});

const page = reactive({
  current: 1,
  total: 10,
});
const dateRange = ref<string>("");
const filter = ref<string>("");
const cardData = ref<CardData[]>([
  {
    title: "Generated Subscription Revenue",
    value: "$45,823",
    description: "0% Compared to last month",
  },
  {
    title: "Total Paying Users",
    value: "45,823",
    description: "0 as at last month",
  },
  {
    title: "Pending Renewals",
    value: "45,823",
    link: "View pending renewals",
  },
]);
const data = ref([
  {
    username: "Olamide Olaikan",
    email: "Ola40@gmail.com",
    billingCycle: "0$/Month",
    nextBillingDate: "05 Dec 2024",
    status: "Active",
  },
  {
    username: "Olamide Olaikan",
    email: "Ola40@gmail.com",
    billingCycle: "0$/Year",
    nextBillingDate: "05 Dec 2025",
    status: "Expired",
  },
  {
    username: "Olamide Olaikan",
    email: "Ola40@gmail.com",
    billingCycle: "0$/Month",
    nextBillingDate: "05 Dec 2024",
    status: "Due",
  },
  {
    username: "Olamide Olaikan",
    email: "Ola40@gmail.com",
    billingCycle: "0$/Month",
    nextBillingDate: "05 Dec 2024",
    status: "Due",
  },
  {
    username: "Olamide Olaikan",
    email: "Ola40@gmail.com",
    billingCycle: "0$/Month",
    nextBillingDate: "05 Dec 2024",
    status: "Due",
  },
  {
    username: "Olamide Olaikan",
    email: "Ola40@gmail.com",
    billingCycle: "0$/Year",
    nextBillingDate: "05 Dec 2025",
    status: "Canceled",
  },
  {
    username: "Olamide Olaikan",
    email: "Ola40@gmail.com",
    billingCycle: "0$/Year",
    nextBillingDate: "05 Dec 2025",
    status: "Expired",
  },
  {
    username: "Olamide Olaikan",
    email: "Ola40@gmail.com",
    billingCycle: "0$/Month",
    nextBillingDate: "05 Dec 2024",
    status: "Canceled",
  },
  {
    username: "Olamide Olaikan",
    email: "Ola40@gmail.com",
    billingCycle: "Yearly",
    nextBillingDate: "05 Dec 2025",
    status: "Active",
  },
]);

const cancellingSubscription = ref(false);
const dataCheckbox = ref<HTMLInputElement[] | null>([]);
const handleSelectAll = (e: any) => {
  dataCheckbox.value?.forEach((checkbox) => {
    checkbox.checked = e.target.checked;
  });
};

const api = useAPI();
const route = useRoute();
const { state: statsLoading, execute: getStats } = useRequestState({
  immediately: true,
  action: () =>
    api.getPlanStats({
      dateFilter: "today",
      planId: route.params.planId as string,
    }),
  onSuccess: (data) => {
    cardData.value[0].value = data.data.totalRevenue;
    cardData.value[2].value = data.data.pendingRenewals;
    cardData.value[1].value = data.data.totalPayingUsers;
  },
  onError: (error) => {
    console.log(error);
  },
});

const { state: loadingSubscribers, execute: fetchSubscribers } =
  useRequestState({
    immediately: true,
    action: () =>
      api.getSubscribers({
        planId: route.params.planId as string,
      }),
    onSuccess: (response) => {
      data.value = response.data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
</script>

<style></style>
