<template>
  <div
    class="bg-white dark:text-black rounded-[0.5rem] w-full flex flex-col sm:flex-row items-stretch"
  >
    <div class="p-7 sm:w-auto w-full">
      <h3 class="mb-3 text-xl font-bold">Payment Method</h3>

      <div class="flex flex-col justify-between gap-[1rem]">
        <UiInputOption
          type="single"
          name="paymentMethod"
          v-model="opt"
          value="credit-debit"
          main-class="border w-full sm:!w-[158px] bg-white py-[33px] px-6 !h-full text-center font-bold !rounded-[1rem] border-[#2BA2FD]/10"
          active-class="!bg-[#E4F4FE] border border-[#2BA2FD]"
        >
          Credit Or Debit Card
        </UiInputOption>
        <UiInputOption
          type="single"
          name="paymentMethod"
          v-model="opt"
          value="PAYSTACK"
          main-class="border py-10 bg-white px-6 w-full sm:!w-[158px] flex items-center !rounded-[1rem] border-[#2BA2FD]/10"
          active-class="!bg-[#E4F4FE] border border-[#2BA2FD]"
        >
          <UtSvg name="paystack" class="w-[130px] h-[44px] mx-auto" />
        </UiInputOption>
        <UiInputOption
          type="single"
          name="paymentMethod"
          v-model="opt"
          value="STRIPE"
          main-class="border text-center bg-white w-full sm:!w-[158px] flex !items-center py-10 px-6 h-full !rounded-[1rem] border-[#2BA2FD]/10"
          active-class="!bg-[#E4F4FE] border border-[#2BA2FD]"
        >
          <UtSvg name="stripe" class="w-[70px] h-[30px] my-[7px] mx-auto" />
        </UiInputOption>
      </div>
      <!-- <div class="mt-8">
        <div>
          <label
            for="cardHolderName"
            class="block mb-2 font-medium text-base text-gray-600"
            >Card Holder Name</label
          >
          <UiInputText
            id="cardHolderName"
            v-model="form.cardHolderName"
            placeholder="Card Holder Name"
            class="mb-4"
          />
        </div>
        <div>
          <label
            for="creditCardNumber"
            class="block mb-2 font-medium text-base text-gray-600"
            >Credit Card Number</label
          >
          <UiInputText
            id="creditCardNumber"
            v-model="form.creditCardNumber"
            placeholder="Credit Card Number"
            class="mb-4"
          />
        </div>
        <div class="flex flex-col gap-4">
          <div class="w-full">
            <label
              for="cvv"
              class="block mb-2 font-medium text-base text-gray-600"
              >CVV</label
            >
            <UiInputText id="cvv" v-model="form.cvv" placeholder="CVV" />
          </div>
          <div class="w-full">
            <label
              for="expiryDate"
              class="block mb-2 font-medium text-base text-gray-600"
              >Expiry Date</label
            >
            <UiInputText
              id="expiryDate"
              v-model="form.expiryDate"
              placeholder="Expiry Date (MM/YY)"
              class="mb-4"
            />
          </div>
        </div>
      </div> -->
    </div>
    <div class="bg-[#F9F9F9] p-7 rounded-[0.5rem] w-full">
      <div>
        <div class="flex flex-row items-center justify-between">
          <h3 class="mb-3 text-xl font-bold">Order Summary</h3>
          <select
            v-model="selectedCountry"
            id="country"
            class="py-2 min-w-[11.25rem] px-4 rounded-[1.875rem] border border-[#2BA2FD]"
          >
            <option>-- Select --</option>
            <option
              v-for="(p, idx) in props.plan.countries"
              :key="idx"
              :value="p"
            >
              {{ p }}
            </option>
            <!-- Add more countries as needed -->
          </select>
        </div>
        <div>
          <span class="text-sm">1 item</span>
        </div>
        <hr class="my-3" />
      </div>
      <div>
        <div class="flex mb-2 flex-row items-center justify-between">
          <h3 class="text-xl font-bold">Basic Plan</h3>
          <p class="text-base text-[#545454]">
            {{ plan.currency }}
            {{ plan && isYearly ? plan?.yearlyPrice : plan?.monthlyPrice }}
          </p>
        </div>
        <div>
          <span class="text-base text-[#545454]">Annual Subscription</span>
        </div>
        <hr class="my-3" />
      </div>
      <div>
        <div class="flex mb-2 flex-row items-center justify-between">
          <span class="text-base text-[#545454]">Estimated Tax</span>
          <span class="text-base text-[#545454]"> {{ plan.currency }} 0</span>
        </div>
        <div class="flex flex-row items-center justify-between">
          <h3 class="text-xl font-bold">Total</h3>
          <h3 class="text-xl font-bold">
            {{ plan.currency }}
            {{ plan && isYearly ? plan?.yearlyPrice : plan?.monthlyPrice }}
          </h3>
        </div>
        <hr class="my-3" />
      </div>
      <div>
        <div class="flex mb-2 flex-row items-center justify-between">
          <h3 class="text-xl font-bold">Total Billed Annually</h3>
          <span class="text-base text-[#545454]">
            {{ plan.currency }}
            {{ plan && isYearly ? plan?.yearlyPrice : plan?.monthlyPrice }}
          </span>
        </div>
        <div class="flex mb-8 flex-row items-center justify-between">
          <span class="text-base text-[#545454]"
            >Next charge date Aug 21, 2025</span
          >
          <span class="text-base text-[#545454]"></span>
        </div>
        <p class="text-base text-[#545454]">
          Your purchase may be subject to local taxes based on the billing
          information you provide. The final charge may be different than the
          amount shown here and will be displayed on your invoice.
        </p>

        <hr class="my-3" />
      </div>
      <div class="flex flex-row items-center mb-10 justify-between">
        <h3 class="text-xl font-bold">Total</h3>
        <h3 class="text-xl font-bold">
          {{ plan.currency }}
          {{ plan && isYearly ? plan?.yearlyPrice : plan?.monthlyPrice }}
        </h3>
      </div>
      <div>
        <UiButtonDefault
          @click="fundWallet"
          variant="primary"
          class="w-full py-3"
        >
          Place Order
        </UiButtonDefault>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IPlan } from "~/lib/interfaces/core";

const opt = ref("paystack");

const props = defineProps<{
  plan: IPlan | boolean;
  country: string;
  isYearly?: boolean;
}>();

const emit = defineEmits(["update:country"]);

const selectedCountry = computed({
  get: function () {
    return props.country;
  },
  set: function (value) {
    emit("update:country", value);
  },
});

const form = reactive({
  cardHolderName: "",
  creditCardNumber: "",
  cvv: "",
  expiryDate: "",
});

const api = useAPI();

const {} = useRequestState({
  action: async () => {
    return api.fundWallet({
      amount:
        props.plan && props.isYearly
          ? props.plan?.yearlyPrice
          : props.plan?.monthlyPrice,
      paymentMethod: opt.value as any,
    });
  },
});
</script>

<style></style>
