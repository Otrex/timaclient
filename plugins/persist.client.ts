import type { Pinia, PiniaPluginContext } from "pinia";
import type { Plugin } from "nuxt/app";

type INuxtApp = Record<string, any> & { $pinia?: Pinia } & NuxtApp
const persistStates: string[] = ["auth", "workspaces", "agencyWizard"];

const plugin: Plugin = (app: INuxtApp) => {
  const pinia = app.$pinia;

  console.log(app, "registered ");


  pinia?.use((context: PiniaPluginContext) => {
    const storeId = context.store.$id;
    const localStorage = window.localStorage;

    if (persistStates.includes(storeId)) {
      const data = JSON.parse(localStorage.getItem(`ai-${storeId}`) as any);

      if (data) context.store.$patch(data);

      context.store.$subscribe((mutation, state) => {
        console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`);
        window?.localStorage.setItem(`ai-${storeId}`, JSON.stringify(state));
      });
    }

    return { creationTime: new Date() };
  });
};

export default defineNuxtPlugin(plugin);
