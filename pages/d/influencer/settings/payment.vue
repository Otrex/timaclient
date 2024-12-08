<template>
  <div class="flex flex-col">
    <div class="text-right mb-5">
      <UiButtonDefault
        variant="primary"
        class="py-2 text-sm mr-3 px-5"
        label="+ Add Bank"
      />
      <UiButtonDefault
        variant="primary"
        class="py-2 text-sm px-5"
        label="Change PIN"
      />
    </div>
    <div class="flex flex-col gap-[1.5rem] max-w-[65.875rem]">
      <div class="flex md:flex-row items-center flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Payment Method</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputSelect
            :options="tools.generationOptions(optionsStore.$paymentMethods)"
            class="w-full"
            placeholder="Select payment method"
          />
        </div>
      </div>

      <div class="flex md:flex-row items-center flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium block">Payment Bank</label>
          <small class="transform -mt-1 block text-xs">
            This covers the account you'd like to recieve payment from
          </small>
        </div>
        <div class="flex items-center w-full">
          <UiInputSelect
            :options="tools.generationOptions(optionsStore.$paymentMethods)"
            class="w-full"
            placeholder="Select Bank"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "InfluencerSettingPayment",
});

const optionsStore = useOptionsStore();
</script>

<style></style>
