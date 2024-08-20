<template>
  <div>
    <NuxtLayout name="dashboard">
      <template #main>
        <NuxtPage
          :transition="{
            name: 'page',
            mode: 'out-in',
          }"
        />
      </template>
    </NuxtLayout>

    <UtModal
      v-model:state="pinModals.set"
      preventBackdropClose
      m-width="31.25rem"
      content-class="mx-auto md:!mt-auto"
      backdrop-color="rgba(0,0,0,.05)"
    >
      <ModalsSetPin
        v-if="!pinModals.confirm"
        title="Enter Transaction Pin"
        description="Please create a PIN for secure transactions"
        @submit="onSubmit"
        label="Create"
      />
      <ModalsSetPin
        v-else
        title="Confirm Your Pin"
        :loading="state === constants.LOADING"
        description="Please re-enter your PIN to confirm."
        label="Submit"
        @submit="onConfirm"
      />
      <div v-if="pinModals.confirm && state !== constants.LOADING">
        <button
          class="flex items-center gap-1 mt-1"
          @click="pinModals.confirm = false"
        >
          <UtSvg name="arrow-back" class="text-black" dim w="24px" h="24px" />
          Go Back
        </button>
      </div>
    </UtModal>
  </div>
</template>
<script lang="ts" setup>
import { SET_TRANSACTION_PIN } from "~/lib/validation/rules";

definePageMeta({
  middleware: ["dashboard"],
});

const api = useAPI();

const auth = useAuthStore();
const { notify } = useNotification();
const pinModals = reactive({
  set: !auth.profile?.hasSetTransactionPIN,
  confirm: false,
  pin: "",
});

function onSubmit(pin: string) {
  pinModals.pin = pin;
  pinModals.confirm = true;
}

async function onConfirm(pin: string) {
  if (pin !== pinModals.pin) {
    return notify({
      type: "error",
      title: "Invalid Pin",
      text: "The pin you entered is incorrect",
    });
  }

  execute();
}

const { execute, state, v$ } = useRequestState({
  validation: {
    config: { $autoDirty: true },
    rule: SET_TRANSACTION_PIN,
    form: pinModals,
  },
  action: () =>
    api.createTransactionPin({
      transactionPIN: pinModals.pin,
    }),
  onSuccess(response) {
    notify({
      type: "success",
      title: "Request Successful",
      text: "Transaction Pin created",
    });
    pinModals.set = false;
  },
  onError(error) {
    notify({
      type: "error",
      title: error.title,
      text: error.description,
    });
  },
});
</script>
