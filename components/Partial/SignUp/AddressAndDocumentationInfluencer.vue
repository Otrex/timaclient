<template>
  <div class="tm__box-598px">
    <div class="mb-[3.75rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Address & Documentation</h1>
      <p>Provide address & necessary documentation</p>
    </div>

    <div class="flex flex-col gap-[1rem]">
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.street"
        placeholder="Street"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.city"
        placeholder="City"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.state"
        placeholder="State"
      />
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.country"
        placeholder="Country"
      />
      <UiInputSelect
        class="w-full"
        v-model="form.language"
        placeholder="Language"
        :options="tools.generationOptions(['English', 'French'])"
      />
      <UiInputUpload
        class="w-full"
        v-model:file="form.companyRegDocs"
        placeholder="Upload government issued identification"
      />
      <UiInputUpload
        class="w-full mb-[3.125rem]"
        :multi="true"
        v-model="form.profilePicture"
        placeholder="Upload Profile picture"
      />

      <UiButtonDefault
        :disabled="false"
        label="Continue"
        variant="primary"
        class="w-full py-[0.875rem]"
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
      tab: constants.BANK_DETAILS,
    },
  });
}
</script>

<style></style>
