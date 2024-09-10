<template>
  <div class="p-10">
    <UtCalendar />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

definePageMeta({
  name: "Calendar",
  middleware: [async () => {}],
});

const currentDate = ref(new Date());
const dateRange = ref({
  start: new Date(2020, 0, 6),
  end: new Date(2020, 0, 10),
});

const currentMonth = computed(() => {
  return currentDate.value.toLocaleString("default", {
    month: "long",
  });
});

const daysOfWeek = computed(() => {
  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate.value);
    date.setDate(date.getDate() - date.getDay() + i);
    const dayName = date.toLocaleString("en-US", { weekday: "short" });
    const dayNumber = date.getDate();
    days.push(
      `${dayName.toUpperCase()} ${dayNumber.toString().padStart(2, "0")}`
    );
  }
  return days;
});
const timeSlots = ref(["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM"]);

// Events could be loaded via API or passed in as a prop
const events = ref([
  {
    day: new Date(2024, 8, 3),
    time: "8 AM",
    title: "Naija Made It Campaign Starts",
  },
  {
    day: new Date(2023, 5, 20),
    time: "10 AM",
    title: "Naija Made It Campaign Starts",
  },
]);

const prevWeek = () => {
  currentDate.value.setDate(currentDate.value.getDate() - 7);
};

const nextWeek = () => {
  currentDate.value.setDate(currentDate.value.getDate() + 7);
};

const getEvent = (day: string, time: string) => {
  const [_, dayNumber] = day.split(" ");
  const eventDate = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    parseInt(dayNumber)
  );

  return events.value.find((event) => {
    return (
      eventDate.toLocaleDateString() === event.day.toLocaleDateString() &&
      event.time === time
    );
  });
};

const formatEventDate = (date: Date) => {
  const dayName = date
    .toLocaleString("en-US", { weekday: "short" })
    .toUpperCase();
  const dayNumber = date.getDate().toString().padStart(2, "0");
  return `${dayName} ${dayNumber}`;
};

onMounted(() => {
  // Set the initial date to today
  currentDate.value = new Date();
});

onMounted(() => {});
</script>

<style></style>
