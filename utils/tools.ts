
export default {
  generationOptions(options: string[]) {
    return options.map(option => ({ label: option, value: option }))
  },
  capitalize(str: string) {
    return str.split('').map((s, i) => i === 0 ? s.toUpperCase() : s).join('')
  }
}