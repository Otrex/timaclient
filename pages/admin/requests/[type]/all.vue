<template>
  <div
    class="dark:bg-gray-600 rounded-lg px-5 py-5 border dark:border-gray-700"
  >
    <div class="flex justify-between items-center mb-5">
      <div class="flex gap-2">
        <NuxtLink
          active-class="link-style-active"
          class="link-style"
          :to="{ params: { type: $route.params.type } }"
        >
          All Requests
        </NuxtLink>
        <NuxtLink
          active-class="link-style-active"
          class="link-style"
          :to="{ params: { type: $route.params.type } }"
        >
          New User
        </NuxtLink>
        <NuxtLink
          active-class="link-style-active"
          class="link-style"
          v-if="$route.params.type == 'brands'"
          :to="{ params: { type: 'brands' } }"
        >
          Campaigns
        </NuxtLink>
        <NuxtLink
          active-class="link-style-active"
          class="link-style"
          v-else
          :to="{ params: { type: 'brands' } }"
        >
          Withdrawal
        </NuxtLink>
      </div>
      <div class="max-w-lg flex gap-2 items-center flex-row w-full">
        <div class="relative w-full items-center">
          <KitUiInput
            id="search"
            type="text"
            placeholder="Search..."
            class="pl-10"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
          >
            <Search class="size-5 text-muted-foreground" />
          </span>
        </div>
        <div class="relative">
          <KitUiDropdownMenu class="bg-white relative">
            <KitUiDropdownMenuTrigger class="relative" as-child>
              <KitUiButton
                variant="outline"
                class="rounded-2xl !py-[1.125rem] !border-gray-300"
              >
                <Filter />
                Filter:<b class="capitalize" v-if="filter">{{ filter }}</b>
                <ChevronDown class="size-5" />
              </KitUiButton>
            </KitUiDropdownMenuTrigger>
            <KitUiDropdownMenuContent class="w-32 relative left-0 bg-white">
              <div class="flex flex-col gap-2">
                <KitUiButton
                  @click="filter = 'pending'"
                  class="w-full"
                  :class="filter == 'pending' ? 'bg-gray-200' : ''"
                >
                  Pending
                </KitUiButton>
                <KitUiButton
                  @click="filter = 'approved'"
                  class="w-full"
                  :class="filter == 'approved' ? 'bg-gray-200' : ''"
                >
                  Approved
                </KitUiButton>
              </div>
            </KitUiDropdownMenuContent>
          </KitUiDropdownMenu>
        </div>
      </div>
    </div>

    <section>
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
    </section>
  </div>
</template>

<script setup lang="ts">
import { Search, Filter, ChevronDown } from "lucide-vue-next";
import type { DropdownMenuCheckboxItemProps } from "radix-vue";

type Checked = DropdownMenuCheckboxItemProps["checked"];
definePageMeta({
  name: "admin.requests.all",
});
const route = useRoute();
const $route = useRoute();
const filter = ref("All");
const type = computed(() => route.params.type as string);

const showStatusBar = ref<Checked>(true);
const showActivityBar = ref<Checked>(false);
const showPanel = ref<Checked>(false);
</script>
