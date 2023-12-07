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
        title="Basic information"
        desc="Provide company name & phone number"
        :active="tab(constants.BASIC_INFORMATION)"
      />
    </li>
    <li class="mb-[3rem]">
      <NavSignUpStep
        title="Address & documentation"
        desc="Provide address & necessary documentation"
        :active="tab(constants.ADDRESS_DOCUMENTATION)"
      />
    </li>
    <li class="mb-[3rem]">
      <NavSignUpStep
        title="Industry selection"
        desc="Select the industry that best describes your Brand (max. of 2)"
        :active="tab(constants.INDUSTRY_SELECTION)"
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
