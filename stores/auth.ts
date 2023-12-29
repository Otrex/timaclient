import { defineStore, acceptHMRUpdate } from 'pinia'
import { UserType } from '~/lib/enums';
import type { Payload } from '~/lib/interfaces';

type IState = {
  publicId?: string;
  token?: string;
  userType?: UserType
}

export const useAuthStore = defineStore('auth', {
  state: (): IState => ({}),
  actions: {
    async createUser(payload: Omit<Payload.CreateUser, 'userType'>) {
      const response = await this.$api.createUser({
        userType: this.userType!,
        ...payload,
      }, tools.monitor());

      this.$patch({
        publicId: response.data?.publicId
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