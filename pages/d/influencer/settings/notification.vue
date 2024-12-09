<template>
  <div class="pt-[3.4375rem] max-w-[65.875rem]">
    <div class="flex flex-col gap-[1.5rem]">
      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Campaign Updates</label>
        </div>
        <div class="flex items-center w-full">
          <div class="flex gap-[1.75rem]">
            <div class="mt-[0.1875rem]">
              <UiInputSwitch
                :disabled="!isEditable"
                v-model="form.campaignUpdateAlert"
                size="lg"
              />
            </div>
            <div class="flex flex-col">
              <span class="mb-[0.3125rem]"
                >I want to receive notifications on updates</span
              >
              <span class="text-[0.75rem]"
                >Get notified when there are important updates about the
                design</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium"
            >Payment Notifications</label
          >
        </div>
        <div class="flex items-center w-full">
          <div class="flex gap-[1.75rem]">
            <div class="mt-[0.1875rem]">
              <UiInputSwitch
                :disabled="!isEditable"
                v-model="form.paymentUpdateAlert"
                size="lg"
              />
            </div>
            <div class="flex flex-col">
              <span class="mb-[0.3125rem]"
                >I want to receive payment notifications</span
              >
              <span class="text-[0.75rem]"
                >Get notified when i have been paid.</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">&nbsp;</div>
        <div class="flex items-center w-full">
          <div class="mb-[1.875rem] mt-[7.625rem] w-full">
            <transition>
              <UiButtonDefault
                v-show="isEditable"
                @click="() => execute()"
                :disabled="state === constants.LOADING"
                :loading="state === constants.LOADING"
                label="Save Changes"
                variant="primary"
                class="w-full py-[0.875rem]"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "InfluencerSettingNotification",
});

const isEditable = inject<boolean>("isEditable");

const profileStore = useProfileStore();
const { notify } = useNotification();

const form = useWatchedForm({
  monitor: profileStore.$profile?.notificationSetting,
  fields: {
    campaignUpdateAlert: false,
    paymentUpdateAlert: false,
  },
});

const { execute, state } = useRequestState({
  action: () => profileStore.updateNotificationSettings(form),
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
      text: "Your Notification settings has been updated",
    });
  },
});
</script>

<style></style>

<script setup lang="ts"></script>

<style></style>
