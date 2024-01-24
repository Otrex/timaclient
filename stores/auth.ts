import { defineStore, acceptHMRUpdate } from 'pinia'
import { UserType } from '~/lib/enums';
import type { Payload } from '~/lib/interfaces';

type IState = {
  registration: {
    email?: string,
    type?: UserType;
    publicId?: string;
    username?: string,
    country?: string
  },
  authorization: {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    userType?: UserType;
  }
}

export const useAuthStore = defineStore('auth', {
  state: (): IState => ({
    registration: {
      type: undefined,
      email: undefined,
      publicId: undefined,
      username: undefined,
    },
    authorization: {
      accessToken: undefined,
      refreshToken: undefined,
      expiresIn: undefined,
      userType: undefined,
    }
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
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
          expiresIn: response.data.expires_in,
        }
      })
    },

    async refreshAuth() {
      const response = await this.$api.refreshAuth(
        this.authorization.refreshToken!
      );

      this.$patch({
        authorization: {
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
          expiresIn: response.data.expires_in,
        }
      })
    },

    async createUser(payload: Omit<Payload.CreateUser, 'userType'>) {
      const response = await this.$api.createUser({
        userType: this.registration.type!,
        ...payload,
      });

      this.$patch({
        registration: {
          ...this.registration,
          publicId: response.data?.publicId
        }
      });
    },

    async updateBrandInformation(payload: Omit<Payload.BrandBasicInformation, 'publicId' | 'email'>) {
      await this.$api.brandBasicInformationUpdate({
        publicId: this.registration.publicId!,
        email: this.registration.email!,
        ...payload,
      });
    },

    async updateInfluencerProfile(payload: Omit<Payload.InfluencerCompleteProfile, 'publicId' | 'email'>) {
      await this.$api.influencerCompleteProfileUpdate({
        publicId: this.registration.publicId!,
        email: this.registration.email!,
        ...payload,
      });
    },

    async updateBrandAddressDoc(payload: Omit<Payload.BrandAddressDocumentation, 'publicId'>) {
      await this.$api.brandAddressDocumentUpdate({
        publicId: this.registration.publicId!,
        ...payload,
      })
    },

    async updateInfluencerBankDetails(payload: Omit<Payload.InfluencerBankDetails, 'publicId'>) {
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
            refreshToken: undefined,
            expiresIn: undefined,
          }
        });


        setTimeout(() => {
          this.$clearPersist();
          resolve(true)
        }, 3000);
      })
    }
  },
  persist: ['registration', 'authorization'],
  persistWith: tools.cookieStore(),
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}