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
      to="/admin/dashboard/campaign"
    />
    <AdminDashboardNavigatorMenuItem
      label="Influencers"
      icon="nav/influencers"
      to="/admin/dashboard/influencers"
    />
    <AdminDashboardNavigatorMenuItem
      label="Brands"
      icon="nav/brands"
      to="/admin/dashboard/brands"
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
