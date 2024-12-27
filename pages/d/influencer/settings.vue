<template>
  <DSettingLayout>
    <template #default="{ isEditable }">
      <div
        v-if="!isEditable"
        class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50"
        role="alert"
      >
        <svg
          class="flex-shrink-0 inline w-4 h-4 mr-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
          />
        </svg>
        <span class="font-medium">Note: {{ " " }}</span> Please enable edit mode
        to make changes to your settings.
      </div>
      <div class="flex flex-wrap gap-5">
        <UtTabNuxtLink name="InfluencerSettingPersonal">
          Personal Information
        </UtTabNuxtLink>
        <UtTabNuxtLink name="InfluencerSettingPassword">
          Password
        </UtTabNuxtLink>
        <UtTabNuxtLink name="InfluencerSettingPayment">
          Payment Information
        </UtTabNuxtLink>
        <UtTabNuxtLink name="InfluencerSettingNotification">
          Notification Settings
        </UtTabNuxtLink>
        <UtTabNuxtLink name="InfluencerSettingIndustry">
          Industry Information
        </UtTabNuxtLink>
        <UtTabNuxtLink name="InfluencerSettingAccount">
          Account Deactivation
        </UtTabNuxtLink>
      </div>
      <NuxtPage />
    </template>
  </DSettingLayout>
</template>

<script setup lang="ts">
const optionsStore = useOptionsStore();

onMounted(async () => {
  await optionsStore.loadOptions();
});
</script>

<style></style>
