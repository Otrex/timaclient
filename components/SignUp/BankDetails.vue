<template>
  <div class="tm__box-598px">
    <div class="mb-[3.75rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Bank Details</h1>
      <p>Provide bank details.</p>
    </div>

    <div class="flex flex-col gap-[1rem]">
      <UiInputText
        class="w-full"
        v-model="form.currency"
        placeholder="Select currency"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.accountName"
        placeholder="Account name"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.accountNumber"
        placeholder="Account number"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.bankName"
        placeholder="Bank name"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.bankAddress"
        placeholder="Bank address"
      />
      <UiInputText
        type="text"
        class="w-full mb-[3.25rem]"
        v-model="form.swiftCode"
        placeholder="Swift Code"
      />

      <UiButtonDefault
        :disabled="false"
        label="Continue"
        variant="primary"
        class="w-full py-[0.875rem] mb-[1.875rem]"
        @click="proceed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

const form = reactive({
  accountNumber: "",
  accountName: "",
  bankAddress: "",
  swiftCode: "",
  bankName: "",
  currency: "",
});

// const { execute, validate, state, v$ } = useRequestState({
//   action: () => authStore.createUser(form),
//   validation: {
//     config: { $autoDirty: true },
//     rule: CREATE_USER_RULE,
//     form,
//   },
//   onError(e) {
//     notify({
//       type: "error",
//       title: e.title,
//       text: e.description,
//     });
//   },
//   onSuccess() {
//     authStore.$patch({
//       registration: {
//         ...authStore.$state.registration,
//         username: form.username,
//         email: form.email,
//       },
//     });
//     navigateTo({
//       query: {
//         tab: constants.EMAIL_VERIFY,
//         email: form.email,
//       },
//     });
//   },
//   useGlobalLoader: false,
// });

function proceed() {
  navigateTo({
    query: {
      tab: constants.CONTENT_CATEGORY,
    },
  });
}
</script>

<style></style>
