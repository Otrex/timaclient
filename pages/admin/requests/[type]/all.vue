<template>
  <div
    class="dark:bg-gray-600 rounded-lg px-5 py-5 border dark:border-gray-700"
  >
    <div class="flex justify-between items-center mb-5">
      <div class="flex gap-2">
        <NuxtLink
          active-class="link-style-active"
          class="link-style"
          :to="{
            params: { type: $route.params.type },
            name: 'admin.requests.all.requests',
          }"
        >
          All Requests
        </NuxtLink>
        <NuxtLink
          active-class="link-style-active"
          class="link-style"
          :to="{
            params: { type: $route.params.type },
            name: 'admin.requests.all.users',
          }"
        >
          New User
        </NuxtLink>
        <NuxtLink
          active-class="link-style-active"
          class="link-style"
          v-if="$route.params.type == 'brands'"
          :to="{
            params: { type: 'brands' },
            name: 'admin.requests.all.campaigns',
          }"
        >
          Campaigns
        </NuxtLink>
        <NuxtLink
          active-class="link-style-active"
          class="link-style"
          v-else
          :to="{
            params: { type: 'influencers' },
            name: 'admin.requests.all.withdraws',
          }"
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
      <NuxtPage />
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

provide("tabFilter", filter);
provide("filter", filter);
</script>
