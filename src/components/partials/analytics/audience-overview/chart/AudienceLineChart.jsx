import { Line } from "react-chartjs-2";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Filler,
  Legend
);
const AudienceLineChart = ({ data }) => {
  return (
    <Line
      className="analytics-line-large"
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
            callbacks: {
              label: function (context) {
                return context.parsed.y;
              },
            },
          },
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            display: true,
            ticks: {
              beginAtZero: true,
              color: "#9eaecf",
              font: {
                size: "11px",
              },
              padding: 8,
              stepSize: 2400,
            },
            grid: {
              color: "rgba(82, 100, 132, 0.2)",
              tickMarkLength: 0,
              zeroLineColor: "rgba(82, 100, 132,0.2)",
            },
          },
          x: {
            display: false,
            ticks: {
              color: "#9eaecf",
              font: {
                size: "12px",
              },
              source: "auto",
              padding: 0,
            },
            grid: {
              color: "transparent",
              tickMarkLength: 0,
              zeroLineColor: "transparent",
              offsetGridLines: true,
            },
          },
        },
      }}
    ></Line>
  );
};

export default AudienceLineChart;
