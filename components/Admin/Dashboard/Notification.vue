<template>
  <div ref="target" class="inline-block">
    <NuxtLink to="/admin/dashboard/notification" exact-active-class="!text-[#0077D3]">
      <UtSvg name="bell" class="text-[#05091C] dark:text-white w-[1.5rem] h-[1.5rem]" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.tima-notification-box {
  padding: 2rem 1.5rem;
  padding-top: 1.5rem;
  border-radius: inherit;
  box-shadow: 0px 4px 50px 8px rgba(0, 0, 0, 0.15);
}

.tima-backdrop-shadow {
  border-radius: 1.875rem;
  box-shadow: 0px 4px 500px 80000px rgba(0, 0, 0, 0.05);
}

.tima-tab-btn {
  padding: 0.1875rem 0.625rem;
  border-radius: 0.3125rem;
  color: var(--clr-grey-300);
  font-size: 1rem;
}

.tima-tab-btn.active {
  background: rgba(5, 9, 28, 0.05);
  @apply text-black dark:text-white;
}

.tima-notif {
  border-top: 1px solid #cdcbc9;
}

.tima-notif:last-child {
  border-bottom: 1px solid #cdcbc9;
}
</style>