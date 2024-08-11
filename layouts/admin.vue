<template>
  <div class="h-screen w-full overflow-hidden">
    <slot name="main"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const sidebar = ref(false);
// const $router = useRouter();
// const $route = useRoute();
const backMap: Record<string, string> = {
  Campaign: "MainDashboard",
};
// const routeNames = computed(() => $router.options.routes.map((r) => r.name));
// const currentRoute = computed(() => $route.name as string);

function goBack() {
  // if (!Object.keys(backMap).includes($route.name as string)) {
  //     $router.back();
  // } else if ("back" in $route.query) {
  //     $router.replace($route.query.back as string);
  // } else {
  //     $router.replace({ name: backMap[currentRoute.value] });
  // }
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
