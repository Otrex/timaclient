<template>
  <div class="px-8">
    <div class="flex flex-row mb-6 items-center gap-5">
      <CampaignsTab
        v-for="item in tabs"
        :key="item.icon"
        :icon="item.icon"
        :text="item.text"
        :value="item.text.toLowerCase()"
        :is-default="item.default"
      />
    </div>

    <div class="flex mb-8 justify-end">
      <div class="flex flex-row gap-6">
        <div class="max-w-[25rem] w-full">
          <UiInputText
            search
            class="!w-full"
            placeholder="Search for campaigns"
          />
        </div>
        <UiButtonIconed
          left-icon="filter"
          variant="outline-plain"
          label="Filter"
          class="pr-7"
        />
      </div>
    </div>

    <section
      v-if="campaignsTabs.includes(route.query.ctab as string || 'active')"
      class="grid md:grid-cols-3 gap-4 gap-y-6 lg:grid-cols-4"
    >
      <template v-for="i in tools.range(0, 5)" :key="i">
        <DashboardCampaignCard
          :publicId="''"
          :title="''"
          :image="''"
          :category="[]"
          :brand="''"
          :description="''"
          :budget="0"
          :deadline="''"
          :completion="0"
        />
      </template>
    </section>

    <section v-if="route.query.ctab === 'invitations'">
      <DashboardNotifySection />
    </section>

    <section v-if="notificationTabs.includes(route.query.ctab as string)">
      <DashboardNotifyReview />
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "InfluencerCampaigns",
});

const route = useRoute();
const campaignsTabs = ["active", "upcoming", "completed"];
const notificationTabs = ["submissions", "applications"];

const tabs = [
  {
    icon: "tab/active",
    text: "Active",
    default: true,
  },
  {
    icon: "tab/calender",
    text: "Upcoming",
  },
  {
    icon: "tab/completed",
    text: "Completed",
  },
  {
    icon: "tab/application",
    text: "Applications",
  },
  {
    icon: "tab/invitation",
    text: "Invitations",
  },
  {
    icon: "tab/submit",
    text: "Submissions",
  },
];
</script>

<style></style>
