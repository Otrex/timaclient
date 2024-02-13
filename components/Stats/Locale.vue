<template>
  <div class="flex !text-[1rem] flex-row gap-[3.75rem]">
    <div class="w-full">
      <h4 class="mb-[1.125rem]">Top countries</h4>
      <table class="w-full">
        <UtLoadPresenter
          loading-message="Fetching countries statistics"
          not-found-message="No statistics found"
          :data="countries.length === 0"
          :state="loadingCountries ? constants.LOADING : 'IDLE'"
        >
          <template v-for="(country, idx) in countries" :key="idx">
            <tr class="mb-[1.125rem]">
              <td>{{ idx + 1 }}.</td>
              <td class="max-w-[8.125rem] w-full">{{ country.name }}</td>
              <td>{{ country.percentage }}%</td>
            </tr>
          </template>
        </UtLoadPresenter>
      </table>
    </div>
    <div class="w-full">
      <h4 class="mb-[1.125rem]">Top cities</h4>
      <table class="w-full">
        <UtLoadPresenter
          loading-message="Fetching cities statistics"
          not-found-message="No statistics found"
          :data="cities.length === 0"
          :state="loadingCities ? constants.LOADING : 'IDLE'"
        >
          <template v-for="(city, idx) in cities" :key="idx">
            <tr class="mb-[1.125rem]">
              <td>{{ idx + 1 }}.</td>
              <td class="max-w-[8.125rem] w-full">{{ city.name }}</td>
              <td>{{ city.percentage }}%</td>
            </tr>
          </template>
        </UtLoadPresenter>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  countries: { name: string; percentage: number }[];
  cities: { name: string; percentage: number }[];
  loadingCities?: boolean;
  loadingCountries?: boolean;
}>();
</script>

<style></style>
