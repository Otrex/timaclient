import { defineStore } from "pinia";
import type { Country, Industry } from "~/lib/interfaces/core";

interface IState {
  countries: Country[];
  industries: Industry[]
}

export const useOptionsStore = defineStore("options", {
  state: (): IState => {
    return {
      countries: [],
      industries: [],
    };
  },

  getters: {
    $countries: (state) => tools.generationOptions(state.countries.map(country => country.name)),
    $industries: (state) => state.industries.map(industry => industry.name)
  },

  actions: {
    async loadDashboardOptions() { },
    async loadRegisterOptions() {
      await this.getCountries();
      await this.getIndustries();
    },
    async getCountries() {
      const response = await this.$api.getCountries();
      this.$patch({
        countries: response.data
      })
    },

    async getIndustries() {
      const response = await this.$api.getIndustries();
      this.$patch({
        industries: response.data
      })
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOptionsStore, import.meta.hot))
}