<template>
  <NuxtLayout name="admin">
    <template #main>
      <div class="flex flex-col px-3 sm:px-8 gap-[1rem]">
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

        {{ plans }}

        <div class="mb-4">
          <div
            class="grid grid-cols-1 md:grid-cols-3 mb-4 lg:grid-cols-4 gap-4"
          >
            <template v-for="(item, idx) in cardData" :key="idx">
              <UiSubscriptionCard v-bind="item" />
            </template>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <template v-for="(item, idx) in plansCard" :key="idx">
              <UiSubscriptionCard v-bind="item" />
            </template>
          </div>
        </div>

        <div class="admin-table">
          <section
            class="border dark:border-gray-600 border-gray-300 rounded-2xl"
          >
            <header class="flex justify-between py-3.5 px-4 items-center gap-3">
              <h3>Plan Management</h3>
              <button
                @click="isAddingPlan = true"
                class="bg-blue-600 text-base hover:bg-blue-700 text-white px-5 py-1.5 rounded-3xl flex items-center gap-2"
              >
                <Plus class="size-5" />
                Create New Plan
              </button>
            </header>
            <table class="w-full">
              <thead class="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th>Plan</th>
                  <th>Pricing</th>
                  <th>Generated revenue</th>
                  <th>activation Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(plan, index) in plans" :key="index">
                  <td class="font-semibold">{{ plan.plan }}</td>
                  <td>
                    {{ plan?.pricing?.monthly }}, {{ plan?.pricing?.yearly }}
                  </td>
                  <td>{{ plan.generatedRevenue }}</td>
                  <td>
                    <div
                      class="flex items-center flex-row gap-1.5"
                      :class="[
                        plan?.activationStatus?.toLocaleLowerCase() ===
                          'successful' && 'text-green-700',
                        plan?.activationStatus?.toLocaleLowerCase() ===
                          'pending' && 'text-yellow-500',
                      ]"
                    >
                      <Dot /> {{ plan.activationStatus }}
                    </div>
                  </td>

                  <td>
                    <div class="flex flex-row gap-4">
                      <div>
                        <button
                          type="button"
                          aria-label="Settings"
                          @click="
                            () =>
                              navigateTo({
                                name: 'admin.subscriptions.view',
                                params: { planId: plan.id },
                              })
                          "
                          class="inline-flex dark:text-gray-400 items-center text-sm gap-3 justify-center rounded-full border border-gray-300 p-2 pr-4 text-gray-600 transition-colors hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                        >
                          <Settings class="size-5" /> Change Plan Settings
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          aria-label="Menu"
                          class="inline-flex dark:text-gray-400 items-center justify-center rounded-full border border-gray-300 p-2 text-gray-600 transition-colors hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                        >
                          <MoreVertical class="size-5" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
      <UtModal m-width="41rem" v-model:state="isAddingPlan">
        <div class="bg-white shadow-lg rounded-2xl p-6">
          <header class="pb-4 border-b mb-4">
            <h2 class="font-semibold">Add new Plan</h2>
            <p class="text-sm">Enter the details of your new plan</p>
          </header>

          <section class="flex flex-col gap-3 mb-12">
            <div>
              <UiInputText
                v-model="form.planName"
                placeholder="Enter plan name"
              />
            </div>
            <div>
              <label class="text-sm font-semibold">Plan features</label>
              <div class="flex flex-col gap-2">
                <UiInputText
                  v-model="form.features[0]"
                  placeholder="Enter plan feature"
                />
                <template v-for="(item, idx) in form.features" :key="idx">
                  <UiInputText
                    v-if="idx > 0"
                    v-model="form.features[idx]"
                    placeholder="Enter plan feature"
                  />
                </template>
              </div>
              <div class="flex justify-end px-5">
                <button
                  type="button"
                  @click="form.features.push('')"
                  class="inline-flex items-center py-1 text-sm gap-1 font-semibold text-blue-600 bg-transparent border-none hover:text-blue-700 hover:underline active:text-blue-800 focus:outline-none transition-colors"
                >
                  <Plus class="size-4" :stroke-width="3" /> Add more
                </button>
              </div>
            </div>
            <div>
              <label class="text-sm font-semibold">Plan pricing</label>
              <UiInputText placeholder="Enter plan pricing" />
            </div>
          </section>

          <footer class="flex flex-row gap-3">
            <UiButtonDefault
              variant="outline-primary"
              class="w-full text-base py-2"
            >
              Cancel
            </UiButtonDefault>
            <UiButtonDefault
              variant="primary"
              @click="() => savePlans()"
              :loading="planing"
              class="w-full text-base py-2"
            >
              Create new plan
            </UiButtonDefault>
          </footer>

          <UtModal m-width="28rem" v-model:state="isSuccessful">
            <div
              class="bg-white p-6 relative shadow-md rounded-2xl text-center"
            >
              <button
                class="absolute top-5 right-5"
                @click="
                  () => {
                    isSuccessful = false;
                    tools.sttout(() => {
                      isAddingPlan = false;
                    }, 500);
                  }
                "
              >
                <X class="size-5" />
              </button>
              <div class="inline-flex">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M85.5002 10.0001H64.5002C49.0852 10.0001 41.8502 15.4701 40.3502 28.6951C40.0302 31.4601 42.3252 33.7501 45.1102 33.7501H55.5002C76.5002 33.7501 86.2502 43.5001 86.2502 64.5001V74.8901C86.2502 77.6751 88.5352 79.9651 91.3002 79.6501C104.535 78.1501 110 70.9151 110 55.5001V34.5001C110 17.0001 103 10.0001 85.5002 10.0001Z"
                    fill="#2DBA62"
                  />
                  <path
                    d="M55.5 40.0001H34.5C17 40.0001 10 47.0001 10 64.5001V85.5001C10 103 17 110 34.5 110H55.5C73 110 80 103 80 85.5001V64.5001C80 47.0001 73 40.0001 55.5 40.0001ZM61.45 68.2501L42.9 86.8001C42.5665 87.1364 42.1691 87.4025 41.7311 87.5829C41.2932 87.7632 40.8236 87.8541 40.35 87.8501C39.8764 87.8541 39.4068 87.7632 38.9689 87.5829C38.5309 87.4025 38.1335 87.1364 37.8 86.8001L28.5 77.5001C28.1671 77.1693 27.9029 76.7758 27.7227 76.3425C27.5424 75.9092 27.4496 75.4445 27.4496 74.9751C27.4496 74.5058 27.5424 74.0411 27.7227 73.6077C27.9029 73.1744 28.1671 72.781 28.5 72.4501C29.9 71.0501 32.15 71.0501 33.55 72.4501L40.3 79.2001L56.35 63.1501C57.75 61.7501 60 61.7501 61.4 63.1501C62.8 64.5501 62.85 66.8501 61.45 68.2501Z"
                    fill="#2DBA62"
                  />
                </svg>
              </div>
              <h3 class="font-semibold">
                A new subscription plan has been created
              </h3>
              <p class="text-sm">
                This plan will appear on the user's end as soon as it is
                published by the admin
              </p>
            </div>
          </UtModal>
        </div>
      </UtModal>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { Plus, MoreVertical, Settings, Dot, X } from "lucide-vue-next";
