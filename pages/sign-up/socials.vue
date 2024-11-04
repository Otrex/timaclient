<template>
  <div>
    <NuxtLayout name="auth">
      <div class="text-right">
        <UiProfileProgress :percent="authStore.progress" />
      </div>
      <div class="pb-[3.125rem] mb-10 min-h-screen">
        <div class="mb-[3.75rem]">
          <h1 class="text-[2.4375rem] mb-[1.5rem]">
            Connect your social media accounts
          </h1>
          <p>
            To enjoy full functionality of this site please connect your
            account. Add the account that you have.
          </p>
        </div>

        <div
          class="pb-[40px] max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-[2rem]"
        >
          <template v-for="social in socials" :key="social.icon">
            <UiButtonAddSocial
              class="w-[15rem]"
              :label="social.label"
              @open="onOpen"
              :modal="getModal(social.icon)"
              @closeModal="closeModal(social.icon)"
              :icon="social.icon"
              :id="social.icon"
              :isCompleted="
                authStore.connectedSocials
                  .map((e) => e.platformName)
                  .includes(social.label)
              "
            >
              <template #form>
                <div class="p-5">
                  <h2 class="text-center font-bold text-2xl -mt-4 mb-4">
                    {{ social.label }}
                  </h2>
                  <div class="text-left mb-4">
                    <div class="flex flex-row items-center transition-all">
                      <div class="flex flex-row gap-3 w-full">
                        <UiInputText
                          type="text"
                          class="w-full"
                          :class="
                            isValidUserName
                              ? '!border-green-500 !border !border-solid'
                              : ''
                          "
                          v-model="form.identifier"
                          :autocomplete="false"
                          placeholder="Username"
                        />
                        <UiButtonDefault
                          variant="primary"
                          label="Verify"
                          class="py-2 px-10"
                          @click="() => verify()"
                        />
                      </div>
                      <div>
                        <UtSvg
                          name="sunshine"
                          class="spinner ml-4 w-[1.5rem] h-[1.5rem]"
                          v-show="verifying == constants.LOADING"
                        />
                      </div>
                    </div>
                    <span
                      class="text-green-500 !text-left text-sm"
                      v-if="
                        isValidUserName &&
                        !v$.userName.$errors[0]?.$message.toString()
                      "
                    >
                      Your username is good to go!</span
                    >
                  </div>
                  <div class="bg-stone-100 mb-5 px-3 py-1 rounded-lg">
                    <div
                      class="text-gray-700 italic py-3 text-center"
                      v-if="!currentSocial"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 mx-auto mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Enter your username to verify your account
                    </div>
                    <div v-else>
                      <!-- Instagram Account Details -->
                      <div
                        v-if="currentSocialKey === 'so/instagram'"
                        class="p-4"
                      >
                        <div class="flex items-center gap-4 mb-4">
                          <img
                            :src="currentSocial['Profile Pic']"
                            class="w-16 h-16 rounded-full object-cover"
                            alt="Profile picture"
                          />
                          <div>
                            <h3 class="font-semibold text-lg">
                              {{ currentSocial["Full Name"] }}
                            </h3>
                            <p class="text-gray-600">
                              @{{ currentSocial["Username"] }}
                            </p>
                          </div>
                        </div>

                        <div class="space-y-2">
                          <div class="flex items-center gap-2">
                            <span class="font-medium">Account Type:</span>
                            <span>{{
                              currentSocial["Account Type"] === 1
                                ? "Personal"
                                : "Business"
                            }}</span>
                          </div>

                          <div class="flex items-center gap-2">
                            <span class="font-medium">Account ID:</span>
                            <span>{{ currentSocial["Account ID"] }}</span>
                          </div>

                          <div
                            v-if="currentSocial['Biography']"
                            class="flex items-start gap-2"
                          >
                            <span class="font-medium">Bio:</span>
                            <span>{{ currentSocial["Biography"] }}</span>
                          </div>

                          <div
                            v-if="currentSocial['Category']"
                            class="flex items-center gap-2"
                          >
                            <span class="font-medium">Category:</span>
                            <span>{{ currentSocial["Category"] }}</span>
                          </div>

                          <div class="flex items-center gap-2">
                            <span class="font-medium">Verified:</span>
                            <span>{{
                              currentSocial["Verified"] ? "Yes" : "No"
                            }}</span>
                          </div>

                          <div
                            v-if="currentSocial['Profile Url']"
                            class="flex items-center gap-2"
                          >
                            <span class="font-medium">Profile URL:</span>
                            <a
                              :href="currentSocial['Profile Url']"
                              target="_blank"
                              class="text-blue-600 hover:underline"
                            >
                              {{ currentSocial["Profile Url"] }}
                            </a>
                          </div>
                        </div>
                      </div>

                      <!-- YouTube Account Details -->
                      <div
                        v-if="currentSocialKey === 'so/youtube'"
                        class="space-y-4"
                      >
                        <div class="flex items-center gap-4">
                          <img
                            :src="currentSocial.profile_picture_url"
                            :alt="currentSocial.title"
                            class="w-16 h-16 rounded-full"
                          />
                          <div>
                            <h3 class="text-lg font-semibold">
                              {{ currentSocial.title }}
                            </h3>
                            <a
                              :href="currentSocial.channel_url"
                              target="_blank"
                              class="text-sm text-blue-600 hover:underline"
                            >
                              View Channel
                            </a>
                          </div>
                        </div>

                        <div class="space-y-3">
                          <div class="flex items-start gap-2">
                            <span class="font-medium">Channel ID:</span>
                            <span>{{ currentSocial.channel_id }}</span>
                          </div>

                          <div
                            v-if="currentSocial.description"
                            class="flex items-start gap-2"
                          >
                            <span class="font-medium">Description:</span>
                            <span>{{ currentSocial.description }}</span>
                          </div>

                          <div
                            v-if="currentSocial.country"
                            class="flex items-start gap-2"
                          >
                            <span class="font-medium">Country:</span>
                            <span>{{ currentSocial.country }}</span>
                          </div>
                        </div>
                      </div>

                      <!-- TikTok Account Details -->
                      <div
                        v-if="currentSocialKey === 'so/tiktok'"
                        class="space-y-4"
                      >
                        <div class="flex items-center gap-4">
                          <img
                            :src="currentSocial.avatar_url"
                            :alt="currentSocial.nickname"
                            class="w-16 h-16 rounded-full"
                          />
                          <div>
                            <h3 class="text-lg font-semibold">
                              {{ currentSocial.nickname }}
                              <span
                                v-if="currentSocial.verified"
                                class="ml-1 text-blue-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5 inline"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </span>
                            </h3>
                            <p class="text-sm text-gray-600">
                              @{{ currentSocial.unique_id }}
                            </p>
                          </div>
                        </div>

                        <div class="space-y-3">
                          <div class="flex items-start gap-2">
                            <span class="font-medium">User ID:</span>
                            <span>{{ currentSocial.user_id }}</span>
                          </div>

                          <div class="flex items-start gap-2">
                            <span class="font-medium">Bio:</span>
                            <span>{{ currentSocial.signature }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      v-if="currentSocial"
                      class="flex items-center gap-2 my-4"
                    >
                      <input
                        type="checkbox"
                        v-model="form.confirmOwnership"
                        id="confirm-ownership"
                        class="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label for="confirm-ownership" class="text-gray-700">
                        I confirm that I am the owner of this account
                      </label>
                    </div>
                  </div>
                  <div>
                    <UiButtonDefault
                      variant="primary"
                      label="Connect"
                      class="py-2 px-10"
                      :disabled="!form.confirmOwnership || !form.identifier"
                      @click="() => connect(social.label, form.identifier)"
                    />
                  </div>
                </div>
              </template>
            </UiButtonAddSocial>
          </template>
        </div>
        <div class="tm__box-598px flex flex-row items-center justify-center">
          <button
            @click="toProfileReview"
            class="px-[5rem] py-[0.875rem] rounded-3xl text-red-600 hover:bg-gray-100"
          >
            Skip
          </button>
          <UiButtonDefault
            @click="toProfileReview"
            class="w-full py-[0.875rem] !px-[2rem]"
            label="Continue"
            variant="primary"
          />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { AxiosError } from "axios";
import type { Core } from "~/lib/interfaces";

definePageMeta({
  name: "SignUpSocials",
});

const { notify } = useNotification();
const openModal = ref<Record<string, boolean>>({});
const isValidUserName = ref<boolean | null>(null);

const optionsStore = useOptionsStore();
const rules = useValidationRules();
const authStore = useAuthStore();

const closeModal = (key: string) => {
  openModal.value[key] = false;
};

const socials = ref([
  {
    label: "Instagram",
    icon: "so/instagram",
    field: "username",
  },
  // {
  //   label: "Facebook",
  //   icon: "so/facebook",
  //   field: "username",
  // },
  // {
  //   label: "X",
  //   icon: "so/twitter",
  // },
  // {
  //   label: "LinkedIn",
  //   icon: "so/linkedin",
  // },
  {
    label: "Tiktok",
    icon: "so/tiktok",
  },
  {
    label: "Youtube",
    icon: "so/youtube",
  },
]);

const getModal = (key: string) => openModal.value[key];

const form = reactive({
  name: "",
  identifier: "",
  confirmOwnership: false,
});

const currentSocial = ref<any>(null);

function onOpen(id: string) {
  openModal.value[id] = true;
  form.name = id.includes("socials/")
    ? optionsStore.$socialsByIcon(id)!.name
    : id;
}

function getSocial(id: string): Core.SocialType & { connected: boolean } {
  const social = optionsStore.$socialsByIcon(id);
  return social
    ? { ...social, completed: authStore.connectedSocials.includes(social.name) }
    : ({} as any);
}

async function connect(social: string, identifier: string) {
  await execute(social, identifier);
}

const api = useAPI();
const getterMap = {
  "so/instagram": async (identifier: string) => {
    return api.socials.getInstagramByUsername(identifier);
  },
  "so/tiktok": async (identifier: string) => {
    return api.socials.getTiktokByUsername(identifier);
  },
  "so/youtube": async (identifier: string) => {
    return api.socials.getYoutubeByUsername(identifier);
  },
};

const currentSocialKey = computed(() => {
  const [socialKey] =
    Object.entries(openModal.value).find(([_, value]) => value) || [];
  return socialKey as keyof typeof getterMap;
});

const { state: verifying, execute: verify } = useRequestState({
  async action() {
    if (!currentSocialKey.value) throw new AxiosError("No social selected");
    if (!getterMap[currentSocialKey.value])
      throw new AxiosError("Invalid social key");
    return getterMap[currentSocialKey.value](form.identifier);
  },
  onSuccess(response) {
    currentSocial.value = response;
  },
});
const { state, execute, v$, validate } = useRequestState({
  validation: {
    rule: rules.ADD_SOCIAL_VALIDATION,
    form,
  },
  action: async (social: string, identifier: string) => {
    await authStore.updateSocials([
      ...authStore.connectedSocials,
      {
        platformName: social,
        userName: identifier,
      },
    ]);
  },
  onSuccess(response) {
    notify({
      type: "success",
      title: "Success",
      text: "Social Account updated",
    });

    Object.keys(openModal.value).forEach((key) => {
      openModal.value[key] = false;
    });

    form.identifier = "";
    form.confirmOwnership = false;
    currentSocial.value = null;
  },
  onError(error) {
    notify({
      type: "error",
      title: error.title,
      text: error.description,
    });
  },
});

function toProfileReview() {
  navigateTo({
    name: "SignUpDemographicInfo",
  });
}

function toLogin() {
  notify({
    type: "success",
    title: "Signup Completed!",
    text: "Proceed to login to your account",
  });

  setTimeout(() => {
    navigateTo("/auth/login");
  }, 2000);
}
</script>

<style></style>
