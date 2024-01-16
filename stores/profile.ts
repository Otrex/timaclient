import type { Payload } from "~/lib/interfaces"
import type { ProfileInfo, User } from "~/lib/interfaces/core"

type IState = {
  profile: ProfileInfo | null
}

type GetterProfile = User & {
  username: string
  publicId: string
  totalFullName: string
  fullName: string
}

export const useProfileStore = defineStore('profile', {
  state: (): IState => ({
    profile: null
  }),
  getters: {
    $profile: (state): GetterProfile | null => {
      return state.profile ? {
        ...state.profile,
        ...state.profile.profile,
        totalFullName: [
          state.profile?.profile?.firstName,
          state.profile?.profile?.middleName,
          state.profile?.profile?.lastName,
        ].join(' '),
        fullName: [
          state.profile?.profile?.firstName,
          state.profile?.profile?.lastName,
        ].join(' '),
      } : null
    }
  },

  actions: {
    async getProfile() {
      const response = await this.$api.getUserProfile();
      this.$patch({ profile: response.data });
    },

    async updatePersonalProfile(payload: Omit<Payload.InfluencerPersonalProfile, "publicId">) {
      const response = await this.$api.updatePersonalProfile({
        publicId: this.$profile?.publicId!,
        ...payload
      });

      this.$patch({
        profile: {
          ...this.profile,
          profile: response.data
        }
      })

      return response;
    }
  }
})