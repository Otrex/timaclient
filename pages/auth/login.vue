<template>
  <NuxtLayout
    name="auth"
    hide-back
    @keypress.enter="validate().then(() => login())"
  >
    <div>
      <div class="mb-[3.75rem]">
        <h1 class="text-[2.4375rem] mb-[1.5rem]">Log In</h1>
      </div>
      <div class="tm__box-598px">
        <div class="flex flex-col gap-[1rem] mb-[4.3125rem]">
          <UiInputText
            class="w-full"
            v-model="form.identifier"
            placeholder="Username or Email Address"
          />
          <UiInputText
            class="w-full"
            v-model="form.password"
            placeholder="Password"
            type="password"
            passwordToggle
          />
          <div class="text-left">
            <NuxtLink class="underline" to="/auth/forgot-password">
              Forgot password?</NuxtLink
            >
          </div>
        </div>

        <div class="mb-[1.875rem]">
          <UiButtonDefault
            @click="validate().then(() => login())"
            :disabled="state === constants.LOADING"
            :loading="state === constants.LOADING"
            label="Login"
            variant="primary"
            class="w-full py-[0.875rem]"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { SIGN_IN_RULE } from "~/lib/validation/rules";
const authStore = useAuthStore();
const { notify } = useNotification();

definePageMeta({
  name: "login",
});

const form = reactive({
  identifier: "",
  password: "",
});

const route = useRoute();

const {
  execute: login,
  validate,
  state,
  v$,
} = useRequestState({
  action: async () => {
    await authStore.clearAllStorageData();
    await authStore.signIn({
      user: form.identifier,
      password: form.password,
    });
  },
  validation: {
    config: { $autoDirty: true },
    rule: SIGN_IN_RULE,
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
    window.location.href = (route.query.redirect as string) || "/d/redirect";
  },
});
</script>

<style></style>
