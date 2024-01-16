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
          <span class="text-[0.9375rem]">
            I have read and understood the terms and conditions
          </span>
        </label>
      </div>

      <UiButtonDefault
        :disabled="!isReady || state == constants.LOADING"
        class="w-full py-[0.875rem] mb-[1.875rem]"
        @click="validate().then(() => execute())"
        :loading="state == constants.LOADING"
        variant="primary"
        label="Continue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CREATE_USER_RULE } from "~/lib/validation/rules";

const { notify } = useNotification();
const authStore = useAuthStore();
const agreed = ref(false);

const form = reactive({
  password: "",
  username: "",
  email: "",
});

const { execute, validate, state, v$ } = useRequestState({
  action: () => authStore.createUser(form),
  validation: {
    config: { $autoDirty: true },
    rule: CREATE_USER_RULE,
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
    authStore.$patch({
      registration: {
        ...authStore.$state.registration,
        username: form.username,
        email: form.email,
      },
    });
    navigateTo({
      query: {
        tab: constants.EMAIL_VERIFY,
        email: form.email,
      },
    });
  },
});

const isReady = computed(() => {
  return form.password && form.email && agreed.value;
});
</script>

<style scoped></style>
