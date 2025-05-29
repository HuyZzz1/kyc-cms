import { Line } from "react-chartjs-2";

// ✅ Dữ liệu mặc định dạng tăng (up)
const generateMockData = (direction = "up") => {
  const upData = [65, 75, 100, 90, 120, 100, 80, 200, 230, 200, 250, 300];
  const downData = [130, 100, 120, 80, 200, 100, 80, 70, 60, 50, 40, 30];

  return {
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
    ],
    dataUnit: "People",
    datasets: [
      {
        label: "New Users",
        lineTension: 0.4,
        borderWidth: 2,
        fill: true,
        data: direction === "up" ? upData : downData,
        pointBorderColor: "transparent",
        pointBackgroundColor: "transparent",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#000", // sẽ bị override bên dưới
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 4,
      },
    ],
  };
};

const WPCharts = ({ data, direction = "up", className = "" }) => {
  const isUp = direction === "up";

  // Nếu không truyền data thì tạo theo hướng
  const rawData = data || generateMockData(direction);

  const lineColor = isUp ? "#28c76f" : "#ea5455";
  const fillColor = isUp ? "rgba(40, 199, 111, 0.2)" : "rgba(234, 84, 85, 0.2)";

  const chartData = {
    ...rawData,
    datasets: rawData.datasets.map((ds) => ({
      ...ds,
      borderColor: lineColor,
      backgroundColor: fillColor,
      pointHoverBorderColor: lineColor,
    })),
  };

  return (
    <Line
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
              beginAtZero: false,
              color: "#9eaecf",
              font: {
                size: 12,
              },
              padding: 0,
              stepSize: 300,
            },
            grid: {
              color: "rgba(82, 100, 132, 0.2)",
              tickMarkLength: 0,
              zeroLineColor: "rgba(82, 100, 132, 0.2)",
            },
          },
          x: {
            display: false,
            ticks: {
              color: "#9eaecf",
              font: {
                size: 12,
              },
              source: "auto",
              padding: 0,
            },
            grid: {
              color: "transparent",
              tickMarkLength: 0,
              zeroLineColor: "rgba(82, 100, 132,0.2)",
              offsetGridLines: true,
            },
          },
        },
      }}
    />
  );
};

export default WPCharts;
