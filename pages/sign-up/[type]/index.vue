<template>
  <NuxtLayout :prev="currentView.prev" name="kyc">
    <template #sidebar>
      <PartialSignUpNavbarAgency
        v-if="type(constants.AGENCY)"
        :activeTabs="activeTabs"
      />
      <PartialSignUpNavbarInfluencer
        v-if="type(constants.INFLUENCER)"
        :activeTabs="activeTabs"
      />
    </template>
    <template #topnav>
      <div
        v-if="show(constants.BASIC_DETAILS)"
        class="items-center flex justify-end"
      >
        <span
          >Already have an account?
          <NuxtLink
            to="/auth/login"
            class="text-red-600 text-[1.1875rem] underline underline-offset-2"
            >Log In</NuxtLink
          >
        </span>
      </div>
    </template>
    <div>
      <div class="text-center overflow-auto">
        <UtSvg
          name="logo/tima"
          class="max-w-[6.125rem] h-[2.4375rem] mb-[3.5625rem] mt-[0.625rem]"
        />
        <transition name="page" mode="out-in">
          <component :is="currentView.component" />
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

const tabMap = {
  [constants.BASIC_DETAILS]: {
    component: resolveComponent("LazyPartialSignUpBasicDetails"),
    prev: { name: "index" },
    activeOthers: [constants.EMAIL_VERIFY],
    hideFrom: [],
  },
  [constants.EMAIL_VERIFY]: {
    component: resolveComponent("LazyPartialSignUpEmailVerify"),
    prev: { name: "index" },
    activeOthers: [constants.BASIC_DETAILS],
    hideFrom: [],
  },
  [constants.BASIC_INFORMATION]: {
    component: resolveComponent("LazyPartialSignUpBasicInformation"),
    prev: {
      query: {
        tab: constants.BASIC_DETAILS,
      },
    },
    activeOthers: [constants.BASIC_DETAILS],
    hideFrom: [constants.INFLUENCER],
  },
  [constants.ADDRESS_DOCUMENTATION]: {
    component: resolveComponent("LazyPartialSignUpAddressAndDocumentation"),
    prev: {
      query: {
        tab: constants.BASIC_INFORMATION,
      },
    },
    activeOthers: [constants.BASIC_DETAILS, constants.BASIC_INFORMATION],
    hideFrom: [],
  },
  [constants.INDUSTRY_SELECTION]: {
    component: resolveComponent("LazyPartialSignUpIndustrySelection"),
    prev: {
      query: {
        tab: constants.ADDRESS_DOCUMENTATION,
      },
    },
    activeOthers: [
      constants.BASIC_DETAILS,
      constants.BASIC_INFORMATION,
      constants.ADDRESS_DOCUMENTATION,
    ],
    hideFrom: [constants.INFLUENCER],
  },
  [constants.COMPLETE_PROFILE]: {
    component: resolveComponent("LazyPartialSignUpCompleteProfile"),
    prev: {
      query: {
        tab: constants.BASIC_DETAILS,
      },
    },
    activeOthers: [constants.BASIC_DETAILS],
    hideFrom: [constants.AGENCY],
  },
  [constants.BANK_DETAILS]: {
    component: resolveComponent("LazyPartialSignUpBankDetails"),
    prev: {
      query: {
        tab: constants.ADDRESS_DOCUMENTATION_INFLUENCER,
      },
    },
    activeOthers: [
      constants.BASIC_DETAILS,
      constants.COMPLETE_PROFILE,
      constants.ADDRESS_DOCUMENTATION_INFLUENCER,
    ],
    hideFrom: [constants.INFLUENCER],
  },
  [constants.CONTENT_CATEGORY]: {
    component: resolveComponent("LazyPartialSignUpContentCategory"),
    prev: {
      query: {
        tab: constants.BANK_DETAILS,
      },
    },
    activeOthers: [
      constants.BANK_DETAILS,
      constants.BASIC_DETAILS,
      constants.COMPLETE_PROFILE,
      constants.ADDRESS_DOCUMENTATION_INFLUENCER,
    ],
    hideFrom: [constants.INFLUENCER],
  },
  [constants.ADDRESS_DOCUMENTATION_INFLUENCER]: {
    component: resolveComponent(
      "LazyPartialSignUpAddressAndDocumentationInfluencer"
    ),
    prev: {
      query: {
        tab: constants.COMPLETE_PROFILE,
      },
    },
    activeOthers: [constants.BASIC_DETAILS, constants.COMPLETE_PROFILE],
    hideFrom: [],
  },
};

const currentTab = computed(
  () => (route.query.tab || "basic-details") as keyof typeof tabMap
);

const currentView = computed(() => tabMap[currentTab.value]);

const activeTabs = computed(() => [
  currentTab.value,
  ...tabMap[currentTab.value].activeOthers,
]);

const { isType: type, show } = useSignupTabController(tabMap);
</script>

<style></style>
