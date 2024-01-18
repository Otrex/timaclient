<template>
  <div class="pt-[3.4375rem]">
    <div class="flex flex-col gap-[1.5rem]">
      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Deactivate</label>
        </div>
        <div class="flex items-center w-full">
          <div class="flex gap-[1.75rem]">
            <div>
              <UiInputSwitch v-model="notice" size="lg" />
            </div>
            <div class="flex flex-col">
              <span class="mb-[0.5625rem]"
                >I want to deactivate my account</span
              >
              <span class="text-[0.625rem]"
                >Get notified when there are important updates about the
                design</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">&nbsp;</div>
        <div class="flex items-center w-full">
          <div class="mb-[1.875rem] mt-[7.625rem] w-full">
            <UiButtonDefault
              label="Save Changes"
              variant="primary"
              class="w-full py-[0.875rem]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UPDATE_PASSWORD_RULE } from "~/lib/validation/rules";

const notice = ref();
const props = defineProps<{ isEditable?: boolean }>();
const form = reactive({
  currentPassword: "",
  confirmPassword: "",
  newPassword: "",
});

const profileStore = useProfileStore();
const { notify } = useNotification();

const { execute, validate, state, v$ } = useRequestState({
  action: () =>
    profileStore.updatePassword({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    }),
  validation: {
    config: { $autoDirty: true },
    rule: UPDATE_PASSWORD_RULE(form),
    form,
  },
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
      title: "Update Successful",
      text: "Password updated successfully",
    });
  },
});
</script>

<style></style>
