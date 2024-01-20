<template>
  <section>
    <div
      class="h-[13.75rem] flex items-end px-[2.5rem] bg-cover bg-center x-rounded-[0.625rem] bg-no-repeat bg-[url(~/assets/img/setting-backdrop.jpg)]"
    >
      <div
        class="w-[11.625rem] bg-white select-none transform translate-y-[41%] h-[11.625rem] relative rounded-full border-[0.3125rem] border-solid border-white"
      >
        <img
          :src="tools.removeDuplicateURL(profile?.profilePicture)"
          class="object-cover w-full h-full rounded-full"
          alt="profile image"
        />

        <UiInputOverlayUpload
          type="pics"
          v-show="isEditable"
          class="absolute inset-0 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            class="bi bi-camera-fill text-white"
            viewBox="0 0 16 16"
          >
            <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
            <path
              d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"
            />
          </svg>
        </UiInputOverlayUpload>
      </div>
    </div>
    <div class="px-[2.5rem] py-[1.9375rem]">
      <div class="text-right">
        <UiButtonIconed
          label="Edit"
          left-icon="edit"
          @click="isEditable = !isEditable"
          :variant="!isEditable ? 'primary' : 'default'"
          class="max-w-[10.125rem] w-full py-[0.75rem]"
        />
      </div>
    </div>
    <div class="px-[2.5rem] pb-[1.9375rem]">
      <div>
        <DashboardSettingTabInfluencer
          v-if="route.params.type === constants.INFLUENCER"
        />
        <DashboardSettingTabAgency v-else />
        <div class="max-w-[65.875rem]">
          <transition mode="out-in">
            <component :is="tabMap[currentTab]" :is-editable="isEditable" />
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

const route = useRoute();
const isEditable = ref(false);
const profileStore = useProfileStore();
const profile = computed(() => profileStore.$profile);

const tabMap = {
  [constants.PASSWORD]: resolveComponent(
    "DashboardSettingPassword" //
  ),
  [constants.BRAND_INFORMATION]: resolveComponent(
    "DashboardSettingBrandInformation"
  ),
  [constants.ADDRESS_INFORMATION]: resolveComponent(
    "DashboardSettingAddressInformation"
  ),
  [constants.PAYMENT_INFORMATION]: resolveComponent(
    "DashboardSettingPaymentInformation"
  ),
  [constants.NOTIFICATION_SETTINGS]: resolveComponent(
    "LazyDashboardSettingNotificationSettings"
  ),
  [constants.ACCOUNT_DEACTIVATION]: resolveComponent(
    "LazyDashboardSettingAccountDeactivation"
  ),
  [constants.PERSONAL_INFORMATION]: resolveComponent(
    "DashboardSettingPersonalInformation"
  ),
  [constants.INDUSTRY_INFORMATION]: resolveComponent(
    "DashboardSettingIndustryInformation"
  ),
  [constants.NOTIFICATION_SETTINGS_INFLUENCER]: resolveComponent(
    "DashboardSettingNotificationSettingsInfluencer"
  ),
};

const currentTab = computed(() => {
  const defaultTab =
    route.params.type === constants.INFLUENCER
      ? constants.PERSONAL_INFORMATION
      : constants.BRAND_INFORMATION;
  return (route.query.tab as keyof typeof tabMap) || defaultTab;
});
</script>

<style></style>
