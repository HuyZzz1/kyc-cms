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

const deviceStatusData = {
  labels: ["Desktop", "Mobile", "Tablet"],
  dataUnit: "People",
  legend: false,
  datasets: [
    {
      borderColor: "#fff",
      backgroundColor: ["#9cabff", "#b8acff", "#7de1f8"],
      data: [30.2, 64.1, 5.7],
    },
  ],
};

export const SessionDoughnut = ({ className }) => {
  return (
    <Doughnut
      className={className}
      data={deviceStatusData}
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
        rotation: -1.5,
        cutoutPercentage: 70,
        maintainAspectRatio: false,
      }}
    ></Doughnut>
  );
};
