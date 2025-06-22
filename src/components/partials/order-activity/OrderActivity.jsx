import React, { useEffect, useState } from "react";
import { CardTitle } from "reactstrap";
import {
  DataTableBody,
  DataTableHead,
  DataTableItem,
  DataTableRow,
} from "@/components/table/DataTable";
import { Link } from "react-router-dom";
import { getKycActivities } from "@/services/dashboard";
import { PaginationComponent } from "@/components/Component";
import Icon from "@/components/icon/Icon";

const OrderActivity = () => {
  const [orderData, setOrderData] = useState([]);
  const [orderActivity, setActivity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const status = orderActivity === "Buy" ? "APPROVED" : orderActivity === "Sell" ? "REJECTED" : "all";
        const data = await getKycActivities(currentPage, itemPerPage, status);
        setOrderData(data.data || []);
        setTotalItems(data.total || 0);
      } catch (error) {
        console.error("Error fetching KYC activities:", error);
      }
    };
    fetchData();
  }, [orderActivity, currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusLabel = (status) => {
    switch (status) {
      case 'APPROVED':
        return "Đã xác minh";
      case 'PENDING':
        return "Đang kiểm tra";
      case 'REJECTED':
        return "Từ chối";
      default:
        return status;
    }
  };

  const getDescriptionLabel = (description) => {
    switch (description) {
      case 'OCR_FAILED':
        return "Chưa nhận diện xong OCR";
      case 'FACE_LIVENESS_FAILED':
        return "Xác thực khuôn mặt thất bại";
      case 'FACE_NOT_MATCHED':
        return "Khuôn mặt không khớp";
      default:
        return 'Trùng khớp ID & ảnh selfie';
    }
  };

  const getTypeIcons = (type) => {
    switch (type) {
      case 'SUCCESS':
        return { icon1: "check-circle bg-success-dim icon-circle", icon2: "" };
      case 'INCOMPLETE':
        return { icon1: "alert-circle bg-warning-dim icon-circle", icon2: "" };
      case 'FAKE':
        return { icon1: "cross-circle bg-danger-dim icon-circle", icon2: "" };
      default:
        return { icon1: "info-circle bg-primary-dim icon-circle", icon2: "" };
    }
  };

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
            {orderData.length > 0
              ? orderData.map((item) => {
                  const icons = getTypeIcons(item.type);
                  return (
                    <DataTableItem key={item.reference}>
                      <DataTableRow className="nk-tb-orders-type">
                        <ul className="icon-overlap">
                          <li>
                            <Icon name={icons.icon1}></Icon>
                          </li>
                          {icons.icon2 && (
                            <li>
                              <Icon name={icons.icon2}></Icon>
                            </li>
                          )}
                        </ul>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="tb-lead text-nowrap">{getDescriptionLabel(item.description)}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="tb-sub text-nowrap">{item.date}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="tb-sub text-nowrap">{item.time}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="tb-sub text-primary text-nowrap">{item.reference || '-'}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="tb-sub text-nowrap">
                          {getStatusLabel(item.status)}
                        </span>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="tb-sub text-nowrap">{item.note || 'Không có'}</span>
                      </DataTableRow>
                    </DataTableItem>
                  );
                })
              : null}
          </DataTableBody>
          <div className="card-inner">
            {orderData.length > 0 ? (
              <PaginationComponent
                noDown
                itemPerPage={itemPerPage}
                totalItems={totalItems}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No data found</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default OrderActivity;
