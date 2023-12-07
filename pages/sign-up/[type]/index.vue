<template>
  <NuxtLayout :prev="previousTab(currentTab)" name="kyc">
    <template #sidebar>
      <PartialSignUpNavbarAgency v-if="type(constants.AGENCY)" />
      <PartialSignUpNavbarInfluencer v-if="type(constants.INFLUENCER)" />
    </template>
    <template #topnav>
      <div
        v-if="show(constants.BANK_DETAILS)"
        class="items-center flex justify-end"
      >
        <span
          >Already have an account?
          <NuxtLink
            class="text-red-600 text-[1.1875rem] underline underline-offset-2"
            >Log In</NuxtLink
          >
        </span>
      </div>
    </template>
    <div>
      <div class="text-center">
        <UtSvg
          name="logo/tima"
          class="max-w-[6.125rem] h-[2.4375rem] mb-[3.5625rem] mt-[0.625rem]"
        />
        <transition name="page" mode="out-in">
          <component :is="view" />
        </transition>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const components = {
  [constants.BASIC_DETAILS]: resolveComponent("LazyPartialSignUpBasicDetails"),
  [constants.EMAIL_VERIFY]: resolveComponent("LazyPartialSignUpEmailVerify"),

  [constants.BASIC_INFORMATION]: resolveComponent(
    "LazyPartialSignUpBasicInformation"
  ),
  [constants.ADDRESS_DOCUMENTATION]: resolveComponent(
    "LazyPartialSignUpAddressAndDocumentation"
  ),

  [constants.INDUSTRY_SELECTION]: resolveComponent(
    "LazyPartialSignUpIndustrySelection"
  ),
  [constants.COMPLETE_PROFILE]: resolveComponent(
    "LazyPartialSignUpCompleteProfile"
  ),
  [constants.ADDRESS_DOCUMENTATION_INFLUENCER]: resolveComponent(
    "LazyPartialSignUpAddressAndDocumentationInfluencer"
  ),
  [constants.BANK_DETAILS]: resolveComponent("LazyPartialSignUpBankDetails"),
  [constants.CONTENT_CATEGORY]: resolveComponent(
    "LazyPartialSignUpContentCategory"
  ),
};

const view = computed(
  () =>
    components[currentTab.value as keyof typeof components] ||
    components[constants.BASIC_DETAILS]
);
definePageMeta({
  name: "signup",
});

const {
  isActiveTab: tab,
  isType: type,
  previousTab,
  currentTab,
  show,
} = useSignupTabController();
</script>

<style></style>
