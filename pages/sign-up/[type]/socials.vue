<template>
  <div>
    <NuxtLayout name="auth">
      <div class="pb-[40px]">
        <div class="mb-[3.75rem]">
          <h1 class="text-[2.4375rem] mb-[1.5rem]">
            Connect your social media accounts
          </h1>
          <p>
            To enjoy full functionality of this site please connect your
            account. Add the account that you have.
          </p>
        </div>

        <div class="tm__box-598px pb-[40px] flex flex-col gap-[1rem]">
          <template v-for="social in optionsStore.$socials" :key="social.icon">
            <UiButtonAddSocial
              class="w-full"
              :label="`Connect ${getSocial(social.icon)?.name}`"
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
                <UtAddSocial
                  :social="getSocial(social.icon)"
                  v-model:handle="form.handle"
                  @add-social="
                    () =>
                      getSocial(social.icon)?.name.toLowerCase() === 'instagram'
                        ? facebookLogin()
                        : addSocial()
                  "
                  :loading="state === constants.LOADING"
                  :form-error-message="
                    v$.handle?.$errors[0]?.$message.toString()
                  "
                />
              </template>
            </UiButtonAddSocial>
          </template>
          <UiButtonAddSocial
            class="w-full mb-[6.0625rem]"
            @open="onOpen"
            id="blog"
            label="Connect your web blog (not compulsory)"
          />
          <UiButtonDefault
            @click="toLogin"
            class="w-full py-[0.875rem] mb-[2rem]"
            label="Continue"
            variant="primary"
          />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { Core } from "~/lib/interfaces";

definePageMeta({
  name: "SignUpSocials",
  middleware: [
    async () => {
      try {
        const optionsStore = useOptionsStore();
        await optionsStore.getSocialTypes();
      } catch (err) {}
    },
  ],
});

useHead({
  script: [
    {
      async: true,
      defer: true,
      nonce: "wreDQhen",
      crossorigin: "anonymous",
      src: "https://connect.facebook.net/en_US/sdk.js",
    },
  ],
});

const { notify } = useNotification();
const openModal = ref<Record<string, boolean>>({});

const optionsStore = useOptionsStore();
const rules = useValidationRules();
const authStore = useAuthStore();

const closeModal = (key: string) => {
  openModal.value[key] = false;
};

const getModal = (key: string) => openModal.value[key];

const form = reactive({
  name: "",
  handle: "",
  accessToken: "",
});

onMounted(() => {});

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

function facebookLogin() {
  window.fbAsyncInit = function () {
    const FB = window.FB;
    FB.init({
      appId: "1871358313281038",
      xfbml: true,
      version: "v18.0",
    });

    FB.login(
      (response: any) => {
        if (response.authResponse) {
          form.accessToken = response.authResponse.accessToken;
          addSocial();
        } else {
          notify({
            type: "error",
            title: "Facebook Error",
            text: "Facebook authorization failed",
          });
        }
      },
      { scope: "public_profile,instagram_basic" }
    );
  };

  window.fbAsyncInit();
}

async function addSocial() {
  await validate();
  await execute();
}

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
