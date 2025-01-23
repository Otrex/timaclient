<template>
  <NuxtLayout name="admin">
    <div class="flex flex-col gap-[1rem]">
      <div class="flex justify-end">
        <UiDateSelectInput
          size="sm"
          :options="
            ['last 7 days', 'last 30 days', 'last 90 days'].map((item) => ({
              label: item,
              value: item,
            }))
          "
        />
      </div>

      <div></div>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  name: "admin.subscriptions.index",
});
</script>
