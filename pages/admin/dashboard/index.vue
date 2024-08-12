<template>
    <div class="px-20">
        <div class="flex flex-col gap-[49px] md:grid md:grid-cols-3">
            <AdminStatsCard />
            <AdminStatsCard />
            <AdminStatsCard />
        </div>

        <div class="flex flex-col gap-[49px] md:grid md:grid-cols-3 mt-[145px]">
            <AdminStatsCard />
            <AdminStatsCard />
            <AdminStatsCard />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "AdminHome",
  middleware: [async () => {}],
});
</script>

<style></style>
