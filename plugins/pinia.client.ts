import type { Pinia, PiniaPluginContext } from "pinia";

function persistHandler({ options, store }: PiniaPluginContext) {
  if (!options.persist) return {};
  const { json } = tools;
  const storeKey = (store: string, key: string) => {
    return `pinia-persist.${store}.${key}`;
  }

  const storage = options.persistWith || {
    get: (key: string) => window.localStorage.getItem(key),
    set: (key: string, value: string) => window.localStorage.setItem(key, value),
    clear: (key: string) => window.localStorage.removeItem(key),
  }

  options.persist!.forEach((key) => {
    const data = json.parse(
      storage.get(storeKey(store.$id, key as string))
    );

    if (!data) return;

    store.$patch({
      [key]: data,
    })
  });

  store.$subscribe((mutation) => {
    const $mutation = mutation as typeof mutation & { payload: typeof store };

    Object.keys($mutation.payload).forEach((key) => {
      if (options.persist!.includes(key)) {
        storage.set(
          storeKey($mutation.storeId, key),
          json.encode($mutation.payload[key])
        )
      }
    });
  })

  return {
    $clearPersist: () => {
      if (storage.clear) {
        options.persist!.forEach((key) => {
          storage.clear!(storeKey(store.$id, key as string))
        })
      }
    }
  }
}

export default defineNuxtPlugin((app) => {
  const pinia = app.$pinia as Pinia;
  pinia.use((context: PiniaPluginContext) => {
    return {
      ...persistHandler(context),
      $api: useAPI(),
    };
  });
});
