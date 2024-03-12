import type { Payload, Core } from "~/lib/interfaces"

type IState = {
  bankDetails: Core.BankDetails | null,
  profile: Core.ProfileInfo | null
  address: Core.Address | null,
  industries: string[]
}

type GetterProfile = Core.User & {
  username: string
  publicId: string
  totalFullName: string
  fullName: string,
  address: Core.Address | null,
  notificationSetting: Core.NotificationSetting | null,
  bankDetails: Core.BankDetails | null,
  industries: string[]
}

export const useProfileStore = defineStore('profile', {
  state: (): IState => ({
    profile: null,
    address: null,
    bankDetails: null,
    industries: []
  }),
  getters: {
    $profile: (state): GetterProfile | null => {
      const profile = state.profile?.profile!;

      const userType = profile?.userType;
      const isInfluencer = userType === constants.INFLUENCER;
      const notification = profile?.notificationSetting || 'null'

      return state.profile ? {
        ...profile,
        ...state.profile,
        address: state.address,
        industries: state.industries,
        bankDetails: state.bankDetails,
        notificationSetting: JSON.parse(notification),
        totalFullName: !isInfluencer
          ? profile?.companyName
          : [
            profile?.firstName,
            profile?.middleName,
            profile?.lastName,
          ].join(' '),
        fullName: !isInfluencer
          ? profile?.companyName
          : [
            profile?.firstName,
            profile?.lastName,
          ].join(' ')
      } : null
    }
  },

  actions: {
    async getProfile() {
      await Promise.all([
        this.getUserDetails(),
        this.getBankDetails(),
        this.getAddressDetails(),
      ]);
    },

    async getUserDetails() {
      const response = await this.$api.getUserProfile();

      if (response?.data) {
        const authStore = useAuthStore();
        this.$patch({ profile: response.data })
        authStore.updateStoreUserType(
          response.data.profile?.userType
        );

        await this.getUserIndustries();
      }
    },

    async getUserIndustries() {
      const response = await this.$api.getUserIndustries(this.profile?.publicId!);
      if (response?.data) this.$patch({ industries: response.data?.selectedIndustries })
    },

    async getBankDetails() {
      if (this.profile?.profile.userType === constants.INFLUENCER) {
        const response = await this.$api.getBankDetails();
        if (response?.data) this.$patch({ bankDetails: response.data })
      }
    },

    async getAddressDetails() {
      const response = await this.$api.getAddress();
      if (response?.data) this.$patch({ address: response.data })
    },

    async updatePassword(payload: Payload.UpdatePassword) {
      return this.$api.updatePassword(payload);
    },

    async updateIndustries(payload: string[]) {
      const response = await this.$api.updateIndustries(payload);
      if (response?.data) {
        await this.getUserDetails();
      }
    },

    async updateNotificationSettings(
      payload: Payload.NotificationSettings
    ) {
      const response = await this.$api.updateInfluencerNotificationSetting({
        ...payload
      });

      if (response?.data) {
        await this.getUserDetails();
      }
    },

    async updateBrandInformation(
      payload: Payload.UpdateBrandInformation
    ) {
      const response = await this.$api.updateBrandInformation({
        ...payload
      });

      if (response?.data) {
        this.$patch({
          profile: {
            ...this.profile,
            profile: response.data
          }
        });
      }

    },

    async updatePersonalProfile(
      payload: Omit<Payload.InfluencerPersonalProfile, "publicId">
    ) {
      const response = await this.$api.updatePersonalProfile({
        publicId: this.$profile?.publicId!,
        ...payload
      });

      if (response?.data) {
        this.$patch({
          profile: {
            ...this.profile,
            profile: response.data
          }
        });
      }
    },

    async updateBankInformation(
      payload: Payload.UpdateBankInformation
    ) {
      const response = await this.$api.updateBankDetails(payload);

      if (response?.data) {
        this.$patch({
          bankDetails: {
            ...this.bankDetails,
            ...response.data
          }
        })
      }

    },

    async updateProfilePicture(picture: string) {
      await this.$api.updateProfilePictures(picture);
      await this.getUserDetails();
    },

    async updateCoverImage(picture: string) {
      await this.$api.updateCoverImage(picture);
      await this.getUserDetails();
    },

    async updateAddress(
      payload: Payload.UpdateAddress['addressRecord']
    ) {
      const response = await this.$api.updateAddress({
        addressRecord: payload
      });

      if (response?.data) {
        this.$patch({
          address: {
            ...this.address,
            ...response.data
          }
        })
      }
    }
  }
})