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
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMemo } from "react";

dayjs.extend(customParseFormat);

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
  const chartData = useMemo(() => {
    return {
      labels: data.map((item) =>
        dayjs(item.date, "DD/MM/YYYY").format("DD/MM")
      ),
      datasets: [
        {
          label: "Active Users",
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          borderColor: "rgba(157, 114, 255, 0.5)",
          backgroundColor: "rgba(157, 114, 255, 0.5)",
          pointBorderColor: "transparent",
          pointBackgroundColor: "transparent",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(157, 114, 255, 0.5)",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 2,
          pointRadius: 0,
          data: data.map((item) => item.users),
        },
      ],
    };
  }, [data]);

  return (
    <Line
      className="analytics-line-large"
      data={chartData}
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
              size: 13,
            },
            titleColor: "#6783b8",
            titleMarginBottom: 6,
            bodyColor: "#9eaecf",
            bodyFont: {
              size: 12,
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
                size: 11,
              },
              padding: 8,
              stepSize: 2400,
            },
            grid: {
              color: "rgba(82, 100, 132, 0.2)",
              tickMarkLength: 0,
            },
          },
          x: {
            display: true, // ✅ Show x-axis
            ticks: {
              color: "#9eaecf",
              font: {
                size: 12,
              },
              padding: 8,
            },
            grid: {
              color: "transparent",
              tickMarkLength: 0,
              offsetGridLines: true,
            },
          },
        },
      }}
    />
  );
};

export default AudienceLineChart;
