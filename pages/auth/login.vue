<template>
  <NuxtLayout name="auth" hide-back>
    <div>
      <div class="mb-[3.75rem]">
        <h1 class="text-[2.4375rem] mb-[1.5rem]">Log In</h1>
      </div>
      <div class="tm__box-598px">
        <div class="flex flex-col gap-[1rem] mb-[4.3125rem]">
          <UiInputText class="w-full" placeholder="Email Address" />
          <UiInputText class="w-full" placeholder="Password" type="password" />
          <div class="text-left">
            <NuxtLink class="underline" to="/auth/forgot-password">
              Forgot password?</NuxtLink
            >
          </div>
        </div>

        <div>
          <UiButtonDefault
            label="Continue"
            variant="primary"
            class="w-full py-[0.875rem]"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style></style>
