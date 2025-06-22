import React, { useState, useEffect } from "react";
import Icon from "@/components/icon/Icon";
import {
  UncontrolledDropdown,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { StackedBarChart } from "@/components/partials/charts/default/Charts";
import { getUserActivity } from "@/services/dashboard";

const UserActivity = () => {
  const [userActivity, setUserActivity] = useState("");
  const [activityData, setActivityData] = useState({
    new_business_accounts: 0,
    resubmission_requests: 0,
    daily_activity: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const days = userActivity === "day" ? 30 : 15;
        const data = await getUserActivity(days);
        setActivityData(data);
      } catch (error) {
        console.error("Error fetching user activity:", error);
      }
    };
    fetchData();
  }, [userActivity]);

  const chartData = {
    labels: activityData.daily_activity.map(activity => activity.date),
    datasets: [
      {
        label: "Tham gia qua giới thiệu",
        color: "#8feac5",
        backgroundColor: "#8feac5",
        barPercentage: 0.8,
        categoryPercentage: 0.6,
        data: activityData.daily_activity.map(activity => activity.refferal_join)
      },
      {
        label: "Tham gia trực tiếp",
        color: "#9cabff",
        backgroundColor: "#9cabff",
        barPercentage: 0.8,
        categoryPercentage: 0.6,
        data: activityData.daily_activity.map(activity => activity.direct_join)
      }
    ]
  };

  return (
    <React.Fragment>
      <div className="card-inner">
        <div className="card-title-group align-start mb-3">
          <CardTitle className="card-title">
            <h6 className="title">Hoạt động người dùng</h6>
            <p>
              Trong {userActivity === "day" ? "30" : "15"} ngày qua
              <Icon name="info"></Icon>
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
                  <li className={userActivity === "" ? "active" : ""}>
                    <DropdownItem
                      href="#dropdownitem"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setUserActivity("");
                      }}
                    >
                      <span>15 Days</span>
                    </DropdownItem>
                  </li>
                  <li className={userActivity === "day" ? "active" : ""}>
                    <DropdownItem
                      href="#dropdownitem"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setUserActivity("day");
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
        <div className="user-activity-group g-4">
          <div className="d-flex gap-5 pb-5">
            <div className="user-activity">
              <Icon name="users"></Icon>
              <div className="info">
                <span className="amount">{activityData.new_business_accounts}</span>
                <span className="title">Tài khoản doanh nghiệp mới</span>
              </div>
            </div>

            <div className="user-activity">
              <Icon name="users"></Icon>
              <div className="info">
                <span className="amount">{activityData.resubmission_requests}</span>
                <span className="title">Yêu cầu gửi lại hồ sơ xác minh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="user-activity-ck mt-4">
        <StackedBarChart state={userActivity} data={chartData} />
      </div>
    </React.Fragment>
  );
};
export default UserActivity;
