<template>
  <div class="h-screen overflow-hidden">
    <div class="box">
      <aside class="bg-[--clr-light-blue] h-full dark:bg-slate-800">
        <DashboardSidebar />
      </aside>
      <header class="dark:bg-slate-700 dark:text-white">
        <DashboardHeader>
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

<script setup lang="ts"></script>

<style scoped>
.box {
  @apply grid h-full w-full;
  grid-template-rows: auto 1fr;
  grid-template-columns: 220px 1fr;
  grid-template-areas:
    "aside header"
    "aside main";
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
