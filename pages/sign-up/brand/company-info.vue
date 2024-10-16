<template>
  <section>
    <div class="flex flex-row justify-end pr-4 mb-5">
      <UiProfileProgress :percent="authStore.progress" />
    </div>
    <div class="tm__box-598px">
      <div class="mb-[3.75rem]">
        <h1 class="text-[2.4375rem] mb-[1.5rem]">Basic Information</h1>
        <p>Provide company name & phone number</p>
      </div>
      <ClientOnly>
        <div class="flex flex-col gap-[1rem] mb-[3rem]">
          <UiInputText
            type="text"
            class="w-full"
            v-model="form.companyName"
            placeholder="Company name"
            :error-message="v$.companyName.$errors[0]?.$message.toString()"
          />
          <UiInputText
            type="text"
            class="w-full"
            v-model="form.website"
            placeholder="Website (If available)"
            :error-message="v$.website.$errors[0]?.$message.toString()"
          />

          <UiButtonDefault
            label="Continue"
            variant="primary"
            :disabled="state == constants.LOADING"
            :loading="state == constants.LOADING"
            @click="validate().then(() => execute())"
            class="w-full py-[0.875rem] mt-[3.125rem]"
          />
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { UPDATE_BRAND_INFO_RULE } from "~/lib/validation/rules";
definePageMeta({
  name: "SignUpBrandCompanyInfo",
  middleware: [
    async function () {
      await useAuthStore().getProfile();
    },
  ],
});

const { notify } = useNotification();
const authStore = useAuthStore();

const form = reactive({
  companyName: "",
  website: "",
});

const { execute, validate, state, v$ } = useRequestState({
  action: async () =>
    authStore.updateProfileSetup({
      ...form,
    }),
  validation: {
    config: { $autoDirty: true },
    rule: UPDATE_BRAND_INFO_RULE,
    form,
  },
  onError(e) {
    console.log(e);

    notify({
      type: "error",
      title: e.title,
      text: e.description,
    });
  },
  onSuccess() {
    navigateTo({
      name: "SignUpBrandAddress",
    });
  },
});
</script>

<style></style>
