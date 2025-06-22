import React from "react";
import { Icon, TooltipComponent } from "@/components/Component";
import ActiveUserBarChart from "./chart/ActiveUserBarChart";

const ActiveUser = () => {
  return (
    <React.Fragment>
      <div className="card-title-group align-start pb-3 g-2">
        <div className="card-title card-title-sm">
          <h6 className="title">Người dùng hoạt động theo thời gian</h6>
          <p>Phân tích người dùng hoạt động KYC theo tháng/tuần/ngày.</p>
        </div>
        <div className="card-tools">
          <TooltipComponent
            iconClass="card-hint"
            icon="help"
            direction="left"
            id="Tooltip-users"
            text="Users of this month"
          ></TooltipComponent>
        </div>
      </div>
      <div className="analytic-au">
        <div className="analytic-data-group analytic-au-group g-3">
          <div className="analytic-data analytic-au-data">
            <div className="title">Tháng</div>
            <div className="amount">9.28K</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon>4.63%
            </div>
          </div>
          <div className="analytic-data analytic-au-data">
            <div className="title">Tuần</div>
            <div className="amount">2.69K</div>
            <div className="change down">
              <Icon name="arrow-long-down"></Icon>1.92%
            </div>
          </div>
          <div className="analytic-data analytic-au-data">
            <div className="title">Ngày (TB)</div>
            <div className="amount">0.94K</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon>3.45%
            </div>
          </div>
        </div>
        <div className="analytic-au-ck">
          <ActiveUserBarChart />
        </div>
        {/* <div className="chart-label-group">
          <div className="chart-label">01 Jan, 2020</div>
          <div className="chart-label">30 Jan, 2020</div>
        </div> */}
      </div>
    </React.Fragment>
  );
};
export default ActiveUser;
