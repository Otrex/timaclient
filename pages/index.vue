<template>
  <div class="sm:px-[6.25rem] px-3 h-screen dark:bg-slate-800 dark:text-white">
    <div class="text-right pt-10">
      <div class="items-center flex justify-end">
        <span
          >Have an account?
          <NuxtLink
            to="/auth/login"
            class="text-red-600 text-[1.1875rem] underline underline-offset-2"
            >Login</NuxtLink
          >
        </span>
      </div>
    </div>
    <div class="text-center tm__box-598px">
      <UtSvg name="logo/tima" class="max-w-[6.125rem]" />
      <div class="mb-[2.25rem]">
        <h1 class="text-[2.4375rem] mb-[0.75rem]">Welcome</h1>
        <p>Join the world of influencer marketing as:</p>
      </div>

      <div class="mb-[3.5625rem]">
        <div class="mb-[1.0625rem]">
          <UiInputOption
            type="single"
            name="join"
            v-model="joinAs"
            :value="constants.INFLUENCER"
            class="w-full"
            label="An Influencer / Affiliate"
          />
        </div>
        <div>
          <UiInputOption
            type="single"
            name="join"
            v-model="joinAs"
            :value="constants.AGENCY"
            class="w-full"
            label="A Brand / Agency"
          />
        </div>
      </div>
      <div>
        <UiButtonDefault
          :disabled="!joinAs"
          @click="proceed"
          label="Continue"
          variant="primary"
          class="py-[0.875rem] w-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  name: "index",
});

const authStore = useAuthStore();
const joinAs = ref();

function proceed() {
  authStore.$patch({
    registration: {
      ...authStore.$state.registration,
      type: joinAs.value,
    },
  });
  authStore.logout();

  if (joinAs.value === constants.BRAND) {
    return navigateTo({
      name: "RegisterBasicDetails",
    });
  }

  navigateTo({
    name: "SignUp",
    params: {
      type: joinAs.value,
    },
    query: {
      tab: constants.BASIC_DETAILS,
    },
  });
}
</script>

<style></style>
