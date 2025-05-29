import React, { useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Map from "./chart/Map";

const UserMap = () => {
  const [mapState, setMapState] = useState("30");
  return (
    <React.Fragment>
      <div className="card-title-group">
        <div className="card-title card-title-sm">
          <h6 className="title">Doanh Nghiệp Theo Quốc Gia</h6>
        </div>
        <UncontrolledDropdown>
          <DropdownToggle className="dropdown-indicator btn btn-sm btn-outline-light btn-white">
            {mapState} Ngày
          </DropdownToggle>
          <DropdownMenu end className="dropdown-menu-xs">
            <ul className="link-list-opt no-bdr">
              <li className={mapState === "7" ? "active" : ""}>
                <DropdownItem
                  tag="a"
                  href="#dropdownitem"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setMapState("7");
                  }}
                >
                  <span>7 Ngày</span>
                </DropdownItem>
              </li>
              <li className={mapState === "15" ? "active" : ""}>
                <DropdownItem
                  tag="a"
                  href="#dropdownitem"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setMapState("15");
                  }}
                >
                  <span>15 Ngày</span>
                </DropdownItem>
              </li>
              <li className={mapState === "30" ? "active" : ""}>
                <DropdownItem
                  tag="a"
                  href="#dropdownitem"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setMapState("30");
                  }}
                >
                  <span>30 Ngày</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <div className="analytics-map">
        <Map set="30" />
        <table className="analytics-map-data-list">
          <tbody>
            <tr className="analytics-map-data">
              <td className="country">Việt Nam</td>
              <td className="amount">6,840</td>
              <td className="percent">41.3 %</td>
            </tr>
            <tr className="analytics-map-data">
              <td className="country">Indonesia</td>
              <td className="amount">3,412</td>
              <td className="percent">20.6 %</td>
            </tr>
            <tr className="analytics-map-data">
              <td className="country">Thailand</td>
              <td className="amount">2,230</td>
              <td className="percent">13.5 %</td>
            </tr>
            <tr className="analytics-map-data">
              <td className="country">Malaysia</td>
              <td className="amount">1,950</td>
              <td className="percent"> 11.8 %</td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
export default UserMap;
