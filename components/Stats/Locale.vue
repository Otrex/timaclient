<template>
  <div class="flex !text-[1rem] flex-row gap-[3.75rem]">
    <div class="w-full">
      <h4 class="mb-[1.125rem]">Top countries</h4>
      <table class="w-full">
        <template v-for="(country, idx) in countries" :key="idx">
          <tr class="mb-[1.125rem]">
            <td>{{ idx + 1 }}.</td>
            <td class="max-w-[8.125rem] w-full">{{ country.name }}</td>
            <td>{{ country.stats }}%</td>
          </tr>
        </template>
      </table>
    </div>
    <div class="w-full">
      <h4 class="mb-[1.125rem]">Top cities</h4>
      <table class="w-full">
        <template v-for="(city, idx) in cities" :key="idx">
          <tr class="mb-[1.125rem]">
            <td>{{ idx + 1 }}.</td>
            <td class="max-w-[8.125rem] w-full">{{ city.name }}</td>
            <td>{{ city.stats }}%</td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const countries = ref([
  {
    name: "Nigeria",
    stats: 50,
  },
  {
    name: "Ghana",
    stats: 60,
  },
]);

const cities = ref([
  {
    name: "Lagos",
    stats: 100,
  },
  {
    name: "Accra",
    stats: 50,
  },
]);
</script>

<style></style>
