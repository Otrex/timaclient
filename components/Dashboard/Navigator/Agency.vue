<template>
  <div class="flex flex-col gap-[1rem]">
    <DashboardNavigatorMenuItem
      label="Explore"
      icon="nav/search"
      to="/dashboard/explore"
    />
    <DashboardNavigatorMenuItem
      label="Campaigns"
      icon="nav/campaign"
      to="/dashboard/"
    />
    <!--<DashboardNavigatorMenuItem
      label="Influencers"
      icon="nav/influencers"
      to="/dashboard/influencers"
    /> -->
    <DashboardNavigatorMenuItem
      label="Payment"
      icon="nav/payment"
      to="/dashboard/payment"
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

<script setup lang="ts"></script>

<style></style>
