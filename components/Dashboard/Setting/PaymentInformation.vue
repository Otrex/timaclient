<template>
  <section>
    <div class="text-right">
      <UiButtonIconed leftIcon="add" variant="primary" class="py-2 !rounded-2xl !px-4" label="Add Account"
        @click="showAddBank = true" />
    </div>
    <div class="pt-[3.4375rem] max-w-[65.875rem]">
      <div class="flex flex-col gap-[1.5rem]">
        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Payment Method</label>
          </div>
          <div class="flex items-center w-full">
            <!-- <UiInputSelect :options="methods" class="w-full" /> -->

            <div class="relative w-full">
              <div class="tima-select-default" @click="selectPaymentModal = !selectPaymentModal">
                <div>
                  <p>Select payment method</p>
                </div>

                <div class="ml-2">
                  <UtSvg name="chevron-down" dim w="24px" h="24px" />
                </div>
              </div>

              <transition mode="out-in">
                <div ref="paymentModalRef" v-if="selectPaymentModal"
                  class="bg-white z-10 absolute top-5 right-0 max-w-[336px] w-full flex flex-col gap-2 rounded-md border border-[#2BA2FD]">
                  <div v-for="method in methods"
                    class="cursor-pointer px-4 py-6 border-b border-[#D9D9D9] last:border-none">
                    <p>{{ method.label }}</p>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Bank Details</label>
          </div>
          <div class="flex items-center w-full">
            <!-- <UiInputSelect :options="methods" class="w-full" /> -->

            <div class="relative w-full">
              <div class="tima-select-default" @click="selectBankAccountModal = !selectBankAccountModal">
                <div>
                  <p>Input bank details</p>
                </div>

                <div class="ml-2">
                  <UtSvg name="chevron-down" dim w="24px" h="24px" />
                </div>
              </div>

              <transition mode="out-in">
                <div ref="bankAccountModalRef" v-if="selectBankAccountModal"
                  class="bg-white z-10 absolute top-[10px] right-0 max-w-[528px] w-full flex flex-col gap-2 rounded-md border border-[#2BA2FD]">
                  <div class="px-4 py-6">
                    <div class="flex items-start justify-between border-b border-[#D9D9D9]">
                      <div>
                        <p class="text-[#333333] text-lg font-semibold">Add Your Bank Details</p>
                        <p class="text-[#545454] text-[10px] font-semibold">Please input your bank account</p>
                      </div>

                      <button class="cursor-pointer" @click="selectBankAccountModal = false">
                        <UtSvg name="cancel" dim w="24px" h="24px" />
                      </button>
                    </div>

                    <div>
                      <div class="py-4">
                        <!-- <UiInputSelect :v-model="'paystack'" :options="methods" class="w-full" /> -->
                        <UiInputSelectSecondary placeholder="Select Bank" :options="methods" class="w-full" />
                      </div>

                      <div class="py-4">
                        <UiInputTextSecondary type="text" placeholder="Account Name" class="w-full" />
                      </div>

                      <div class="py-4">
                        <UiInputTextSecondary type="text" placeholder="Account Number" class="w-full" />
                      </div>

                      <div class="flex justify-end">
                        <UiButtonDefault class="min-w-[160px] px-4 py-3" label="Add" variant="primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Create PIN</label>
          </div>

          <div class="flex items-center w-full">
            <!-- <UiInputText type="text" class="w-full" v-model="form.accountNumber" :disabled="!props.isEditable"
              :error-message="v$.accountNumber?.$errors[0]?.$message.toString()" placeholder="Account number" /> -->

            <div class="relative w-full">
              <div class="tima-select-default" @click="resetPinModal = !resetPinModal">
                <div>
                  <p>Create transaction PIN</p>
                </div>

                <div class="ml-2">
                  <UtSvg name="chevron-down" dim w="24px" h="24px" />
                </div>
              </div>

              <transition mode="out-in">
                <div ref="resetPinModalRef" v-if="resetPinModal"
                  class="bg-white z-10 absolute top-[10px] right-0 max-w-[528px] w-full flex flex-col gap-2 rounded-2xl border border-[#2BA2FD]">
                  <div class="px-4 py-6">
                    <div class="py-2 flex items-start justify-between border-b border-[#D9D9D9]">
                      <div>
                        <p class="text-[#333333] text-lg font-semibold">Create Transaction PIN</p>
                      </div>

                      <button class="cursor-pointer" @click="resetPinModal = false">
                        <UtSvg name="cancel" dim w="24px" h="24px" />
                      </button>
                    </div>

                    <div>
                      <div class="py-4">
                        <UiInputTextSecondary type="password" passwordToggle placeholder="Enter New PIN"
                          class="w-full" />
                      </div>

                      <div class="py-4">
                        <UiInputTextSecondary type="password" passwordToggle placeholder="Confirm PIN" class="w-full" />
                      </div>

                      <div class="flex justify-end">
                        <UiButtonDefault class="min-w-[160px] px-4 py-3" label="Send" variant="primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
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
    <UtModal v-model:state="showAddBank" m-width="50.25rem" content-class="mx-auto md:!mt-auto"
      backdrop-color="rgba(0,0,0,.05)">
      <ModalsAddBank @close="showAddBank = false" :isEditable="isEditable" :v$="v$" v-model:bank="form.bankName"
        v-model:accountName="form.accountName" v-model:accountNumber="form.accountNumber" />
    </UtModal>
  </section>
</template>

<script setup lang="ts">
import { PaymentMethod } from "~/lib/enums";
import { CREATE_BANK_DETAILS_RULE } from "~/lib/validation/rules";
import { onClickOutside } from '@vueuse/core'
const props = defineProps<{ isEditable?: boolean }>();


/* modals */
const selectPaymentModal = ref(false);
const paymentModalRef = ref(null);
onClickOutside(paymentModalRef, event => {
  selectPaymentModal.value = false;
})


const selectBankAccountModal = ref(false);
const bankAccountModalRef = ref(null);
onClickOutside(bankAccountModalRef, event => {
  selectBankAccountModal.value = false;
})


const resetPinModal = ref(false);
const resetPinModalRef = ref(null);
onClickOutside(resetPinModalRef, event => {
  resetPinModal.value = false;
})




/*  */

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

<style>
.tima-select-default {
  @apply cursor-pointer w-full flex items-center justify-between;
  @apply text-base text-[#D9D9D9];
  @apply border border-[#BBBBBB];
  @apply rounded-3xl px-4 py-2;
}
</style>
