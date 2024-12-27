<template>
  <table
    class="w-full border rounded-lg border-separate border-spacing-0 overflow-hidden"
  >
    <thead>
      <tr class="bg-gray-200 !font-normal text-left">
        <th class="py-3 px-3">Name</th>
        <th class="py-2 px-3">Request Type</th>
        <th class="py-2 px-3">Date</th>
        <th class="py-2 px-3">Status</th>
        <th class="py-2 px-3">Action</th>
      </tr>
    </thead>
    <tbody v-if="state == constants.LOADING">
      <tr v-for="n in 3" :key="n">
        <td class="px-3 py-4">
          <div class="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
        </td>
        <td class="px-3 py-4">
          <div class="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
        </td>
        <td class="px-3 py-4">
          <div class="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
        </td>
        <td class="px-3 py-4">
          <div class="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
        </td>
        <td class="px-3 py-4">
          <div class="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
        </td>
      </tr>
    </tbody>

    <tbody v-else-if="!tbody.length">
      <tr>
        <td colspan="5" class="text-center py-8">
          <div class="flex flex-col items-center justify-center gap-2">
            <TentTree />
            <p class="text-gray-500">No campaigns found</p>
          </div>
        </td>
      </tr>
    </tbody>

    <tbody v-else>
      <tr v-for="item in tbody" :key="item.id">
        <td class="px-3 text-[0.9375rem]">
          {{ item.details.name }}
        </td>
        <td class="px-3 text-[0.9375rem]">Campaigns</td>
        <td class="px-3 text-[0.9375rem]">{{ item.date }}</td>
        <td class="px-3 text-[0.9375rem]">
          <span
            :class="[
              'rounded-2xl px-2 py-0.5 text-base',
              item.status?.toLowerCase() == 'pending' &&
                'text-white bg-yellow-400',
              item.status?.toLowerCase() == 'completed' &&
                'text-white bg-gray-400',
              item.status?.toLowerCase() == 'approved' &&
                'text-white bg-green-400',
            ]"
            >{{ item.status }}</span
          >
        </td>
        <td class="py-2 text-[0.9375rem] px-3">
          <button
            @click="
              navigateTo({
                name: 'admin.requests.campaign',
              })
            "
            class="px-4 py-1 border !text-[0.875rem] rounded-md text-base border-gray-400 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
          >
            Review
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { TentTree, Tractor } from "lucide-vue-next";
definePageMeta({
  name: "admin.requests.all.campaigns",
});

const api = useAPI();
const tbody = ref<any>([]);
const tabFilters =
  inject<Ref<"APPROVED" | "DECLINED" | "PENDING" | "all">>("tabFilter");
const pageData = ref({
  page: 1,
  limit: 10,
  total: 10,
});

const { state, execute } = useRequestState({
  action: () =>
    api.getAdminCampaigns({
      limit: pageData.value.limit,
      page: pageData.value.page,
      ...(tabFilters?.value.toLowerCase() !== "all"
        ? { statusProgress: tabFilters!.value.toUpperCase() as any }
        : {}),
    }),
  immediately: true,
  onSuccess: (response) => {
    pageData.value.total = response.totalCount;
    pageData.value.page = response.page;
    pageData.value.limit = response.limit;

    console.log(response.data);

    tbody.value = response.data.map((e) => {
      return {
        details: {
          banner: e.banner,
          name: e.campaignName,
        },
        about: e.campaignAbout,
        category: e.category,
        timing: {
          start: e.startDate,
          end: e.endDate,
        },
        date: e.startDate,
        status: e.statusProgress,
        action: { ...e, loading: false },
        id: e.campaign_id,
      };
    });
  },
});

watch(
  () => tabFilters?.value,
  () => {
    execute();
  }
);
</script>

<style></style>
