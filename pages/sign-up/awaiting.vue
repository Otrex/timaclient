<template>
  <div class="dark:bg-slate-800 pt-[6.25rem] dark:text-white w-full h-screen">
    <div
      class="dark:bg-slate-800 dark:text-white text-center max-w-[56.125rem] px-[0.625rem] mx-auto"
    >
      <UtSvg
        name="logo/tima"
        class="max-w-[6.125rem] h-[2.4375rem] mb-[57px]"
      />
      <div>
        <h1 class="text-[2.4375rem] mb-[54px]">Account Review in Progress</h1>
        <UtSvg name="await" class="w-[6.875rem] spin h-[7.5rem] mb-[0.75rem]" />

        <p>
          Your account is currently under review to ensure compliance with our
          policies. Access to certain features is temporarily limited. Thank you
          for your patience. We will notify you once the review is complete.
        </p>

        <NuxtLink
          to="/"
          class="text-red-500 hover:text-blue-600 mt-4 inline-block"
        >
          Return to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "AwaitingApproval",
});
</script>

<style>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spin 2s linear infinite;
}
</style>
