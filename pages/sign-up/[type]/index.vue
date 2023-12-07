<template>
  <NuxtLayout :prev="currentView.prev" name="kyc">
    <template #sidebar>
      <SignUpNavigatorAgency
        v-if="type(constants.AGENCY)"
        :activeTabs="activeTabs"
      />
      <SignUpNavigatorInfluencer
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
    component: resolveComponent("LazySignUpBasicDetails"),
    prev: { name: "index" },
    activeOthers: [constants.EMAIL_VERIFY],
    hideFrom: [],
  },
  [constants.EMAIL_VERIFY]: {
    component: resolveComponent("LazySignUpEmailVerify"),
    prev: { name: "index" },
    activeOthers: [constants.BASIC_DETAILS],
    hideFrom: [],
  },
  [constants.BASIC_INFORMATION]: {
    component: resolveComponent("LazySignUpBasicInformation"),
    prev: {
      query: {
        tab: constants.BASIC_DETAILS,
      },
    },
    activeOthers: [constants.BASIC_DETAILS],
    hideFrom: [constants.INFLUENCER],
  },
  [constants.ADDRESS_DOCUMENTATION]: {
    component: resolveComponent("LazySignUpAddressAndDocumentation"),
    prev: {
      query: {
        tab: constants.BASIC_INFORMATION,
      },
    },
    activeOthers: [constants.BASIC_DETAILS, constants.BASIC_INFORMATION],
    hideFrom: [],
  },
  [constants.INDUSTRY_SELECTION]: {
    component: resolveComponent("LazySignUpIndustrySelection"),
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
    component: resolveComponent("LazySignUpCompleteProfile"),
    prev: {
      query: {
        tab: constants.BASIC_DETAILS,
      },
    },
    activeOthers: [constants.BASIC_DETAILS],
    hideFrom: [constants.AGENCY],
  },
  [constants.BANK_DETAILS]: {
    component: resolveComponent("LazySignUpBankDetails"),
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
    component: resolveComponent("LazySignUpContentCategory"),
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
    component: resolveComponent("LazySignUpAddressAndDocumentationInfluencer"),
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

const userType = computed(
  () => (route.params.type || "influencer") as string //
);

const currentView = computed(() => tabMap[currentTab.value]);

const activeTabs = computed(() => [
  currentTab.value,
  ...tabMap[currentTab.value].activeOthers,
]);

const show = (tab: keyof typeof tabMap) => {
  return (
    currentTab.value === tab &&
    !(tabMap[tab].hideFrom as string[]).includes(userType.value)
  );
};

const type = (type: string) => {
  return userType.value === type;
};
</script>

<style></style>
