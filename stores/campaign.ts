import type { Core } from "~/lib/interfaces";


type IStore = {
  newCampaign: Core.Campaign;
  currentCampaign: Core.Campaign | null;
};

export const useCampaignStore = defineStore("campaign", {
  state: (): IStore => {
    return {
      currentCampaign: null,
      newCampaign: {
        invitees: [], // Delete later
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
    currentCampaign: (state) => state.currentCampaign,
  },

  actions: {
    async createCampaign() {
      await this.$api.createCampaign({
        banner: this.newCampaign.banner as File,
        requestBody: {
          ...this.newCampaign,
          influencerID: this.newCampaign.invitees.map(invitee => invitee.id)
        }
      })
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCampaignStore, import.meta.hot))
}