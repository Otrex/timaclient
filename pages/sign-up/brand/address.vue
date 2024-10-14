<template>
  <section>
    <div class="flex flex-row justify-end pr-4 mb-5">
      <UiProfileProgress :percent="authStore.progress" />
    </div>
    <UtSpinner v-if="isLoading" />
    <div class="tm__box-598px" v-else>
      <div class="mb-[3.75rem]">
        <h1 class="text-[2.4375rem] mb-[1.5rem]">Address & Documentation</h1>
        <p>Provide address & necessary documentation</p>
      </div>

      <div class="flex flex-col gap-[1rem]">
        <!-- <UiInputText
        type="text"
        class="w-full"
        v-model="form.postCode"
        :error-message="v$.postCode?.$errors[0]?.$message.toString()"
        placeholder="Postal Code"
      /> -->
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
          v-model:file="form.companyRegDocs"
          :error-message="v$.companyRegDocs?.$errors[0]?.$message.toString()"
          placeholder="Upload company registration documents"
        />
        <UiInputUpload
          class="w-full mb-[3.125rem]"
          type="pics"
          v-model:file="form.profilePicture"
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
  </section>
</template>

<script setup lang="ts">
import { CREATE_BRAND_ADDRESS_VALIDATOR } from "~/lib/validation/rules";

definePageMeta({
  name: "SignUpBrandAddress",
  middleware: [
    async function () {
      await useAuthStore().getProfile();
    },
  ],
});

const optionsStore = useOptionsStore();
const { notify } = useNotification();
const authStore = useAuthStore();

const isLoading = ref(true);
const form = reactive({
  profilePicture: {} as File,
  companyRegDocs: [] as File[],
  country: "",
  postCode: "",
  state: "",
  street: "",
  city: "",
});

async function getOptions() {
  try {
    isLoading.value = true;
    await optionsStore.getCountries();
  } finally {
    isLoading.value = false;
  }
}

const { execute, validate, state, v$ } = useRequestState({
  action: () =>
    authStore.updateAccountSetup({
      country: form.country,
      state: form.state,
      street: form.street,
      city: form.city,
      profile_image: form.profilePicture,
      document_upload: form.companyRegDocs,
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
      name: "SignUpBrandIndustry",
    });
  },
});

function proceed() {
  validate().then(() => execute());
}

onMounted(() => {
  getOptions();
});
</script>
