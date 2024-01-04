import { defineStore } from "pinia";
import type { Country } from "~/lib/interfaces/core";

interface IState {
  countries: Country[]
}

export const useOptionsStore = defineStore("options", {
  state: (): IState => {
    return {
      countries: []
    };
  },

  actions: {
    async loadDashboardOptions() { },
    async loadRegisterOptions() {
      await this.getCountries();
    },
    async getCountries() {
      const response = await this.$api.getCountries();
      this.$patch({
        countries: response.data
      })
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOptionsStore, import.meta.hot))
}