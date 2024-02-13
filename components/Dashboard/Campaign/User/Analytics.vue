<template>
  <section>
    <div
      style="--clr: rgba(228, 243, 255, 0.5)"
      class="bg-[--clr] rounded-b-md p-[1.25rem] mt-[0.375rem]"
    >
      <div class="flex flex-col gap-[1.25rem]">
        <template v-for="(metric, idx) in metrics" :key="idx">
          <StatsMetrics
            :title="metric.title"
            :socials="metric.socials"
            :data="metric.data"
          />
        </template>
      </div>
    </div>

    <div
      class="flex flex-col mb-[1.25rem] lg:flex-row gap-[1.25rem] mt-[1.25rem]"
    >
      <div class="w-full">
        <StatsAudienceAgeRange
          :data="[]"
          bg="rgba(228, 243, 255, 0.5)"
          class="w-full"
        />
      </div>
      <div class="w-full">
        <StatsAudienceGenderDistribution bg="rgba(228, 243, 255, 0.5)" />
      </div>
    </div>

    <div class="w-full">
      <StatsWorldMap bg="rgba(228, 243, 255, 0.5)" class="w-full" />
    </div>
  </section>
</template>

<script setup lang="ts">
const metrics = ref([
  {
    title: "MAIN KPIS",
    socials: ["instagram", "tiktok"],
    data: [
      {
        label: "Account",
        value: 33,
      },
      {
        label: "Followers",
        value: tools.formatNumber(3300000),
      },
    ],
  },
  {
    title: "Interactions summary",
    socials: ["instagram", "tiktok"],
    data: [
      {
        label: "Engagement",
        value: "6%",
      },
      {
        label: "Reach",
        value: "20,000",
      },
      {
        label: "Engagement",
        value: "50,000",
      },
      {
        label: "Likes",
        value: "10,000",
      },
      {
        label: "Comment",
        value: "20",
      },
      {
        label: "Saved",
        value: "200",
      },
    ],
  },

  {
    title: "AUDIENCE DISTRIBUTION SUMMARY",
    socials: ["instagram", "tiktok"],
    data: [
      {
        label: "Top country",
        value: "Nigeria",
      },
      {
        label: "Top city",
        value: "Lagos",
      },
      {
        label: "Top gender",
        value: "Women",
      },
      {
        label: "Top age",
        value: "20-30",
      },
    ],
  },

  {
    title: "Budget",
    socials: ["instagram", "tiktok"],
    data: [
      {
        label: "Instagram budget",
        value: tools.formatCurrency(3_000_000),
      },
      {
        label: "Amount spent",
        value: tools.formatCurrency(1_000_000),
      },
    ],
  },
]);
</script>

<style></style>
