import type { AxiosInstance } from "axios";
import type { Getter, IRequestOptions, IStore } from "../interfaces/utils";
import axios from "axios";

export default class Api {
  private handle401?: () => Promise<void>;
  private getters?: Record<string, Getter>;
  private instance: AxiosInstance;
  private store?: IStore;

  private ACCESS_TOKEN_KEY = "accessToken";
  private RETRY_ON_STATUS = 401;
  private BASE_ROUTE = "/"
  private MAX_RETRY = 3;

  constructor() {
    this.instance = axios.create();
    this.interceptors();
  }

  public interceptors() {
    let retries = 0;
    this.instance.interceptors.response.use(null, (error) => {
      if (!this.handle401) return Promise.reject(error);
      if (error.response.status !== this.RETRY_ON_STATUS) {
        return Promise.reject(error)
      }

      const hasCompletedRetries = retries >= this.MAX_RETRY;

      if (hasCompletedRetries && this.store) {
        const storeGetters = Object.values((this.getters || {}));
        storeGetters.forEach(({ key }) => this.store!.clear && this.store!.clear(key))
        location.href = this.BASE_ROUTE;
      }

      if (!hasCompletedRetries) {
        return new Promise((resolve, reject) => {
          retries += 1;
          this.handle401!().then(() => {
            resolve(axios(error.config))
            retries = 0;
          }).catch(() => {
            retries = 0;
            reject(error)
          });
        })
      }

      return Promise.reject(error)
    })
  }

  get $store() {
    return this.store
  }

  public setStoreGetter(getters: Record<string, Getter>) {
    this.getters = getters;
  }

  public set401handler(handler: () => Promise<any>) {
    this.handle401 = handler;
  }

  public setStore(store: IStore) {
    this.store = store;
    return this;
  }

  public setBaseUrl(url: string) {
    this.instance.defaults.baseURL = url;
    return this;
  }

  public getStoreData(key: string) {
    if (!this.store) return;
    if (!this.getters) return;


    if (Object.keys(this.getters).includes(key) && this.getters[key]) {
      const { key: storeKey, getter } = this.getters[key];
      return getter(this.store.get(storeKey));
    }
  }

  public async request<R, T = any>(options: IRequestOptions<T>) {
    try {
      const { requireAuth, ...axiosOptions } = options
      const accessToken = this.getStoreData(this.ACCESS_TOKEN_KEY);
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
      console.log(error);
      const title = error.response?.data?.status || error.response?.statusText || error.message || "Server error";
      const description = error.response?.data?.userMessage || error.message || "Something went wrong";

      return Promise.reject({
        description: title === description ? undefined : description,
        __error: error,
        title,
      });
    }
  }
}