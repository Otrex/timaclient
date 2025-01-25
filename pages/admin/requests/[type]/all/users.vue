<template>
  <div>
    <table
      class="w-full border rounded-lg dark:border-gray-500 border-separate border-spacing-0 overflow-hidden"
    >
      <thead>
        <tr class="bg-gray-200 dark:bg-gray-700 !font-normal text-left">
          <th class="py-3 px-3">Name</th>
          <th class="py-2 px-3">Request Type</th>
          <th class="py-2 px-3">Date</th>
          <th class="py-2 px-3">Status</th>
          <th class="py-2 px-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="px-3 text-[0.9375rem]">MTN NG</td>
          <td class="px-3 text-[0.9375rem]">New User</td>
          <td class="px-3 text-[0.9375rem]">15 Oct 2024</td>
          <td class="px-3 text-[0.9375rem]">
            <span
              :class="[
                'rounded-2xl px-2 py-0.5 text-base',
                true && 'text-white bg-yellow-400',
              ]"
              >Pending</span
            >
          </td>
          <td class="py-2 text-[0.9375rem] px-3">
            <button
              @click="
                navigateTo({
                  name: 'admin.requests.user',
                  params: {
                    id: 1,
                  },
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "admin.requests.all.users",
});

const api = useAPI();
const pageData = ref({
  page: 1,
  limit: 10,
  total: 10,
});

const tbody = ref<
  {
    name: string;
    phone: string;
    created_at: string | Date;
    email: string;
    id: string;
    status: string;
    action: any;
  }[]
>([]);

const { state, execute } = useRequestState({
  action: () =>
    api.fetchAdminUsers({
      limit: pageData.value.limit,
      page: pageData.value.page,
      role: "BRAND",
    }),
  immediately: true,
  onSuccess: (response) => {
    // pageData.value.total = response.totalUsers;
    pageData.value.page = response.page;
    pageData.value.limit = response.limit;

    tbody.value = response.data.map((e: any) => {
      return {
        name: e.profile.companyName,
        phone: e.phoneNumber,
        email: e.emailAddress,
        created_at: new Date(e.profile.createdAt),
        status: e.profile.profileSetupProgress,
        action: { ...e.profile, userId: e.id },
        id: e.id,
      };
    });
  },
});
</script>

<style></style>
