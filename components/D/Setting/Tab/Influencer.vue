<template>
  <div
    class="flex cont md:flex-row flex-wrap w-full max-w-[72.25rem] justify-between"
  >
    <UtTabNuxtLink name="InfluencerSettingPersonal">
      Personal Information
    </UtTabNuxtLink>
    <!-- <UtTabMenuItem
      label="Address Information"
      :name="constants.ADDRESS_INFORMATION"
    /> -->
    <UtTabMenuItem label="Password" :name="constants.PASSWORD" />
    <UtTabMenuItem
      label="Payment Information"
      :name="constants.PAYMENT_INFORMATION"
    />
    <UtTabMenuItem
      label="Industry Information"
      :name="constants.INDUSTRY_INFORMATION"
    />
    <UtTabMenuItem
      label="Notification Settings"
      :name="constants.NOTIFICATION_SETTINGS_INFLUENCER"
    />
    <UtTabMenuItem
      label="Account Deactivation"
      :name="constants.ACCOUNT_DEACTIVATION"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style>
.cont > * {
  @apply py-3 md:py-0;
}
</style>
