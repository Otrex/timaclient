<template>
  <div>
    <NuxtLayout name="auth">
      <div>
        <div class="mb-[3.75rem]">
          <h1 class="text-[2.4375rem] mb-[1.5rem]">
            Connect your social media accounts
          </h1>
          <p>
            To enjoy full functionality of this site please connect your
            account. Add the account that you have.
          </p>
        </div>

        <div class="tm__box-598px flex flex-col gap-[1rem]">
          <UiButtonAddSocial
            class="w-full"
            label="Connect Instagram"
            icon="socials/instagram"
          />
          <UiButtonAddSocial
            class="w-full"
            label="Connect Facebook"
            icon="socials/facebook"
          />
          <UiButtonAddSocial
            class="w-full"
            label="Connect Tiktok"
            icon="socials/tiktok"
          />
          <UiButtonAddSocial
            class="w-full"
            label="Connect Twitter"
            icon="socials/twitter"
          />
          <UiButtonAddSocial
            class="w-full"
            label="Connect LinkedIn"
            icon="socials/linkedin"
          />
          <UiButtonAddSocial
            class="w-full"
            label="Connect YouTube"
            icon="socials/youtube"
          />
          <UiButtonAddSocial
            class="w-full mb-[6.0625rem]"
            label="Connect your web blog (not compulsory)"
          />
          <UiButtonDefault
            @click="navigateTo('/auth/login')"
            label="Continue"
            variant="primary"
            class="w-full py-[0.875rem] mb-[2rem]"
          />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
