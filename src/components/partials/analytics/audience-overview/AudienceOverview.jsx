/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Icon } from "@/components/Component";
import AudienceLineChart from "./chart/AudienceLineChart";
import { getStatsOverview } from "../../../../services/dashboard";

const AudienceOverview = () => {
  const [auOverview, setAuOverview] = useState("7");

  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const data = await getStatsOverview(auOverview);
      setData(data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auOverview]);

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
                className={auOverview === "7" ? "nav-link active" : "nav-link"}
                onClick={(e) => {
                  e.preventDefault();
                  setAuOverview("7");
                }}
              >
                7 D
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#navitem"
                className={auOverview === "30" ? "nav-link active" : "nav-link"}
                onClick={(e) => {
                  e.preventDefault();
                  setAuOverview("30");
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
          <div
            className="analytic-data analytic-ov-data"
            style={{
              flex: 1,
            }}
          >
            <div className="title">Doanh nghiệp</div>
            <div className="amount">{data?.organizations?.total || 0}</div>
            <div className="change up">
              <Icon
                name={
                  data?.organizations?.trend === "increase"
                    ? "arrow-long-up"
                    : "arrow-long-down"
                }
              ></Icon>
              {data?.organizations?.growth}%
            </div>
          </div>
          <div
            className="analytic-data analytic-ov-data"
            style={{
              flex: 1,
            }}
          >
            <div className="title">Người dùng KYC</div>
            <div className="amount">{data?.kycUsers?.total || 0}</div>
            <div className="change up">
              <Icon
                name={
                  data?.kycUsers?.trend === "increase"
                    ? "arrow-long-up"
                    : "arrow-long-down"
                }
              ></Icon>
              {data?.kycUsers?.growth}%
            </div>
          </div>
          <div
            className="analytic-data analytic-ov-data"
            style={{
              flex: 1,
            }}
          >
            <div className="title">Tỉ lệ thành công</div>
            <div className="amount">{data?.successRate?.total || 0}</div>
            <div className="change up">
              <Icon
                name={
                  data?.successRate?.trend === "increase"
                    ? "arrow-long-up"
                    : "arrow-long-down"
                }
              ></Icon>
              {data?.successRate?.growth}%
            </div>
          </div>
        </div>
        <div className="analytic-ov-ck">
          <AudienceLineChart data={data?.chartData || []} />
        </div>
      </div>
    </React.Fragment>
  );
};
export default AudienceOverview;
