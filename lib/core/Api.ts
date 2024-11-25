import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { Getter, IRequestOptions, IStore } from "../interfaces/utils";
import axios from "axios";
import type { Store } from "./LocalStore";

export class ApiError extends Error {
  title: string;
  description: string;
  __error: any;

  constructor(error: any) {
    super(error);

    this.title = error.name === "AxiosError" ? "Request Failed!" : "App Error!";
    this.description = error.response?.data?.message || error.message || "Something went wrong";
    this.__error = error;

  }
}

export default class Api {
  private handle401?: (config: AxiosRequestConfig) => Promise<void>;
  private getters?: Record<string, Getter>;
  private instance: AxiosInstance;
  private store: Record<string, Store> = {};

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


      if (this.store && this.store.auth) {
        const auth = this.store.auth.getItem();
        config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
      }

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

      return Promise.reject(error)
    })
  }

  get $store() {
    return this.store
  }

  get $instance() {
    return this.instance
  }

  public set401handler(handler: (config: AxiosRequestConfig) => Promise<any>) {
    this.handle401 = handler;
  }

  public setStore(key: string, store: Store) {
    this.store[key] = store;
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