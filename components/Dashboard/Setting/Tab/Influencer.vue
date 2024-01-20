<template>
  <div class="flex flex-row w-full max-w-[72.25rem] justify-between">
    <UtTabMenuItem
      label="Personal Information"
      :name="constants.PERSONAL_INFORMATION"
      default
    />
    <UtTabMenuItem
      label="Address Information"
      :name="constants.ADDRESS_INFORMATION"
    />
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

<style></style>
