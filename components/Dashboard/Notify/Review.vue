<template>
  <div class="rounded-lg">
    <div>
      <div class="flex flex-row mb-3 gap-3 items-center">
        <h2 class="text-lg font-semibold">Today</h2>
        <div class="border-b w-full"></div>
      </div>
      <DashboardNotifyCardLite
        :title="'SOMA'"
        :message="'Hello Glo ng, We are delighted to inform you that Soma has accepted to join your GO TO SCHOOL campaign which is coming up next month'"
        :time="'24 Oct 2024 at 9:29 AM'"
        :status="'Accepted'"
        :style="`--status: #30DE80`"
      />
      <DashboardNotifyCardLite
        :title="'SOMA'"
        :message="'Hello Glo ng, We are delighted to inform you that Soma has accepted to join your GO TO SCHOOL campaign which is coming up next month'"
        :time="'24 Oct 2024 at 9:29 AM'"
        :status="'Rejected'"
        :style="`--status: #EC2B29`"
      />
    </div>

    <div class="mt-8 pt-4">
      <div class="flex flex-row mb-3 gap-3 items-center">
        <h2 class="text-lg font-semibold">Yesterday</h2>
        <div class="border-b w-full"></div>
      </div>
      <DashboardNotifyCardLite
        :title="'SOMA'"
        :message="'Hello Glo ng, We are delighted to inform you that Soma has accepted to join your GO TO SCHOOL campaign which is coming up next month'"
        :time="'24 Oct 2024 at 9:29 AM'"
        :status="'Accepted'"
        :style="`--status: #30DE80`"
      />
    </div>
  </div>
</template>
