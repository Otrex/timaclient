<template>
  <div class="px-4 md:px-20 py-3">
    <div class="text-right mt-6 mb-[3.75rem]">
      <UiInputDropdown
        class="max-w-[17.5rem] inline-flex w-full"
        v-model="filter"
        :options="[
          'Last 7 days',
          'Last 14 days',
          'Last 30 days',
          'Last 90 days',
        ]"
      >
        <template #select="{ data, isOpen }">
          <div class="flex flex-row gap-2 justify-between items-center">
            <div class="flex items-center">
              <UtSvg name="calendar" class="w-[1.5rem] h-[1.5rem]" />
            </div>
            <div class="text-[#828282]">{{ data }}</div>
            <div class="flex items-center">
              <UtSvg
                name="down-caret"
                class="w-[1rem] h-[1rem] transition-all"
                :class="isOpen && 'rotate-180'"
              />
            </div>
          </div>
        </template>
        <template #item="{ data }">
          <button class="w-full py-2 px-2 hover:bg-gray-100">
            {{ data }}
          </button>
        </template>
      </UiInputDropdown>
    </div>
    <div
      class="grid gap-5 md:gap-[3.0625rem] grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
    >
      <AdminStatsCard title="Influencers" value="120" />
      <AdminStatsCard title="Brands" value="18" />
      <AdminStatsCard title="Campaigns" value="34" />
      <AdminStatsCard title="Ad Spend" value="$142K" />
      <AdminStatsCard title="Paid Out" value="$106K" />
      <AdminStatsCard title="Revenue" value="$36K" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "AdminHome",
  middleware: [async () => {}],
});

const filter = ref("Last 7 days");
</script>

<style></style>
