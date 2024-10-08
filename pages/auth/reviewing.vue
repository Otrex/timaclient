<template>
    <div class="dark:bg-slate-800 pt-[6.25rem] dark:text-white w-full h-screen">
        <div class="dark:bg-slate-800 dark:text-white text-center max-w-[56.125rem] px-[0.625rem] mx-auto">
            <UtSvg name="logo/tima" class="max-w-[6.125rem] h-[2.4375rem] mb-[57px]" />
            <div>
                <h1 class="text-[2.4375rem] mb-[54px]">Account Review in Progress</h1>
                <UtSvg name="logo/loading" class="w-[6.875rem] h-[7.5rem] mb-[0.75rem]" />

                <p>
                    Your account is currently under review to ensure compliance with our policies. Access to certain
                    features is temporarily limited. Thank you for your patience. We will notify you once the review is
                    complete.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "reviewing",
});
</script>

<style></style>