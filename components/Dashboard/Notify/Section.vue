<template>
  <div class="">
    <div class="">
      <div class="flex flex-row gap-3 mb-4 items-center">
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

      <div class="flex flex-row gap-3 mb-4 mt-8 items-center">
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
