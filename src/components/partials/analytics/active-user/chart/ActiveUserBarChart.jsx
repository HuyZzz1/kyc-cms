import { Bar } from "react-chartjs-2";

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

const analyticAuData = {
  labels: [
    "01 Jan",
    "02 Jan",
    "03 Jan",
    "04 Jan",
    "05 Jan",
    "06 Jan",
    "07 Jan",
    "08 Jan",
    "09 Jan",
    "10 Jan",
    "11 Jan",
    "12 Jan",
    "13 Jan",
    "14 Jan",
    "15 Jan",
    "16 Jan",
    "17 Jan",
    "18 Jan",
    "19 Jan",
    "20 Jan",
    "21 Jan",
    "22 Jan",
    "23 Jan",
    "24 Jan",
    "25 Jan",
    "26 Jan",
    "27 Jan",
    "28 Jan",
    "29 Jan",
    "30 Jan",
  ],
  dataUnit: "People",
  datasets: [
    {
      label: "Active Users Analytics",
      color: "#9d72ff",
      fill: true,
      barPercentage: 0.7,
      categoryPercentage: 0.7,
      backgroundColor: "rgba(157, 114, 255, 0.75)",
      data: [
        1110, 1220, 1310, 980, 900, 770, 1060, 830, 690, 730, 790, 950, 1100,
        800, 1250, 850, 950, 450, 900, 1000, 1200, 1250, 900, 950, 1300, 1200,
        1250, 650, 950, 750,
      ],
    },
  ],
};

const ActiveUserBarChart = () => {
  return (
    <Bar
      data={analyticAuData}
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
              size: 9,
            },
            titleColor: "#6783b8",
            titleMarginBottom: 6,
            bodyColor: "#9eaecf",
            bodyFont: {
              size: 9,
            },
            bodySpacing: 4,
            padding: 6,
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
            display: false,
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
          x: {
            display: true,
            ticks: {
              color: "#6b7280",
              font: {
                size: 12,
              },
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 10,
            },
            grid: {
              display: false,
            },
          },
        },
      }}
    />
  );
};

export default ActiveUserBarChart;
