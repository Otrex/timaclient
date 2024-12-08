<template>
  <div class="flex flex-row flex-wrap w-full max-w-[72.25rem] justify-between">
    <UtTabMenuItem
      label="Brand Information"
      :name="constants.BRAND_INFORMATION"
      default
    />
    <UtTabMenuItem label="Password" :name="constants.PASSWORD" />
    <UtTabMenuItem label="Billing" :name="constants.BRAND_BILLING" />
    <UtTabMenuItem
      label="Industry Information"
      :name="constants.INDUSTRY_INFORMATION"
    />
    <!-- <UtTabMenuItem
      label="Notification Settings"
      :name="constants.NOTIFICATION_SETTINGS"
    /> -->
    <UtTabMenuItem
      label="Account Deactivation"
      :name="constants.ACCOUNT_DEACTIVATION"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
