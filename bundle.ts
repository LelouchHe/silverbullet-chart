export * from "chart.js/auto";

import Chart, { Colors } from "chart.js/auto";
import annotation from "chartjs-plugin-annotation";

Chart.register(Colors);
Chart.register(annotation);
