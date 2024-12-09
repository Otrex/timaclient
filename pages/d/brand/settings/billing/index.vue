<template>
  <div class="pt-[3.4375rem]">
    <div class="mb-5 text-lg">
      <p>Streamlining Payments and Invoices for Your Business Success</p>
    </div>
    <div class="flex flex-row justify-between">
      <div class="flex items-center mb-5">
        <label for="country" class="mr-2">Select Country:</label>
        <select
          v-model="selectedCountry"
          id="country"
          class="py-2 min-w-[11.25rem] px-4 rounded-[1.875rem] border border-[#2BA2FD]"
        >
          <option value="Nigeria">Nigeria</option>
          <!-- Add more countries as needed -->
        </select>
      </div>

      <div class="flex items-center justify-center mb-5">
        <label for="billingType">Monthly</label>
        <UiInputSwitch class="mx-4" />
        <label for="billingType"
          >Yearly
          <span class="text-[#74C2FF] text-base">(Save up to 24%)</span></label
        >
      </div>
    </div>

    <div class="flex justify-around gap-5">
      <div
        v-for="plan in plans"
        :key="plan.name"
        :class="[
          'bg-[#F7FCFF] rounded-[1.25rem] p-5 border border-[#2AA2FF] flex-1',
          plan.name.toLowerCase(),
        ]"
      >
        <h3
          class="text-blue-800 font-semibold mb-3 mt-4 text-center text-[1.5rem]"
        >
          {{ plan.name }}
        </h3>
        <p class="text-base">{{ plan.description }}</p>
        <h2 class="text-lg my-3">
          {{ isYearly ? plan.yearlyPrice : plan.monthlyPrice }}/{{
            isYearly ? "Year" : "Month"
          }}
        </h2>
        <ul class="flex flex-col gap-3">
          <li
            v-for="feature in plan.features"
            :key="feature"
            class="flex items-center gap-3"
          >
            <UtSvg name="bluecheck" dim w="1.5rem" h="1.5rem" /> {{ feature }}
          </li>
        </ul>
        <div class="my-3">
          <button
            @click="purchasePlan(plan.name)"
            class="bg-[#74C2FF] w-full text-base hover:bg-blue-500 rounded-[1.875rem] text-white px-5 py-2 mt-5"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
    <UtModal
      m-width="75rem"
      v-model:state="showPayment"
      content-class="mx-auto mt-[10%]"
      backdrop-color="rgba(0,0,0,.4)"
    >
      <ModalsPaymentCheckout @close="showPayment = false" />
    </UtModal>
  </div>
</template>

<script setup lang="ts">
const isEditable = inject<boolean>("isEditable");

definePageMeta({
  name: "BrandSettingBillingSubscription",
});

const showPayment = ref(false);
const optionsStore = useOptionsStore();
const { notify } = useNotification();

interface Plan {
  name: string;
  description: string;
  yearlyPrice: string;
  monthlyPrice: string;
  features: string[];
}

const selectedCountry = ref<string>("Nigeria");
const isYearly = ref<boolean>(true);
const plans = ref<Plan[]>([
  {
    name: "Basic",
    description:
      "Our Basic Plan offers features for small teams to manage their needs effectively at an affordable price.",
    yearlyPrice: "$1250",
    monthlyPrice: "$150",
    features: [
      "Access to core features",
      "Access to core features",
      "Access to core features",
      "Access to core features",
      "Access to core features",
    ],
  },
  {
    name: "Advanced",
    description:
      "Our Advanced Plan offers features for growing teams with additional tools for effectiveness.",
    yearlyPrice: "$1500",
    monthlyPrice: "$180",
    features: [
      "Access to core features",
      "Access to core features",
      "Access to core features",
      "Access to core features",
      "Access to core features",
    ],
  },
  {
    name: "Premium",
    description:
      "Our Premium Plan offers comprehensive features for larger teams that need robust tools.",
    yearlyPrice: "$2000",
    monthlyPrice: "$240",
    features: [
      "Access to core features",
      "Access to core features",
      "Access to core features",
      "Access to core features",
      "Access to core features",
    ],
  },
]);

const purchasePlan = (planName: string): void => {
  showPayment.value = true;
};
</script>
