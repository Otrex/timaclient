<template>
  <div class="tm__box-598px">
    <div class="mb-[3.75rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Complete profile</h1>
      <p>Provide influencer name & phone number</p>
    </div>

    <div class="flex flex-col gap-[1rem]">
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.firstName"
        placeholder="First name"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.middleName"
        placeholder="Middle name"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.lastName"
        placeholder="Last name"
      />
      <UiInputPhone
        class="w-full mb-[3.25rem]"
        v-model="form.phone"
        placeholder="234 803 443 3833"
      />

      <UiButtonDefault
        label="Continue"
        variant="primary"
        @click="proceed"
        class="w-full py-[0.875rem]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  firstName: "",
  lastName: "",
  middleName: "",
  phone: "",
});

function proceed() {
  navigateTo({
    query: {
      tab: constants.ADDRESS_DOCUMENTATION_INFLUENCER,
    },
  });
}
</script>

<style></style>
