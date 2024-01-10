<template>
  <div class="tm__box-598px">
    <div class="mb-[1.875rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Check your email for a code</h1>
      <p>
        Check your email at <b>{{ $route.query.email }}</b> for the confirmation
        code. Enter it soon, before it expires. Welcome aboard!
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
        <a
          class="underline text-red-600"
          v-show="route.query.email && route.query.username"
          @click="() => resend()"
          :disabled="resendState == constants.LOADING"
        >
          <UtSvg
            name="sunshine"
            class="spinner w-[1.5rem] h-[1.5rem]"
            v-show="resendState == constants.LOADING"
          />
          Resend OTP
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
    if (route.params.type === constants.INFLUENCER) {
      navigateTo({
        query: {
          tab: constants.COMPLETE_PROFILE,
        },
      });
    } else {
      navigateTo({
        query: {
          tab: constants.BASIC_INFORMATION,
          email: route.query.email as string,
        },
      });
    }
  },
});

const { execute: resend, state: resendState } = useRequestState({
  action: () => authStore.resendOTP(),
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
