<template>
  <div class="">
    <div class="">
      <div
        v-if="data.length === 0"
        class="flex flex-col items-center justify-center py-8"
      >
        <p class="text-gray-500">No notifications yet</p>
      </div>
      <template v-else v-for="[date, invites] in data" :key="date">
        <div
          class="flex flex-row gap-3 mb-4 items-center"
          :class="{ 'mt-8': date !== 'Today' }"
        >
          <h2 class="text-lg font-semibold">{{ date }}</h2>
          <div class="border-b w-full"></div>
        </div>
        <DashboardNotifyCard
          v-for="invite in invites"
          :key="invite.datetime"
          :title="invite.title"
          :message="invite.message"
          :time="
            new Date(invite.datetime).toLocaleString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })
          "
        />
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    invites: {
      title: string;
      message: string;
      datetime: string;
    }[];
  }>(),
  {
    invites: () => [],
  }
);

const data = computed(() => {
  const groupedInvites = props.invites.reduce((groups, invite) => {
    const date = new Date(invite.datetime);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let groupKey;
    if (date.toDateString() === today.toDateString()) {
      groupKey = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      groupKey = "Yesterday";
    } else {
      groupKey = date.toLocaleDateString();
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(invite);
    return groups;
  }, {} as Record<string, typeof props.invites>);

  return Object.entries(groupedInvites).sort((a, b) => {
    if (a[0] === "Today") return -1;
    if (b[0] === "Today") return 1;
    if (a[0] === "Yesterday") return -1;
    if (b[0] === "Yesterday") return 1;
    return new Date(b[0]).getTime() - new Date(a[0]).getTime();
  });
});
</script>
