<template>
  <div>
    <NuxtLayout name="auth">
      <div>
        <div class="mb-[3.75rem]">
          <h1 class="text-[2.4375rem] mb-[1.5rem]">Reset Password</h1>
          <p>Please Set a new Password</p>
        </div>
        <div class="tm__box-598px text-left">
          <label>Enter new Password</label>
          <div class="flex flex-col gap-[1rem] mb-3">
            <UiInputText
              class="w-full"
              placeholder="Password"
              v-model="form.password"
              password-toggle
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <div class="flex flex-col gap-[1rem] mb-[9.9375rem]">
              <UiInputText
                class="w-full"
                placeholder="Password"
                v-model="form.confirmPassword"
                password-toggle
              />
            </div>
          </div>

          <div>
            <UiButtonDefault
              @click="() => proceed()"
              label="Reset Password"
              variant="primary"
              class="w-full py-[0.875rem]"
            />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Update Password",
  pageTransition: false,
});

const { notify } = useNotification();
const route = useRoute();
const api = useAPI();

const form = reactive({
  password: "",
  confirmPassword: "",
});

async function proceed() {
  if (!form.password) {
    return notify({
      type: "error",
      title: "Password is required",
      text: "Please enter a password",
    });
  }

  if (form.password.length < 8) {
    return notify({
      type: "error",
      title: "Password is too short",
      text: "Password must be at least 8 characters long",
    });
  }

  if (form.password !== form.confirmPassword) {
    return notify({
      type: "error",
      title: "Passwords do not match",
      text: "Please enter the same password twice",
    });
  }

  try {
    await api.resetNewPassword({
      emailAddress: route.query.email as string,
      otp: route.query.otp as string,
      newPassword: form.password,
    });

    notify({
      type: "success",
      title: "Password Reset Successful!",
      text: "Proceed to login with your new password",
    });

    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 2000);
  } catch (error) {
    notify({
      type: "error",
      title: "Password Reset Failed",
      text: "Please try again later",
    });
  }
}
</script>

<style></style>
