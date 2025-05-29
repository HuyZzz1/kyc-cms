import React, { useState } from "react";
import {
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem,
} from "reactstrap";
import {
  Icon,
  DataTableHead,
  DataTableRow,
  DataTableItem,
} from "@/components/Component";
import WPChartsComponent from "./chart/WPChartsComponent";

import { DataTableBody } from "@/components/table/DataTable";

const trafficChannelData = [
  {
    id: 1,
    channel: "Từ đối tác",
    sessions: "143",
    prev: "129",
    change: "10.9",
    changeDifference: "up",
  },
  {
    id: 2,
    channel: "Tự tìm kiếm",
    sessions: "88",
    prev: "94",
    change: "6.4",
    changeDifference: "down",
  },
  {
    id: 3,
    channel: "Hội thảo/Webinar",
    sessions: "51",
    prev: "33",
    change: "54.5",
    changeDifference: "up",
  },
  {
    id: 4,
    channel: "Quảng cáo",
    sessions: "31",
    prev: "44",
    change: "29.5",
    changeDifference: "down",
  },
];

const TrafficChannel = () => {
  const [dd, setdd] = useState("30");

  return (
    <React.Fragment>
      <div className="card-inner mb-n2">
        <div className="card-title-group">
          <div className="card-title card-title-sm">
            <h6 className="title">Doanh nghiệp đến từ nguồn nào</h6>
            <p className="text-soft">Nguồn doanh nghiệp tích hợp hệ thống.</p>
          </div>
          <div className="card-tools">
            <UncontrolledDropdown>
              <DropdownToggle className="dropdown-toggle dropdown-indicator btn btn-sm btn-outline-light btn-white">
                {dd} Ngày
              </DropdownToggle>
              <DropdownMenu end className="dropdown-menu-xs">
                <ul className="link-list-opt no-bdr">
                  {["7", "15", "30"].map((value) => (
                    <li className={dd === value ? "active" : ""} key={value}>
                      <DropdownItem
                        href="#dropdownitem"
                        onClick={(e) => {
                          e.preventDefault();
                          setdd(value);
                        }}
                      >
                        <span>{value} Ngày</span>
                      </DropdownItem>
                    </li>
                  ))}
                </ul>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>

      <div style={{ overflowX: "auto", width: "100%" }}>
        <div className="min-w-[900px]">
          <DataTableBody bodyclass="nk-tb-orders">
            <DataTableHead>
              <DataTableRow>
                <span>Nguồn</span>
              </DataTableRow>
              <DataTableRow className="text-center ">
                <span>Hiện tại</span>
              </DataTableRow>
              <DataTableRow className="text-center">
                <span>Tháng trước</span>
              </DataTableRow>
              <DataTableRow className="text-center">
                <span>% Thay đổi</span>
              </DataTableRow>
              <DataTableRow className="text-center">
                <span>Trend</span>
              </DataTableRow>
            </DataTableHead>
            {trafficChannelData.map((item) => (
              <DataTableItem className="nk-tb-item" key={item.id}>
                <DataTableRow className="text-start">
                  <span className="tb-lead text-nowrap">{item.channel}</span>
                </DataTableRow>

                <DataTableRow className="text-center">
                  <span className="tb-sub fw-bold text-nowrap">
                    {item.sessions}
                  </span>
                </DataTableRow>

                <DataTableRow className="text-center">
                  <span className="tb-sub text-muted text-nowrap">
                    {item.prev}
                  </span>
                </DataTableRow>

                <DataTableRow className="text-center">
                  <span
                    className={`tb-sub fw-medium text-nowrap ${
                      item.changeDifference === "up"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {item.changeDifference === "up" ? "+" : "-"}
                    {item.change}%{" "}
                    <Icon name={`arrow-long-${item.changeDifference}`} />
                  </span>
                </DataTableRow>

                <DataTableRow>
                  <div
                    className="mx-auto"
                    style={{ width: "80px", height: "40px" }}
                  >
                    <WPChartsComponent direction={item.changeDifference} />
                  </div>
                </DataTableRow>
              </DataTableItem>
            ))}
          </DataTableBody>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TrafficChannel;
