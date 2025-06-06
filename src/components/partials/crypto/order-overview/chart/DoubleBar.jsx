import { Bar } from "react-chartjs-2";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend
);

const DoubleBarChart = ({ data }) => {
  const allValues = data.datasets.flatMap((ds) => ds.data);
  const maxYValue = Math.max(...allValues);

  return (
    <Bar
      className="chartjs-render-monitor"
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            backgroundColor: "#eff6ff",
            titleFont: {
              size: "13px",
            },
            titleColor: "#6783b8",
            titleMarginBottom: 6,
            bodyColor: "#9eaecf",
            bodyFont: {
              size: "12px",
            },
            bodySpacing: 4,
            padding: 10,
            footerMarginTop: 0,
          },
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: maxYValue,
            ticks: {
              stepSize: Math.ceil(maxYValue / 5),
              color: "#9eaecf",
              font: {
                size: 11,
              },
              padding: 10,
              callback: (value) => value,
            },
            grid: {
              tickMarkLength: 0,
            },
          },
          x: {
            display: true,
            ticks: {
              color: "#9eaecf",
              font: {
                size: "9px",
              },
              source: "auto",
              padding: 10,
              stepSize: 2400,
            },
            grid: {
              color: "transparent",
              tickMarkLength: 0,
              zeroLineColor: "transparent",
            },
          },
        },
      }}
    />
  );
};

export default DoubleBarChart;
