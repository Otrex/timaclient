<template>
  <div>
    <NuxtLayout name="auth">
      <div>
        <div class="mb-[3.75rem]">
          <h1 class="text-[2.4375rem] mb-[1.5rem]">Forgot Password</h1>
          <p>Enter the email you use to register.</p>
        </div>
        <div class="tm__box-598px">
          <div class="flex flex-col gap-[1rem] mb-[9.9375rem]">
            <UiInputText class="w-full" placeholder="Email Address" />
          </div>

          <div>
            <UiButtonDefault
              @click="proceed"
              label="Continue"
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
  name: "Forgot Password",
  pageTransition: false,
});

function proceed() {
  navigateTo("/auth/verify-password-reset");
}
</script>

<style></style>
