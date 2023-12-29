import type { AxiosError, AxiosInstance } from "axios";
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
    const token = this.store?.get('token');
    if (token) {
      this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }

  public async request<R, T = any>(options: IRequestOptions<T>) {
    this.updateToken();
    const { $on, ...requestOptions } = options;
    $on && $on.$start();
    try {
      const res = await this.instance.request<R>(requestOptions);
      return res.data;
    } catch (error: AxiosError | any) {
      return Promise.reject(error.response);
    } finally {
      $on && $on.$stop();
    }
  }
}