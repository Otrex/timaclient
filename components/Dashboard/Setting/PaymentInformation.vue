import type { UiInputSelect } from '#build/components';
<template>
  <div class="pt-[3.4375rem]">
    <div class="flex flex-col gap-[1.5rem]">
      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Payment Method</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputSelect
            class="w-full"
            :options="tools.generationOptions(['Flutterwave', 'Paystack'])"
          />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Credit Card Number</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText class="w-full" />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Expiration Date</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText class="w-full" />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">CVV</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText class="w-full" />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">&nbsp;</div>
        <div class="flex items-center w-full">
          <div class="mb-[1.875rem] mt-[7.625rem] w-full">
            <UiButtonDefault
              label="Save Changes"
              variant="primary"
              class="w-full py-[0.875rem]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ isEditable?: boolean }>();

const profileStore = useProfileStore();
const { notify } = useNotification();
</script>

<style></style>
