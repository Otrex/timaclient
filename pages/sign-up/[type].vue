<template>
  <NuxtLayout :prev="previousTab(currentTab)" name="kyc">
    <template #sidebar>
      <ul>
        <li class="mb-[3rem]">
          <NavSignUpStep
            title="Basic details"
            desc="Please provide your name and details"
            :active="tab(constants.BASIC_DETAILS)"
          />
        </li>
        <li v-if="type(constants.AGENCY)" class="mb-[3rem]">
          <NavSignUpStep
            title="Basic information"
            desc="Provide company name & phone number"
            :active="tab(constants.BASIC_INFORMATION)"
          />
        </li>
        <li v-if="type(constants.INFLUENCER)" class="mb-[3rem]">
          <NavSignUpStep
            title="Complete Profile"
            desc="Please provide your name and details"
            :active="tab(constants.COMPLETE_PROFILE)"
          />
        </li>
        <li class="mb-[3rem]">
          <NavSignUpStep
            title="Address & documentation"
            desc="Provide address & necessary documentation"
            :active="tab(constants.ADDRESS_DOCUMENTATION)"
          />
        </li>
        <li v-if="type(constants.AGENCY)" class="mb-[3rem]">
          <NavSignUpStep
            title="Industry selection"
            desc="Select the industry that best describes your Brand (max. of 2)"
            :active="tab(constants.INDUSTRY_SELECTION)"
          />
        </li>
        <li v-if="type(constants.INFLUENCER)" class="mb-[3rem]">
          <NavSignUpStep
            title="Bank Details"
            desc="Provide bank details"
            :active="tab(constants.BANK_DETAILS)"
          />
        </li>
        <li v-if="type(constants.INFLUENCER)" class="mb-[3rem]">
          <NavSignUpStep
            title="Content Category"
            desc="Select the industry that best describes your Brand (max. of 2)"
            :active="tab(constants.CONTENT_CATEGORY)"
          />
        </li>
      </ul>
    </template>
    <template #topnav>
      <div
        v-if="currentTab === 'basic-details'"
        class="items-center flex justify-end"
      >
        <span
          >Already have an account?
          <NuxtLink
            class="text-red-600 text-[1.1875rem] underline underline-offset-2"
            >Log In</NuxtLink
          ></span
        >
      </div>
    </template>
    <div>
      <div class="text-center tm__box-598px">
        <UtSvg
          name="logo/tima"
          class="max-w-[6.125rem] h-[2.4375rem] mb-[3.5625rem] mt-[0.625rem]"
        />
        <transition name="page" mode="out-in">
          <PartialSignUpBasicDetails
            v-if="currentTab === constants.BASIC_DETAILS"
          />
          <PartialSignUpEmailVerify
            v-else-if="currentTab === constants.EMAIL_VERIFY"
          />
          <PartialSignUpCompleteProfile
            v-else-if="currentTab === constants.COMPLETE_PROFILE"
          />
          <PartialSignUpBasicInformation
            v-else-if="currentTab === constants.BASIC_INFORMATION"
          />
        </transition>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  name: "signup",
});

const {
  isActiveTab: tab,
  isType: type,
  previousTab,
  currentTab,
  userType,
} = useSignupTabController();
</script>

<style></style>
