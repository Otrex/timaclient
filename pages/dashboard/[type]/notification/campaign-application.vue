<template>
  <div class="p-8">
    <div class="mt-8 border rounded-[1rem] p-8">
      <div class="flex flex-row gap-3 items-center">
        <h2 class="text-lg font-semibold">Today</h2>
        <div class="border-b w-full"></div>
      </div>
      <DashboardNotifyCard
        :title="'SOMA'"
        :message="'Hello Glo ng, Soma has requested to join your GO TO SCHOOL campaign which is coming up next month'"
        :time="'24 Oct 2024 at 9:29 AM'"
      />
      <DashboardNotifyCard
        :title="'SOMA'"
        :message="'Hello Glo ng, Soma has requested to join your GO TO SCHOOL campaign which is coming up next month'"
        :time="'24 Oct 2024 at 9:29 AM'"
      />

      <div class="flex flex-row gap-3 items-center">
        <h2 class="text-lg font-semibold">Yesterday</h2>
        <div class="border-b w-full"></div>
      </div>
      <DashboardNotifyCard
        :title="'SOMA'"
        :message="'Hello Glo ng, Soma has requested to join your GO TO SCHOOL campaign which is coming up next month'"
        :time="'24 Oct 2024 at 9:29 AM'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Notification/CampaignApplication",
});
</script>

<style></style>
