<template>
  <div class="mt-8">
    <div class="flex items-center justify-between">
      <h4 class="font-bold">Select a Payment Method</h4>
      <UiButtonDefault variant="primary" @click="triggerSetPin" />
    </div>

    <div class="max-w-[666px] mx-auto">
      <button
        class="border flex mb-4 w-full rounded-lg px-4 py-3 border-[#2BA2FD]/20"
      >
        <div class="flex items-center w-full justify-between">
          <span>Paystack</span>
          <UtSvg name="paystack" dim w="7.75rem" h="2.75rem" />
        </div>
      </button>
      <button
        class="border flex w-full rounded-lg px-4 py-3 border-[#2BA2FD]/20"
      >
        <div class="flex items-center my-[7px] w-full justify-between">
          <span>Stripe</span>
          <UtSvg name="stripe" dim w="4.375rem" h="1.875rem" />
        </div>
      </button>
      <UiButtonDefault
        variant="primary"
        v-show="isEditable"
        class="w-full mt-10 py-3"
      >
        Proceed
      </UiButtonDefault>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UiButtonDefault } from "#build/components";

const isEditable = inject<boolean>("isEditable");
definePageMeta({
  name: "BrandSettingBillingPayment",
});

const triggerSetPin = () => {
  window.dispatchEvent(new Event("show:pinadding"));
};
</script>

<style></style>
