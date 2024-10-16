import type { Pinia } from "pinia"
import type { IStore } from "./lib/interfaces/utils";
import type TimaAPI from "./lib/api";
import type { ToastOptions } from "vue3-toastify";
import type ApexCharts from "apexcharts";

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: Record<string, any>;
    fbAsyncInit: any
    facebookLogin: any;
    FB: any
  }
}

declare module 'nuxt/schema' {
  interface AppConfig {
    toastConfig: ToastOptions
  }
}

declare module "pinia" {
  export interface PiniaCustomProperties {
    $clearPersist: () => void;
    $api: TimaAPI
  }
  export interface DefineStoreOptionsBase<S, Store> {
    monitor?: Array<keyof StoreActions<Store> | string>;
    persist?: Array<keyof StoreState<Store>>;
    persistWith?: IStore
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $pinia: Pinia;
    $apexcharts: typeof ApexCharts;
  }
}

declare module '#app' {
  interface NuxtApp {
    $pinia: Pinia;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $apexcharts: typeof ApexCharts;
  }
}


export { }