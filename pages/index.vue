<template>
  <div class="pt-[100px]">
    <div class="text-center tm__box-598px">
      <UtSvg name="logo/tima" class="max-w-[98px]" />
      <div class="mb-[36px]">
        <h1 class="text-[39px] mb-[12px]">Welcome</h1>
        <p>Join the world of influencer marketing as:</p>
      </div>

      <div class="mb-[57px]">
        <div class="mb-[17px]">
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
          class="py-[14px] w-full"
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
