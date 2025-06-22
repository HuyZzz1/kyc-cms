import React, { useState, useEffect } from "react";
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
import { getKycOverview } from "@/services/dashboard";

const OrderOverview = () => {
  const [orderOverview, setOverview] = useState("");
  const [overviewData, setOverviewData] = useState({
    summary: {
      successful: 0,
      rejected: 0,
      submitted: 0,
      failed: 0
    },
    daily_stats: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const days = orderOverview === "day" ? 30 : 15;
        const data = await getKycOverview(days);
        setOverviewData(data);
      } catch (error) {
        console.error("Error fetching KYC overview:", error);
      }
    };
    fetchData();
  }, [orderOverview]);

  const chartData = {
    labels: overviewData.daily_stats.map(stat => stat.date),
    datasets: [
      {
        label: "Xác minh thành công",
        color: "#8feac5",
        backgroundColor: "#8feac5",
        barPercentage: 0.8,
        categoryPercentage: 0.6,
        data: overviewData.daily_stats.map(stat => stat.successful)
      },
      {
        label: "Xác minh thất bại",
        color: "#9cabff",
        backgroundColor: "#9cabff",
        barPercentage: 0.8,
        categoryPercentage: 0.6,
        data: overviewData.daily_stats.map(stat => stat.rejected)
      }
    ]
  };

  return (
    <React.Fragment>
      <div className="card-title-group align-start mb-3">
        <CardTitle className="card-title">
          <h6 className="title">Tổng quan KYC</h6>
          <p>
            Tổng quan các xác minh trong {orderOverview === "day" ? "30" : "15"} ngày qua
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
                    href="#dropdownitem"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setOverview("");
                    }}
                  >
                    <span>15 Days</span>
                  </DropdownItem>
                </li>
                <li className={orderOverview === "day" ? "active" : ""}>
                  <DropdownItem
                    href="#dropdownitem"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setOverview("day");
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
              <DoubleBarChart data={chartData} />
            </div>
          </Col>
          <Col xxl="4">
            <Row className="g-4">
              <Col xxl="12" sm="6">
                <div className="nk-order-ovwg-data buy pb-1">
                  <div className="amount lh-1 pb-2">
                    {overviewData.summary.successful}
                    <small className="currenct currency-usd ps-1">
                      xác minh thành công
                    </small>
                  </div>
                  <div className="info">
                    Trong {orderOverview === "day" ? "30" : "15"} ngày qua
                    <strong className="ps-1">
                      <span className="currenct currency-usd">
                        {overviewData.summary.submitted} yêu cầu được gửi
                      </span>
                    </strong>
                  </div>
                </div>
              </Col>
              <Col xxl="12" sm="6">
                <div className="nk-order-ovwg-data sell pb-1">
                  <div className="amount lh-1 pb-2">
                    {overviewData.summary.rejected}
                    <small className="currenct currency-usd ps-1">
                      bị từ chối
                    </small>
                  </div>
                  <div className="info">
                    Trong {orderOverview === "day" ? "30" : "15"} ngày qua
                    <strong className="ps-1">
                      <span className="currenct currency-usd">
                        {overviewData.summary.failed} yêu cầu thất bại
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
