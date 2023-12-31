import type { ExtractState, GlobalConfig, Validation, ValidationArgs } from "@vuelidate/core";
import type { AxiosError, AxiosHeaders, Method, RawAxiosRequestHeaders } from "axios";
import type { UseFetchOptions } from "nuxt/app";
import type { ToRefs } from "vue";
import type { RequestState } from "../enums";

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
  headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders,
  method: Method,
  url: string,
  data?: T,
}

export type Routes = Partial<keyof typeof constants>;

export type RequestPayloadBody = RequestInit["body"] | Record<string, any>;

export interface RequestPayloadOption {
  url: string | (() => string);
}

export type RequestPayload<T> = Partial<UseFetchOptions<T>> & RequestPayloadOption;
export interface VuelidateConfig<
  T extends { [key in keyof Vargs]: any },
  Vargs extends ValidationArgs = ValidationArgs,
> {
  rule: Ref<Vargs> | Vargs,
  form: T | Ref<T> | ToRefs<T>,
  config?: GlobalConfig
}

export type ApiError = AxiosError<IErrorRequest>['response'];

export interface IErrorRequest {
  developerMessage: string;
  path: string;
  requestId: string;
  status: string;
  timestamp: string;
  userMessage: string;
}

export type EnsureDefined<T, M extends keyof T> = {
  [K in keyof T]: T[K];
} & {
    [key in M]-?: NonNullable<T[key]>;
  };


export interface UseRequestProps<T, R = any[], M = any, K extends Record<string, any> = {}> {
  onSuccess?: (response: Awaited<T>) => void | Promise<void>;
  onError?: (error: AxiosError<M>['response']) => void;
  action: (...args: R[]) => Promise<T>;
  validation?: VuelidateConfig<K>;
  useGlobalLoader?: boolean;
}

export interface UseRequestReturnType<T, R = any[], M = any, K extends Record<string, any> = {}> {
  v$: globalThis.Ref<Validation<ValidationArgs<unknown>, K>> | undefined
  execute: (...args: R[]) => Promise<T | undefined>;
  $fieldError: globalThis.ComputedRef<any>;
  state: globalThis.Ref<RequestState>;
  validate: () => Promise<void>;
  error: globalThis.Ref<any>;
  clear: () => RequestState;
}

export interface UseRequestPropsWithValidation<T, R, M, K extends Record<string, any>> extends EnsureDefined<UseRequestProps<T, R, M, K>, 'validation'> { };

