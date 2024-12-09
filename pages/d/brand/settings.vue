<template>
  <DSettingLayout>
    <div class="flex flex-wrap gap-5">
      <UtTabNuxtLink name="BrandSettingPersonal">
        Brand Information
      </UtTabNuxtLink>
      <UtTabNuxtLink name="BrandSettingPassword"> Password </UtTabNuxtLink>
      <UtTabNuxtLink name="BrandSettingBillingSubscription">
        Billing Information
      </UtTabNuxtLink>

      <UtTabNuxtLink name="BrandSettingIndustry">
        Industry Information
      </UtTabNuxtLink>
      <UtTabNuxtLink name="BrandSettingAccount">
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
