export default defineNuxtPlugin(() => {
  return {
    provide: {
      api: useAPI(),
    }
  }
})