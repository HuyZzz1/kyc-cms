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

const HorizontalBarChart = ({ data }) => {
  const max = 300;

  return (
    <Bar
      data={data}
      className="coin-overview-chart"
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
        indexAxis: "y",
        maintainAspectRatio: false,
        scales: {
          y: {
            display: false,
            stacked: true,
            ticks: {
              beginAtZero: true,
              padding: 0,
            },
            grid: {
              tickMarkLength: 0,
            },
          },
          x: {
            display: false,
            stacked: true,
            ticks: {
              color: "#9eaecf",
              font: {
                size: "9px",
              },
              source: "auto",
              padding: 0,
            },
            grid: {
              color: "transparent",
              tickMarkLength: 0,
              zeroLineColor: "transparent",
            },
            max,
          },
        },
      }}
    />
  );
};

export default HorizontalBarChart;
