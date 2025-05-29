import React, { useState } from "react";
import { Icon } from "@/components/Component";
import AudienceLineChart from "./chart/AudienceLineChart";

const analyticOvData = {
  labels: [
    "01 Jan",
    "02 Jan",
    "03 Jan",
    "04 Jan",
    "05 Jan",
    "06 Jan",
    "07 Jan",
    "08 Jan",
    "09 Jan",
    "10 Jan",
    "11 Jan",
    "12 Jan",
    "13 Jan",
    "14 Jan",
    "15 Jan",
    "16 Jan",
    "17 Jan",
    "18 Jan",
    "19 Jan",
    "20 Jan",
    "21 Jan",
    "22 Jan",
    "23 Jan",
    "24 Jan",
    "25 Jan",
    "26 Jan",
    "27 Jan",
    "28 Jan",
    "29 Jan",
    "30 Jan",
  ],
  datasets: [
    {
      label: "Prev Month",
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      borderColor: "rgba(157, 114, 255, 0.5)",
      backgroundColor: "rgba(157, 114, 255, 0.5)",
      pointBorderColor: "transparent",
      pointBackgroundColor: "transparent",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(157, 114, 255, 0.5)",
      pointBorderWidth: 2,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 2,
      pointRadius: 0,
      data: [
        4110, 4220, 4810, 5480, 4600, 5670, 6660, 4830, 5590, 5730, 4790, 4950,
        5100, 5800, 5950, 5850, 5950, 4450, 4900, 8000, 7200, 7250, 7900, 8950,
        6300, 7200, 7250, 7650, 6950, 4750,
      ],
    },
  ],
};

const AudienceOverview = () => {
  const [auOverview, setAuOverview] = useState("month-1");
  return (
    <React.Fragment>
      <div className="card-title-group pb-3 g-2">
        <div className="card-title card-title-sm">
          <h6 className="title">Doanh nghiệp & Người dùng E-KYC</h6>
          <p>
            Hiệu quả theo số lượng doanh nghiệp, người dùng, thời gian xử lý
            KYC.
          </p>
        </div>
        <div className="card-tools shrink-0 d-none d-sm-block">
          <ul className="nav nav-switch-s2 nav-tabs bg-white">
            <li className="nav-item">
              <a
                href="#navitem"
                className={
                  auOverview === "day-7" ? "nav-link active" : "nav-link"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setAuOverview("day-7");
                }}
              >
                7 D
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#navitem"
                className={
                  auOverview === "month-1" ? "nav-link active" : "nav-link"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setAuOverview("month-1");
                }}
              >
                1 M
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="analytic-ov">
        <div className="analytic-data-group analytic-ov-group g-3">
          <div className="analytic-data analytic-ov-data">
            <div className="title">Doanh nghiệp</div>
            <div className="amount">315</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon> 8.2%
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Người dùng KYC</div>
            <div className="amount">8.92K</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon> 12.7%
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Tỉ lệ thành công</div>
            <div className="amount">91.6%</div>
            <div className="change down">
              <Icon name="arrow-long-down"></Icon> 2.3%
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Thời gian xử lý</div>
            <div className="amount">1p 42s</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon> 4.5%
            </div>
          </div>
        </div>
        <div className="analytic-ov-ck">
          <AudienceLineChart data={analyticOvData} />
        </div>
        <div className="chart-label-group ms-5">
          <div className="chart-label">01 Jan, 2020</div>
          <div className="chart-label d-none d-sm-block">
            {auOverview === "month-1" ? "15" : "4"} Jan, 2020
          </div>
          <div className="chart-label">
            {" "}
            {auOverview === "month-1" ? "30" : "7"} Jan, 2020
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AudienceOverview;
