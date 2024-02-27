<template>
  <div
    class="w-full flex md:flex-row items-center gap-[1.875rem] justify-between py-[1rem] px-[1.75rem] dark:border-slate-900"
  >
    <div class="flex items-center flex-row gap-4">
      <div class="flex md:hidden">
        <button class="" @click="$emit('open-sidebar')">
          <UtSvg name="menu" dim w="1.5rem" h="1.5rem" class="text-black" />
        </button>
      </div>
      <div class="whitespace-nowrap">
        <slot name="left">
          <h2>{{ routeName }}</h2>
        </slot>
      </div>
    </div>
    <div class="w-full hidden md:block justify-self-start max-w-[42.5rem]">
      <slot name="middle">
        <div class="flex gap-[1.25rem]" v-if="['Campaign'].includes(routeName)">
          <UiInputText class="w-full" placeholder="Search campaigns" search />

          <UiButtonDefault
            v-if="routeName === 'Campaign'"
            @click="
              navigateTo({
                name: 'CreateCampaign',
              })
            "
            label="+ New campaign"
            class="px-[1.125rem] sm:text-sm md:text-lg whitespace-nowrap py-[0.625rem]"
            variant="primary"
          />
        </div>
      </slot>
    </div>
    <div class="flex justify-end">
      <div class="flex flex-row gap-[0.625rem] items-center">
        <div class="flex items-center"><DashboardNotification /></div>
        <div class="flex items-center">
          <DashboardUserMenu
            :name="profile?.fullName || ''"
            :image="profile?.profilePicture || '#'"
            :type="profile?.userType || ''"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const routeNameMap: Record<string, any> = {
  CreateCampaign: "Campaign >>> Create a campaign",
  "Campaign Application Influencer": "Campaign Application",
  BrandCampaign: "Campaign",
};

const routeName = computed(
  () =>
    routeNameMap[route.name as string] || tools.capitalize(route.name as string)
);

const profileStore = useProfileStore();
const profile = computed(() => profileStore.$profile);
</script>

<style scoped>
/* .influencer {
  background: orange;
}
.brand {
  background: red;
  color: white;
} */
</style>
