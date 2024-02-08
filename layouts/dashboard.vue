<template>
  <div class="h-screen w-full overflow-hidden">
    <div class="box">
      <aside
        :class="[
          'bg-[--clr-light-blue] block md:hidden transition-all h-full dark:bg-slate-800',
          !sidebar && 'transform translate-x-[-100%]',
        ]"
      >
        <DashboardSidebar @close-sidebar="sidebar = false" />
      </aside>
      <aside
        class="bg-[--clr-light-blue] hidden md:flex h-full dark:bg-slate-800"
      >
        <DashboardSidebar />
      </aside>
      <header class="dark:bg-slate-700 dark:text-white">
        <DashboardHeader @open-sidebar="sidebar = true">
          <template #left>
            <slot name="indicator"></slot>
          </template>
          <template #middle>
            <slot name="tab"></slot>
          </template>
        </DashboardHeader>
      </header>
      <main class="overflow-y-auto dark:bg-slate-700 dark:text-white">
        <slot name="main"></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebar = ref(false);
</script>

<style scoped>
.box {
  @apply grid h-full w-full;
  grid-template-rows: auto 1fr;
  grid-template-columns: 220px 1fr;
  grid-template-areas:
    "aside header"
    "aside main";
}

@media screen and (max-width: 600px) {
  .box {
    position: relative;
    width: 100vw;
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main";
  }

  header {
    width: 100vw;
  }

  aside {
    position: absolute;
    top: 0;
    left: 0;
    right: 20%;
    z-index: 1000;
    grid-area: none;
  }
}

aside {
  grid-area: aside;
}

main {
  grid-area: main;
}

header {
  grid-area: header;
}
</style>
