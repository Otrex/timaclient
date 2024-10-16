<template>
  <div class="text-center">
    <div
      class="tm__box-598px"
      v-if="!showOTPForm && route.query.verify !== '1'"
    >
      <div class="mb-[1.875rem]">
        <h1 class="text-[2.4375rem] mb-[1.5rem]">Sign Up</h1>
        <p>
          Discover top influencers, track metrics, and activate campaigns. Sign
          up now to simplify your influencer marketing journey.
        </p>
      </div>

      <div class="flex flex-col gap-[1rem]">
        <div class="text-left">
          <div class="flex flex-row items-center transition-all">
            <UiInputText
              type="text"
              class="w-full"
              :class="
                isValidUserName ? '!border-green-500 !border !border-solid' : ''
              "
              v-model="form.userName"
              @keyup.prevent="() => verify()"
              :autocomplete="false"
              placeholder="Username"
              :error-message="
                v$.userName.$errors[0]?.$message.toString() ||
                (isValidUserName === false && 'Username already in use')
              "
            />
            <div>
              <UtSvg
                name="sunshine"
                class="spinner ml-4 w-[1.5rem] h-[1.5rem]"
                v-show="verifying == constants.LOADING"
              />
            </div>
          </div>
          <span
            class="text-green-500 !text-left text-sm"
            v-if="
              isValidUserName && !v$.userName.$errors[0]?.$message.toString()
            "
          >
            Your username is good to go!</span
          >
        </div>
        <UiInputText
          type="email"
          class="w-full"
          v-model="form.emailAddress"
          :autocomplete="false"
          placeholder="Email address"
          :error-message="v$.emailAddress.$errors[0]?.$message.toString()"
        />
        <UiInputPhone
          class="w-full"
          :model-value="form.phoneNumber"
          @update:model-value="(data) => (form.phoneNumber = data.number)"
          :error-message="v$.phoneNumber.$errors[0]?.$message.toString()"
          placeholder="234 803 443 3833"
        />
        <UiInputText
          type="password"
          class="w-full"
          password-toggle
          v-model="form.password"
          :autocomplete="false"
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
              I have read and understood the
              <a href="/terms" class="!text-[#2BA2FD]">terms and conditions</a>.
            </span>
          </label>
        </div>

        <UiButtonDefault
          :disabled="!isReady || state == constants.LOADING"
          class="w-full py-[0.875rem] mb-[1.875rem]"
          @click="validate().then(() => execute())"
          :loading="state == constants.LOADING"
          variant="primary"
          label="Register"
        />
      </div>
    </div>
    <div v-else>
      <SignUpEmailVerify
        @success="
          () => {
            navigateTo({
              name: 'CompleteProfileInfluencer',
            });
          }
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { CREATE_USER_RULE } from "~/lib/validation/rules";
definePageMeta({
  name: "RegisterInfluencer",
  middleware: [
    async function () {
      try {
        await useAuthStore().getProfile();
      } catch (error) {
        navigateTo("/sign-up/influencer/register");
      }
    },
  ],
});

onMounted(() => {
  authStore.$patch({
    registration: {
      ...authStore.$state.registration,
      type: constants.INFLUENCER,
    },
  });
});
const route = useRoute();

const isValidUserName = ref<boolean | null>(null);
const showOTPForm = ref(false);
const agreed = ref(false);
const form = reactive({
  emailAddress: "",
  password: "",
  phoneNumber: "",
  userName: "",
});

const isReady = computed(() => {
  return form.password && form.emailAddress && agreed.value;
});

const { notify } = useNotification();
const authStore = useAuthStore();
const api = useAPI();

const { execute: verifyUsername, state: verifying } = useRequestState({
  action: (value: string) => api.verifyUsername(value),
  onError(e) {
    if (e.__error?.response?.data?.message) {
      isValidUserName.value = false;
    }
  },
  onSuccess(response) {
    isValidUserName.value = response.statusCode === 200 ? true : false;
  },
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
        username: form.userName,
        email: form.emailAddress,
      },
    });
    api.resendEmailOTP(); // TODO: Remove this when its fixed
    authStore.getProfile().finally(() => {
      showOTPForm.value = true;
    });
  },
});

const verify = useDebounceFn(
  () => form.userName && verifyUsername(form.userName),
  1000,
  { maxWait: 2000 }
);
</script>

<style></style>
