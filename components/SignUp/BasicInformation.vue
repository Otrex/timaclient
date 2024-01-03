<template>
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
        <UiInputPhone
          class="w-full"
          v-model="form.phoneNumber"
          placeholder="234 803 443 3833"
          :error-message="v$.phoneNumber.$errors[0]?.$message.toString()"
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
</template>

<script setup lang="ts">
import { UPDATE_BRAND_INFO_RULE } from "~/lib/validation/rules";
const { notify } = useNotification();
const authStore = useAuthStore();
const route = useRoute();

const form = reactive({
  companyName: "",
  website: "",
  phoneNumber: undefined as Record<string, any> | undefined | string,
});

const isReady = computed(() => {
  return form.website && form.phoneNumber && form.companyName;
});

const { execute, validate, state, v$ } = useRequestState({
  action: () =>
    authStore.updateBrandInformation({
      ...form,
      phoneNumber:
        typeof form.phoneNumber === "string"
          ? form.phoneNumber
          : form.phoneNumber?.number,
      email: route.query.email as string,
    }),
  validation: {
    config: { $autoDirty: true },
    rule: UPDATE_BRAND_INFO_RULE,
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
        tab: constants.ADDRESS_DOCUMENTATION,
      },
    });
  },
});
</script>

<style></style>
