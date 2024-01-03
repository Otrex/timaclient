import { defineStore, acceptHMRUpdate } from 'pinia'
import { UserType } from '~/lib/enums';
import type { Payload } from '~/lib/interfaces';

type IState = {
  publicId?: string;
  token?: string;
  userType?: UserType;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
}

export const useAuthStore = defineStore('auth', {
  state: (): IState => ({
    userType: undefined,
    publicId: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    expiresIn: undefined,
  }),
  actions: {
    async signIn(payload: Payload.SignIn) {
      const response = await this.$api.signIn({
        ...payload,
      });

      console.log(response.data);

      this.$patch({
        token: response.data.access_token
      })

    },
    async createUser(payload: Omit<Payload.CreateUser, 'userType'>) {
      const response = await this.$api.createUser({
        userType: this.userType!,
        ...payload,
      });

      this.$patch({
        publicId: response.data?.publicId
      });
    },

    async updateBrandInformation(payload: Omit<Payload.BrandBasicInformation, 'publicId'>) {
      await this.$api.brandBasicInformationUpdate({
        ...payload,
        publicId: this.publicId!
      });
    }
  },
  persist: ['publicId', 'userType'],
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