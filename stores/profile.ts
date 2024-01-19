import type { Payload, Core } from "~/lib/interfaces"

type IState = {
  bankDetails: Core.BankDetails | null,
  profile: Core.ProfileInfo | null
  address: Core.Address | null,
}

type GetterProfile = Core.User & {
  username: string
  publicId: string
  totalFullName: string
  fullName: string,
  address: Core.Address | null,
  notificationSetting: Core.NotificationSetting | null,
  bankDetails: Core.BankDetails | null,
}

export const useProfileStore = defineStore('profile', {
  state: (): IState => ({
    profile: null,
    address: null,
    bankDetails: null,
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
      }
    },

    async getBankDetails() {
      const response = await this.$api.getBankDetails();
      if (response?.data) this.$patch({ bankDetails: response.data })
    },

    async getAddressDetails() {
      const response = await this.$api.getAddress();
      if (response?.data) this.$patch({ address: response.data })
    },

    async updatePassword(payload: Payload.UpdatePassword) {
      return this.$api.updatePassword(payload);
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