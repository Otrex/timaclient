<template>
  <section class="flex flex-col">
    <div class="text-right my-5">
      <UiButtonDefault
        variant="primary"
        class="py-2 text-sm mr-3 px-5"
        label="+ Add Bank"
        :disabled="!isEditable"
        @click="showAddBankModal = true"
      />
      <UiButtonDefault
        variant="primary"
        :disabled="!isEditable"
        @click="showChangePinModal = true"
        class="py-2 text-sm px-5"
        label="Change PIN"
      />
    </div>

    <div class="flex flex-col gap-[1.5rem] max-w-[65.875rem]">
      <div class="flex md:flex-row items-center flex-col">
        <div class="sm:max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Payment Method</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputSelect
            :options="tools.generationOptions(optionsStore.$paymentMethods)"
            v-model="fullForm.paymentMethod"
            class="w-full"
            :disabled="!isEditable"
            placeholder="Select payment method"
          />
        </div>
      </div>

      <div class="flex md:flex-row items-center flex-col">
        <div class="sm:max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium block">Payment Bank</label>
          <small class="transform -mt-1 block text-xs">
            This covers the account you'd like to recieve payment from
          </small>
        </div>
        <div class="flex items-center w-full">
          <UiInputSelect
            :options="
              optionsStore.withdrawalBanks.map((e) => ({
                label: `${e.bankName} (${e.accountNumber})`,
                value: e.id,
              }))
            "
            v-model="fullForm.bankId"
            class="w-full"
            :disabled="!isEditable"
            placeholder="Select Bank"
          />
        </div>
      </div>

      <div
        v-if="authStore.profile?.socialMediaAccounts?.length"
        class="flex md:flex-row flex-col"
      >
        <div class="sm:max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium block">
            Charge per Post
          </label>
        </div>
        <div class="flex flex-col gap-1 items-center w-full">
          <UiInputSelect
            :options="
              authStore.profile?.socialMediaAccounts?.map((e) => ({
                label: e.platformName,
                value: e.platformName,
              })) || []
            "
            v-model="socialMediaPlatform"
            class="w-full"
            placeholder="Select Social Media Platform"
          />

          <UiInputTextSelect
            :options="tools.generationOptions(['USD', 'NGN'])"
            class="w-full"
            type="number"
            :disabled="!isEditable"
            v-model="fullForm.chargePerPost[socialMediaPlatform]"
            placeholder="No greater than"
          />
        </div>
      </div>

      <div v-else>Please add your social media account</div>

      <div class="text-right">
        <UiButtonDefault
          variant="primary"
          :disabled="!isEditable"
          :loading="updatingPaymentInfo === constants.LOADING"
          @click="() => updatePaymentInfo()"
          class="py-2 text-sm px-5"
          label="Update Information"
        />
      </div>
    </div>

    <UtModal
      v-model:state="showAddBankModal"
      m-width="31.25rem"
      backdrop-color="rgba(0,0,0,.3)"
    >
      <section class="bg-white p-5 rounded-2xl">
        <div class="mb-3 text-center pb-3">
          <h1 class="text-lg font-semibold">Add Your Bank Details</h1>
          <p class="mx-auto text-[#545454] text-sm">
            Please input your bank account
          </p>
        </div>
        <div>
          <div class="mb-3">
            <UiInputSelect
              v-model="form.bank"
              :options="
                optionsStore.banks.map((e) => ({
                  label: e.name,
                  value: e.code,
                }))
              "
              class="w-full text-sm"
              placeholder="Select Bank"
            />
          </div>
          <div class="mb-3">
            <UiInputText
              @input="resolveAccount"
              v-model="form.accountNumber"
              placeholder="Account Number"
              class="text-sm"
              :loading="state === constants.LOADING"
            />
          </div>
          <div class="mb-3">
            <UiInputText
              disabled
              v-model="form.accountName"
              placeholder="Account Name"
              class="text-sm"
            />
          </div>
        </div>
        <div class="text-right">
          <UiButtonDefault
            variant="primary"
            :loading="addingBank == constants.LOADING"
            :disabled="
              !form.accountNumber ||
              !form.bank ||
              !form.accountName ||
              addingBank == constants.LOADING
            "
            @click="() => addBank()"
            class="text-base w-full py-2 px-10"
            label="Add"
          />
        </div>
      </section>
    </UtModal>

    <UtModal
      v-model:state="showChangePinModal"
      m-width="31.25rem"
      backdrop-color="rgba(0,0,0,.3)"
    >
      <section class="bg-white p-5 rounded-2xl">
        <div class="mb-3 text-center pb-3">
          <h1 class="text-lg font-semibold">Change Transaction PIN</h1>
        </div>
        <div>
          <div class="mb-3">
            <UiInputText
              v-model="pinForm.oldPin"
              placeholder="Enter old pin"
              class="text-sm"
              type="password"
              password-toggle
            />
          </div>
          <div class="mb-3">
            <UiInputText
              v-model="pinForm.newPin"
              placeholder="Enter new pin"
              class="text-sm"
              type="password"
              password-toggle
            />
          </div>
          <div class="mb-3">
            <UiInputText
              v-model="pinForm.confirmPin"
              placeholder="Confirm new pin "
              class="text-sm"
              type="password"
              password-toggle
            />
          </div>
        </div>
        <div class="text-right">
          <UiButtonDefault
            variant="primary"
            :loading="changingPin == constants.LOADING"
            :disabled="
              !pinForm.oldPin ||
              !pinForm.newPin ||
              !pinForm.confirmPin ||
              pinForm.newPin != pinForm.confirmPin ||
              changingPin == constants.LOADING
            "
            @click="() => changePin()"
            class="text-base w-full py-2 px-10"
            label="Submit"
          />
        </div>
      </section>
    </UtModal>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  name: "InfluencerSettingPayment",
});

