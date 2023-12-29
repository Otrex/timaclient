export default defineNuxtPlugin((app) => {
  return {
    provide: {
      api: useAPI(),
    }
  }
})