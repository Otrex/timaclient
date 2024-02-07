<template>
  <div>
    <div id="fb-root"></div>
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
              @open="onOpen"
              :label="`Connect ${getSocial(social.icon)?.name}`"
              :icon="social.icon"
              :id="social.icon"
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
            @click="navigateTo('/auth/login')"
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
const button = ref();
function click() {
  console.log(button.value[0].querySelector("iframe").contentWindow);
}

useHead({
  script: [
    {
      async: true,
      defer: true,
      nonce: "wreDQhen",
      crossorigin: "anonymous",
      src: "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0&appId=1871358313281038",
    },
  ],
});

const { notify } = useNotification();
const optionsStore = useOptionsStore();
const authStore = useAuthStore();
const rules = useValidationRules();
const api = useAPI();

const form = reactive({
  name: "",
  handle: "",
  accessToken: "",
});

onMounted(() => {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: "1871358313281038",
      xfbml: true,
      version: "v18.0",
    });

    window.FB.login(
      function (response: { authResponse: any }) {
        if (response.authResponse) {
          console.log("Welcome!  Fetching your information.... ");
          form.accessToken = response.authResponse.accessToken;
          addSocial();
          window.FB.api(
            "/me",
            { fields: "name, email" },
            function (response: { name: string; email: string }) {
              document.getElementById("profile")!.innerHTML =
                "Good to see you, " +
                response.name +
                ". i see your email address is " +
                response.email;
            }
          );
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile" }
    );
  };
});

function onOpen(id: string) {
  form.name = id.includes("socials/")
    ? optionsStore.$socialsByIcon(id)!.name
    : id;
}

function getSocial(id: string) {
  return optionsStore.$socialsByIcon(id) || ({} as Core.SocialType);
}

function facebookLogin() {
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
