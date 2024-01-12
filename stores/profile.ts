import type { ProfileInfo } from "~/lib/interfaces/core"

type IState = {
  profile: ProfileInfo | null
}

export const useProfileStore = defineStore('profile', {
  state: (): IState => ({
    profile: null
  }),
  getters: {
    $profile: (state) => {
      return {
        ...(state.profile?.profile || []),
        userType: state.profile?.profile.userType!,
        profilePicture: state.profile?.profile?.profilePicture || undefined,
        totalFullName: [
          state.profile?.profile?.firstName,
          state.profile?.profile?.middleName,
          state.profile?.profile?.lastName,
        ].join(' '),
        fullName: [
          state.profile?.profile?.firstName,
          state.profile?.profile?.lastName,
        ].join(' '),
      }
    }
  },

  actions: {
    async getProfile() {
      const response = await this.$api.getUserProfile();
      this.$patch({ profile: response.data });
    }
  }
})