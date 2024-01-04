import { defineStore, acceptHMRUpdate } from 'pinia'
import { UserType } from '~/lib/enums';
import type { Payload } from '~/lib/interfaces';

type IState = {
  registration: {
    email?: string,
    type?: UserType;
    publicId?: string;
    username?: string,
  },
  authorization: {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
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
    }
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.authorization.accessToken
    }
  },
  actions: {
    async signIn(payload: Payload.SignIn) {
      const response = await this.$api.signIn({
        ...payload,
      });

      this.$patch({
        authorization: {
          accessToken: response.data.access_token
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

    async resendOTP() {
      await this.$api.resendOTP({
        email: this.registration.email!,
        username: this.registration.username!,
      })
    }
  },
  persist: ['registration', 'authorization'],
  persistWith: {
    get(key: string) {
      return JSON.stringify(useCookie(key).value);
    },
    set(key: string, value: string) {
      useCookie(key).value = value;
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}