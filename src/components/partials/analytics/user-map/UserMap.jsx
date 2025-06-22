/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Map from "./chart/Map";
import { getStatsCountries } from "../../../../services/dashboard";

const UserMap = () => {
  const [mapState, setMapState] = useState("7");

  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const data = await getStatsCountries(mapState);
      setData(data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [mapState]);

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
        <Map statistics={data?.statistics || []} />
        {data?.statistics?.length > 0 && (
          <table className="analytics-map-data-list">
            <tbody>
              {data.statistics.map((item, index) => (
                <tr className="analytics-map-data" key={index}>
                  <td className="country">{item.countryName || "Không rõ"}</td>
                  <td className="amount">{item.count}</td>
                  <td className="percent">{item.percentage} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
};
export default UserMap;
