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
                authStore.connectedSocials.includes(
                  getSocial(social.icon)?.name
                )
              "
            >
              <template #form>
                <div class="p-5">
                  <h2 class="text-center font-bold text-2xl -mt-4 mb-4">
                    {{ social.label }}
                  </h2>
                  <div class="text-left mb-4">
                    <div class="flex flex-row items-center transition-all">
                      <UiInputText
                        type="text"
                        class="w-full"
                        :class="
                          isValidUserName
                            ? '!border-green-500 !border !border-solid'
                            : ''
                        "
                        v-model="form.identifier"
                        @keyup.prevent="() => verify()"
                        :autocomplete="false"
                        placeholder="Username"
                      />
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
                  <div>
                    <UiButtonDefault
                      variant="primary"
                      label="Verify"
                      class="py-2 px-10"
                      @click="() => verify()"
                    />
                    <UiButtonDefault
                      variant="primary"
                      label="Connect"
                      class="py-2 px-10"
                      @click="() => connect(social)"
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
  handle: "",
  accessToken: "",
  identifier: "",
});

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

async function connect(social) {}

async function addSocial() {
  await validate();
  await execute();
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

const { state: verifying, execute: verify } = useRequestState({
  async action() {
    const [socialKey] =
      Object.entries(openModal.value).find(([_, value]) => value) || [];
    if (!socialKey) throw new AxiosError("No social selected");

    const getter = getterMap[socialKey as keyof typeof getterMap];
    if (!getter) throw new AxiosError("Invalid social key");
    return getter(form.identifier);
  },
});
const { state, execute, v$, validate } = useRequestState({
  validation: {
    rule: rules.ADD_SOCIAL_VALIDATION,
    form,
  },
  action: () =>
    authStore.updateSocials({
      ...form,
    }),
  onSuccess(response) {
    notify({
      type: "success",
      title: response.title,
      text: "Social Account updated",
    });

    Object.keys(openModal.value).forEach((key) => {
      openModal.value[key] = false;
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
