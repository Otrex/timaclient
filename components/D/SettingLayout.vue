<template>
  <section>
    <div class="h-[17rem] relative flex items-end px-[2.5rem]">
      <div class="absolute inset-0 overflow-clip bg-green-500 w-full">
        <UiImg
          :src="profile?.banner || '/img/setting-backdrop.jpg'"
          class="object-cover w-full h-full"
          alt="profile image"
        />
        <UiInputOverlayUpload
          type="settings"
          v-model:file="form.settingBackground"
          @update:url="executeCoverUpdate"
          v-show="isEditable"
          class="absolute inset-0"
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
      <div
        class="w-[11.625rem] bg-white select-none transform translate-y-[41%] h-[11.625rem] relative rounded-full border-[0.3125rem] border-solid border-white"
      >
        <UiImg
          :src="profile?.profileImage"
          class="object-cover w-full h-full rounded-full"
          alt="profile image"
        />

        <UiInputOverlayUpload
          type="pics"
          v-model:file="form.profilePicture"
          @update:url="() => execute()"
          v-show="isEditable"
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
    </div>
    <div class="px-[2.5rem] py-[1.9375rem]">
      <div class="text-right">
        <UiButtonIconed
          label="Edit"
          left-icon="edit"
          @click="isEditable = !isEditable"
          :variant="!isEditable ? 'primary' : 'default'"
          class="text-sm py-2 px-7"
        />
      </div>
    </div>
    <div class="px-[2.5rem] pb-[1.9375rem]">
      <div>
        <slot :isEditable="isEditable"></slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
const isEditable = ref(false);
const auth = useAuthStore();
const { notify } = useNotification();
const profile = computed(() => auth.profile);

provide("isEditable", isEditable);

const form = reactive({
  profilePicture: null as File | null,
  settingBackground: null as File | null,
});

const { state, execute } = useRequestState({
  action: async () =>
    api.updateProfile({
      profileImage: form.profilePicture,
    }),
  onSuccess(_) {
    console.log(_);

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

const api = useAPI();

const {
  state: coverUpdateState,
  execute: executeCoverUpdate, //
} = useRequestState({
  action: () => api.updateCoverImage(form.settingBackground!),
  onSuccess(_) {
    notify({
      type: "success",
      title: "Update successful",
      text: "Cover Image updated",
    });

    window.location.reload();
  },
  onError(error) {
    notify({
      type: "error",
      title: "Upload failed",
      text: "Cover Image failed",
    });
  },
});
</script>
