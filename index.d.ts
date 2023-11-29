import type { Pinia } from "pinia"

declare module '#app' {
  interface NuxtApp {
    $pinia: Pinia
  }
}

declare module "pinia" {
  export interface PiniaCustomStateProperties<S> {
    creationTime: Date;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $pinia: Pinia
  }
}

export { }