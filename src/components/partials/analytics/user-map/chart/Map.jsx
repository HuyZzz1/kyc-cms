import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

const mapDataList = {
  30: [
    { country: "Việt Nam", code: "VN", amount: 6840 },
    { country: "Indonesia", code: "ID", amount: 3412 },
    { country: "Thailand", code: "TH", amount: 2230 },
    { country: "Malaysia", code: "MY", amount: 1950 },
  ],
  // Bạn có thể thêm dữ liệu 15 và 7 ngày tương tự nếu cần
};

const toRegionData = (list) =>
  list.reduce((acc, item) => {
    acc[item.code] = item.amount;
    return acc;
  }, {});

const toTooltips = (list) =>
  list.reduce((acc, item) => {
    acc[item.code] = item.country;
    return acc;
  }, {});

const Map = ({ set = "30" }) => {
  const dataList = mapDataList[set] || mapDataList["30"];
  const selectedData = toRegionData(dataList);
  const tooltipData = toTooltips(dataList);

  return (
    <div
      className="vector-map"
      style={{
        width: "100%",
        height: "250px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          transform: "scale(1.6) translate(-30%, -12%)", // 👈 Zoom + focus vào SEA
          transformOrigin: "top left",
          width: "100%",
          height: "100%",
        }}
      >
        <VectorMap
          map={worldMill}
          backgroundColor="transparent"
          containerStyle={{ width: "100%", height: "100%" }}
          containerClassName="vector-map"
          zoomButtons={false}
          zoomOnScroll={false}
          regionStyle={{
            initial: {
              fill: "#f1f1f1",
              "fill-opacity": 1,
              stroke: "#ccc",
              "stroke-width": 1,
              "stroke-opacity": 1,
            },
            hover: {
              "fill-opacity": 0.9,
              hoverColor: "#9cabff",
              hoverOpacity: null,
              cursor: "pointer",
            },
          }}
          series={{
            regions: [
              {
                values: selectedData,
                scale: ["#ccd7e2", "#798bff"],
                normalizeFunction: "polynomial",
              },
            ],
          }}
          onRegionTipShow={function (e, el, code) {
            if (tooltipData[code]) {
              el.html(`${tooltipData[code]}: ${selectedData[code]}`);
            } else {
              el.html(""); // Ẩn tooltip nếu không có dữ liệu
            }
          }}
        />
      </div>
    </div>
  );
};

export default Map;
