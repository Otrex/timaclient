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
        :disabled="!isReady || state === constants.LOADING"
        :loading="state === constants.LOADING"
        label="Continue"
        variant="primary"
        class="w-full py-[0.875rem]"
        @click="() => proceed()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const authStore = useAuthStore();
const { notify } = useNotification();
const optionsStore = useOptionsStore();

const form = reactive({
  selection: [] as string[],
});

const disable = (value: string) => {
  return form.selection.length >= 2 && !form.selection.includes(value);
};

const isReady = computed(() => form.selection.length);

const { execute: proceed, state } = useRequestState({
  action: () => authStore.updateIndustries(form.selection),
  onError(e) {
    notify({
      type: "error",
      title: e.title,
      text: e.description,
    });
  },
  onSuccess() {
    navigateTo({
      query: {
        tab: constants.REVIEW_PROFILE,
      },
    });
  },
});
</script>

<style></style>
