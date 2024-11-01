import { defineStore } from "pinia";
import countries from "~/assets/data/countries.json"
import type { Bank, Country, SocialType } from "~/lib/interfaces/core";
import type { GetCampaignOptions, GetCreativesOptions, GetPaymentMethods } from "~/lib/interfaces/response";

interface IState {
  countries: Country[];
  industries: string[];
  campaignOptions?: GetCampaignOptions['data'][0];
  creativesOptions?: GetCreativesOptions['data'][0];
  paymentMethods?: GetPaymentMethods['data'];
  socialTypes: SocialType[];
  paymentStatus: string[];
  banks: Bank[];
  __header: null | string;
}

export const useOptionsStore = defineStore("options", {
  state: (): IState => {
    return {
      __header: null,
      countries: [],
      industries: [],
      campaignOptions: {
        size: [
          "Nano (1,000 - 4,999)",
          "Nano+ (5000 - 9,999)",
          "Micro (10,000 - 49,999)",
          "Micro+ (50,000 - 99,999)",
          "Macro (100,000 - 499,999)",
          "Macro+ (500,000 - 999,999)",
          "Mega (1,000,000 - 9,999,999)",
          "Mega+ (10,000,000 > Above)",
        ],
        gender: [
          "Male",
          "Female",
          "Others",
        ],
        ageGroup: [
          "15 - 18",
          "18 - 25",
          "25 - 30",
          "30 - 40",
          "40 - 50",
          "50 - 60",
          "60 - 70",
          "70 - 80",
          "80 - 90",
          "90 - 100",
        ],
        location: [],
        monthlyIncome: [],
      },

      paymentMethods: undefined,
      creativesOptions: {
        contentType: [
          "Image",
          "Video",
          "Graphic",
          "Carousel",
          "Tweet",
          "Article",
          "Podcast",
          "Live",
          "Song"
        ],
        contentPlacement: [
          "Main Page",
          "Story",
          "Reel",
          "Short"
        ],
        creativeTone: [
          "Serious",
          "Funny",
          "Informative",
          "Emotional",
          "Inspirational",
          "Provocative",
          "Nostalgic",
          "Dramatic",
          "Minimalist",
          "Energetic",
          "Relaxing",
          "Professional",
          "Casual",
          "Sarcastic",
          "Mysterious",
          "Playful",
          "Authoritative",
          "Empathetic",
        ],
        objectiveAwareness: [
          "Brand Awareness",
          "Reach",
          "Traffic",
          "Engagement",
          "App Installs",
          "Video Views",
          "Lead Generation",
          "Messages",
          "Conversions",
          "Catalog Sales",
          "Store Traffic"
        ],
        objectiveAcquisition: [
          "Lead Generation",
          "Conversions",
          "Catalog Sales",
          "Store Traffic",
          "App Installs",
          "Messages"
        ],
      },
      paymentStatus: [],
      banks: [],
      socialTypes: [],
    };
  },

  getters: {
    $banks: (state) => state.banks,
    $campaignOptions: (state) => state.campaignOptions,
    $creativesOptions: (state) => state.creativesOptions,
    $paymentStatus: (state) => tools.generationOptions(state.paymentStatus),
    $paymentMethods: (state) => (state.paymentMethods || []).map(e => e.name),
    $industries: (state) => state.industries,
    $socials: (state) => state.socialTypes.map(st => ({ ...st, icon: tools.resolveSocialsIcon(st.name) })),
    $socialsByIcon: (state) => (icon: `socials/${string}` | string) => state.socialTypes.find(st => tools.resolveSocialsIcon(st.name) === icon),
    $countries: (state) => tools.generationOptions(state.countries.map(country => country.name.common)).sort((a, b) => a.label.localeCompare(b.label)), $getCurrency: (state) => (countryName: string) => {
      const country = state.countries.find(country => country.name.common === countryName)
      return country ? Object.values(country.currencies).map(c => c.name) : []
    },
    $countryLanguages: (state) => (countryName: string) => {
      const country = state.countries.find(country => country.name.common === countryName)
      return (country ? Object.values(country.languages || {}) : []).map(l => ({ label: l, value: l }))
    }
  },

  actions: {
    setHeader(header: string | null) {
      this.$patch({
        __header: header
      })
    },
    async loadOptions() {
      await Promise.all([
        this.getCountries(),
        this.getIndustries(),
      ]);
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
      this.$patch({ countries })
    },

    async getPaymentStatus() {
      const response = await this.$api.getPaymentStatus();
      this.$patch({
        paymentStatus: response.data
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

    async getPaymentMethods() {
      const response = await this.$api.getPaymentMethods();
      this.$patch({
        paymentMethods: response.data
      })
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOptionsStore, import.meta.hot))
}