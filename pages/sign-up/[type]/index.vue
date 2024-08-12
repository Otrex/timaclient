<template>
  <div>
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
          <span>
            Already have an account?
            <NuxtLink
              to="/auth/login"
              class="text-red-600 text-[1.1875rem] underline underline-offset-2"
            >
              Log In
            </NuxtLink>
          </span>
        </div>
      </template>
      <div>
        <div class="text-center overflow-auto">
          <UtSvg
            name="logo/tima"
            class="max-w-[6.125rem] h-[2.4375rem] mb-3 mt-[0.625rem]"
          />
          <div
            v-if="
              $route.query.tab && $route.query.tab !== constants.BASIC_DETAILS
            "
            class="flex flex-row justify-end pr-4"
          >
            <UiProfileProgress :percent="percent" />
          </div>
          <div class="mb-[3.5625rem]"></div>
          <component :is="currentView.component" />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ProfileSetupState } from "~/lib/enums";

definePageMeta({
  name: "SignUp",
  middleware: ["register", "options"],
});

const authStore = useAuthStore();
const percent = computed(() => {
  const user = authStore.user;
  const progress = authStore.profile?.profileSetupProgress;
  if (!user) return 0;

  if (progress === ProfileSetupState.REGISTERED) {
    return 20;
  }

  if (progress === ProfileSetupState.PROFILE_SETUP) {
    return 80;
  }

  if (authStore.user!.hasVerifiedEmail) return 50;
});

const tabMap = {
  [constants.BASIC_DETAILS]: {
    component: resolveComponent("SignUpBasicDetails"),
    prev: { name: "index" },
    activeOthers: [constants.EMAIL_VERIFY],
    hideFrom: [],
  },
  [constants.EMAIL_VERIFY]: {
    component: resolveComponent("SignUpEmailVerify"),
    prev: { name: "index" },
    activeOthers: [constants.BASIC_DETAILS],
    hideFrom: [],
  },
  [constants.BASIC_INFORMATION]: {
    component: resolveComponent("SignUpBasicInformation"),
    prev: {
      query: {
        tab: constants.BASIC_DETAILS,
      },
    },
    activeOthers: [constants.BASIC_DETAILS],
    hideFrom: [constants.INFLUENCER],
  },
  [constants.ADDRESS_DOCUMENTATION]: {
    component: resolveComponent("SignUpAddressAndDocumentation"),
    prev: {
      query: {
        tab: constants.BASIC_INFORMATION,
        email: authStore.registration.email,
        username: authStore.registration.username,
      },
    },
    activeOthers: [constants.BASIC_DETAILS, constants.BASIC_INFORMATION],
    hideFrom: [],
  },
  [constants.INDUSTRY_SELECTION]: {
    component: resolveComponent("SignUpIndustrySelection"),
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
    component: resolveComponent("SignUpCompleteProfile"),
    prev: {
      query: {
        tab: constants.BASIC_DETAILS,
      },
    },
    activeOthers: [constants.BASIC_DETAILS],
    hideFrom: [constants.AGENCY],
  },
  [constants.BANK_DETAILS]: {
    component: resolveComponent("SignUpBankDetails"),
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
    component: resolveComponent("SignUpContentCategory"),
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
    component: resolveComponent("SignUpAddressAndDocumentationInfluencer"),
    prev: {
      query: {
        tab: constants.COMPLETE_PROFILE,
      },
    },
    activeOthers: [constants.BASIC_DETAILS, constants.COMPLETE_PROFILE],
    hideFrom: [],
  },
};

const { type, show, activeTabs, currentView } = useSignupTabController(tabMap);
</script>

<style></style>
