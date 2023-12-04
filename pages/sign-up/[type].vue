<template>
  <NuxtLayout :prev="previousTab(currentTab)" name="kyc">
    <template #sidebar>
      <ul>
        <li class="mb-[48px]">
          <NavSignUpStep
            title="Basic details"
            desc="Please provide your name and details"
            :active="tab(constants.BASIC_DETAILS, constants.EMAIL_VERIFY)"
          />
        </li>
        <li v-if="route.params.type === constants.AGENCY" class="mb-[48px]">
          <NavSignUpStep
            title="Basic information"
            desc="Provide company name & phone number"
            :active="tab(constants.BASIC_INFORMATION)"
          />
        </li>
        <li v-if="route.params.type === constants.INFLUENCER" class="mb-[48px]">
          <NavSignUpStep
            title="Complete Profile"
            desc="Please provide your name and details"
            :active="tab(constants.COMPLETE_PROFILE)"
          />
        </li>
        <li class="mb-[48px]">
          <NavSignUpStep
            title="Address & documentation"
            desc="Provide address & necessary documentation"
            :active="tab(constants.ADDRESS_DOCUMENTATION)"
          />
        </li>
        <li v-if="route.params.type === constants.AGENCY" class="mb-[48px]">
          <NavSignUpStep
            title="Industry selection"
            desc="Select the industry that best describes your Brand (max. of 2)"
            :active="tab(constants.INDUSTRY_SELECTION)"
          />
        </li>
        <li v-if="route.params.type === constants.INFLUENCER" class="mb-[48px]">
          <NavSignUpStep
            title="Bank Details"
            desc="Provide bank details"
            :active="tab(constants.BANK_DETAILS)"
          />
        </li>
        <li v-if="route.params.type === constants.INFLUENCER" class="mb-[48px]">
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
        v-if="route.query.tab === 'basic-details'"
        class="items-center flex justify-end"
      >
        <span
          >Already have an account?
          <NuxtLink
            class="text-red-600 text-[19px] underline underline-offset-2"
            >Log In</NuxtLink
          ></span
        >
      </div>
    </template>
    <div>
      <div class="text-center tm__box-598px">
        <UtSvg
          name="logo/tima"
          class="max-w-[98px] h-[39px] mb-[57px] mt-[10px]"
        />
        <transition name="page" mode="out-in">
          <PartialSignUpBasicDetails
            v-if="route.query.tab === constants.BASIC_DETAILS"
          />
          <PartialSignUpEmailVerify
            v-else-if="route.query.tab === constants.EMAIL_VERIFY"
          />
          <PartialSignUpCompleteProfile
            v-else-if="route.query.tab === constants.COMPLETE_PROFILE"
          />
          <PartialSignUpBasicInformation
            v-else-if="route.query.tab === constants.BASIC_INFORMATION"
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

const route = useRoute();

function tab(...names: string[]): boolean {
  return names.includes(currentTab.value);
}

const currentTab = computed(
  () => (route.query.tab || "basic-details") as keyof typeof tabMap
);

const tabMap = {
  [constants.BASIC_DETAILS]: { name: "index" },
  [constants.BASIC_INFORMATION]: { query: { tab: constants.BASIC_DETAILS } },
};

function previousTab(tab: keyof typeof tabMap) {
  return tabMap[tab] || { query: { tab: constants.BASIC_DETAILS } };
}
</script>

<style></style>
