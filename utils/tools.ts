
export default {
  generationOptions(options: string[]) {
    return options.map(option => ({ label: option, value: option }))
  }
}