const api = useAPI();
const authStore = useAuthStore();
const showAddBankModal = ref(false);
const showChangePinModal = ref(false);
const socialMediaPlatform = ref(
  authStore.profile?.socialMediaAccounts?.at(0)?.platformName ?? "instagram"
);

const paymentInfo = computed(() => authStore.profile?.paymentInformation);
const optionsStore = useOptionsStore();
const form = reactive({
  accountNumber: "",
  accountName: "",
  bank: "",
});

const pinForm = reactive({
  oldPin: "",
  newPin: "",
  confirmPin: "",
});

const fullForm = reactive({
  chargePerPost: Object.fromEntries(
    paymentInfo.value?.platformPrices.map((e) => [e.platform, e.price]) || []
  ) as Record<string, any>,
  bankId: optionsStore.withdrawalBanks.find(
    (e) => e.accountNumber == paymentInfo.value?.bankDetails.accountNumber
  )?.id as string | undefined,
  paymentMethod: paymentInfo.value?.paymentMethod,
});

const isEditable = inject<boolean>("isEditable");
const { notify } = useNotification();

const { state, execute: resolve } = useRequestState({
  action: async () =>
    api.resolveBankAccount({
      accountNumber: form.accountNumber,
      bankCode: form.bank,
    }),
  onSuccess: ({ data }) => {
    form.accountName = data.account_name;
  },
  onError: (e) => {
    notify({
      type: "error",
      title: e.title,
      text: e.description,
    });
  },
});

const { state: updatingPaymentInfo, execute: updatePaymentInfo } =
  useRequestState({
    action: async () => {
      const bank = optionsStore.withdrawalBanks.find(
        (e) => e.id == fullForm.bankId
      );

      if (!bank) {
        throw new Error("Bank not found or no bank selected");
      }

      return api.updatePaymentInformation({
        bankDetails: {
          accountNumber: bank?.accountNumber ?? "",
          accountName: bank?.accountName ?? "",
          bankName: optionsStore.getBankNameByCode(bank?.bankName)!,
          bankCode: bank?.bankCode ?? "",
        },
        platformPrices: Object.entries(fullForm.chargePerPost).map(
          ([key, value]) => ({
            platform: key,
            price: value,
          })
        ),
      });
    },
    onSuccess: () => {
      notify({
        text: "Payment Information Updated Successfully",
        title: "Request Successful",
        type: "success",
      });
    },
    onError: (res) => {
      notify({
        text: res.description,
        title: res.title,
        type: "error",
      });
    },
  });

const { execute: addBank, state: addingBank } = useRequestState({
  action: async () =>
    api.createWithdrawalBanks({
      accountNumber: form.accountNumber,
      accountName: form.accountName,
      bankName: optionsStore.getBankNameByCode(form.bank)!,
      bankCode: form.bank,
    }),

  onSuccess: () => {
    showAddBankModal.value = false;
    notify({
      text: "Bank Added Successfully",
      title: "Request Successful",
      type: "success",
    });
  },

  onError: () => {
    notify({
      text: "Failed to add bank",
      title: "Request Failed",
      type: "error",
    });
  },
});

const { execute: changePin, state: changingPin } = useRequestState({
  action: async () =>
    api.changeTransactionPin({
      oldPIN: pinForm.oldPin,
      newPIN: pinForm.newPin,
    }),

  onSuccess: () => {
    showChangePinModal.value = false;
    notify({
      text: "Pin Changed Successfully",
      title: "Request Successful",
      type: "success",
    });
  },

  onError: () => {
    notify({
      text: "Failed to change pin",
      title: "Request Failed",
      type: "error",
    });
  },
});

async function resolveAccount() {
  if (form.accountNumber.length < 10) return;
  await resolve();
}
</script>

<style></style>
