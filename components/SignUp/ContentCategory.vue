<template>
  <div>
    <div class="mb-[3.75rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Content Category Selection</h1>
      <p>
        Select the content category that best describes your Brand (max. of 2)
      </p>
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
        label="Continue"
        variant="primary"
        :disabled="state === constants.LOADING"
        :loading="state === constants.LOADING"
        class="w-full py-[0.875rem]"
        @click="() => proceed()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const optionsStore = useOptionsStore();
const authStore = useAuthStore();
const { notify } = useNotification();

const { execute: proceed, state } = useRequestState({
  action: () => authStore.updateBrandIndustries(form.selection),
  onError(e) {
    notify({
      type: "error",
      title: e.title,
      text: e.description,
    });
  },
  onSuccess() {
    navigateTo({
      name: "SignUpSocials",
    });
  },
});

const form = reactive({
  selection: [] as string[],
});

const disable = (value: string) => {
  return form.selection.length >= 2 && !form.selection.includes(value);
};
</script>

<style></style>
