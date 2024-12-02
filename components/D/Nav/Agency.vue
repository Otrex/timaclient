<template>
  <div class="flex flex-col gap-[1rem]">
    <DashboardNavigatorMenuItem
      label="Explore"
      icon="nav/search"
      :to="{ name: 'DashboardBrandExplore' }"
    />
    <DashboardNavigatorMenuItem
      label="Campaigns"
      icon="nav/campaign"
      :to="{
        name: 'DashboardBrandCampaigns',
      }"
    />
    <!-- <DashboardNavigatorMenuItem
      :to="{
        name: 'Bookmark',
      }"
      label="Bookmark"
      icon="nav/bookmark"
    /> -->
    <!--<DashboardNavigatorMenuItem
      label="Influencers"
      icon="nav/influencers"
      to="/dashboard/influencers"
    />  -->
    <DashboardNavigatorMenuItem
      label="Payment"
      icon="nav/payment"
      :to="{
        name: 'BrandFinance',
      }"
    />
    <!-- <DashboardNavigatorMenuItem
      label="Draft"
      icon="nav/draft"
      to="/dashboard/draft"
    />
    <DashboardNavigatorMenuItem
      label="Bookmark"
      icon="nav/bookmark"
      to="/dashboard/bookmark"
    /> -->
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
</script>

<style></style>
