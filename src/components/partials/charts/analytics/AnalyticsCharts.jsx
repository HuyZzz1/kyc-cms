import { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";

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

import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import {
  analyticOvData,
  analyticAuData,
  worldMap,
  analyticOvDataSet2,
  analyticOvDataSet3,
  TrafficChannelDoughnutData,
  TrafficChannelDoughnutData2,
  TrafficChannelDoughnutData3,
  TrafficChannelDoughnutData4,
  deviceStatusData,
  deviceStatusDataSet2,
  deviceStatusDataSet3,
  deviceStatusDataSet4,
} from "./AnalyticsData";

export const AudienceLineChart = ({ state }) => {
  const [data, setData] = useState(analyticOvData);
  useEffect(() => {
    let object;
    if (state === "day-7") {
      object = analyticOvDataSet2;
    } else {
      object = analyticOvDataSet3;
    }
    setData(object);
  }, [state]);
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

export const ActiveUserBarChart = () => {
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
              size: "9px",
            },
            titleColor: "#6783b8",
            titleMarginBottom: 6,
            bodyColor: "#9eaecf",
            bodyFont: {
              size: "9px",
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
            display: true,
            ticks: {
              beginAtZero: false,
              color: "#9eaecf",
              font: {
                size: "12px",
              },
              padding: 0,
              display: false,
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
    ></Bar>
  );
};

export const WPCharts = ({ data, className }) => {
  return (
    <Line
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
              size: "9px",
            },
            titleColor: "#6783b8",
            titleMarginBottom: 6,
            bodyColor: "#9eaecf",
            bodyFont: {
              size: "9px",
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
                size: "12px",
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
                size: "12px",
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
    ></Line>
  );
};

export const TCDoughnut = ({ state, className }) => {
  const [data, setData] = useState(TrafficChannelDoughnutData);
  useEffect(() => {
    if (state === "7") {
      setData(TrafficChannelDoughnutData2);
    } else if (state === "15") {
      setData(TrafficChannelDoughnutData3);
    } else {
      setData(TrafficChannelDoughnutData4);
    }
  }, [state]);
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
          },
        },
        rotation: -1.5,
        cutoutPercentage: 70,
        maintainAspectRatio: false,
      }}
    ></Doughnut>
  );
};

export const SessionDoughnut = ({ state, className }) => {
  const [data, setData] = useState(deviceStatusData);
  useEffect(() => {
    let filteredData;
    if (state === "7") {
      filteredData = deviceStatusDataSet2;
    } else if (state === "15") {
      filteredData = deviceStatusDataSet3;
    } else {
      filteredData = deviceStatusDataSet4;
    }
    setData(filteredData);
  }, [state]);
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
          },
        },
        rotation: -1.5,
        cutoutPercentage: 70,
        maintainAspectRatio: false,
      }}
    ></Doughnut>
  );
};

export const Map = ({ set }) => {
  return (
    <div className="vector-map">
      <VectorMap
        map={worldMill}
        backgroundColor="transparent"
        borderColor="#dee6ed"
        borderOpacity={1}
        height={250}
        borderWidth={1}
        color="#ccd7e2"
        containerClassName="vector-map"
        zoomButtons={false}
        zoomOnScroll={false}
        tooltip={true}
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0,
          },
          hover: {
            "fill-opacity": 0.8,
            hoverColor: "#9cabff",
            hoverOpacity: null,
            cursor: "pointer",
          },
          selectedHover: {},
        }}
        series={{
          regions: [
            {
              values:
                set === "30"
                  ? worldMap.data2
                  : set === "7"
                  ? worldMap.data3
                  : worldMap.data4,
              scale: ["#ccd7e2", "#798bff"],
              normalizeFunction: "polynomial",
            },
          ],
        }}
      ></VectorMap>
    </div>
  );
};
