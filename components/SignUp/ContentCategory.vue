<template>
  <div>
    <div class="mb-[3.75rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Content Category Selection</h1>
      <p>
        Select the content category that best describes your Brand (max. of 2)
      </p>
    </div>

    <div class="flex flex-wrap justify-center mb-[2rem] gap-[1.25rem]">
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

    <div class="mb-[69px]">
      <div class="relative inline-block">
        <div
          class="absolute pl-[1.25rem] left-0 h-full inline-flex items-center"
        >
          Others:
        </div>
        <input
          type="text"
          class="pl-[75px] py-2 border !border-[#545454] rounded-[30px]"
          name="industries"
          placeholder="type in your industry"
          :value="form.selection"
        />
      </div>
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
const { notify } = useNotification();
const authStore = useAuthStore();

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
