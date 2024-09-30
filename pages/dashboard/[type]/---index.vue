<template>
  <div class="px-8 mt-1 mb-5">
    <section class="flex justify-end">
      <div class="flex flex-row max-w-[25rem] w-full items-center">
        <input
          type="text"
          class="rounded-l-3xl w-full search pl-14 py-2 border"
          name="type"
          :value="search"
          placeholder="Search for campaigns"
        />
        <button
          class="border border-l-0 px-3 rounded-r-3xl pr-5 py-2 flex items-center gap-2"
        >
          <UtSvg name="filter" dim w="20px" h="20px" />
          Filter
        </button>
      </div>
    </section>
    <section></section>
    <section>
      <h4 class="my-5">Recommended Campaigns</h4>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4">
        <template v-for="i in tools.range(1, 3)" :key="i">
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
      </div>
    </section>
    <section>
      <h4 class="my-5">Top Campaigns for the week</h4>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4">
        <template v-for="i in tools.range(1, 3)" :key="i">
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
      </div>
    </section>
    <section>
      <h4 class="my-5">View All Campaigns</h4>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4">
        <template v-for="i in tools.range(1, 3)" :key="i">
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
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  name: "Dashboard",
});

const api = useAPI();
const search = ref();

const {} = useRequestState({
  immediately: true,
  action: async () => api.fetchCampaigns(),
  onSuccess(response) {
    console.log(response);
  },
  onError(error) {
    console.log(error);
  },
});
</script>
