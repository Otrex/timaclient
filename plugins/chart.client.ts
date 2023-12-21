import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import { ChoroplethController, GeoFeature, ColorScale, ProjectionScale } from 'chartjs-chart-geo';
export default defineNuxtPlugin(() => {
  Chart.register(ChoroplethController, GeoFeature, ColorScale, ProjectionScale, CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend)
})