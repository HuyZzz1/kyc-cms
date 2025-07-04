import React from "react";
import UserAvatar from "@/components/user/UserAvatar";
import { supportData } from "./SupportData";
import { CardTitle, Badge } from "reactstrap";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <React.Fragment>
      <div className="card-inner border-bottom">
        <div className="card-title-group">
          <CardTitle>
            <h6 className="title">Support Requests</h6>
          </CardTitle>
          <div className="card-tools">
            <Link to={`/app-messages`} className="link">
              All Tickets
            </Link>
          </div>
        </div>
      </div>
      <ul className="nk-support">
        {supportData.map((item, idx) => {
          return (
            <li className="nk-support-item" key={idx}>
              <UserAvatar image={item.img} theme={item.theme} text={item.initial} />
              <div className="nk-support-content">
                <div className="title">
                  <span>{item.name}</span>
                  <Badge
                    className="badge-dot badge-dot-xs"
                    color={
                      item.status === "Solved" ? "success" : item.status === "Pending" ? "warning" : "info"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
                <p>{item.text}</p>
                <span className="time">{item.time}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};
export default Support;
