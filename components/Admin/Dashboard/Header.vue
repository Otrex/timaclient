<template>
  <div
    class="w-full flex md:flex-row items-center gap-[1.875rem] justify-between py-[1rem] px-[1.75rem] dark:border-slate-900"
  >
    <div class="flex items-center flex-row gap-3">
      <div class="flex md:hidden">
        <button class="" @click="$emit('open-sidebar')">
          <UtSvg name="menu" dim w="1.5rem" h="1.5rem" class="text-black" />
        </button>
      </div>
    </div>

    <div class="flex justify-end">
      <div class="flex flex-row gap-[0.625rem] items-center">
        <div class="flex items-center">
          <AdminDashboardNotification />
        </div>

        <div class="flex items-center">
          <AdminDashboardUserMenu
            :name="userIdentifier"
            :image="profile?.profileImage || '#'"
            :type="user?.role || ''"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const profile = computed(() => authStore.profile || null);
const user = computed(() => authStore.user || null);

const userIdentifier = computed(() => authStore.user?.userName || "");
</script>
