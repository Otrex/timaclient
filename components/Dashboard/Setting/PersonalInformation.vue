<template>
  <div class="pt-[3.4375rem] max-w-[65.875rem]">
    <div class="flex flex-col gap-[1.5rem]">
      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Full name</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText
            :disabled="!props.isEditable"
            v-model="form.fullName"
            class="w-full"
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
            v-model="form.phoneNumber"
            class="w-full"
          />
        </div>
      </div>

      <div
        v-if="authStore.authorization.userType === 'INFLUENCER'"
        class="flex md:flex-row flex-col"
      >
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Bio</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputTextArea
            :disabled="!props.isEditable"
            v-model="form.bio"
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
  </div>
</template>

<script setup lang="ts">
import { UPDATE_INFLUENCER_USER_RULE } from "~/lib/validation/rules";

const props = defineProps<{ isEditable?: boolean }>();
const profileStore = useProfileStore();
const authStore = useAuthStore();
const { notify } = useNotification();

const form = reactive({
  bio: "",
  email: "",
  fullName: "",
  phoneNumber: "",
});

function updateForm() {
  const profile = profileStore.$profile;

  if (profile) {
    form.phoneNumber = profile.phoneNumber;
    form.fullName = profile.totalFullName;
    form.email = profile.email;
    form.bio = profile.bio || "";
  }
}

watch(() => profileStore.$profile, updateForm);

onMounted(updateForm);

const { execute, validate, state, v$ } = useRequestState({
  action: () => {
    const extract = tools.extractName(form.fullName!);
    const phoneNumber =
      typeof form.phoneNumber !== "string"
        ? (form.phoneNumber as any)?.number!
        : form.phoneNumber;

    const formPayload = {
      email: form.email!,
      phoneNumber: phoneNumber,
      lastName: extract.lastName,
      firstName: extract.firstName,
      bio: form.bio,
    };

    return profileStore.updatePersonalProfile({
      ...(extract.length > 2 ? { middleName: extract.middleName } : {}),
      ...formPayload,
    });
  },
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
