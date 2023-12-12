<template>
  <div class="inline-block">
    <div class="flex flex-row w-full max-w-[72.25rem] justify">
      <div
        v-for="(item, idx) in props.menuItems"
        :key="idx"
        class="max-w-[10.875rem] w-full text-left"
      >
        <UtTabMenuItem
          :label="item.label"
          :name="item.name"
          :default="props.defaultTab === item.name"
        />
      </div>
    </div>
    <div :class="props.tabClass">
      <transition mode="out-in">
        <component :is="currentComponent?.component" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
type Routes = Partial<keyof typeof constants>;
const route = useRoute();
const props = defineProps<{
  tabClass?: string;
  routeKey?: string;
  defaultTab: string;
  menuItems: {
    name: string;
    label: string;
    component: ReturnType<typeof resolveComponent>;
  }[];
}>();

const emits = defineEmits(["change"]);

const currentTab = computed(() => {
  const routeTab = route.query[props.routeKey || "tab"] as Routes;
  return !routeTab ? props.defaultTab : routeTab;
});

const currentComponent = computed(() =>
  props.menuItems.find((current) => current.name === currentTab.value)
);

watch(currentTab, () => {
  emits("change", currentTab.value);
});
</script>

<style></style>
