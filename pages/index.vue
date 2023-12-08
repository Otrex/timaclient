<template>
  <div class="px-[6.25rem]">
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
            label="An Influencer/ Affiliate"
          />
        </div>
        <div>
          <UiInputOption
            type="single"
            name="join"
            v-model="joinAs"
            :value="constants.AGENCY"
            class="w-full"
            label="A Brand/ Agency"
          />
        </div>
      </div>

      <div>
        <UiButtonDefault
          :disabled="!joinAs"
          @click="signUp"
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

const joinAs = ref();

function signUp() {
  navigateTo({
    path: `/sign-up/${joinAs.value}`,
    query: { tab: constants.BASIC_DETAILS },
  });
}
</script>

<style></style>
