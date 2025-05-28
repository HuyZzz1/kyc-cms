import React, { useState } from "react";
import Icon from "@/components/icon/Icon";
import {
  UncontrolledDropdown,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { Row, Col } from "@/components/grid/Grid";
import { Link } from "react-router-dom";
import DoubleBarChart from "./chart/DoubleBar";
import { orderOverviewSet1 } from "../../../../utils/mockData";

const OrderOverview = () => {
  const [orderOverview, setOverview] = useState("");
  return (
    <React.Fragment>
      <div className="card-title-group align-start mb-3">
        <CardTitle className="card-title">
          <h6 className="title">Tổng quan KYC</h6>
          <p>
            Tổng quan các xác minh trong 15 ngày qua
            <Link to={`/invoice-list`} className="link link-sm ps-1">
              Thống kê chi tiết
            </Link>
          </p>
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
                <li className={orderOverview === "" ? "active" : ""}>
                  <DropdownItem
                    tag="a"
                    href="#dropdownitem"
                    onClick={(e) => {
                      e.preventDefault();
                      setOverview("");
                    }}
                  >
                    <span>15 Days</span>
                  </DropdownItem>
                </li>
                <li className={orderOverview === "set2" ? "active" : ""}>
                  <DropdownItem
                    tag="a"
                    href="#dropdownitem"
                    onClick={(e) => {
                      e.preventDefault();
                      setOverview("set2");
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
      <div className="nk-order-ovwg">
        <Row className="g-4 align-end">
          <Col xxl="8">
            <div className="nk-order-ovwg-ck">
              <DoubleBarChart data={orderOverviewSet1} />
            </div>
          </Col>
          <Col xxl="4">
            <Row className="g-4">
              <Col xxl="12" sm="6">
                <div className="nk-order-ovwg-data buy pb-1">
                  <div className="amount lh-1 pb-2">
                    4,252
                    <small className="currenct currency-usd ps-1 ">
                      xác minh thành công
                    </small>
                  </div>
                  <div className="info ">
                    Trong 15 ngày qua
                    <strong className="ps-1">
                      <span className="currenct currency-usd">
                        9,740 yêu cầu được gửi
                      </span>
                    </strong>
                  </div>
                </div>
              </Col>
              <Col xxl="12" sm="6">
                <div className="nk-order-ovwg-data sell pb-1">
                  <div className="amount lh-1 pb-2">
                    1,108
                    <small className="currenct currency-usd ps-1">
                      bị từ chối
                    </small>
                  </div>
                  <div className="info ">
                    Trong 15 ngày qua
                    <strong className="ps-1">
                      <span className="currenct currency-usd">
                        2,125 yêu cầu thất bại
                      </span>
                    </strong>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};
export default OrderOverview;
