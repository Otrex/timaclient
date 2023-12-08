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
        <h1 class="text-[2.4375rem] mb-[54px]">Review</h1>
        <UtSvg
          name="review-file"
          class="w-[6.875rem] h-[7.5rem] mb-[0.75rem]"
        />

        <p>
          Thank you for submitting your application to our platform. Our team is
          currently reviewing your application and we will notify you as soon as
          possible regarding your account status. We appreciate your interest in
          our platform and look forward to working with you soon
        </p>
      </div>

      <div
        class="flex flex-col gap-[1rem] max-w-[37.375rem] mx-auto mt-[3.4375rem]"
      >
        <NuxtLink
          :to="`/sign-up/${$route.params.type}?tab=${constants.BASIC_DETAILS}`"
        >
          <UiButtonDefault
            label="Log In"
            variant="primary"
            class="w-full py-[0.875rem]"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  profilePicture: undefined as string | File | undefined,
  companyRegDocs: [] as File[],
  country: "",
  state: "",
  street: "",
  city: "",
});

function proceed() {
  navigateTo("/auth/login");
}
</script>

<style></style>
