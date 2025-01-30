<template>
  <div class="px-6">
    <div class="max-w-4xl mx-auto">
      <div class="space-y-4" v-if="notifications.length > 0">
        <div
          v-for="notification in notifications"
          :key="notification.notification_id"
          class="bg-white rounded-lg p-4 border transition-all"
          :class="{
            'border-primary-100 bg-primary-50': !notification.read,
            'border-gray-100': notification.read,
          }"
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <div
                class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center"
              >
                <Bell class="w-5 h-5 text-primary-600" />
              </div>
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-gray-900">
                  {{ notification.title }}
                </h3>
                <span class="text-sm text-gray-500">
                  {{ new Date(notification.createdAt).toLocaleDateString() }}
                </span>
              </div>
              <p class="text-gray-600 mt-1">{{ notification.description }}</p>
              <div class="mt-2 flex items-center gap-2">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="{
                    'bg-primary-100 text-primary-800': !notification.read,
                    'bg-gray-100 text-gray-800': notification.read,
                  }"
                >
                  {{ notification.type }}
                </span>
                <span
                  v-if="!notification.read"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  New
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="notifications.length === 0" class="text-center py-12">
        <p class="text-gray-500">No notifications found</p>
      </div>
      <!-- Add pagination -->
      <div v-if="notifications.length" class="mt-6 flex justify-center">
        <nav class="flex items-center gap-2">
          <button
            @click="pageData.page > 1 && pageData.page--"
            :disabled="pageData.page === 1"
            class="p-2 border rounded-lg disabled:opacity-50"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>
          <span class="px-4 py-2">Page {{ pageData.page }}</span>
          <button
            @click="pageData.page++"
            :disabled="notifications.length < 10"
            class="p-2 border rounded-lg disabled:opacity-50"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bell, ChevronLeft, ChevronRight } from "lucide-vue-next";

definePageMeta({
  name: "BrandNotification",
});

const pageData = reactive({
  page: 1,
  days: 7 as 1 | 7 | 30,
});

const notifications = ref<any[]>([]);

const api = useAPI();
useRequestState({
  immediately: true,
  async action() {
    return await Promise.all([
      api.getNotifications({
        days: pageData.days,
        page: pageData.page,
        limit: 10,
      }),
      api.getNotifications({
        type: "ALERTS",
        days: pageData.days,
        page: pageData.page,
        limit: 10,
      }),
      api.getNotifications({
        type: "NEWS",
        days: pageData.days,
        page: pageData.page,
        limit: 10,
      }),
    ]);
  },
  onSuccess(response) {
    notifications.value = response.map((r) => r.data).flat();
  },
});

watch(
  () => pageData.page,
  () => {
    api.getNotifications({
      days: pageData.days,
      page: pageData.page,
      limit: 10,
    });
  }
);
</script>
