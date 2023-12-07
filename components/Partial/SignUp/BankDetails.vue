<template>
  <div class="tm__box-598px">
    <div class="mb-[3.75rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Bank Details</h1>
      <p>Provide bank details.</p>
    </div>

    <div class="flex flex-col gap-[1rem]">
      <UiInputSelect
        class="w-full"
        v-model="form.language"
        placeholder="Select currency"
        :options="tools.generationOptions(['Naira', 'Dollar'])"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.street"
        placeholder="Account name"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.state"
        placeholder="Account number"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.country"
        placeholder="Bank name"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.street"
        placeholder="Bank address"
      />
      <UiInputText
        type="text"
        class="w-full mb-[3.25rem]"
        v-model="form.city"
        placeholder="Swift Code"
      />

      <UiButtonDefault
        :disabled="false"
        label="Continue"
        variant="primary"
        class="w-full py-[0.875rem] mb-[1.875rem]"
        @click="proceed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  profilePicture: undefined as string | File | undefined,
  companyRegDocs: [] as File[],
  language: "",
  country: "",
  state: "",
  street: "",
  city: "",
});

function proceed() {
  navigateTo({
    query: {
      tab: constants.CONTENT_CATEGORY,
    },
  });
}
</script>

<style></style>
