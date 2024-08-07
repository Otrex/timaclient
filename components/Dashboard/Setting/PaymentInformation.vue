<template>
  <div class="pt-[3.4375rem] max-w-[65.875rem]">
    <div class="flex flex-col gap-[1.5rem]">
      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Account Name</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText
            :disabled="!props.isEditable"
            type="text"
            class="w-full"
            v-model="form.accountName"
            :error-message="v$.accountName?.$errors[0]?.$message.toString()"
            placeholder="Account name"
          />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Account Number</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText
            type="text"
            class="w-full"
            v-model="form.accountNumber"
            :disabled="!props.isEditable"
            :error-message="v$.accountNumber?.$errors[0]?.$message.toString()"
            placeholder="Account number"
          />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Bank Name</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText
            type="text"
            class="w-full"
            v-model="form.bankName"
            :disabled="!props.isEditable"
            :error-message="v$.bankName?.$errors[0]?.$message.toString()"
            placeholder="Bank name"
          />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Bank Address</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText
            type="text"
            class="w-full"
            v-model="form.bankAddress"
            :disabled="!props.isEditable"
            :error-message="v$.bankAddress?.$errors[0]?.$message.toString()"
            placeholder="Bank address"
          />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Bank Code</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText
            type="text"
            class="w-full"
            v-model="form.bankCode"
            :disabled="!props.isEditable"
            :error-message="v$.bankCode?.$errors[0]?.$message.toString()"
            placeholder="Bank code"
          />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Swift Code</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText
            type="text"
            class="w-full"
            v-model="form.swiftCode"
            :disabled="!props.isEditable"
            :error-message="v$.swiftCode?.$errors[0]?.$message.toString()"
            placeholder="Swift Code"
          />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">&nbsp;</div>
        <div class="flex items-center w-full">
          <div class="mb-[1.875rem] mt-[7.625rem] w-full">
            <transition>
              <UiButtonDefault
                v-show="props.isEditable"
                @click="() => validate().then(() => execute())"
                :disabled="state === constants.LOADING"
                :loading="state === constants.LOADING"
                label="Save Changes"
                variant="primary"
                class="w-full py-[0.875rem]"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CREATE_BANK_DETAILS_RULE } from "~/lib/validation/rules";
const props = defineProps<{ isEditable?: boolean }>();

const profileStore = useProfileStore();
const { notify } = useNotification();

const form = useWatchedForm({
  monitor: profileStore.bankDetails,
  fields: {
    bankCode: "",
    swiftCode: "",
    bankName: "",
    bankAddress: "",
    accountNumber: "",
    accountName: "",
    currency: "",
  },
});

const { execute, validate, state, v$ } = useRequestState({
  action: () => profileStore.updateBankInformation(form),
  validation: {
    config: { $autoDirty: true },
    rule: tools.optionizeRule(CREATE_BANK_DETAILS_RULE),
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
    notify({
      type: "success",
      title: "Update Successful",
      text: "Your payment information has been updated",
    });
  },
});

function proceed() {
  validate().then(() => execute());
}
</script>

<style></style>
