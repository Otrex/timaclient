<template>
  <div class="tm__box-598px">
    <div class="mb-[1.875rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Sign Up</h1>
      <p>
        Discover top influencers, track metrics, and activate campaigns. Sign up
        now to simplify your influencer marketing journey.
      </p>
    </div>

    <div class="flex flex-col gap-[1rem]">
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.username"
        placeholder="Username"
        :error="v$.username.$error"
        :error-message="v$.username.$errors[0]?.$message.toString()"
      />
      <UiInputText
        type="email"
        class="w-full"
        v-model="form.email"
        placeholder="Email address"
        :error-message="v$.email.$errors[0]?.$message.toString()"
      />
      <UiInputText
        type="password"
        class="w-full"
        v-model="form.password"
        placeholder="Password"
        :error-message="v$.password.$errors[0]?.$message.toString()"
      />
      <div class="mb-[2.3125rem]">
        <label class="flex items-center gap-[0.625rem]">
          <input
            type="checkbox"
            v-model="agreed"
            class="rounded-full w-[1.25rem] h-[1.25rem]"
          />
          <span class="text-[0.875rem]">
            I have read and understood the terms and conditions
          </span>
        </label>
      </div>
      {{ authStore.userType }}
      <UiButtonDefault
        :disabled="!isReady"
        label="Continue"
        variant="primary"
        @click="proceed"
        class="w-full py-[0.875rem] mb-[1.875rem]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { AxiosError } from "axios";
import type { IErrorRequest } from "~/lib/interfaces/utils";
import { CREATE_USER_RULE } from "~/lib/validation/rules";

const { notify } = useNotification();
const authStore = useAuthStore();

const form = reactive({
  password: "",
  username: "",
  email: "",
});

const agreed = ref(false);

const v$ = useVuelidate(CREATE_USER_RULE, form, { $autoDirty: true });

const isReady = computed(() => {
  return form.password && form.email && agreed.value;
});

async function proceed() {
  try {
    if (!(await v$.value.$validate())) return;
    await authStore.createUser(form);
    navigateTo({ query: { tab: "email-verify" } });
  } catch (error: any) {
    const $error = error as AxiosError<IErrorRequest>["response"];
    notify({
      type: "error",
      title: $error?.data.status,
      text: $error?.data.userMessage,
    });
  }
}
</script>

<style></style>
