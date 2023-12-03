<template>
  <NuxtLayout :prev="{ query: { tab: 'basic-details' } }" name="kyc">
    <template #sidebar>
      <ul>
        <li class="mb-[48px]">
          <NavSignUpStep
            title="Basic details"
            desc="Please provide your name and details"
            :active="tab('basic-details') || tab('email-verify')"
          />
        </li>
        <li v-if="route.params.type === constants.AGENCY" class="mb-[48px]">
          <NavSignUpStep
            title="Basic information"
            desc="Provide company name & phone number"
            :active="tab('basic-information')"
          />
        </li>
        <li v-if="route.params.type === constants.INFLUENCER" class="mb-[48px]">
          <NavSignUpStep
            title="Complete Profile"
            desc="Please provide your name and details"
            :active="tab('complete-profile')"
          />
        </li>
        <li class="mb-[48px]">
          <NavSignUpStep
            title="Address & documentation"
            desc="Provide address & necessary documentation"
            :active="tab('address-documentation')"
          />
        </li>
        <li v-if="route.params.type === constants.AGENCY" class="mb-[48px]">
          <NavSignUpStep
            title="Industry selection"
            desc="Select the industry that best describes your Brand (max. of 2)"
            :active="tab('industry-selection')"
          />
        </li>
        <li v-if="route.params.type === constants.INFLUENCER" class="mb-[48px]">
          <NavSignUpStep
            title="Bank Details"
            desc="Provide bank details"
            :active="tab('industry-selection')"
          />
        </li>
        <li v-if="route.params.type === constants.INFLUENCER" class="mb-[48px]">
          <NavSignUpStep
            title="Content Category"
            desc="Select the industry that best describes your Brand (max. of 2)"
            :active="tab('industry-selection')"
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
        <PartialSignUpBasicDetails v-if="route.query.tab === 'basic-details'" />
        <PartialSignUpEmailVerify
          v-else-if="route.query.tab === 'email-verify'"
        />
        <PartialSignUpCompleteProfile
          v-else-if="route.query.tab === 'complete-profile'"
        />
        <PartialSignUpBasicInformation
          v-else-if="route.query.tab === 'basic-information'"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  name: "signup",
});

const route = useRoute();

function tab(name: string): boolean {
  return route.query.tab === name;
}

const previousTab = computed(() => "/sandbox");
</script>

<style></style>
