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
const data = {
  labels: [
    "Tài chính/Ngân hàng",
    "Bảo hiểm",
    "Thương mại điện tử",
    "Viễn thông",
    "Khác",
  ],
  dataUnit: "%",
  legend: false,
  datasets: [
    {
      borderColor: "#fff",
      backgroundColor: [
        "#A19DE0", // Tài chính/Ngân hàng
        "#B5B4E9", // Bảo hiểm
        "#D2D1F4", // Thương mại điện tử
        "#E8E7F8", // Viễn thông
        "#FADE8C", // Khác
      ],
      data: [38.5, 21.4, 17.3, 12.8, 10],
    },
  ],
};

const TCDoughnut = ({ className }) => {
  return (
    <Doughnut
      className={className}
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
              label: function (tooltipItem) {
                const value = tooltipItem.raw;
                return `${value}%`;
              },
            },
          },
        },
        rotation: -1.5,
        cutoutPercentage: 70,
        maintainAspectRatio: false,
      }}
    ></Doughnut>
  );
};

export default TCDoughnut;
