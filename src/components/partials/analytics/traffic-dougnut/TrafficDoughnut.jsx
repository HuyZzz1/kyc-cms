import React, { useState } from "react";
import {
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem,
} from "reactstrap";
import TCDoughnut from "./chart/TCDoughnut";

const TrafficDougnut = () => {
  const [traffic, setTraffic] = useState("30");
  return (
    <React.Fragment>
      {" "}
      <div className="card-title-group">
        <div className="card-title card-title-sm">
          <h6 className="title">Doanh Nghiệp Theo Ngành Nghề</h6>
        </div>
        <UncontrolledDropdown>
          <DropdownToggle className="dropdown-toggle dropdown-indicator btn btn-sm btn-outline-light btn-white">
            {traffic} Ngày
          </DropdownToggle>
          <DropdownMenu end className="dropdown-menu-xs">
            <ul className="link-list-opt no-bdr">
              <li className={traffic === "7" ? "active" : ""}>
                <DropdownItem
                  href="#dropdownitem"
                  onClick={(e) => {
                    e.preventDefault();
                    setTraffic("7");
                  }}
                >
                  <span>7 Ngày</span>
                </DropdownItem>
              </li>
              <li className={traffic === "15" ? "active" : ""}>
                <DropdownItem
                  href="#dropdownitem"
                  onClick={(e) => {
                    e.preventDefault();
                    setTraffic("15");
                  }}
                >
                  <span>15 Ngày</span>
                </DropdownItem>
              </li>
              <li className={traffic === "30" ? "active" : ""}>
                <DropdownItem
                  href="#dropdownitem"
                  onClick={(e) => {
                    e.preventDefault();
                    setTraffic("30");
                  }}
                >
                  <span>30 Ngày</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <div className="pt-2">
        <div>
          <TCDoughnut className="analytics-doughnut" />
        </div>
        <div className="w-full h-full  pt-4">
          <div className="w-full  d-flex align-items-center justify-content-between pb-1 ">
            <div className="title">
              <span
                className="dot dot-lg sq "
                style={{ background: "#A19DE0" }}
              ></span>
              <span className="ps-1">Tài chính/Ngân hàng</span>
            </div>
            <div className="amount">38.5%</div>
          </div>
          <div className="w-full  d-flex align-items-center justify-content-between   pb-1 ">
            <div className="title">
              <span
                className="dot dot-lg sq "
                style={{ background: "#B5B4E9" }}
              ></span>
              <span className="ps-1">Bảo hiểm</span>
            </div>
            <div className="amount">21.4%</div>
          </div>
          <div className="w-full  d-flex align-items-center justify-content-between  pb-1">
            <div className="title">
              <span
                className="dot dot-lg sq "
                style={{ background: "#D2D1F4" }}
              ></span>
              <span className="ps-1">Thương mại điện tử</span>
            </div>
            <div className="amount">17.3%</div>
          </div>
          <div className="w-ful  d-flex align-items-center justify-content-between  pb-1">
            <div className="title">
              <span
                className="dot dot-lg sq "
                style={{ background: "#E8E7F8" }}
              ></span>
              <span className="ps-1">Viễn thông</span>
            </div>
            <div className="amount">12.8%</div>
          </div>
          <div className="w-full  d-flex align-items-center justify-content-between">
            <div className="title">
              <span
                className="dot dot-lg sq "
                style={{ background: "#FADE8C" }}
              ></span>
              <span className="ps-1">Khác</span>
            </div>
            <div className="amount">10%</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default TrafficDougnut;
