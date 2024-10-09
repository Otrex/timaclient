import type { Core } from "~/lib/interfaces";


type IStore = {
  newCampaign: Core.Campaign;
};

export const useCampaignStore = defineStore("campaign", {
  state: (): IStore => {
    return {
      newCampaign: {
        campaignName: "",
        campaignObjective: "",
        campaignAbout: "",
        campaignWebsite: "",
        planningBudget: "",
        socialMediaPlatform: [],
        category: [],
        audienceSize: [],
        audienceGender: [],
        audienceAgeGroup: [],
        audienceLocation: [],
        influencerID: [],
        startDate: "",
        endDate: "",
        contentType: [],
        contentPlacement: [],
        creativeBrief: "",
        campaignRule: "",
        creativeTone: "",
        referenceLink: "",
        campaignObjectiveAwareness: "",
        campaignObjectiveAcquisition: "",
        banner: "",
        viewType: false,
        statusProgress: "",
      },
    };
  },

  getters: {

  },

  actions: {
    async createCampaign() {
      await this.$api.createCampaign({
        banner: this.newCampaign.banner as File,
        requestBody: this.newCampaign
      })
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCampaignStore, import.meta.hot))
}