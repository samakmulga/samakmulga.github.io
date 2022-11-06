import type { BubbleDataPoint, Chart, ChartTypeRegistry, ScatterDataPoint } from "chart.js";

 const data = {
    labels: [],
    datasets: [
      {
        label: '심박수',
        backgroundColor: 'rgba(225, 204,230, .3)',
        borderColor: 'rgb(205, 130, 158)',
        cubicInterpolationMode: 'monotone',
        fill: true,
        data: [],
        tension: 0.4, 
      }
    ],
  };
  
  export const config = {
  type: 'line' as keyof ChartTypeRegistry,
  data: data,
  options: {}
}

  export type MyChart = Chart<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint)[], unknown>
  