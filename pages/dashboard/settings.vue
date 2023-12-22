<template>
  <section>
    <div
      class="h-[13.75rem] flex items-end px-[2.5rem] bg-cover bg-center rounded-[0.625remx] bg-no-repeat bg-[url(~/assets/img/setting-backdrop.jpg)]"
    >
      <div
        class="w-[11.625rem] select-none transform translate-y-[41%] h-[11.625rem] rounded-full border-[0.3125rem] border-solid border-white"
      >
        <img
          src="~/assets/img/user-profile.jpg"
          class="object-cover w-full h-full rounded-full"
          alt="profile image"
        />
      </div>
    </div>
    <div class="px-[2.5rem] py-[1.9375rem]">
      <div class="text-right">
        <UiButtonIconed
          left-icon="edit"
          label="Edit"
          variant="primary"
          class="max-w-[10.125rem] w-full py-[0.75rem]"
        />
      </div>
    </div>
    <div class="px-[2.5rem] pb-[1.9375rem]">
      <div>
        <DashboardSettingTabAgency />
        <div class="max-w-[65.875rem]">
          <transition mode="out-in">
            <component :is="tabMap[currentTab]" />
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Settings",
});
const tabMap = {
  [constants.PASSWORD]: resolveComponent(
    "DashboardSettingPassword" //
  ),
  [constants.BRAND_INFORMATION]: resolveComponent(
    "DashboardSettingBrandInformation"
  ),
  [constants.PAYMENT_INFORMATION]: resolveComponent(
    "LazyDashboardSettingPaymentInformation"
  ),
  [constants.NOTIFICATION_SETTINGS]: resolveComponent(
    "LazyDashboardSettingNotificationSettings"
  ),
  [constants.ACCOUNT_DEACTIVATION]: resolveComponent(
    "LazyDashboardSettingAccountDeactivation"
  ),
  [constants.PERSONAL_INFORMATION]: resolveComponent(
    "LazyDashboardSettingPersonalInformation"
  ),
  [constants.NOTIFICATION_SETTINGS_INFLUENCER]: resolveComponent(
    "LazyDashboardSettingNotificationSettingsInfluencer"
  ),
};
const route = useRoute();
const currentTab = computed(
  () => (route.query.tab as keyof typeof tabMap) || constants.BRAND_INFORMATION
);
</script>

<style></style>
