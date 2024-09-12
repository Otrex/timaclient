<template>
  <section class="bg-white p-8 rounded-2xl">
    <div class="flex flex-row justify-between items-center">
      <div>
        <h3 class="text-[1.25rem] font-semibold">Add Your Bank Details</h3>
        <p class="text-sm">
          You can add information for up to three different bank accounts.
        </p>
      </div>
      <div>
        <UtSvg name="close" dim w="1.2rem" h="1.2rem" @click="emit('close')" />
      </div>
    </div>

    <div class="hr my-3 mb-4" />

    <div class="mb-10">
      <h1 class="text-[#333333] text-xl my-4">Payment Method</h1>

      <div class="grid grid-cols-3 gap-4">
        <!-- Card 1 -->
        <label class="cursor-pointer h-full">
          <input type="radio" name="card" class="sr-only peer" />
          <div
            class="h-full flex items-center justify-left border rounded-lg p-4 transition-transform transform peer-checked:scale-105 peer-checked:border-[#2BA2FD] peer-checked:bg-[#E4F4FE]"
          >
            <div class="flex gap-2 items-center">
              <UtSvg
                name="bank-transfer"
                class="text-[#05091C] dark:text-white w-[1.5rem] h-[1.5rem]"
              />
              <div>
                <p class="font-semibold text-[#333333]">Bank Transfer</p>
                <p class="text-[#545454] text-xs">
                  (Only available in Nigeria)
                </p>
              </div>
            </div>
          </div>
        </label>

        <!-- Card 2 -->
        <label class="cursor-pointer h-full">
          <input type="radio" name="card" class="sr-only peer" />
          <div
            class="h-full flex items-center justify-center border rounded-lg p-4 transition-transform transform peer-checked:scale-105 peer-checked:border-[#2BA2FD] peer-checked:bg-[#E4F4FE]"
          >
            <div class="flex flex-col items-center">
              <UtSvg
                name="paystack"
                class="text-[#05091C] dark:text-white w-[111px] h-[30px]"
              />
              <p class="text-[#545454] text-xs">(Only available in Nigeria)</p>
            </div>
          </div>
        </label>

        <!-- Card 3 -->
        <label class="cursor-pointer h-full">
          <input type="radio" name="card" class="sr-only peer" />
          <div
            class="h-full flex items-center justify-center border rounded-lg p-4 transition-transform transform peer-checked:scale-105 peer-checked:border-[#2BA2FD] peer-checked:bg-[#E4F4FE]"
          >
            <div class="flex flex-col items-center">
              <UtSvg
                name="stripe"
                class="text-[#05091C] dark:text-white w-[66px] h-[40px]"
              />
            </div>
          </div>
        </label>
      </div>
    </div>

    <div>
      <div class="flex md:flex-row flex-col">
        <div class="flex items-center mb-4 w-full">
          <!-- <UiInputText type="text" class="w-full" v-model="bank" :disabled="!props.isEditable"
            :error-message="v$.bank?.$errors[0]?.$message.toString()" placeholder="Select Bank" /> -->
          <UiInputSelectSecondary
            placeholder="Select Bank"
            class="w-full"
            v-model="bank"
            :error-message="v$.bank?.$errors[0]?.$message.toString()"
            :options="banksMethods"
          />
        </div>
      </div>

      <div class="flex md:flex-row mb-4 flex-col">
        <div class="flex items-center w-full">
          <UiInputTextSecondary
            :disabled="!props.isEditable"
            type="text"
            class="w-full"
            v-model="accountName"
            :error-message="v$.accountName?.$errors[0]?.$message.toString()"
            placeholder="Account Name"
          />
        </div>
      </div>

      <div class="flex md:flex-row mb-5 flex-col">
        <div class="flex items-center w-full">
          <UiInputTextSecondary
            type="text"
            class="w-full"
            v-model="accountNumber"
            :disabled="!props.isEditable"
            :error-message="v$.accountNumber?.$errors[0]?.$message.toString()"
            placeholder="Account Number"
          />
        </div>
      </div>

      <div class="text-right">
        <UiButtonDefault
          variant="primary"
          class="py-2 px-8"
          label="Add"
          @click="emit('submit')"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PaymentMethod } from "~/lib/enums";

const props = defineProps<{
  isEditable?: boolean;
  accountName?: string;
  accountNumber?: string;
  bank?: string;
  v$: any;
}>();

const emit = defineEmits([
  "update:accountName",
  "update:accountNumber",
  "update:bank",
  "close",
  "submit",
]);

const accountName = computed({
  set(value: string) {
    emit("update:accountName", value);
  },
  get() {
    return props.accountName ?? "";
  },
});

const accountNumber = computed({
  set(value: string) {
    emit("update:accountNumber", value);
  },
  get(): string {
    return props.accountNumber ?? "";
  },
});

const bank = computed({
  set(value: string) {
    emit("update:bank", value);
  },
  get() {
    return props.bank ?? "";
  },
});

/* banks method */
const banksMethods = Object.values(PaymentMethod).map((m) => ({
  label: tools.capitalize(m),
  value: m,
}));
</script>

<style scoped>
.hr {
  @apply h-[1px] border-t border-gray-300;
}
</style>
