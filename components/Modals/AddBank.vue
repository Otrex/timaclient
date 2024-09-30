<template>
  <section class="bg-white p-8 relative rounded-2xl">
    <div class="flex flex-row justify-between items-center">
      <div>
        <h3 class="text-[1.25rem] font-semibold">Add Your Bank Details</h3>
        <p class="text-sm">
          You can add information for up to three different bank accounts.
        </p>
      </div>
      <div class="absolute top-5 right-5">
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
            :options="
              banks.map((e) => ({
                value: e,
                label: e.name,
              }))
            "
          />
          <UtSvg
            name="sunshine"
            v-if="state === constants.LOADING"
            class="spinner w-[1.5rem] h-[1.5rem]"
          />
        </div>
      </div>

      <div class="flex md:flex-row mb-4 flex-col">
        <div class="flex items-center w-full">
          <UiInputTextSecondary
            type="text"
            class="w-full"
            v-model="accountNumber"
            :loading="resolving === constants.LOADING"
            :error-message="v$.accountNumber?.$errors[0]?.$message.toString()"
            placeholder="Account Number"
          />
        </div>
      </div>

      <div class="flex md:flex-row mb-5 flex-col">
        <div class="flex items-center w-full">
          <UiInputTextSecondary
            type="text"
            class="w-full"
            v-model="accountName"
            :error-message="v$.accountName?.$errors[0]?.$message.toString()"
            placeholder="Account Name"
          />
        </div>
      </div>

      <div class="text-right">
        <UiButtonDefault
          variant="primary"
          class="py-2 px-8"
          label="Add"
          :loading="addingBank === constants.LOADING"
          @click="proceedToAddBank"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Bank } from "~/lib/interfaces/core";

const api = useAPI();
const { notify } = useNotification();
const props = defineProps<{
  accountName?: string;
  accountNumber?: string;
  bank?: string;
  v$: any;
}>();

const emit = defineEmits([
  "update:accountName",
  "update:accountNumber",
  "update:bank",
  "refresh",
  "close",
  "submit",
]);

const banks = ref<Bank[]>([]);

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
  set(value: any) {
    emit("update:bank", value);
  },
  get() {
    return props.bank ?? "";
  },
});

const { state } = useRequestState({
  immediately: true,
  action: async () => api.getBanks(),
  onSuccess(data) {
    banks.value = data.data;
  },
});

const { execute: resolveBank, state: resolving } = useRequestState({
  action: async () => {
    return api.resolveBankAccount({
      accountNumber: accountNumber.value,
      bankCode: bank.value.code,
    });
  },
  onSuccess({ data }) {
    emit("update:accountName", data.account_name);
  },
  onError(error) {
    notify({
      type: "error",
      title: "Resolution Failed",
      text: error.description,
    });
  },
});

const { state: addingBank, execute: addBank } = useRequestState({
  action: async () =>
    api.addWithdrawalBank({
      accountName: accountName.value,
      accountNumber: accountNumber.value,
      bankName: bank.value.name,
      bankCode: bank.value.code,
    }),
  onSuccess() {
    notify({
      type: "success",
      title: "Success",
      text: "Bank has been added successfully",
    });
    emit("refresh");
    emit("close");
  },
});

function proceedToAddBank() {
  if (!accountName.value || !accountNumber.value || !bank) {
    notify({
      type: "error",
      title: "Validation",
      text: "Please enter your details",
    });
    return;
  }

  addBank();
}
watch(accountNumber, () => {
  if (accountNumber.value.length === 10) {
    if (!bank.value || !accountNumber.value) {
      return;
    }
    resolveBank();
  }
});
</script>

<style scoped>
.hr {
  @apply h-[1px] border-t border-gray-300;
}
</style>
