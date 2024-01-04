import type { AxiosInstance } from "axios";
import type { Getter, IRequestOptions, IStore } from "../interfaces/utils";
import axios from "axios";

export default class Api {
  private getters?: Record<string, Getter>;
  private instance: AxiosInstance;
  private store?: IStore;

  constructor() {
    this.instance = axios.create();
  }

  public setStoreGetter(getters: Record<string, Getter>) {
    this.getters = getters;
  }

  public setStore(store: IStore) {
    this.store = store;
    return this;
  }

  public setBaseUrl(url: string) {
    this.instance.defaults.baseURL = url;
    return this;
  }

  private getAccessToken() {
    if (!this.store) return;
    if (!this.getters) return;

    const { key, getter } = this.getters['token'];
    const token = getter<string>(this.store.get(key));

    return token;
  }

  public async request<R, T = any>(options: IRequestOptions<T>) {
    try {
      const { requireAuth, ...axiosOptions } = options
      const accessToken = this.getAccessToken();
      const res = await this.instance.request<R>({
        ...axiosOptions,
        headers: {
          ...axiosOptions.headers,
          ...(requireAuth && accessToken ? {
            Authorization: `Bearer ${accessToken}`,
          } : {})
        }
      });
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