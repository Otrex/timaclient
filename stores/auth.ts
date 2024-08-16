import { defineStore, acceptHMRUpdate } from "pinia";
import { ProfileSetupState, UserType } from "~/lib/enums";
import type { Payload } from "~/lib/interfaces";
import type { AccountWallet, User, UserProfile } from "~/lib/interfaces/core";

type IState = {
  registration: {
    email?: string;
    type?: UserType;
    publicId?: string;
    username?: string;
    country?: string;
  };
  user?: User;
  profile: Partial<User> & Partial<UserProfile> | null
  wallet?: AccountWallet;
  authorization: {
    accessToken?: string;
    userType?: UserType;
  };
  connectedSocials: string[];
};

export const useAuthStore = defineStore("auth", {
  state: (): IState => ({
    registration: {
      type: undefined,
      email: undefined,
      publicId: undefined,
      username: undefined,
      country: undefined,
    },
    user: undefined,
    profile: null,
    wallet: undefined,
    authorization: {
      accessToken: undefined,
      userType: undefined,
    },
    connectedSocials: [],
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.authorization.accessToken // && state.user?.hasVerifiedEmail;
    },
    userType(state) {
      return state.authorization.userType;
    },
    progress(state) {
      const profile = state.profile;
      if (!profile) return 0;

      const progress = profile.profileSetupProgress;
      if (progress === ProfileSetupState.REGISTERED) {
        if (profile.hasVerifiedEmail) return 40;
        else return 20
      }

      if (progress === ProfileSetupState.PROFILE_SETUP) {
        return 80;
      }

      if (progress === ProfileSetupState.PROFILE_SETUP_COMPLETED) {
        return 100;
      }

      return 0;
    }
  },

  actions: {
    updateStoreUserType(data: UserType) {
      this.$patch({
        authorization: {
          ...this.authorization,
          userType: data,
        },
      });
    },

    async signIn(payload: Payload.SignIn) {
      const response = await this.$api.signIn({
        ...payload,
      });

      this.$patch({
        authorization: {
          accessToken: response.data.token,
          userType: response.data.user.role,
        },
        user: response.data.user,
        profile: {
          ...response.data.user,
          ...response.data.profile
        },
        wallet: response.data.accountWallet,
      });
    },

    async refreshAuth() {
      const response = await this.$api.refreshAuth(
        this.authorization.accessToken!
      );

      this.$patch({
        authorization: {
          accessToken: response.data.access_token,
        },
      });
    },

    async createUser(payload: Omit<Payload.CreateUser, "role">) {
      const response = await this.$api.createUser({
        role: this.registration.type!,
        ...payload,
      });

      this.$patch({
        user: response.data.user,
        profile: {
          ...response.data.user,
        },
        registration: {
          ...this.registration,
          publicId: response.data.user.user_id,
        },

        authorization: {
          accessToken: response.data.token,
          userType: response.data.user.role,
        }
      });
    },

    async getProfile() {
      const response = await this.$api.getUserProfile();
      this.$patch({ profile: response.data });
    },

    async updateProfileSetup(data: Payload.BrandProfileSetup | Payload.InfluencerProfileSetup) {
      const response = await this.$api.profileSetup(data);
      this.$patch({ profile: response.data });
    },

    async updateAccountSetup(data: Payload.UpdateAccountSetup) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await this.$api.accountSetup(formData);
      this.$patch({ profile: response.data });
    },

    async updateBrandInformation(
      payload: Omit<Payload.BrandBasicInformation, "publicId" | "email">
    ) {
      await this.$api.brandBasicInformationUpdate({
        publicId: this.registration.publicId!,
        email: this.registration.email!,
        ...payload,
      });
    },

    async updateInfluencerProfile(
      payload: Omit<Payload.InfluencerCompleteProfile, "publicId" | "email">
    ) {
      await this.$api.influencerCompleteProfileUpdate({
        publicId: this.registration.publicId!,
        email: this.registration.email!,
        ...payload,
      });
    },

    async updateBrandAddressDoc(
      payload: Omit<Payload.BrandAddressDocumentation, "publicId">
    ) {
      await this.$api.brandAddressDocumentUpdate({
        publicId: this.registration.publicId!,
        ...payload,
      });
    },

    async updateInfluencerBankDetails(
      payload: Omit<Payload.InfluencerBankDetails, "publicId">
    ) {
      await this.$api.influencerBankDetailsUpdate({
        publicId: this.registration.publicId!,
        ...payload,
      });
    },

    async updateIndustries(industries: string[]) {
      await this.$api.industryUpdate(industries);
    },

    async updateSocials(data: Payload.AddSocials) {
      await this.$api.updateSocialPlatforms(this.registration.publicId!, data);

      this.$patch({
        connectedSocials: [...this.connectedSocials, data.name],
      });

      return {
        title: data.name,
      };
    },

    async resendOTP() {
      await this.$api.resendOTP({
        email: this.registration.email!,
        username: this.registration.username!,
      });
    },

    async logout() {
      return new Promise((resolve) => {
        this.$patch({
          registration: {
            type: undefined,
            email: undefined,
            publicId: undefined,
            username: undefined,
          },
          authorization: {
            accessToken: undefined,
          },
          user: undefined,
          profile: undefined,
          wallet: undefined,
        });

        setTimeout(() => {
          this.$clearPersist();
          resolve(true);
        }, 1000);
      });
    },
  },
  persist: ["registration", "authorization", "user", "profile", "connectedSocials"],
  persistWith: tools.cookieStore(),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
