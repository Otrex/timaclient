<template>
  <div class="tm__box-598px">
    <div class="mb-[3.75rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Complete profile</h1>
      <p>Provide influencer name & phone number</p>
    </div>

    <div class="flex flex-col gap-[1rem]">
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.firstName"
        placeholder="First name"
        :error-message="v$.firstName.$errors[0]?.$message.toString()"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.middleName"
        placeholder="Middle name"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.lastName"
        placeholder="Last name"
        :error-message="v$.lastName.$errors[0]?.$message.toString()"
      />
      <UiInputPhone
        class="w-full"
        v-model="form.phoneNumber"
        :error-message="v$.phoneNumber.$errors[0]?.$message.toString()"
        placeholder="234 803 443 3833"
      />

      <UiButtonDefault
        label="Continue"
        variant="primary"
        @click="proceed"
        :loading="state === constants.LOADING"
        :disabled="state === constants.LOADING"
        class="w-full py-[0.875rem] mt-[3.25rem]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { COMPLETE_PROFILE_VALIDATOR } from "~/lib/validation/rules";

const { notify } = useNotification();
const authStore = useAuthStore();

const form = reactive({
  firstName: "",
  lastName: "",
  middleName: "",
  phoneNumber: {} as { number: string },
});

const { execute, validate, state, v$ } = useRequestState({
  action: () =>
    authStore.updateInfluencerProfile({
      ...form,
      phoneNumber: form.phoneNumber?.number,
    }),
  validation: {
    config: { $autoDirty: true },
    rule: COMPLETE_PROFILE_VALIDATOR,
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
        tab: constants.ADDRESS_DOCUMENTATION_INFLUENCER,
      },
    });
  },
});

function proceed() {
  validate().then(() => execute());
}
</script>

<style></style>
