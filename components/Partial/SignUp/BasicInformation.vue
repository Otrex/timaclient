<template>
  <div>
    <div class="mb-[60px]">
      <h1 class="text-[39px] mb-[24px]">Basic Information</h1>
      <p>Provide company name & phone number</p>
    </div>

    <div class="flex flex-col gap-[16px]">
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.companyName"
        placeholder="Company name"
      />
      <UiInputPhone
        class="w-full"
        v-model="form.phone"
        placeholder="234 803 443 3833"
      />
      <UiInputText
        type="text"
        class="w-full mb-[50px]"
        v-model="form.website"
        placeholder="Website (If available)"
      />

      <UiButtonDefault
        :disabled="true"
        label="Continue"
        variant="primary"
        class="w-full py-[14px]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  companyName: "",
  website: "",
  phone: "",
});
</script>

<style></style>
