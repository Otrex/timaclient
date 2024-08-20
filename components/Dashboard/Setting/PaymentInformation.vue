<template>
  <section>
    <div class="text-right">
      <UiButtonIconed
        leftIcon="add"
        variant="primary"
        class="py-2 !rounded-2xl !px-4"
        label="Add Account"
        @click="showAddBank = true"
      />
    </div>
    <div class="pt-[3.4375rem] max-w-[65.875rem]">
      <div class="flex flex-col gap-[1.5rem]">
        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Payment Method</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputSelect :options="methods" class="w-full" />
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Bank Details</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputSelect :options="methods" class="w-full" />
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

        <!-- <div class="flex md:flex-row flex-col">
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
        </div> -->
      </div>
    </div>
    <UtModal
      v-model:state="showAddBank"
      m-width="50.25rem"
      content-class="mx-auto md:!mt-auto"
      backdrop-color="rgba(0,0,0,.05)"
    >
      <ModalsAddBank
        @close="showAddBank = false"
        :isEditable="isEditable"
        :v$="v$"
        v-model:bank="form.bankName"
        v-model:accountName="form.accountName"
        v-model:accountNumber="form.accountNumber"
      />
    </UtModal>
  </section>
</template>

<script setup lang="ts">
import { PaymentMethod } from "~/lib/enums";
import { CREATE_BANK_DETAILS_RULE } from "~/lib/validation/rules";
const props = defineProps<{ isEditable?: boolean }>();

const profileStore = useProfileStore();
const { notify } = useNotification();
const showAddBank = ref(false);

const methods = Object.values(PaymentMethod).map((m) => ({
  label: tools.capitalize(m),
  value: m,
}));

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
