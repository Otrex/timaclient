<template>
  <div class="bg-white rounded-[0.5rem] p-5 flex flex-row">
    <div>
      <h3>Payment Method</h3>

      <div class="flex flex-row gap-[1rem]">
        <UiInputOption
          type="single"
          name="paymentMethod"
          v-model="opt"
          value="credit-debit"
          main-class="border py-10 px-6 rounded-[1rem] border-[#2BA2FD]/10"
          active-class="bg-[#E4F4FE] border border-[#2BA2FD]"
        >
          Credit Or Debit Card
        </UiInputOption>
        <UiInputOption
          type="single"
          name="paymentMethod"
          v-model="opt"
          value="paystack"
          main-class="border py-10 px-6 rounded-[1rem] border-[#2BA2FD]/10"
          active-class="bg-[#E4F4FE] border border-[#2BA2FD]"
        >
          Paystack
        </UiInputOption>
        <UiInputOption
          type="single"
          name="paymentMethod"
          v-model="opt"
          value="stripe"
          main-class="border py-10 px-6 rounded-[1rem] border-[#2BA2FD]/10"
          active-class="bg-[#E4F4FE] border border-[#2BA2FD]"
        >
          Stripe
        </UiInputOption>
      </div>
    </div>
    <div class="bg-[#F9F9F9]"></div>
  </div>
</template>

<script lang="ts" setup>
const opt = ref("paystack");
</script>

<style></style>
