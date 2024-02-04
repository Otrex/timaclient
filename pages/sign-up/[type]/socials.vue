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
              @open="onOpen"
              label="Connect Instagram"
              :icon="social.icon"
              :id="social.icon"
            >
              <template #form>
                <UtAddSocial
                  :social="getSocial(social.icon)"
                  v-model:handle="form.handle"
                  @add-social="addSocial"
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
      const optionsStore = useOptionsStore();
      await optionsStore.getSocialTypes();
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
});

function onOpen(id: string) {
  form.name = id.includes("socials/")
    ? optionsStore.$socialsByIcon(id)!.name
    : id;
}

function getSocial(id: string) {
  return optionsStore.$socialsByIcon(id) || ({} as Core.SocialType);
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
      accessToken: "",
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
