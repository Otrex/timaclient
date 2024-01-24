import type { Core } from "~/lib/interfaces";
import type { UnPartial } from "~/lib/interfaces/utils";

type IStore = {
  publicId?: string;
  creative: Partial<Core.Campaign['creative']>,
  influencer: Partial<Core.Campaign['influencer']>,
  overview: Partial<Core.Campaign['overview']>,
  status?: Partial<Core.Campaign['status']>,
};

export const useCampaignStore = defineStore("campaign", {
  state: (): IStore => {
    return {
      publicId: undefined,
      creative: {},
      influencer: {},
      overview: {
        socialMediaPlatforms: []
      },
      status: undefined,
    };
  },

  getters: {
    campaign: (state) => ({
      publicId: state.publicId,
      creative: state.creative,
      influencer: state.influencer,
      overview: state.overview,
      status: state.status
    })
  },

  actions: {
    async createCampaign() {
      const profileStore = useProfileStore();
      if (!profileStore.$profile?.companyName) return;

      const response = await this.$api.createCampaign({
        creative: this.creative as UnPartial<typeof this.creative>,
        influencer: this.influencer as UnPartial<typeof this.influencer>,
        overview: this.overview as UnPartial<typeof this.overview>,
        brandName: profileStore.$profile?.companyName,
      });

      this.$patch({
        ...response.data
      });
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCampaignStore, import.meta.hot))
}