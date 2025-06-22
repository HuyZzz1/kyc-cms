import React, { useEffect, useState } from "react";
import {
  NewUsersData,
  PageviewsData,
  BounceRateData,
} from "@/components/partials/charts/analytics/AnalyticsData";
import { WPCharts } from "@/components/partials/charts/analytics/AnalyticsCharts";
import { Icon, TooltipComponent } from "@/components/Component";
import { getStatsKycMetrics } from "../../../../services/dashboard";

const WebsitePerformance = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const data = await getStatsKycMetrics();
      setData(data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  console.log("data", data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="card-title-group align-start pb-3 g-2">
        <div className="card-title card-title-sm">
          <h6 className="title">Hiệu quả hệ thống & hành vi người dùng</h6>
          <p>Dữ liệu hiệu suất và hành vi người dùng trong tháng.</p>
        </div>
        <div className="card-tools">
          <TooltipComponent
            iconClass="card-hint"
            icon="help"
            direction="left"
            id="tooltip-perfomance"
            text="Performance of this month"
          ></TooltipComponent>
        </div>
      </div>
      <div className="analytic-wp">
        <div className="analytic-wp-group g-3">
          <div className="analytic-data analytic-wp-data">
            <div className="analytic-wp-graph">
              <div className="title text-nowrap">Tỉ lệ xác minh thất bại</div>
              <div className="analytic-wp-ck">
                <WPCharts
                  className="analytics-line-small"
                  data={BounceRateData}
                ></WPCharts>
              </div>
            </div>
            <div className="analytic-wp-text">
              <div className="amount amount-sm">
                {data?.failureRate?.current}%
              </div>
              <div className="change up">
                <Icon
                  name={
                    data?.failureRate?.trend === "stable"
                      ? "arrow-long-up"
                      : "arrow-long-down"
                  }
                ></Icon>{" "}
                {data?.failureRate?.change}%
              </div>
              <div className="subtitle">so với tháng trước</div>
            </div>
          </div>
          <div className="analytic-data analytic-wp-data">
            <div className="analytic-wp-graph">
              <div className="title text-nowrap">Số lần thử KYC/người</div>
              <div className="analytic-wp-ck">
                <WPCharts
                  className="analytics-line-small"
                  data={PageviewsData}
                ></WPCharts>
              </div>
            </div>
            <div className="analytic-wp-text">
              <div className="amount amount-sm">
                {data?.attemptsPerUser?.current}%
              </div>
              <div className="change up">
                <Icon
                  name={
                    data?.attemptsPerUser?.trend === "stable"
                      ? "arrow-long-up"
                      : "arrow-long-down"
                  }
                ></Icon>{" "}
                {data?.attemptsPerUser?.change}%
              </div>
              <div className="subtitle">so với tháng trước</div>
            </div>
          </div>
          <div className="analytic-data analytic-wp-data">
            <div className="analytic-wp-graph">
              <div className="title text-nowrap">Người dùng mới (TB/ngày)</div>
              <div className="analytic-wp-ck">
                <WPCharts
                  className="analytics-line-small"
                  data={NewUsersData}
                ></WPCharts>
              </div>
            </div>
            <div className="analytic-wp-text">
              <div className="amount amount-sm">
                {data?.newUsersPerDay?.current}%
              </div>
              <div className="change up">
                <Icon
                  name={
                    data?.newUsersPerDay?.trend === "stable"
                      ? "arrow-long-up"
                      : "arrow-long-down"
                  }
                ></Icon>{" "}
                {data?.newUsersPerDay?.change}%
              </div>
              <div className="subtitle">so với tháng trước</div>
            </div>
          </div>
          {/* <div className="analytic-data analytic-wp-data">
            <div className="analytic-wp-graph">
              <div className="title text-nowrap">Thời gian trên hệ thống</div>
              <div className="analytic-wp-ck">
                <WPCharts
                  className="analytics-line-small"
                  data={TimeOnSiteData}
                ></WPCharts>
              </div>
            </div>
            <div className="analytic-wp-text">
              <div className="amount amount-sm">3m 35s</div>
              <div className="change up">
                <Icon name="arrow-long-up"></Icon>1.4%
              </div>
              <div className="subtitle">so với tháng trước</div>
            </div>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};
export default WebsitePerformance;
