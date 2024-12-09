<template>
  <div class="pt-[3.4375rem] max-w-[65.875rem]">
    <div class="flex flex-col gap-[1.5rem]">
      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Deactivate</label>
        </div>
        <div class="flex items-center w-full">
          <div class="flex gap-[1.75rem]">
            <div>
              <UiInputSwitch
                :disabled="!isEditable"
                v-model="deactivateUser"
                size="lg"
              />
            </div>
            <div class="flex flex-col">
              <span class="mb-[0.5625rem]"
                >I want to deactivate my account</span
              >
              <span class="text-[0.825rem]"
                >Get notified when there are important updates about the
                design</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <UiModalConfirmAction
      ref="confirm"
      @onapprove="approveDeactivation"
      :loading="state === constants.LOADING"
      @oncancel="deactivateUser = false"
    >
      <template #title> Confirm Deactivation </template>
      <template #body>
        Are you you want to proceed to delete your account?.
      </template>
    </UiModalConfirmAction>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "BrandSettingAccount",
});

const isEditable = inject<boolean>("isEditable");

const { notify } = useNotification();
const deactivateUser = ref(false);
const api = useAPI();

const confirm = ref<{
  open: () => void;
  close: () => void;
  modelState: Ref<boolean>;
}>();

const { execute, state } = useRequestState({
  action: async () => api.deactivateUser(),
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
      title: "Account Deactivated",
      text: "Your Account has been deactivated. To use TIMA, Please create a new Account",
    });
  },
});

watch(deactivateUser, () => {
  if (deactivateUser.value) {
    confirm.value!.open();
  }
});

function approveDeactivation() {
  execute().then(() => {
    confirm.value!.close();
    useAuthStore().logout();
    setTimeout(() => {
      navigateTo("/");
    }, 2000);
  });
}
</script>

<style></style>
