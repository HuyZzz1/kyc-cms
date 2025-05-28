import React, { useState } from "react";
import Icon from "@/components/icon/Icon";
import {
  UncontrolledDropdown,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import HorizontalBarChart from "./chart/HorizontalBarChart";
import { coinOverview } from "./chart/mockData";

const CoinOrder = () => {
  const [coinOrder, setOrder] = useState("");
  return (
    <React.Fragment>
      <div className="card-title-group align-start mb-2">
        <CardTitle className="card-title">
          <h6 className="title">Nguồn dữ liệu</h6>
          <p>Nguồn dữ liệu KYC nhiều nhất trong 15 ngày qua</p>
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
                <li className={coinOrder === "month" ? "active" : ""}>
                  <DropdownItem
                    tag="a"
                    href="#dropdownitem"
                    onClick={(e) => {
                      e.preventDefault();
                      setOrder("month");
                    }}
                  >
                    <span>3 Months</span>
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
          <HorizontalBarChart data={coinOverview} />
        </div>
        <ul className="nk-coin-ovwg-legends">
          <li>
            <span
              className="dot dot-lg sq"
              style={{ background: "#4c84ff", width: 15 }}
            ></span>
            <span>Stripe</span>
          </li>
          <li>
            <span
              className="dot dot-lg sq"
              style={{ background: "#ff4d4f", width: 15 }}
            ></span>
            <span>Google OAuth</span>
          </li>
          <li>
            <span
              className="dot dot-lg sq"
              style={{ background: "#3b5998", width: 15 }}
            ></span>
            <span>Facebook OAuth</span>
          </li>
          <li>
            <span
              className="dot dot-lg sq"
              style={{ background: "#38c976", width: 15 }}
            ></span>
            <span>Gửi qua API</span>
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
