<template>
  <div>
    <div v-for="(notification, idx) in notificationItems" :key="idx">
      <div>
        <span :class="['text-white p-3', bagdestyle]">
          {{ notification.type }}
        </span>
      </div>
      <h3>{{ notification.status + ":" }} {{ notification.name }}</h3>
      <p></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  name: "Notification",
});

const bagdestyle = function (type: string) {
  if (type === "Campaign Invitation") {
    return "bg-[#30DE80]";
  }

  if (type === "Campaign Application") {
    return "bg-[#FFBB00]";
  }

  if (type === "Content") {
    return "bg-[#058EF8]";
  }
};

const notificationItems = ref([
  {
    type: "Campaign Invitation",
    status: "Accepted",
    name: "Somadina Onyeka",
    message:
      "Hello Brand, We are excited to inform you that Soma has accepted your invitation for your upcoming campaign",
    date: "24 Oct 2024",
    time: "9:29 AM",
  },
  {
    type: "Campaign Application",
    status: "Application",
    name: "Soma",
    message:
      "Hello Brand, Soma has sent in an application to participate in your upcoming campaign. Please review their application",
    date: "24 Oct 2024",
    time: "9:29 AM",
    action: "Review",
  },
]);
</script>

<style></style>
