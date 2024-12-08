<template>
  <DSettingLayout>
    <div class="flex flex-row gap-5 overflow-x-auto">
      <UtTabNuxtLink name="InfluencerSettingPersonal">
        Personal Information
      </UtTabNuxtLink>
      <UtTabNuxtLink name="InfluencerSettingPassword"> Password </UtTabNuxtLink>
      <UtTabNuxtLink name="InfluencerSettingPayment">
        Payment Information
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
