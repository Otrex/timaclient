<template>
  <div class="tm__box-598px">
    <div class="mb-[3.75rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Address & Documentation</h1>
      <p>Provide address & necessary documentation</p>
    </div>

    <div class="flex flex-col gap-[1rem]">
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.postCode"
        :error-message="v$.postCode?.$errors[0]?.$message.toString()"
        placeholder="Postal Code"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.street"
        :error-message="v$.street?.$errors[0]?.$message.toString()"
        placeholder="Street"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.city"
        :error-message="v$.city?.$errors[0]?.$message.toString()"
        placeholder="City"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.state"
        :error-message="v$.state?.$errors[0]?.$message.toString()"
        placeholder="State"
      />
      <UiInputSelect
        :options="optionsStore.$countries"
        type="text"
        class="w-full"
        v-model="form.country"
        :error-message="v$.country?.$errors[0]?.$message.toString()"
        placeholder="Country"
      />
      <UiInputUpload
        class="w-full"
        type="docs"
        v-model:url="form.companyRegDocs"
        :error-message="v$.companyRegDocs?.$errors[0]?.$message.toString()"
        placeholder="Upload company registration documents"
      />
      <UiInputUpload
        class="w-full mb-[3.125rem]"
        type="pics"
        v-model:url="form.profilePicture"
        :error-message="v$.profilePicture?.$errors[0]?.$message.toString()"
        placeholder="Profile picture"
      />

      <UiButtonDefault
        :disabled="state === constants.LOADING"
        :loading="state === constants.LOADING"
        label="Continue"
        variant="primary"
        class="w-full py-[0.875rem] mb-[1.875rem]"
        @click="proceed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CREATE_BRAND_ADDRESS_VALIDATOR } from "~/lib/validation/rules";

const { notify } = useNotification();
const optionsStore = useOptionsStore();
const authStore = useAuthStore();
const form = reactive({
  profilePicture: "",
  companyRegDocs: [] as string[],
  country: "",
  postCode: "",
  state: "",
  street: "",
  city: "",
});

const { execute, validate, state, v$ } = useRequestState({
  action: () =>
    authStore.updateBrandAddressDoc({
      pictureName: form.profilePicture,
      documentName: form.companyRegDocs as any,
      addressRecord: {
        country: form.country,
        postCode: form.postCode,
        state: form.state,
        language: "English",
        street: form.street,
        city: form.city,
      },
    }),
  validation: {
    config: { $autoDirty: true },
    rule: CREATE_BRAND_ADDRESS_VALIDATOR,
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
        tab: constants.INDUSTRY_SELECTION,
      },
    });
  },
});

function proceed() {
  validate().then(() => execute());
}
</script>

<style></style>
