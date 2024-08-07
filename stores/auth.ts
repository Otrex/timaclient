import { defineStore, acceptHMRUpdate } from 'pinia'
import { UserType } from '~/lib/enums';
import type { Payload } from '~/lib/interfaces';
import type { AccountWallet, User, UserProfile } from '~/lib/interfaces/core';

type IState = {
  registration: {
    email?: string,
    type?: UserType;
    publicId?: string;
    username?: string,
    country?: string
  },
  user: User,
  profile: UserProfile,
  wallet: AccountWallet,
  authorization: {
    accessToken?: string;
    userType?: UserType;
  },
  connectedSocials: string[];
}

export const useAuthStore = defineStore('auth', {
  state: (): IState => ({
    registration: {
      type: undefined,
      email: undefined,
      publicId: undefined,
      username: undefined,
      country: undefined
    },
    user: {} as unknown as User,
    profile: {} as unknown as UserProfile,
    wallet: {} as unknown as AccountWallet,
    authorization: {
      accessToken: undefined,
      userType: undefined,
    },
    connectedSocials: []
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.authorization.accessToken
    },
    userType(state) {
      return state.authorization.userType;
    }
  },

  actions: {
    updateStoreUserType(data: UserType) {
      this.$patch({
        authorization: {
          ...this.authorization,
          userType: data
        }
      })
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
        profile: response.data.profile,
        wallet: response.data.accountWallet,
      })
    },

    async refreshAuth() {
      const response = await this.$api.refreshAuth(
        this.authorization.accessToken!
      );

      this.$patch({
        authorization: {
          accessToken: response.data.access_token,
        }
      })
    },

    async createUser(payload: Omit<Payload.CreateUser, 'userType'>) {
      // const response = await this.$api.createUser({
      //   userType: this.authorization.userType!,
      //   ...payload,
      // });

      // this.$patch({
      //   registration: {
      //     ...this.registration,
      //     publicId: response.data?.publicId
      //   }
      // });
    },

    async updateBrandInformation(
      payload: Omit<Payload.BrandBasicInformation, 'publicId' | 'email'>
    ) {
      await this.$api.brandBasicInformationUpdate({
        publicId: this.registration.publicId!,
        email: this.registration.email!,
        ...payload,
      });
    },

    async updateInfluencerProfile(
      payload: Omit<Payload.InfluencerCompleteProfile, 'publicId' | 'email'>
    ) {
      await this.$api.influencerCompleteProfileUpdate({
        publicId: this.registration.publicId!,
        email: this.registration.email!,
        ...payload,
      });
    },

    async updateBrandAddressDoc(
      payload: Omit<Payload.BrandAddressDocumentation, 'publicId'>
    ) {
      await this.$api.brandAddressDocumentUpdate({
        publicId: this.registration.publicId!,
        ...payload,
      })
    },

    async updateInfluencerBankDetails(
      payload: Omit<Payload.InfluencerBankDetails, 'publicId'>
    ) {
      await this.$api.influencerBankDetailsUpdate({
        publicId: this.registration.publicId!,
        ...payload,
      })
    },

    async updateBrandIndustries(industries: string[]) {
      await this.$api.brandIndustryUpdate(
        this.registration.publicId!,
        industries
      )
    },

    async updateSocials(data: Payload.AddSocials) {
      await this.$api.updateSocialPlatforms(
        this.registration.publicId!,
        data
      );

      this.$patch({
        connectedSocials: [
          ...this.connectedSocials,
          data.name
        ]
      })

      return {
        title: data.name
      }
    },

    async resendOTP() {
      await this.$api.resendOTP({
        email: this.registration.email!,
        username: this.registration.username!,
      })
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
            userType: undefined,
          }
        });


        setTimeout(() => {
          this.$clearPersist();
          resolve(true)
        }, 3000);
      })
    }
  },
  persist: ['registration', 'authorization', 'user', 'profile', 'connectedSocials'],
  persistWith: tools.cookieStore(),
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}