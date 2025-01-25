<template>
  <div>
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
  name: "admin.requests.all.withdraws",
});
</script>

<style></style>
