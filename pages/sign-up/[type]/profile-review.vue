<template>
  <div class="dark:bg-slate-800 pt-[6.25rem] dark:text-white w-full h-screen">
    <div
      class="dark:bg-slate-800 dark:text-white text-center max-w-[56.125rem] px-[0.625rem] mx-auto"
    >
      <UtSvg
        name="logo/tima"
        class="max-w-[6.125rem] h-[2.4375rem] mb-[30px]"
      />
      <div>
        <h1 class="text-[2.4375rem] mb-[30px]">Profile Review</h1>
        <div class="relative inline-block">
          <div
            class="w-[11.625rem] overflow-hidden bg-white inline-block select-none h-[11.625rem] relative rounded-full border-[0.3125rem] border-solid border-white"
          >
            <UiImg
              :src="tools.removeDuplicateURL(profile?.profileImage)"
              class="object-cover w-full h-full rounded-full"
              alt="profile image"
            />

            <UiInputOverlayUpload
              type="pics"
              v-model:file="form.profileImage"
              @update:url="execute"
              v-show="editable.profileImage"
              class="absolute inset-0 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-camera-fill text-white"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                <path
                  d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"
                />
              </svg>
            </UiInputOverlayUpload>
          </div>
          <button
            class="bg-slate-300 z-50 absolute right-[8px] flex items-center justify-center bottom-[15px] p-2 w-[40px] h-[40px] rounded-full cursor-pointer"
            @click="editable.profileImage = !editable.profileImage"
          >
            <UtSvg name="edit-fresh" class="w-[24px] h-[24px] cursor-pointer" />
          </button>
        </div>
      </div>

      <div class="mt-8 space-y-4">
        <UiEditOverlay
          v-model:editable="editable.username"
          v-slot="{ disabled }"
        >
          <UiInputText
            v-model="form.username"
            placeholder="Username"
            :disabled="disabled"
            class="w-full"
          />
        </UiEditOverlay>
        <UiEditOverlay v-model:editable="editable.email" v-slot="{ disabled }">
          <UiInputText
            v-model="form.email"
            placeholder="Email"
            :disabled="disabled"
            class="w-full"
          />
        </UiEditOverlay>
        <UiEditOverlay v-model:editable="editable.phone" v-slot="{ disabled }">
          <UiInputPhone
            v-model="form.phone"
            placeholder="Phone"
            :disabled="disabled"
            class="w-full"
          />
        </UiEditOverlay>
        <UiEditOverlay
          v-model:editable="editable.address"
          v-slot="{ disabled }"
        >
          <UiInputText
            v-model="form.address"
            placeholder="Address"
            :disabled="disabled"
            class="w-full"
          />
        </UiEditOverlay>
        <UiEditOverlay
          v-model:editable="editable.documents"
          v-slot="{ disabled }"
        >
          <UiInputUpload
            type="docs"
            v-model:file="form.documents"
            placeholder="Upload Documents"
            :disabled="disabled"
            class="w-full"
          />
        </UiEditOverlay>
      </div>

      <div
        class="flex flex-col gap-[1rem] max-w-[37.375rem] mx-auto mt-[3.4375rem]"
      >
        <NuxtLink to="/auth/login">
          <UiButtonDefault
            label="Log In"
            variant="primary"
            class="w-full py-[0.875rem]"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const { notify } = useNotification();
const profile = computed(() => authStore.profile);
const editable = reactive({
  profileImage: false,
  username: false,
  phone: false,
  email: false,
  documents: false,
  address: false,
});
const form = reactive({
  profileImage: null as File | null,
  username: undefined,
  email: undefined,
  phone: undefined,
  address: undefined,
  documents: null as File | null,
});

const { state, execute } = useRequestState({
  action: () => Promise.resolve(true),
  onSuccess(_) {
    notify({
      type: "success",
      title: "Update successful",
      text: "Profile picture updated",
    });

    window.location.reload();
  },
  onError(error) {
    notify({
      type: "error",
      title: "Upload failed",
      text: "Profile picture failed",
    });
  },
});
</script>

<style></style>
