<template>
  <DSettingLayout>
    <div class="flex flex-wrap gap-5">
      <UtTabNuxtLink name="InfluencerSettingPersonal">
        Personal Information
      </UtTabNuxtLink>
      <UtTabNuxtLink name="InfluencerSettingPassword"> Password </UtTabNuxtLink>
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
  </DSettingLayout>
</template>

<script setup lang="ts">
const optionsStore = useOptionsStore();
onMounted(async () => {
  await optionsStore.loadOptions();
});
</script>

<style></style>
