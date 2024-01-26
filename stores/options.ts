import { defineStore } from "pinia";
import type { Bank, Country, Industry } from "~/lib/interfaces/core";
import type { GetCampaignOptions, GetCreativesOptions, GetPaymentMethods } from "~/lib/interfaces/response";

interface IState {
  countries: Country[];
  industries: Industry[];
  campaignOptions?: GetCampaignOptions['data'];
  creativesOptions?: GetCreativesOptions['data'];
  paymentMethods?: GetPaymentMethods['data'];
  banks: Bank[];
}

export const useOptionsStore = defineStore("options", {
  state: (): IState => {
    return {
      countries: [],
      industries: [],
      campaignOptions: undefined,
      paymentMethods: undefined,
      creativesOptions: undefined,
      banks: [],
    };
  },

  getters: {
    $banks: (state) => state.banks,
    $campaignOptions: (state) => state.campaignOptions || [],
    $creativesOptions: (state) => state.creativesOptions || [],
    $paymentMethods: (state) => (state.paymentMethods || []).map(e => e.name),
    $industries: (state) => state.industries.map(industry => industry.name),
    $countries: (state) => tools.generationOptions(state.countries.map(country => country.name)),
    $getCurrency: (state) => (countryName: string) => state.countries.find(country => country.name === countryName)?.currency,
    $countryLanguages: (state) => (countryName: string) => tools.generationOptions(state.countries.find(country => country.name === countryName)?.language || [])
  },

  actions: {
    async loadDashboardOptions() {
      const profileStore = useProfileStore();
      if (profileStore.profile) return;

      await Promise.all([
        profileStore.getProfile(),
        this.getCountries(),
        this.getIndustries(),
      ]);

      await Promise.all([
        this.getCampaignOptions(),
        this.getCreativesOptions(),
        this.getPaymentMethods(),
      ])
    },
    async loadRegisterOptions() {
      if (this.countries.length > 0) return
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

    async getCampaignOptions() {
      const response = await this.$api.getCampaignsOptions();
      this.$patch({
        campaignOptions: response.data
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
    },

    async getCreativesOptions() {
      const response = await this.$api.getCreativesOptions();
      this.$patch({
        creativesOptions: response.data
      })
    },

    async getPaymentMethods() {
      const response = await this.$api.getPaymentMethods();
      this.$patch({
        paymentMethods: response.data
      })
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOptionsStore, import.meta.hot))
}