<template>
  <div class="dark:bg-slate-800 dark:text-white w-full pb-[10rem]">
    <div
      class="dark:bg-slate-800 dark:text-white max-w-3xl text-center px-[0.625rem] mx-auto"
    >
      <div>
        <h1
          v-if="$route.params.type === constants.INFLUENCER"
          class="text-[2.4375rem] mb-[30px]"
        >
          Confirm Details
        </h1>
        <h1 v-else class="text-[2.4375rem] mb-[30px]">Confirm Details</h1>
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
              v-model:file="form.profileImage as any"
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
        <div>
          <label class="!text-left block mb-[10px] text-lg text-[#777777]">
            Username
          </label>
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
        </div>
        <div>
          <label class="!text-left block mb-[10px] text-lg text-[#777777]">
            Language
          </label>
          <UiEditOverlay
            v-model:editable="editable.language"
            v-slot="{ disabled }"
          >
            <UiInputSelect
              :options="optionsStore.$countryLanguages(profile?.country!)"
              v-model="form.language"
              placeholder="Language"
              :disabled="disabled"
              class="w-full"
            />
          </UiEditOverlay>
        </div>
        <div>
          <label class="!text-left block mb-[10px] text-lg text-[#777777]">
            Phone Number
          </label>
          <UiEditOverlay
            v-model:editable="editable.phone"
            v-slot="{ disabled }"
          >
            <UiInputPhone
              v-model="form.phone"
              placeholder="Phone"
              :disabled="disabled"
              class="w-full"
            />
          </UiEditOverlay>
        </div>
        <div>
          <label class="!text-left block mb-[10px] text-lg text-[#777777]">
            Address
          </label>
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
        </div>

        <div v-if="$route.query.tab === constants.INFLUENCER">
          <label class="!text-left block mb-[10px] text-lg text-[#777777]">
            Government Issued ID
          </label>
          <UiEditOverlay
            v-model:editable="editable.documents"
            position="left"
            v-slot="{ disabled }"
          >
            <UiInputUpload
              type="docs"
              placeholder="Upload Documents"
              :disabled="disabled"
              class="w-full"
            />
          </UiEditOverlay>
        </div>

        <div v-else>
          <label class="!text-left block mb-[10px] text-lg text-[#777777]">
            Documents
          </label>
          <UiEditOverlay
            v-model:editable="editable.documents"
            position="left"
            v-slot="{ disabled }"
          >
            <UiInputUpload
              type="docs"
              v-model:doc="form.documents"
              placeholder="Upload Documents"
              :disabled="disabled"
              class="w-full"
            />
          </UiEditOverlay>
        </div>

        <div>
          <label class="!text-left block mb-[10px] text-lg text-[#777777]">
            Industry Selection
          </label>
          <UiEditOverlay
            v-model:editable="editable.industries"
            v-slot="{ disabled }"
          >
            <UiInputSelectMulti
              :options="
                optionsStore.$industries.map((e) => ({ label: e, value: e }))
              "
              v-model="form.industries"
              placeholder="Industries"
              :disabled="disabled"
              class="w-full"
            />
          </UiEditOverlay>
        </div>
      </div>

      <div class="flex items-center justify-end">
        <div class="inline-flex flex-row gap-[1rem] mt-[3.4375rem]">
          <UiButtonDefault
            v-if="Object.values(editable).some((e) => e)"
            @click="() => update()"
            :loading="updating === constants.LOADING"
            :disabled="updating === constants.LOADING"
            label="Save Changes"
            variant="outline-primary"
            class="w-full py-[0.875rem] px-[2.8125rem]"
          />
          <UiButtonDefault
            label="Proceed"
            @click="() => proceed()"
            :loading="state === constants.LOADING"
            :disabled="state === constants.LOADING"
            variant="primary"
            class="w-full py-[0.875rem] px-[2.8125rem]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const api = useAPI();
const { notify } = useNotification();
const profile = computed(() => authStore.profile);
const user = computed(() => authStore.user);

definePageMeta({
  name: "SignUpInfluencerReviewProfile",
  middleware: [
    async function () {
      await useAuthStore().getProfile();
    },
  ],
});

const optionsStore = useOptionsStore();

const editable = reactive({
  profileImage: false,
  username: false,
  phone: false,
  language: false,
  documents: false,
  address: false,
  industries: false,
});

const form = reactive({
  language: undefined,
  username: user.value?.userName,
  phone: user.value?.phoneNumber,
  profileImage: profile.value?.profileImage as File | string,
  industries: profile.value?.industries,
  address: `${profile.value?.address}, ${profile.value?.city}, ${profile.value?.state}`,
  documents: (profile.value?.documents || []).map((e) => e.documentUrl),
});

const { state, execute: proceed } = useRequestState({
  action: () => api.pushProfileForReview(),
  onSuccess(_) {
    notify({
      type: "success",
      title: "Submission successful",
      text: "Your profile has been submitted for review",
    });

    navigateTo({
      name: "SignUpReview",
    });
  },
  onError(error) {
    notify({
      type: "error",
      title: error.title,
      text: error.description,
    });
  },
});

const { state: updating, execute: update } = useRequestState({
  action: () => {
    const payload: Record<string, any> = {
      phoneNumber: form.phone,
      industries: form.industries,
      address: form.address,
    };

    if (form.profileImage && form.profileImage instanceof File) {
      payload.profileImage = form.profileImage;
    }

    if (!form.documents.every((e: any) => typeof e === "string")) {
      payload.documents = form.documents;
    }

    if (form.username != user?.value?.userName) {
      payload.userName = form.username;
    }

    return api.updateProfile(payload);
  },
  onError(error) {
    notify({
      type: "error",
      title: error.title,
      text: error.__error?.response?.data?.error,
    });
  },
  onSuccess() {
    notify({
      type: "success",
      title: "Profile updated",
      text: "Your profile has been updated",
    });
  },
});
</script>

<style></style>
