<template>
  <div>
    <div class="mb-[60px]">
      <h1 class="text-[39px] mb-[24px]">Complete profile</h1>
      <p>Provide influencer name & phone number</p>
    </div>

    <div class="flex flex-col gap-[16px]">
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
        class="w-full mb-[100px]"
        v-model="form.phone"
        placeholder="234 803 443 3833"
      />

      <UiButtonDefault
        :disabled="!isReady"
        label="Continue"
        variant="primary"
        @click="proceed"
        class="w-full py-[14px]"
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
</script>

<style></style>
