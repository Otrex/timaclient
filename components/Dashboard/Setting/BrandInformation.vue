<template>
  <div class="pt-[3.4375rem] max-w-[65.875rem]">
    <ClientOnly>
      <div class="flex flex-col gap-[1.5rem]">
        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Company name</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputText
              :disabled="!props.isEditable"
              v-model="form.companyName"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Company Website</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputText
              :disabled="!props.isEditable"
              class="w-full"
              v-model="form.website"
            />
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Email Address</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputText
              :disabled="!props.isEditable"
              class="w-full"
              type="email"
              v-model="form.email"
            />
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Phone</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputPhone
              :disabled="!props.isEditable"
              :data-model="profileStore.$profile?.phoneNumber"
              :value="profileStore.$profile?.phoneNumber"
              v-model="form.phoneNumber"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">&nbsp;</div>
          <div class="flex items-center w-full">
            <div class="mb-[1.875rem] mt-[7.625rem] w-full">
              <transition>
                <UiButtonDefault
                  v-show="props.isEditable"
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
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { UPDATE_INFLUENCER_USER_RULE } from "~/lib/validation/rules";

const props = defineProps<{ isEditable?: boolean }>();
const profileStore = useProfileStore();
const { notify } = useNotification();

const form = useWatchedForm({
  monitor: profileStore.profile?.profile,
  fields: {
    companyName: "",
    website: "",
    phoneNumber: "",
    email: "",
  },
});

const { execute, validate, state, v$ } = useRequestState({
  action: () => profileStore.updateBrandInformation(form),
  validation: {
    config: { $autoDirty: true },
    rule: UPDATE_INFLUENCER_USER_RULE,
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
      text: "Your personal information has been updated",
    });
  },
});
</script>

<style></style>
