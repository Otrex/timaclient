import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { Getter, IRequestOptions, IStore } from "../interfaces/utils";
import axios from "axios";

export class ApiError extends Error {
  title: string;
  description: string;
  __error: any;

  constructor(error: any) {
    super(error);
    const title = error.response?.data?.status || error.response?.statusText || error.message || "Server error";
    const description = error.response?.data?.userMessage || error.message || "Something went wrong";

    this.title = title === description ? "App Error" : title;
    this.description = description;
    this.__error = error;

    console.error(error);

  }
}

export default class Api {
  private handle401?: (config: AxiosRequestConfig) => Promise<void>;
  private getters?: Record<string, Getter>;
  private instance: AxiosInstance;
  private store?: IStore;

  private ACCESS_TOKEN_KEY = "accessToken";
  private REQUIRE_AUTH_HEADER = "x-tima-requires-auth";
  private RETRY_ON_STATUS = 401;
  private BASE_ROUTE = "/"
  private MAX_RETRY = 3;

  constructor() {
    this.instance = axios.create();
    this.responseInterceptor();
    this.requestInterceptor();
  }

  public requestInterceptor() {
    this.instance.interceptors.request.use((config) => {
      const requiresAuth = config.headers[this.REQUIRE_AUTH_HEADER];
      if (!requiresAuth) return config;


      const accessToken = this.getStoreData(this.ACCESS_TOKEN_KEY);
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      return config;
    });
  }

  public responseInterceptor() {
    let retries = 0;
    this.instance.interceptors.response.use(null, (error) => {
      if (!this.handle401) return Promise.reject(error);
      if (error.response?.status !== this.RETRY_ON_STATUS) {
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
          this.handle401!(error.config).then(() => {
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

  public set401handler(handler: (config: AxiosRequestConfig) => Promise<any>) {
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

  public querify(url: string, data: Record<string, any> = {}) {
    const queryParams = (new URLSearchParams(data)).toString().trim();
    return queryParams ? `${url}?${queryParams}` : url;
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

      const res = await this.instance.request<R>({
        ...axiosOptions,
        headers: {
          ...axiosOptions.headers,
          [this.REQUIRE_AUTH_HEADER]: !!requireAuth,
        }
      });
      return res.data;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}