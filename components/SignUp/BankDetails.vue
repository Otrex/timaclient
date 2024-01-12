<template>
  <div class="tm__box-598px">
    <div class="mb-[3.75rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Bank Details</h1>
      <p>Provide bank details.</p>
    </div>

    <div class="flex flex-col gap-[1rem]">
      <UiInputText
        class="w-full"
        v-model="currency"
        disabled
        placeholder="Select currency"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.accountName"
        :error-message="v$.accountName?.$errors[0]?.$message.toString()"
        placeholder="Account name"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.accountNumber"
        :error-message="v$.accountNumber?.$errors[0]?.$message.toString()"
        placeholder="Account number"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.bankName"
        :error-message="v$.bankName?.$errors[0]?.$message.toString()"
        placeholder="Bank name"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.bankAddress"
        :error-message="v$.bankAddress?.$errors[0]?.$message.toString()"
        placeholder="Bank address"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.bankCode"
        :error-message="v$.bankCode?.$errors[0]?.$message.toString()"
        placeholder="Bank code"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.swiftCode"
        :error-message="v$.swiftCode?.$errors[0]?.$message.toString()"
        placeholder="Swift Code"
      />

      <UiButtonDefault
        :disabled="state === constants.LOADING"
        :loading="state === constants.LOADING"
        label="Continue"
        variant="primary"
        class="w-full mt-[3.25rem] py-[0.875rem] mb-[1.875rem]"
        @click="proceed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CREATE_BANK_DETAILS_RULE } from "~/lib/validation/rules";

const authStore = useAuthStore();
const { notify } = useNotification();
const optionsStore = useOptionsStore();

const form = reactive({
  accountNumber: "",
  accountName: "",
  bankAddress: "",
  bankCode: "",
  swiftCode: "",
  bankName: "",
});

const currency = computed(() =>
  optionsStore.$getCurrency(authStore.registration.country || "")
);

const { execute, validate, state, v$ } = useRequestState({
  action: () =>
    authStore.updateInfluencerBankDetails({
      ...form,
      currency: currency.value!,
    }),
  validation: {
    config: { $autoDirty: true },
    rule: CREATE_BANK_DETAILS_RULE,
    form,
  },
  onError(e) {
    notify({
      type: "error",
      title: e.title,
      text: e.description,
    });
  },
  onSuccess() {
    navigateTo({
      query: {
        tab: constants.CONTENT_CATEGORY,
      },
    });
  },
});

function proceed() {
  validate().then(() => execute());
}
</script>

<style></style>
