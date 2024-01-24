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
            placeholder="Username"
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
const profileStore = useProfileStore();
const { notify } = useNotification();

const form = reactive({
  identifier: "",
  password: "",
});

const {
  execute: login,
  validate,
  state,
  v$,
} = useRequestState({
  action: async () => {
    await authStore.signIn({
      username: form.identifier,
      password: form.password,
    });
    await profileStore.getProfile();
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
    const userType = authStore.authorization.userType;

    navigateTo(
      userType === constants.INFLUENCER
        ? {
            name: "Explore",
            params: {
              type: userType,
            },
          }
        : {
            name: "BrandCampaign",
            params: {
              type: userType,
            },
          }
    );
  },
});
</script>

<style></style>