import type { CardData } from "~/lib/api/types/responses";

definePageMeta({
  name: "admin.subscriptions.index",
});

const dateRange = ref<string>("");
const isAddingPlan = ref(false);
const isSuccessful = ref(false);
const features = ref<string[]>([]);

const cardData: CardData[] = [
  {
    title: "Generated Subscription Revenue",
    value: "$45,823",
    description: "10% Compared to last month",
  },
  {
    title: "Total Paying Users",
    value: "45,823",
    description: "45,823 as at last month",
  },
  {
    title: "Pending Renewals",
    value: "45,823",
    link: "View pending renewals",
  },
  {
    title: "Free Tier Users",
    value: "45,823",
    description: "10% Compared to last month",
  },
];

const plansCard: CardData[] = [
  {
    title: "Premium Plan Users",
    value: "45,823",
    link: "View more details",
  },
  {
    title: "Pro Plan User",
    value: "45,823",
    link: "View more details",
  },
  {
    title: "Basic Plan Users",
    value: "45,823",
    link: "View more details",
  },
];

const plans = ref([
  // {
  //   id: 1,
  //   plan: "Free Plan",
  //   pricing: {
  //     monthly: "$0/Month",
  //     yearly: "$0/Year",
  //   },
  //   generatedRevenue: "$0.00",
  //   activationStatus: "Successful",
  // },
  // {
  //   id: 2,
  //   plan: "Basic Plan",
  //   pricing: {
  //     monthly: "$0/Month",
  //     yearly: "$0/Year",
  //   },
  //   generatedRevenue: "$0.00",
  //   activationStatus: "Pending",
  // },
  // {
  //   id: 3,
  //   plan: "Pro Plan",
  //   pricing: {
  //     monthly: "$0/Month",
  //     yearly: "$0/Year",
  //   },
  //   generatedRevenue: "$0.00",
  //   activationStatus: "Pending",
  // },
  // {
  //   id: 4,
  //   plan: "Premium Plan",
  //   pricing: {
  //     monthly: "$0/Month",
  //     yearly: "$0/Year",
  //   },
  //   generatedRevenue: "$0.00",
  //   activationStatus: "Successful",
  // },
]);

const form = reactive({
  planName: "",
  price: 0,
  features: [] as string[],
  duration: 1,
  durationType: "month",
});

const api = useAPI();
const { state: fetching, execute: getPlans } = useRequestState({
  immediately: true,
  action: () => api.fetchAdminPlans(),
  onSuccess: (data) => {
    console.log(data);

    plans.value = data.data;
  },
  onError: (error) => {
    console.log(error);
  },
});

const { state: planing, execute: savePlans } = useRequestState({
  immediately: false,
  action: () =>
    api.saveAdminPlan({
      planName: form.planName,
      features: form.features,
      defaultPrice: {
        monthlyPrice: form.price,
        yearlyPrice: form.price * 12,
        currency: "USD",
      },
      locationEnabled: false,
      locationBasedPricing: {},
    }),
  onSuccess: (data) => {
    console.log(data);

    plans.value = data.data;
  },
  onError: (error) => {
    console.log(error);
  },
});
</script>
