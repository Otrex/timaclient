<template>
  <div class="p-5 h-[calc(100vh-100px)]">
    <div class="flex justify-between items-center mb-4">
      <div class="font-medium text-lg flex items-center gap-6">
        <h5>{{ currentMonth }} {{ currentDate.getFullYear() }}</h5>
        <button
          class="hover:bg-gray-200 active:bg-gray-300 outline py-2 text-base px-4 outline-[#BBBBBB]/60 rounded-[10px]"
        >
          Today
        </button>
      </div>
      <div class="flex flex-row gap-5">
        <div
          class="bg-gray-100 rounded-md gap-4 py-1 items-center flex flex-row"
        >
          <button class="px-3 text-sm">Day</button>
          <button class="bg-white text-sm rounded-md px-3 py-1">Week</button>
          <button class="px-3 text-sm">Month</button>
        </div>
        <UiInputDate variant="ranged" v-model="dateRange" />
      </div>
    </div>
    <div>
      <div class="grid-temp">
        <div class="flex items-center border justify-center">
          <button @click="prevWeek" class="px-4 py-3 hover:bg-gray-200">
            ←
          </button>
          <button @click="nextWeek" class="px-4 py-3 hover:bg-gray-200">
            →
          </button>
        </div>
        <template v-for="(day, index) in daysOfWeek" :key="index">
          <div class="border flex items-center justify-center">{{ day }}</div>
        </template>
      </div>
      <div class="max-h-screen overflow-y-auto">
        <div class="grid-temp">
          <div class="border-x border-t">&nbsp;</div>
          <template v-for="(day, index) in daysOfWeek" :key="index">
            <div class="border flex-1">&nbsp;</div>
          </template>
        </div>
        <template v-for="(time, index) in timeSlots" :key="index">
          <div class="grid-temp">
            <div class="border-x">
              <div class="relative">
                <div class="absolute inset-x-0 text-center -translate-y-1/2">
                  {{ time }}
                </div>
              </div>
            </div>
            <template v-for="(day, index) in daysOfWeek" :key="index">
              <div class="border flex-1 aspect-square">
                <div class="aspect-square w-full p-1">
                  <CalendarEvent
                    v-if="getEvent(day, time)"
                    v-bind="getEvent(day, time)"
                  />
                  <div v-else>&nbsp;</div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const currentDate = ref(new Date(2024, 9, 13));
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
  const days = [];
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
    day: new Date(2024, 9, 13),
    time: "8 AM",
    title: "Naija Made It Campaign Starts",
  },
  {
    day: new Date(2024, 9, 12),
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

// onMounted(() => {
//   // Set the initial date to today
//   currentDate.value = new Date();
// });
</script>
<style>
.bordered,
.bordered * {
  @apply border border-gray-200;
}

.grid-temp {
  display: grid;
  grid-template-columns: minmax(91px, auto) 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
</style>
