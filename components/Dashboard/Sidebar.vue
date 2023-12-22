<template>
  <div class="flex justify-between h-full flex-col">
    <div class="pt-[2.375rem] px-[1.125rem]">
      <div class="px-[0.75rem]">
        <UtSvg name="logo/tima" class="w-[6.125rem] h-[2.4375rem]" />
      </div>
      <div class="mt-[4.625rem]">
        <DashboardNavigatorInfluencer v-if="false" />
        <DashboardNavigatorAgency />
        <div class="mt-[1rem] flex flex-col gap-[1rem]">
          <DashboardNavigatorMenuItem
            label="Help/Support"
            icon="nav/help"
            to="/dashboard/help"
          />
          <DashboardNavigatorMenuItem label="Darkmode" icon="nav/darkmode">
            <template #right>
              <UiInputSwitch
                v-model="mode"
                true-value="light"
                false-value="dark"
              />
            </template>
          </DashboardNavigatorMenuItem>
        </div>
      </div>
    </div>
    <div>
      <div
        class="px-[1.125rem] border-t-[0.025rem] border-solid border-[#999] dark:border-slate-900"
      >
        <div class="mt-[1rem] mb-[3.75rem] flex flex-col gap-[1rem]">
          <DashboardNavigatorMenuItem
            label="Settings"
            icon="nav/setting"
            to="/dashboard/settings"
          />
          <DashboardNavigatorMenuItem
            @click="logout"
            class="text-red-600"
            label="Log Out"
            icon="nav/logout"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const mode = ref(true);

watch(mode, () => {
  if (mode.value) {
    colorMode.preference = "light";
  } else {
    colorMode.preference = "dark";
  }
});

onMounted(() => {
  mode.value = colorMode.value === "light" ? true : false;
});

const toggleColor = () => {
  if (colorMode.preference === "light") {
    colorMode.preference = "dark";
  } else {
    colorMode.preference = "light";
  }
};

const logout = () => {
  navigateTo("/auth/login");
};
</script>

<style></style>
