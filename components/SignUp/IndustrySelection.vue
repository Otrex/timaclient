<template>
  <div>
    <div class="mb-[3.75rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Industry selection</h1>
      <p>Select the industry that best describes your Brand (max. of 2)</p>
    </div>

    <div class="flex flex-wrap justify-center mb-[4.3125rem] gap-[1.25rem]">
      <UiInputOption
        class="!text-[1rem] min-w-[4.6875rem]"
        v-for="(option, idx) in optionsStore.$industries"
        :disabled="disable(option)"
        :key="idx"
        :value="option"
        :label="option"
        type="multi"
        name="industry"
        v-model="form.selection"
      />
    </div>

    <div class="flex flex-col gap-[1rem] tm__box-598px mb-[1.875rem]">
      <UiButtonDefault
        :disabled="!isReady"
        label="Continue"
        variant="primary"
        class="w-full py-[0.875rem]"
        @click="proceed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const optionsStore = useOptionsStore();

const form = reactive({
  selection: [] as string[],
});

const disable = (value: string) => {
  return form.selection.length >= 2 && !form.selection.includes(value);
};

const options = [
  "Arts",
  "Film & photography",
  "Consultancy",
  "Education",
  "Business & Entrepreneurship",
  "Family & parenting",
  "Fashion",
  "Finance",
  "Beauty &cosmetics",
  "Gaming",
  "Design",
  "General services",
  "Health & medicine",
  "Lifestyle",
  "Music & record label",
  "Real estate & construction",
  "Regional/ ethnic culture",
  "Relationships & dating",
  "Sports & events",
];

function proceed() {
  navigateTo(`/sign-up/${route.params.type}/review`);
}

const isReady = computed(() => form.selection.length);
</script>

<style></style>
