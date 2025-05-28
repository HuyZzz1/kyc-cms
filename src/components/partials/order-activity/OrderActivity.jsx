import React, { useEffect, useState } from "react";
import Icon from "@/components/icon/Icon";
import { orderActivityData } from "./OrderData";
import { CardTitle } from "reactstrap";
import {
  DataTableBody,
  DataTableHead,
  DataTableItem,
  DataTableRow,
} from "@/components/table/DataTable";
import { Link } from "react-router-dom";

const OrderActivity = () => {
  const [orderData, setOrderData] = useState(orderActivityData);
  const [orderActivity, setActivity] = useState("");
  useEffect(() => {
    let data;
    if (orderActivity === "Buy") {
      data = orderActivityData.filter(
        (item) => item.desc.split(" ")[0] === "Buy"
      );
    } else if (orderActivity === "Sell") {
      data = orderActivityData.filter(
        (item) => item.desc.split(" ")[0] === "Sell"
      );
    } else {
      data = orderActivityData;
    }
    setOrderData(data);
  }, [orderActivity]);
  return (
    <React.Fragment>
      <div className="card-inner">
        <div className="card-title-group">
          <CardTitle>
            <h6 className="title">
              <span className="me-2">Hoạt động KYC</span>{" "}
              <Link
                to={`/transaction-crypto`}
                className="link d-none d-sm-inline"
              >
                Xem lịch sử
              </Link>
            </h6>
          </CardTitle>
          <div className="card-tools">
            <ul className="card-tools-nav">
              <li
                className={orderActivity === "Buy" ? "active" : ""}
                onClick={() => setActivity("Buy")}
              >
                <a
                  href="#buy"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  <span>Đã xác minh</span>
                </a>
              </li>
              <li
                className={orderActivity === "Sell" ? "active" : ""}
                onClick={() => setActivity("Sell")}
              >
                <a
                  href="#sell"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  <span>Từ chối</span>
                </a>
              </li>
              <li
                className={orderActivity === "" ? "active" : ""}
                onClick={() => setActivity("")}
              >
                <a
                  href="#all"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  <span>Tất cả</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ overflowX: "auto", width: "100%" }}>
        <div className="min-w-[900px]">
          <DataTableBody className="border-top" bodyclass="nk-tb-orders">
            <DataTableHead>
              <DataTableRow className="nk-tb-orders-type">
                <span>Loại</span>
              </DataTableRow>
              <DataTableRow>
                <span>Mô tả</span>
              </DataTableRow>
              <DataTableRow>
                <span>Ngày</span>
              </DataTableRow>
              <DataTableRow>
                <span>Giờ</span>
              </DataTableRow>
              <DataTableRow>
                <span>Mã tham chiếu</span>
              </DataTableRow>
              <DataTableRow>
                <span>Trạng thái</span>
              </DataTableRow>
              <DataTableRow>
                <span>Ghi chú</span>
              </DataTableRow>
            </DataTableHead>
            {orderData.map((item) => {
              return (
                <DataTableItem key={item.id}>
                  <DataTableRow className="nk-tb-orders-type">
                    <ul className="icon-overlap">
                      <li>
                        <Icon name={item.icon1}></Icon>
                      </li>
                      <li>
                        <Icon name={item.icon2}></Icon>
                      </li>
                    </ul>
                  </DataTableRow>
                  <DataTableRow>
                    <span className="tb-lead text-nowrap">{item.desc}</span>
                  </DataTableRow>
                  <DataTableRow>
                    <span className="tb-sub text-nowrap">{item.date}</span>
                  </DataTableRow>
                  <DataTableRow>
                    <span className="tb-sub text-nowrap">{item.time}</span>
                  </DataTableRow>
                  <DataTableRow>
                    <span className="tb-sub text-primary text-nowrap">
                      {item.ref}
                    </span>
                  </DataTableRow>
                  <DataTableRow>
                    <span className="tb-sub text-nowrap">{item.status}</span>
                  </DataTableRow>
                  <DataTableRow>
                    <span className="tb-sub text-nowrap">{item.note}</span>
                  </DataTableRow>
                </DataTableItem>
              );
            })}
          </DataTableBody>
        </div>
      </div>
    </React.Fragment>
  );
};
export default OrderActivity;
