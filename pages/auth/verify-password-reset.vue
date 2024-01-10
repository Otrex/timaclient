<template>
  <div>
    <NuxtLayout name="auth">
      <div class="tm__box-598px">
        <div class="mb-[3.75rem]">
          <h1 class="text-[2.4375rem] mb-[1.5rem]">
            Check your email for a code
          </h1>
          <p>
            Check your email at <b>{{ $route.query.email }}</b> for the
            confirmation code. Enter it soon, before it expires. Welcome aboard!
          </p>
        </div>
        <div class="mt-[1.875rem]">
          <UiInputOtp :length="6" @finish="(otp) => execute(otp)" />
          <p
            v-show="state == constants.LOADING"
            class="flex gap-[0.625rem] justify-center mt-[1.5rem] items-center"
          >
            <UtSvg name="sunshine" class="spinner w-[1.5rem] h-[1.5rem]" />
            Checking the code
          </p>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Verify Password",
});

const { notify } = useNotification();
const api = useAPI();

const { execute, state } = useRequestState({
  action: async (otp: string) => {
    const response = await api.verifyOTP({ otp });
    return { otp, response };
  },
  onError(e) {
    notify({
      type: "error",
      title: e.title,
      text: e.description,
    });
  },
  onSuccess({ response, otp }) {
    notify({
      type: "success",
      title: "Password Reset Successful!",
      text: "Proceed to login with your new password",
    });
    navigateTo({
      path: "/auth/update-password",
      query: {
        publicId: response.data.publicId,
        otp,
      },
    });
  },
});
</script>

<style></style>
