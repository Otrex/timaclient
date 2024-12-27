<template>
  <div>
    <div class="pt-[3.4375rem] max-w-[65.875rem]">
      <div class="flex flex-col gap-[1.5rem]">
        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">First name</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputText
              :disabled="!isEditable"
              v-model="form.firstName"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Last name</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputText
              :disabled="!isEditable"
              v-model="form.lastName"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Username</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputText
              :disabled="!isEditable"
              v-model="form.userName"
              class="w-full"
              :class="
                isValidUserName ? '!border-green-500 !border !border-solid' : ''
              "
              @keyup.prevent="() => isEditable && verify()"
            />
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Phone Number</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputPhone
              :disabled="!isEditable"
              v-model="form.phoneNumber"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Address</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputText
              :disabled="!isEditable"
              class="w-full"
              type="email"
              v-model="form.address"
            />
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Email Address</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputText
              :disabled="!isEditable"
              class="w-full"
              type="email"
              v-model="form.emailAddress"
            />
          </div>
        </div>

        <div class="flex md:flex-row flex-col">
          <div class="max-w-[22.125rem] w-full">
            <label class="text-[1.25rem] font-medium">Documents</label>
          </div>
          <div class="flex items-center w-full">
            <UiInputUpload
              class="w-full mb-[3.125rem]"
              type="pics"
              v-model:file="form.documentUpload"
              placeholder="Documents"
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
                  @click="() => execute()"
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
import { useDebounceFn } from "@vueuse/core";

definePageMeta({
  name: "InfluencerSettingPersonal",
});

const isValidUserName = ref(false);
const authStore = useAuthStore();

const profileStore = useProfileStore();
const { notify } = useNotification();

const api = useAPI();
const isEditable = inject<boolean>("isEditable");

const form = reactive<{
  address?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  documentUpload: File | null;
  emailAddress?: string;
  phoneNumber?: string;
}>({
  address: "",
  firstName: "",
  lastName: "",
  userName: "",
  documentUpload: null,
  emailAddress: "",
  phoneNumber: "",
});

function updateForm() {
  const profile = authStore.profile;

  if (profile) {
    form.phoneNumber = profile.phoneNumber;
    form.userName = profile.userName;
    form.firstName = profile.firstName;
    form.lastName = profile.lastName;
    form.address = profile.address;
    form.emailAddress = profile.emailAddress;
  }
}

watch(() => profileStore.$profile, updateForm);

onMounted(updateForm);

const { execute: verifyUsername, state: verifying } = useRequestState({
  action: (value: string) => api.verifyUsername(value),
  onError(e) {
    if (e.__error?.response?.data?.message) {
      isValidUserName.value = false;
    }
  },
  onSuccess(response) {
    isValidUserName.value = response.statusCode === 200 ? true : false;
  },
});

const verify = useDebounceFn(
  () => form.userName && verifyUsername(form.userName),
  1000,
  { maxWait: 2000 }
);

const { execute, state } = useRequestState({
  action: () => {
    const { userName, ...others } = form;
    return authStore.updateProfile({
      ...others,
      ...(typeof form.phoneNumber === "object" && "number" in form.phoneNumber
        ? { phoneNumber: (form.phoneNumber as any)?.number }
        : { phoneNumber: form.phoneNumber }),
      ...(userName === authStore.profile?.userName ? {} : { userName }),
    });
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

    authStore.getProfile();
  },
});
</script>

<style></style>
