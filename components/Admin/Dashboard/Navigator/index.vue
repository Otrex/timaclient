<template>
    <div class="flex flex-col gap-[1rem]">
        <AdminDashboardNavigatorMenuItem label="Explore" icon="nav/search" to="Explore" />
        <AdminDashboardNavigatorMenuItem label="Campaigns" icon="nav/campaign" to="Campaign" />
        <AdminDashboardNavigatorMenuItem label="Influencers" icon="nav/influencers" to="/dashboard/influencers" />
        <AdminDashboardNavigatorMenuItem to="Brands" label="Brands" icon="nav/brands" />
        <AdminDashboardNavigatorMenuItem label="Finance" icon="nav/payment" to="Finance" />
    </div>
</template>

<script setup lang="ts"></script>

<style></style>