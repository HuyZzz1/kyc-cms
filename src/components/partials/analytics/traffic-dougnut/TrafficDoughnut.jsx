/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem,
} from "reactstrap";
import TCDoughnut from "./chart/TCDoughnut";
import { getStatsIndustries } from "../../../../services/dashboard";

const TrafficDougnut = () => {
  const [traffic, setTraffic] = useState("7");
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const result = await getStatsIndustries(traffic);
      setData(result);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [traffic]);

  const colors = ["#A19DE0", "#B5B4E9", "#D2D1F4", "#E8E7F8", "#FADE8C"];

  return (
    <React.Fragment>
      <div className="card-title-group">
        <div className="card-title card-title-sm">
          <h6 className="title">Doanh Nghiệp Theo Ngành Nghề</h6>
        </div>
        <UncontrolledDropdown>
          <DropdownToggle className="dropdown-toggle dropdown-indicator btn btn-sm btn-outline-light btn-white">
            {traffic} Ngày
          </DropdownToggle>
          <DropdownMenu end className="dropdown-menu-xs">
            {["7", "15", "30"].map((day) => (
              <li key={day} className={traffic === day ? "active" : ""}>
                <DropdownItem
                  href="#dropdownitem"
                  onClick={(e) => {
                    e.preventDefault();
                    setTraffic(day);
                  }}
                >
                  <span>{day} Ngày</span>
                </DropdownItem>
              </li>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>

      <div className="pt-2">
        <div>
          <TCDoughnut
            className="analytics-doughnut"
            data={data?.statistics || []}
            colors={colors}
          />
        </div>

        <div className="w-full h-full pt-4">
          {(data?.statistics || []).map((item, idx) => (
            <div
              key={idx}
              className="w-full d-flex align-items-center justify-content-between pb-1"
            >
              <div className="title">
                <span
                  className="dot dot-lg sq"
                  style={{ background: colors[idx % colors.length] }}
                ></span>
                <span className="ps-1">
                  {item.industryName || "Không xác định"}
                </span>
              </div>
              <div className="amount">{item.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TrafficDougnut;
