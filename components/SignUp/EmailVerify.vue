<template>
  <div class="tm__box-598px">
    <div class="mb-[1.875rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Check your email for a code</h1>
      <p>
        Check your email at <b>{{ authStore.profile?.emailAddress }}</b> for the
        confirmation code. Enter it soon, before it expires. Welcome aboard!
      </p>
    </div>

    <div class="mt-[1.875rem]">
      <UiInputOtp
        :length="6"
        input-class="overflow-y-auto"
        @finish="(otp) => execute(otp)"
      />
      <p
        v-show="state == constants.LOADING"
        class="flex gap-[0.625rem] justify-center mt-[1.5rem] items-center"
      >
        <UtSvg name="sunshine" class="spinner w-[1.5rem] h-[1.5rem]" />
        Checking the code
      </p>
      <div class="mt-[1.5rem]">
        Didn’t receive code?
        <a
          class="underline text-[#0B95FF]"
          v-show="showResend"
          @click="() => resend()"
          :disabled="resendState == constants.LOADING"
        >
          <UtSvg
            name="sunshine"
            class="spinner w-[1.5rem] h-[1.5rem]"
            v-show="resendState == constants.LOADING"
          />
          Request Again
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { notify } = useNotification();
const authStore = useAuthStore();
const route = useRoute();
const api = useAPI();

const showResend = ref(false);
const emit = defineEmits(["success"]);

onMounted(() => {
  if (authStore.user?.hasVerifiedEmail) {
    return goToProfileUpdate();
  }

  setTimeout(() => {
    showResend.value = true;
  }, 5000);
});

function goToProfileUpdate() {
  if (route.params.type === constants.INFLUENCER) {
    navigateTo({
      query: {
        tab: constants.COMPLETE_PROFILE,
      },
    });
  } else {
    emit("success");
  }
}

const { execute, state } = useRequestState({
  action: (otp: string) => api.verifyOTP({ otp }),
  onError(e) {
    notify({
      type: "error",
      title: e.title,
      text: e.description,
    });
  },
  onSuccess() {
    authStore.getProfile().then(() => {
      goToProfileUpdate();
    });
  },
});

const { execute: resend, state: resendState } = useRequestState({
  action: async () => api.resendEmailOTP(),
  onError(e) {
    notify({
      type: "error",
      title: e.title,
      text: e.description,
    });
  },
  onSuccess() {
    notify({
      type: "success",
      title: "OTP resent!",
      text: "The new OTP has been sent to your email address",
    });
  },
});
</script>

<style></style>
