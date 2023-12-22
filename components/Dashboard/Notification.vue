<template>
  <div ref="target" class="inline-block">
    <button
      @click="open = !open"
      class="p-[.8rem] hover:bg-slate-50 active:ring-4 dark:hover:bg-slate-600 active:ring-slate-200 rounded-md"
    >
      <UtSvg
        name="bell"
        class="text-[#05091C] dark:text-white w-[1.5rem] h-[1.5rem]"
      />
    </button>

    <transition>
      <div
        v-show="open"
        class="absolute right-[0.75rem] z-20 max-w-[30rem] w-full mt-[0.9375rem] tima-backdrop-shadow"
      >
        <div class="tima-notification-box bg-white dark:bg-slate-700 w-full">
          <div
            class="flex flex-row w-full mb-[0.8125rem] justify-between items-center"
          >
            <h3 class="font-bold text-[1.5rem] !mb-0">Notifications</h3>
            <button class="whitespace-nowrap text-[#B4B2B3] !mb-0">
              Mark all as read
            </button>
          </div>

          <div class="flex flex-row mb-[1.5rem] gap-[0.875rem]">
            <button
              @click="activeTab = 0"
              :class="['tima-tab-btn', activeTab === 0 && 'active']"
            >
              All
            </button>
            <button
              @click="activeTab = 1"
              :class="['tima-tab-btn', activeTab === 1 && 'active']"
            >
              Paid
            </button>
            <button
              @click="activeTab = 2"
              :class="['tima-tab-btn', activeTab === 2 && 'active']"
            >
              Received
            </button>
          </div>

          <transition>
            <ul v-if="activeTab === 0">
              <li
                v-for="(notification, idx) in notifications"
                class="tima-notif py-[0.4375rem]"
                :key="idx"
              >
                <div>
                  <div class="flex flex-row items-center justify-between">
                    <p class="nl">{{ notification.title }}</p>
                    <div>
                      <UtNotificationAction :data-id="notification.id" />
                    </div>
                  </div>

                  <div class="flex flex-row items-center justify-between">
                    <p class="nl text-[--clr-grey-300]">
                      {{ tools.truncate(notification.content, 50) }}
                    </p>
                    <div class="flex">
                      <div
                        v-show="!notification.isRead"
                        class="flex pr-[0.375rem]"
                      >
                        <UtSvg name="indicator" dim w="0.625rem" h="0.625rem" />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
const activeTab = ref(0);
const open = ref(false);
const target = ref<HTMLDivElement>();

onClickOutside(target, (event) => {
  open.value = false;
  console.log("clicked outside");
});

const notifications = ref([
  {
    id: Math.random(),
    title: "Campaign successful",
    content: "Your campaign was successfully posted, influencers bla bla bla",
    isRead: false,
  },
  {
    id: Math.random(),
    title: "Nike campaign application",
    content: "Enioluwa Adeoluwa sent an application to your nike ..",
    isRead: true,
  },
]);
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
