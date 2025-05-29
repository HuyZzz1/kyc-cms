import React, { useState } from "react";
import {
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem,
} from "reactstrap";
import { Icon } from "@/components/Component";
import { SessionDoughnut } from "./chart/SessionDoughnut";

const SessionDevice = () => {
  const [sessionDevice, setSessionDevices] = useState("30");
  return (
    <React.Fragment>
      <div className="card-title-group">
        <div className="card-title card-title-sm">
          <h6 className="title">Thiết Bị Thực Hiện KYC</h6>
        </div>
        <UncontrolledDropdown>
          <DropdownToggle className="dropdown-toggle dropdown-indicator btn btn-sm btn-outline-light btn-white">
            {sessionDevice} Ngày
          </DropdownToggle>
          <DropdownMenu end className=" dropdown-menu-xs">
            <ul className="link-list-opt no-bdr">
              <li className={sessionDevice === "7" ? "active" : ""}>
                <DropdownItem
                  tag="a"
                  href="#dropdownitem"
                  onClick={(e) => {
                    e.preventDefault();
                    setSessionDevices("7");
                  }}
                >
                  <span>7 Ngày</span>
                </DropdownItem>
              </li>
              <li className={sessionDevice === "15" ? "active" : ""}>
                <DropdownItem
                  tag="a"
                  href="#dropdownitem"
                  onClick={(e) => {
                    e.preventDefault();
                    setSessionDevices("15");
                  }}
                >
                  <span>15 Ngày</span>
                </DropdownItem>
              </li>
              <li className={sessionDevice === "30" ? "active" : ""}>
                <DropdownItem
                  tag="a"
                  href="#dropdownitem"
                  onClick={(e) => {
                    e.preventDefault();
                    setSessionDevices("30");
                  }}
                >
                  <span>30 Ngày</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <div className="device-status my-auto">
        <div className="device-status-ck">
          <SessionDoughnut className="analytics-doughnut" />
        </div>
        <div className="device-status-group">
          <div className="device-status-data">
            <Icon style={{ color: "#798bff" }} name="monitor"></Icon>
            <div className="title">Desktop</div>
            <div className="amount">30.2%</div>
            <div className="change down text-danger">
              <Icon name="arrow-down"></Icon>
              2.8%
            </div>
          </div>
          <div className="device-status-data">
            <Icon style={{ color: "#baaeff" }} name="mobile"></Icon>
            <div className="title">Mobile</div>
            <div className="amount">64.1% </div>
            <div className="change up text-danger">
              <Icon name="arrow-long-up"></Icon>9.4%
            </div>
          </div>
          <div className="device-status-data">
            <Icon style={{ color: "#7de1f8" }} name="tablet"></Icon>
            <div className="title">Tablet</div>
            <div className="amount">5.7 %</div>
            <div className="change up text-danger">
              <Icon name="arrow-long-up"></Icon>
              1.2 %
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SessionDevice;
