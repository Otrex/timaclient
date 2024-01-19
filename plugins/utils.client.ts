import {
  Chart, Title,
  Tooltip, Legend,
  BarElement, CategoryScale,
  LinearScale, ArcElement
} from 'chart.js'

import {
  ChoroplethController,
  GeoFeature, ColorScale,
  ProjectionScale
} from 'chartjs-chart-geo';

import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin(({ vueApp: app }) => {

  // Register chart plugin
  Chart.register(
    ChoroplethController, GeoFeature,
    ColorScale, ProjectionScale,
    CategoryScale, LinearScale,
    ArcElement, BarElement,
    Title, Tooltip, Legend
  );

  // Inject Toastify
  app.use(Vue3Toastify, { autoClose: 1000 });

  return {
    provide: {
      toast
    }
  }
})