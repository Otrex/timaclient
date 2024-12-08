import { defineStore, acceptHMRUpdate } from "pinia";
import { ProfileSetupState, UserType } from "~/lib/enums";
import type { Payload } from "~/lib/interfaces";
import type { AccountWallet, User, UserProfile } from "~/lib/interfaces/core";
import { auth, profile } from "./persisted";


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
  connectedSocials: any[];
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
      return !!auth.getItem() // && state.user?.hasVerifiedEmail;
    },
    userType(state) {
      return auth.getItem()?.userType;
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
    async clearAllStorageData() {
      // Clear all cookies
      document.cookie.split(";").forEach(cookie => {
        document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });

      // Clear localStorage
      localStorage.clear();

      // Clear the auth store state
      this.$patch({
        registration: {
          type: undefined,
          email: undefined,
          publicId: undefined,
          username: undefined,
          country: undefined
        },
        user: undefined,
        profile: null,
        wallet: undefined,
        authorization: {
          accessToken: undefined,
          userType: undefined
        },
        connectedSocials: []
      });

      this.$clearPersist();
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

      auth.setItem({
        accessToken: response.data.token,
        userType: response.data.user.role,
      })
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

    async tempStore(data: Record<string, any>) {
      this.$patch({
        ...data,
      });
    },

    async updateProfile(data: any) {
      const response = await this.$api.updateProfile(data);
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

    async updateSocials(data: Payload.SocialMediaAccount[]) {
      await this.$api.updateSocialPlatforms({
        socialMediaAccounts: data,
      });

      this.$patch({
        connectedSocials: [...this.connectedSocials, ...data],
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
  persist: ["registration", "authorization", "user", "profile"],
  persistWith: {
    set: (key, value) => {
      const data = [
        ...(profile.getItem() || []),
        {
          key,
          value
        }
      ]
      profile.setItem(data)
    },
    get: (key) => {
      const content = profile.getItem();
      return content?.find(item => item.key === key)?.value;
    },
    clear: (key) => {
      let data = profile.getItem() || [];
      data = data.filter(item => item.key !== key)
      profile.setItem(data)
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
