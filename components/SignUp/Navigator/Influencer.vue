<template>
  <ul>
    <li class="mb-[3rem]">
      <NavSignUpStep
        title="Basic details"
        desc="Please provide your name and details"
        :active="tab(constants.BASIC_DETAILS)"
      />
    </li>

    <li class="mb-[3rem]">
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
        :active="tab(constants.ADDRESS_DOCUMENTATION_INFLUENCER)"
      />
    </li>

    <li class="mb-[3rem]">
      <NavSignUpStep
        title="Bank Details"
        desc="Provide bank details"
        :active="tab(constants.BANK_DETAILS)"
      />
    </li>
    <li class="mb-[3rem]">
      <NavSignUpStep
        title="Content Category"
        desc="Select the industry that best describes your Brand (max. of 2)"
        :active="tab(constants.CONTENT_CATEGORY)"
      />
    </li>
  </ul>
</template>
<script setup lang="ts">
const props = defineProps<{
  activeTabs: (keyof typeof constants | string)[];
}>();

const tab = (tab: keyof typeof constants | string) => {
  return props.activeTabs.includes(tab);
};
</script>
