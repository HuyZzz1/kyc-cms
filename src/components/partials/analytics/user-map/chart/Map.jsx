import { VectorMap } from "@react-jvectormap/core";
import { asiaMill } from "@react-jvectormap/asia";

const countryNameToCodeMap = {
  "Việt Nam": "VN",
  Vietnam: "VN",
  Indonesia: "ID",
  Thailand: "TH",
  Malaysia: "MY",
  Philippines: "PH",
  Singapore: "SG",
  Lào: "LA",
  Cambodia: "KH",
  Campuchia: "KH",
  Myanmar: "MM",
  Brunei: "BN",
  "Đông Timor": "TL",
  // Thêm nếu cần...
};

const normalizeCode = (item) => {
  const rawName = item.countryName?.trim();
  const fallbackCode = countryNameToCodeMap[rawName];
  return {
    ...item,
    code: item.code || fallbackCode,
  };
};

const toRegionData = (list) =>
  list.reduce((acc, item) => {
    const normalized = normalizeCode(item);
    if (normalized.code) {
      acc[normalized.code] = normalized.count;
    }
    return acc;
  }, {});

const toTooltips = (list) =>
  list.reduce((acc, item) => {
    const normalized = normalizeCode(item);
    if (normalized.code) {
      acc[normalized.code] = normalized.countryName || "Không rõ";
    }
    return acc;
  }, {});

const Map = ({ statistics = [] }) => {
  const selectedData = toRegionData(statistics);
  const tooltipData = toTooltips(statistics);

  return (
    <div
      className="vector-map"
      style={{
        width: "100%",
        height: "220px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          transform: "scale(1.3) translate(-20%, -30%)",
          transformOrigin: "top left",
          width: "100%",
          height: "100%",
        }}
      >
        <VectorMap
          map={asiaMill}
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
              cursor: "pointer",
            },
          }}
          series={{
            regions: [
              {
                values: selectedData,
                scale: ["#dee6f2", "#798bff"],
                normalizeFunction: "linear",
              },
            ],
          }}
          onRegionTipShow={function (e, el, code) {
            if (tooltipData[code]) {
              el.html(`${tooltipData[code]}: ${selectedData[code]}`);
            } else {
              el.html("");
            }
          }}
        />
      </div>
    </div>
  );
};

export default Map;
