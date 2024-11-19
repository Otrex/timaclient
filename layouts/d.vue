<template>
  <div class="h-screen w-full overflow-hidden">
    <div
      class="grid h-full w-full grid-rows-[auto_1fr] sm:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] [grid-template-areas:'aside_header'_'aside_main']"
    >
      <aside
        :class="[
          'bg-[--clr-light-blue] block sm:hidden transition-all h-full dark:bg-slate-800',
          !sidebar && 'transform translate-x-[-100%]',
        ]"
      >
        <DSidebar @close-sidebar="sidebar = false" />
      </aside>
      <aside
        class="bg-[--clr-light-blue] border-r border-solid border-[#dcf0ff] dark:border-slate-600 hidden sm:flex h-full dark:bg-slate-800 [grid-area:aside]"
      >
        <DSidebar />
      </aside>
      <header class="dark:bg-slate-700 dark:text-white [grid-area:header]">
        <div class="flex flex-row items-center border-[#D6D6D6]">
          <DHeader @open-menu="openMenu" />
        </div>
      </header>
      <main
        class="overflow-y-auto dark:bg-slate-700 dark:text-white [grid-area:main]"
      >
        <slot name="main"></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebar = ref(false);
const $route = useRoute();
const backMap: Record<string, string> = {
  Campaign: "BrandCampaign",
};
// const routeNames = computed(() => $router.options.routes.map((r) => r.name));
const currentRoute = computed(() => $route.name as string);

function openMenu() {
  console.log("Opening menu");

  sidebar.value = true;
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .box {
    @apply relative w-screen grid-cols-[1fr] [grid-template-areas:'header'_'main'];
  }

  header {
    @apply w-screen;
  }

  aside {
    @apply absolute top-0 left-0 right-[20%] z-[1000] [grid-area:none];
  }
}

.tooltip ~ .tip {
  @apply hidden top-[calc(100%+10px)] left-[5px] min-w-[60px];
}

.tooltip:hover ~ .tip {
  @apply inline-flex;
}
</style>
