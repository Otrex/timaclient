<template>
  <NuxtLayout name="auth">
    <div class="tm__box-598px">
      <div class="mb-[3.75rem]">
        <h1 class="text-[2.4375rem] mb-[1.5rem]">
          Check your email for a code
        </h1>
        <p>
          Check your email at yowa@gmail.com for the confirmation code. Enter it
          soon, before it expires. Welcome aboard!
        </p>
      </div>
      <div class="mt-[1.875rem]">
        <UiInputOtp :length="6" v-model="form.code" @finish="sendCode" />
        <p
          v-show="form.loading"
          class="flex gap-[0.625rem] justify-center mt-[1.5rem] items-center"
        >
          <UtSvg name="sunshine" class="spinner w-[1.5rem] h-[1.5rem]" />
          Checking the code
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const form = reactive({
  loading: false,
  code: "",
});
function sendCode(otp: string) {
  form.loading = true;
  setTimeout(() => {
    form.loading = false;
    navigateTo("/auth/login");
  }, 3000);
}
</script>

<style></style>
