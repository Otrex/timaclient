<template>
  <div class="pt-[3.4375rem]">
    <div class="flex flex-col gap-[1.5rem]">
      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Current Password</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText class="w-full" type="password" password-toggle />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">New Password</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText
            class="w-full"
            type="password"
            password-toggle
            error-message="Your new password should not be less than 8 characters"
          />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Confirm Password</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText class="w-full" type="password" password-toggle />
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
const form = reactive({
  currentPassword: "",
  confirmPassword: "",
  newPassword: "",
});

const profileStore = useProfileStore();
const { notify } = useNotification();
</script>

<style></style>
