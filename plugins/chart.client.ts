import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
export default defineNuxtPlugin(() => {
  Chart.register(CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend)
})