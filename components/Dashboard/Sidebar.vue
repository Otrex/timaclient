<template>
  <div class="h-full w-full relative">
    <div class="flex justify-between h-full flex-col">
      <button
        class="absolute block md:hidden top-[20px] right-[20px]"
        @click="$emit('close-sidebar')"
      >
        <UtSvg name="close" dim w="1.5rem" h="1.5rem" />
      </button>
      <div class="pt-[1.75rem] px-[1.125rem]">
        <div class="px-[0.75rem]">
          <UtSvg name="logo/tima-2" class="w-[8rem] aspect-[3/1]" />
        </div>
        <div class="mt-[4.625rem]">
          <DashboardNavigatorInfluencer
            v-if="$route.params.type === constants.INFLUENCER"
          />
          <DashboardNavigatorAgency v-else />
          <div class="mt-[1rem] flex flex-col gap-[1rem]">
            <DashboardNavigatorMenuItem
              label="Help/Support"
              icon="nav/help"
              :to="{
                name: 'Help & Support',
              }"
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
        <div class="px-[1.125rem] dark:border-slate-900">
          <div class="mt-[1rem] mb-[3.75rem] flex flex-col gap-[1rem]">
            <DashboardNavigatorMenuItem
              label="Settings"
              icon="nav/setting"
              :to="{
                name: 'Settings',
                params: {
                  type: $route.params.type,
                },
              }"
            />
            <DashboardNavigatorMenuItem
              @click="logout"
              class="text-red-600"
              label="Log Out"
              :loading="loading"
              icon="nav/logout"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const authStore = useAuthStore();
const mode = ref(true);

const loading = ref(false);

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

const logout = async () => {
  try {
    loading.value = true;
    await authStore.logout();
    window.location.href = "/auth/login";
  } catch (error: any) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style>
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
}

.pulse-element {
  animation: pulse 2s infinite;
  border-radius: 10px;
}
</style>
