<template>
  <div class="h-screen w-full overflow-hidden">
    <div class="box">
      <aside
        :class="[
          'bg-[--clr-light-blue] block sm:hidden transition-all h-full dark:bg-slate-800',
          !sidebar && 'transform translate-x-[-100%]',
        ]"
      >
        <DSidebar @close-sidebar="sidebar = false" />
      </aside>
      <aside
        class="bg-[--clr-light-blue] border-r border-solid border-[#dcf0ff] dark:border-slate-600 hidden sm:flex h-full dark:bg-slate-800"
      >
        <DSidebar />
      </aside>
      <header class="dark:bg-slate-700 dark:text-white">
        <div class="flex flex-row items-center border-[#D6D6D6]">
          <DHeader @open-menu="openMenu" />
        </div>
      </header>
      <main class="overflow-y-auto dark:bg-slate-700 dark:text-white">
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
.box {
  @apply grid h-full w-full;
  grid-template-rows: auto 1fr;
  grid-template-columns: 250px 1fr;
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

.tooltip ~ .tip {
  display: none;
  top: calc(100% + 10px);
  left: 5px;
  min-width: 60px;
}

.tooltip:hover ~ .tip {
  display: inline-flex;
}
</style>
