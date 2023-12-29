import type { Pinia } from "pinia"
import type { IStore } from "./lib/interfaces/utils";
import type TimaAPI from "./lib/api";

declare module "pinia" {
  export interface PiniaCustomProperties {
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
  }
}

declare module '#app' {
  interface NuxtApp {
    $pinia: Pinia;
  }
}


export { }