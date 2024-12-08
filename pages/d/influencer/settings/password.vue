<template>
  <div class="flex flex-col gap-[1.875rem]">
    <div class="pt-[3.4375rem] max-w-[65.875rem]">
      <div class="flex flex-col gap-[1.5rem]">
        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Current Password</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputText
              :error-message="
                v$.currentPassword.$errors[0]?.$message.toString()
              "
              v-model="form.currentPassword"
              :disabled="!isEditable"
              class="w-full"
              type="password"
              password-toggle
            />
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">New Password</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputText
              :error-message="v$.newPassword.$errors[0]?.$message.toString()"
              v-model="form.newPassword"
              :disabled="!isEditable"
              class="w-full"
              type="password"
              password-toggle
            />
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Confirm Password</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputText
              :error-message="
                v$.confirmPassword.$errors[0]?.$message.toString()
              "
              v-model="form.confirmPassword"
              :disabled="!isEditable"
              class="w-full"
              type="password"
              password-toggle
            />
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">&nbsp;</div>
          <div class="flex items-center w-full">
            <div class="mb-[1.875rem] mt-[7.625rem] w-full">
              <transition>
                <UiButtonDefault
                  v-show="isEditable"
                  @click="() => validate().then(() => execute())"
                  :disabled="state === constants.LOADING"
                  :loading="state === constants.LOADING"
                  class="w-full py-[0.875rem]"
                  label="Save Changes"
                  variant="primary"
                />
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UPDATE_PASSWORD_RULE } from "~/lib/validation/rules";
definePageMeta({
  name: "InfluencerSettingPassword",
});

const isEditable = inject<boolean>("isEditable");

const props = defineProps<{ isEditable?: boolean }>();
const form = reactive({
  currentPassword: "",
  confirmPassword: "",
  newPassword: "",
});

const api = useAPI();
const { notify } = useNotification();

const { execute, validate, state, v$ } = useRequestState({
  action: () =>
    api.changePassword({
      oldPassword: form.currentPassword,
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
