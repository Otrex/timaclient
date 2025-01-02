<template>
  <div class="p-5 h-[calc(100vh-100px)]">
    <div class="flex justify-between items-center mb-4">
      <div class="font-medium text-lg flex items-center gap-6">
        <h5>{{ currentMonth }} {{ currentDate.year() }}</h5>
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
          <div class="border-x border-t"> </div>
          <template v-for="(day, index) in daysOfWeek" :key="index">
            <div class="border flex-1"> </div>
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
                    v-bind="getEvent(day, time)"
                    :event="getEvent(day, time)"
                  />
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
import dayjs from "dayjs";

const currentDate = ref(dayjs("2025-01-01"));
const dateRange = ref({
  start: dayjs("2020-01-06").toDate(),
  end: dayjs("2020-01-10").toDate(),
});

const currentMonth = computed(() => {
  return currentDate.value.format("MMMM");
});

const daysOfWeek = computed(() => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = currentDate.value.startOf("week").add(i, "day");
    const dayName = date.format("ddd");
    const dayNumber = date.format("DD");
    days.push(`${dayName.toUpperCase()} ${dayNumber}`);
  }
  return days;
});

const timeSlots = ref(["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM"]);

const events = ref<any[]>([
  {
    id: 1,
    day: dayjs("2024-11-13"),
    time: "9 AM",
    title: "Naija Made It Campaign Starts",
  },
  {
    id: 2,
    day: dayjs("2024-11-18"),
    time: "10 AM",
    title: "Naija Made It Campaign Starts",
  },
]);

const prevWeek = () => {
  currentDate.value = currentDate.value.subtract(7, "day");
};

const nextWeek = () => {
  currentDate.value = currentDate.value.add(7, "day");
};

const getEvent = (day: string, time: string) => {
  const [_, dayNumber] = day.split(" ");
  const [timeValue, period] = time.split(" ");
  const hour = period === "PM" ? parseInt(timeValue) + 12 : parseInt(timeValue);

  const eventDate = dayjs()
    .year(currentDate.value.year())
    .month(currentDate.value.month())
    .date(parseInt(dayNumber))
    .hour(hour);

  return (
    Array.isArray(events.value) &&
    events.value?.find((event) => {
      const eventDay = dayjs(event?.scheduleTime || event?.day);
      return eventDate.format("YYYY-MM-DD") === eventDay.format("YYYY-MM-DD");
    })
  );
};

const formatEventDate = (date: dayjs.Dayjs) => {
  return date.format("ddd DD").toUpperCase();
};

const api = useAPI();

const { execute: getCalendar } = useRequestState({
  immediately: true,
  action: () => api.getCalendarEvents(),
  onSuccess: (response) => {
    events.value = response.data;
  },
});

const { execute: setupCalendar } = useRequestState({
  action: (...args: any) => api.setupCalendarEvents(args),
  onSuccess: (response) => {},
});
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
