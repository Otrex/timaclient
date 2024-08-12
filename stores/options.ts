import { defineStore } from "pinia";
import type { Bank, Country, Industry, SocialType } from "~/lib/interfaces/core";
import type { GetCampaignOptions, GetCreativesOptions, GetPaymentMethods } from "~/lib/interfaces/response";

interface IState {
  countries: Country[];
  industries: string[];
  campaignOptions?: GetCampaignOptions['data'];
  creativesOptions?: GetCreativesOptions['data'];
  paymentMethods?: GetPaymentMethods['data'];
  socialTypes: SocialType[];
  paymentStatus: string[];
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
      paymentStatus: [],
      banks: [],
      socialTypes: [],
    };
  },

  getters: {
    $banks: (state) => state.banks,
    $campaignOptions: (state) => state.campaignOptions || [],
    $creativesOptions: (state) => state.creativesOptions || [],
    $paymentStatus: (state) => tools.generationOptions(state.paymentStatus),
    $paymentMethods: (state) => (state.paymentMethods || []).map(e => e.name),
    $industries: (state) => state.industries,
    $socials: (state) => state.socialTypes.map(st => ({ ...st, icon: tools.resolveSocialsIcon(st.name) })),
    $socialsByIcon: (state) => (icon: `socials/${string}` | string) => state.socialTypes.find(st => tools.resolveSocialsIcon(st.name) === icon),
    $countries: (state) => tools.generationOptions(state.countries.map(country => country.name.common)).sort(),
    $getCurrency: (state) => (countryName: string) => {
      const country = state.countries.find(country => country.name.common === countryName)
      return country ? Object.values(country.currencies).map(c => c.name) : []
    },
    $countryLanguages: (state) => (countryName: string) => {
      const country = state.countries.find(country => country.name.common === countryName)
      return country ? Object.values(country.languages) : []
    }
  },

  actions: {
    async loadOptions() {
      await Promise.all([
        // profileStore.getProfile(),
        this.getCountries(),
        this.getIndustries(),
        // this.getPaymentStatus(),
      ]);

      // if (!this.campaignOptions) {
      //   await Promise.all([
      //     this.getCampaignOptions(),
      //     this.getCreativesOptions(),
      //     this.getPaymentMethods(),
      //   ]);
      // }
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
      this.$patch({
        countries: await this.$api.getCountries()
      })
    },

    async getPaymentStatus() {
      const response = await this.$api.getPaymentStatus();
      this.$patch({
        paymentStatus: response.data
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
    },

    async getSocialTypes() {
      const response = await this.$api.getSocials();
      this.$patch({
        socialTypes: response.data
      });
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOptionsStore, import.meta.hot))
}