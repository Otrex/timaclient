<template>
  <div class="flex flex-col gap-[1rem]">
    <AdminDashboardNavigatorMenuItem
      label="Dashboard"
      icon="nav/search"
      to="/admin/dashboard"
    />
    <AdminDashboardNavigatorMenuItem
      label="Campaigns"
      icon="nav/campaign"
      to="/admin/campaigns"
    />
    <AdminDashboardNavigatorMenuItem
      label="Influencers"
      icon="nav/influencers"
      to="/admin/influencers"
    />
    <AdminDashboardNavigatorMenuItem
      label="Brands"
      icon="nav/brands"
      to="/admin/brands"
    />
    <AdminDashboardNavigatorMenuItem
      label="Finance"
      icon="nav/payment"
      to="/admin/dashboard/finance"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
