<template>
  <div class="tm__box-598px">
    <div class="mb-[3.75rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Basic Information</h1>
      <p>Provide company name & phone number</p>
    </div>

    <div class="flex flex-col gap-[1rem]">
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
        class="w-full mb-[3.125rem]"
        v-model="form.website"
        placeholder="Website (If available)"
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
  companyName: "",
  website: "",
  phone: "",
});

function proceed() {
  navigateTo({
    query: {
      tab: constants.ADDRESS_DOCUMENTATION,
    },
  });
}

const isReady = computed(() => {
  return form.website && form.phone && form.companyName;
});
</script>

<style></style>
