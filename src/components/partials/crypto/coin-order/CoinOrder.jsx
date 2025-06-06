import React, { useState, useEffect } from "react";
import Icon from "@/components/icon/Icon";
import {
  UncontrolledDropdown,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import HorizontalBarChart from "./chart/HorizontalBarChart";
import { getDataSources } from "@/services/dashboard";

const SOURCE_ORDER = [
  "STRIPE",
  "GOOGLE_OAUTH",
  "FACEBOOK",
  "API",
  "MANUAL"
];

const SOURCE_LABELS = {
  STRIPE: "Stripe",
  GOOGLE_OAUTH: "Google OAuth",
  FACEBOOK: "Facebook OAuth",
  API: "Gửi qua API",
  MANUAL: "Nhập tay bởi quản trị viên"
};

const SOURCE_COLORS = {
  STRIPE: "#4c84ff",
  GOOGLE_OAUTH: "#ff4d4f",
  FACEBOOK: "#3b5998",
  API: "#38c976",
  MANUAL: "#6c757d"
};

const SOURCE_BG_COLORS = {
  STRIPE: "rgba(76,132,255,0.15)",
  GOOGLE_OAUTH: "rgba(255,77,79,0.15)",
  FACEBOOK: "rgba(59,89,152,0.15)",
  API: "rgba(56,201,118,0.15)",
  MANUAL: "rgba(108,117,125,0.15)"
};

const CoinOrder = () => {
  const [coinOrder, setOrder] = useState("");
  const [dataSources, setDataSources] = useState([]);

  useEffect(() => {
    const days = coinOrder === "day" ? 30 : 15;
    const fetchData = async () => {
      try {
        const response = await getDataSources(days);
        setDataSources(response.data || []);
      } catch (error) {
        console.error("Error fetching data sources:", error);
      }
    };
    fetchData();
  }, [coinOrder]);

  if (!dataSources || dataSources.length === 0) {
    return null;
  }

  // Đảm bảo đúng thứ tự và fill 0 nếu thiếu
  const orderedData = SOURCE_ORDER.map((source) => {
    const found = dataSources.find((item) => item.source === source);
    return { source, count: found ? found.count : 0 };
  });

  const chartData = {
    labels: orderedData.map((item) => SOURCE_LABELS[item.source]),
    stacked: true,
    datasets: [
      {
        label: "Đăng ký",
        data: orderedData.map((item) => item.count),
        backgroundColor: orderedData.map((item) => SOURCE_COLORS[item.source]),
        barPercentage: 0.5,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      {
        label: "Nền mờ",
        data: [300, 300, 300, 300, 300],
        backgroundColor: orderedData.map((item) => SOURCE_BG_COLORS[item.source]),
        barPercentage: 0.5,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  return (
    <React.Fragment>
      <div className="card-title-group align-start mb-2">
        <CardTitle className="card-title">
          <h6 className="title">Nguồn dữ liệu</h6>
          <p>Nguồn dữ liệu KYC nhiều nhất trong {coinOrder === "day" ? "30" : "15"} ngày qua</p>
        </CardTitle>
        <div className="card-tools mt-n1 me-n1">
          <UncontrolledDropdown>
            <DropdownToggle
              tag="a"
              className="dropdown-toggle btn btn-icon btn-trigger"
            >
              <Icon name="more-h"></Icon>
            </DropdownToggle>
            <DropdownMenu end>
              <ul className="link-list-opt no-bdr">
                <li className={coinOrder === "" ? "active" : ""}>
                  <DropdownItem
                    tag="a"
                    href="#dropdownitem"
                    onClick={(e) => {
                      e.preventDefault();
                      setOrder("");
                    }}
                  >
                    <span>15 Days</span>
                  </DropdownItem>
                </li>
                <li className={coinOrder === "day" ? "active" : ""}>
                  <DropdownItem
                    tag="a"
                    href="#dropdownitem"
                    onClick={(e) => {
                      e.preventDefault();
                      setOrder("day");
                    }}
                  >
                    <span>30 Days</span>
                  </DropdownItem>
                </li>
              </ul>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <div className="nk-coin-ovwg">
        <div
          className="nk-coin-ovwg-ck"
          style={{
            paddingRight: 20,
          }}
        >
          <HorizontalBarChart data={chartData} />
        </div>
        <ul className="nk-coin-ovwg-legends">
          <li>
            <span
              className="dot dot-lg sq"
              style={{ background: "#4c84ff", width: 15 }}
            ></span>
            <span className="w-100">Stripe</span>
          </li>
          <li>
            <span
              className="dot dot-lg sq"
              style={{ background: "#ff4d4f", width: 15 }}
            ></span>
            <span className="w-100">Google OAuth</span>
          </li>
          <li>
            <span
              className="dot dot-lg sq"
              style={{ background: "#3b5998", width: 15, height: 12 }}
            ></span>
            <span className="w-100">Facebook OAuth</span>
          </li>
          <li>
            <span
              className="dot dot-lg sq"
              style={{ background: "#38c976", width: 15, height: 12 }}
            ></span>
            <span className="w-100">Gửi qua API</span>
          </li>
          <li>
            <span
              className="dot dot-lg sq "
              style={{ background: "#6c757d", width: 15 }}
            ></span>
            <span className="w-100">Nhập tay bởi quản trị viên</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
export default CoinOrder;
