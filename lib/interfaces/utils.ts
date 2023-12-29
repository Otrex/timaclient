import type { AxiosHeaders, Method, RawAxiosRequestHeaders } from "axios";
import type { UseFetchOptions } from "nuxt/app";

export interface IRequest<T = unknown> {
  status: boolean;
  message: string;
  data: T;
}

export interface IStore {
  set: (key: string, value: any) => void;
  get: (key: string) => string | null;
  clear?: (key: string) => void;
}

export type MethodsHeaders = Partial<
  {
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & { common: AxiosHeaders }
>;

export interface IRequestOptionEvents {
  $on?: {
    $start(): void;
    $stop(): void;
  }
}
export interface IRequestOptions<T extends Record<string, any> | any> extends IRequestOptionEvents {
  method: Method,
  url: string,
  data?: T,
  headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders,
}

export type Routes = Partial<keyof typeof constants>;

export type RequestPayloadBody = RequestInit["body"] | Record<string, any>;

export interface RequestPayloadOption {
  url: string | (() => string);
}

export type RequestPayload<T> = Partial<UseFetchOptions<T>> & RequestPayloadOption;
