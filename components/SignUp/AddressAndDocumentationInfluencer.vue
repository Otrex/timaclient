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
        v-model="form.street"
        :error-message="v$.street?.$errors[0]?.$message.toString()"
        placeholder="Street"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.city"
        placeholder="City"
        :error-message="v$.city?.$errors[0]?.$message.toString()"
      />
      <!-- <UiInputText
        type="text"
        class="w-full"
        v-model="form.postCode"
        placeholder="Postal Code"
        :error-message="v$.postCode?.$errors[0]?.$message.toString()"
      /> -->
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.state"
        placeholder="State"
        :error-message="v$.state?.$errors[0]?.$message.toString()"
      />
      <UiInputSelect
        type="text"
        class="w-full"
        v-model="form.country"
        placeholder="Country"
        :error-message="v$.country?.$errors[0]?.$message.toString()"
        :options="optionsStore.$countries"
      />
      <UiInputSelect
        class="w-full"
        v-model="form.language"
        placeholder="Language"
        :error-message="v$.language?.$errors[0]?.$message.toString()"
        :options="optionsStore.$countryLanguages(form.country)"
      />
      <UiInputUpload
        class="w-full"
        v-model:file="form.companyRegDocs"
        placeholder="Upload government issued identification"
      />
      <UiInputUpload
        class="w-full mb-[3.125rem]"
        type="pics"
        v-model:file="form.profilePicture"
        placeholder="Upload Profile picture"
      />

      <UiButtonDefault
        class="w-full py-[0.875rem] mb-[1.875rem]"
        :disabled="state === constants.LOADING"
        :loading="state === constants.LOADING"
        variant="primary"
        label="Continue"
        @click="proceed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CREATE_BRAND_ADDRESS_VALIDATOR_V2 } from "~/lib/validation/rules";

const { notify } = useNotification();
const optionsStore = useOptionsStore();
const authStore = useAuthStore();

const form = reactive({
  profilePicture: {} as File,
  companyRegDocs: [] as File[],
  language: "",
  country: "",
  // postCode: "",
  state: "",
  street: "",
  city: "",
});

const { execute, validate, state, v$ } = useRequestState({
  action: () =>
    authStore.updateAccountSetup({
      country: form.country,
      state: form.state,
      street: form.street,
      city: form.city,
      // postCode: form.postCode,
      profile_image: form.profilePicture,
      document_upload: form.companyRegDocs,
      language: form.language,
    }),
  validation: {
    config: { $autoDirty: true },
    rule: CREATE_BRAND_ADDRESS_VALIDATOR_V2,
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
