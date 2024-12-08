<template>
  <div class="mt-9">
    <div
      class="flex text-center pt-3 flex-wrap justify-center mb-[4.3125rem] gap-[1.25rem]"
    >
      <UiInputOption
        class="!text-[1rem] min-w-[4.6875rem]"
        v-for="(option, idx) in optionsStore.$industries"
        :disabled="disable(option) || !props.isEditable"
        v-model="form.selection"
        :value="option"
        name="industry"
        :label="option"
        type="multi"
        :key="idx"
      />
    </div>

    <div class="flex flex-col gap-[1rem] tm__box-598px mb-[1.875rem]">
      <transition>
        <UiButtonDefault
          label="Save Update"
          :disabled="state === constants.LOADING"
          :loading="state === constants.LOADING"
          class="w-full py-[0.875rem]"
          v-show="props.isEditable"
          @click="() => proceed()"
          variant="primary"
        />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ isEditable?: boolean }>();
const optionsStore = useOptionsStore();
const { notify } = useNotification();
const profileStore = useProfileStore();

const form = useWatchedForm({
  monitor: profileStore.industries,
  updater: () => {
    form.selection = profileStore.industries;
  },
  fields: {
    selection: [] as string[],
  },
});

const disable = (value: string) => {
  return form.selection.length >= 2 && !form.selection.includes(value);
};

const { execute: proceed, state } = useRequestState({
  action: () => profileStore.updateIndustries(form.selection),
  onError(e) {
    notify({
      type: "error",
      title: e.title,
      text: e.description,
    });
  },
  onSuccess() {
    notify({
      type: "success",
      title: "Update Successful!",
      text: "Your industry has been updated",
    });
  },
});
</script>

<style></style>
