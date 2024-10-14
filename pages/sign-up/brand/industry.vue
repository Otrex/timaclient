<template>
  <section>
    <div class="flex flex-row justify-end pr-4 mb-5">
      <UiProfileProgress :percent="authStore.progress" />
    </div>
    <UtSpinner v-if="isLoading" />
    <div v-else>
      <div class="mb-[3.75rem]">
        <h1 class="text-[2.4375rem] mb-[1.5rem]">Industry selection</h1>
        <p>Select the industry that best describes your Brand (max. of 2)</p>
      </div>

      <div class="flex flex-wrap justify-center gap-[1.25rem] mb-6">
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

      <div class="mb-[4.3125rem] flex items-center">
        <div class="relative max-w-[31.25rem] w-full mx-auto">
          <span class="absolute text-black pl-5 py-3">Others: </span>
          <input
            type="text"
            class="pl-20 py-3 w-full bg-gray-200 dark:text-gray-600 rounded-3xl"
            placeholder="type in your industry"
            v-model="form.industry"
            :disabled="form.selection.length >= 2"
          />
        </div>
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
  </section>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const { notify } = useNotification();
const optionsStore = useOptionsStore();
const isLoading = ref(true);

definePageMeta({
  name: "SignUpBrandIndustry",
  middleware: [
    async function () {
      await useAuthStore().getProfile();
    },
  ],
});

const form = reactive({
  selection: [] as string[],
  industry: "",
});

const isReady = computed(() => form.selection.length);
const disable = (value: string) => {
  return form.selection.length >= 2 && !form.selection.includes(value);
};

const { execute: proceed, state } = useRequestState({
  action: () =>
    authStore.updateIndustries([
      ...form.selection,
      ...(form.industry ? [form.industry] : []),
    ]),
  onError(e) {
    console.log(e);

    notify({
      type: "error",
      title: e.title,
      text: e.description,
    });
  },
  onSuccess() {
    navigateTo({
      name: "SignUpBrandReviewProfile",
    });
  },
});

async function getOptions() {
  try {
    isLoading.value = true;
    await optionsStore.getIndustries();
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getOptions();
});
</script>

<style></style>
