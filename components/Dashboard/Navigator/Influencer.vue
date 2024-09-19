<template>
  <div class="flex flex-col gap-[1rem]">
    <DashboardNavigatorMenuItem
      label="Explore"
      icon="nav/search"
      :to="{
        name: 'Explore',
        params: {
          type: $route.params.type,
        },
      }"
    />
    <DashboardNavigatorMenuItem
      label="Campaigns"
      icon="nav/campaign"
      :to="{
        name: 'InfluencerCampaigns',
        params: {
          type: $route.params.type,
        },
      }"
    />
    <!--
    <DashboardNavigatorMenuItem
      label="Influencers"
      icon="nav/influencers"
      to="/dashboard/influencers"
    /> -->
    <DashboardNavigatorMenuItem
      :to="{
        name: 'Bookmark',
      }"
      label="Bookmark"
      icon="nav/bookmark"
    />
    <!-- <DashboardNavigatorMenuItem label="Finance" icon="nav/payment" :to="{
      name: 'Payment',
      params: {
        type: $route.params.type,
      },
    }" /> -->
    <DashboardNavigatorMenuItem
      label="Finance"
      icon="nav/payment"
      :to="{
        name: 'Finance',
        params: {
          type: $route.params.type,
        },
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

<script setup lang="ts"></script>

<style></style>
