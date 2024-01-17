<template>
  <div class="pt-[3.4375rem]">
    <div class="flex flex-col gap-[1.5rem]">
      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Full name</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText class="w-full" v-model="form.fullName" />
        </div>
      </div>
      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Email Address</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText class="w-full" type="email" v-model="form.email" />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Phone</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputPhone class="w-full" v-model="form.phoneNumber" />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">&nbsp;</div>
        <div class="flex items-center w-full">
          <div class="mb-[1.875rem] mt-[7.625rem] w-full">
            <UiButtonDefault
              @click="() => validate().then(() => execute())"
              :disabled="state === constants.LOADING"
              :loading="state === constants.LOADING"
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
import { UPDATE_INFLUENCER_USER_RULE } from "~/lib/validation/rules";

const profileStore = useProfileStore();
const { notify } = useNotification();

const form = reactive<{
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}>({
  fullName: "",
  email: "",
  phoneNumber: "",
});

function updateForm() {
  form.phoneNumber = profileStore.$profile?.phoneNumber;
  form.fullName = profileStore.$profile?.totalFullName;
  form.email = profileStore.$profile?.email;
}

function extractName(fullName: string) {
  const names = fullName.split(" ");
  let firstName, lastName, middleName;

  if (names.length > 2) {
    [firstName, middleName, lastName] = names;
  } else {
    [firstName, lastName] = names;
  }

  return { firstName, lastName, middleName, length: names.length };
}

watch(() => profileStore.$profile, updateForm);

const { execute, validate, state, v$ } = useRequestState({
  action: () => {
    const extract = extractName(form.fullName!);
    const formPayload = {
      email: form.email!,
      phoneNumber:
        typeof form.phoneNumber === "string"
          ? form.phoneNumber
          : (form.phoneNumber as any)?.number!,
      firstName: extract.firstName,
      lastName: extract.lastName,
    };

    const payload =
      extract.length < 3
        ? formPayload
        : {
            middleName: extract.middleName,
            ...formPayload,
          };

    return profileStore.updatePersonalProfile(payload);
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

onMounted(() => {
  updateForm();
});
</script>

<style></style>
