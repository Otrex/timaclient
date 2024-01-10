import { defineStore } from "pinia";
import type { Bank, Country, Industry } from "~/lib/interfaces/core";

interface IState {
  countries: Country[];
  industries: Industry[];
  banks: Bank[];
}

export const useOptionsStore = defineStore("options", {
  state: (): IState => {
    return {
      countries: [],
      industries: [],
      banks: []
    };
  },

  getters: {
    $banks: (state) => state.banks,
    $industries: (state) => state.industries.map(industry => industry.name),
    $countries: (state) => tools.generationOptions(state.countries.map(country => country.name)),
    $getCurrency: (state) => (countryName: string) => state.countries.find(country => country.name === countryName)?.currency,
    $countryLanguages: (state) => (countryName: string) => tools.generationOptions(state.countries.find(country => country.name === countryName)?.language || [])
  },

  actions: {
    async loadDashboardOptions() { },
    async loadRegisterOptions() {
      await Promise.all([
        this.getBanks(),
        this.getCountries(),
        this.getIndustries(),
      ]);
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
    },

    async getBanks() {
      const response = await this.$api.getBanks();
      this.$patch({
        banks: response.data
      })
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOptionsStore, import.meta.hot))
}