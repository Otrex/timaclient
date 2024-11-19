<template>
  <div class="px-6">{{ notifications }}</div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "BrandNotification",
});

const pageData = reactive({
  page: 1,
  days: 7 as 1 | 7 | 30,
});

const notifications = ref<any[]>([]);

const api = useAPI();
const {} = useRequestState({
  immediately: true,
  async action() {
    return await Promise.all([
      api.getNotifications({
        type: "ACTIVITIES",
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
</script>

<style></style>
