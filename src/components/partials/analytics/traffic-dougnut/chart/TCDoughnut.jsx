import { Doughnut } from "react-chartjs-2";
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

const TCDoughnut = ({ className, data = [], colors = [] }) => {
  const chartData = {
    labels: data.map((item) => item.industryName || "Không rõ"),
    datasets: [
      {
        borderColor: "#fff",
        backgroundColor: colors.slice(0, data.length),
        data: data.map((item) => item.percentage),
      },
    ],
  };

  return (
    <Doughnut
      className={className}
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
              label: function (tooltipItem) {
                const value = tooltipItem.raw;
                return `${value}%`;
              },
            },
          },
        },
        rotation: -1.5,
        cutout: "70%", // tương đương với cutoutPercentage: 70
        maintainAspectRatio: false,
      }}
    />
  );
};

export default TCDoughnut;
