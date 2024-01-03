import type { AxiosInstance } from "axios";
import type { IRequestOptions, IStore } from "../interfaces/utils";
import axios from "axios";

export default class Api {
  private instance: AxiosInstance;
  private store?: IStore;

  constructor() {
    this.instance = axios.create();
  }

  public setStore(store: IStore) {
    this.store = store;
    return this;
  }

  public setBaseUrl(url: string) {
    this.instance.defaults.baseURL = url;
    return this;
  }

  private updateToken() {
    const token = this.store?.get('pinia-persist.auth.accessToken');
    if (token) {
      this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }

  public async request<R, T = any>(options: IRequestOptions<T>) {
    try {
      this.updateToken();
      const res = await this.instance.request<R>(options);
      return res.data;
    } catch (error: any) {
      console.error(error);
      return Promise.reject({
        title: error.response?.data?.status || error.response?.statusText || error.message || "Server error",
        description: error.response?.data?.userMessage || error.message || "Something went wrong",
        __error: error,
      });
    }
  }
}