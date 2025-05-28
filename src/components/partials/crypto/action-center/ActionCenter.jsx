import React from "react";
import Icon from "@/components/icon/Icon";
import Button from "@/components/button/Button";
import {
  UncontrolledDropdown,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

const ActionCenter = () => {
  return (
    <React.Fragment>
      {" "}
      <div className="card-inner-group">
        <div className="card-inner card-inner-md">
          <div className="card-title-group">
            <CardTitle>
              <h6 className="title">Tác Vụ Khẩn</h6>
            </CardTitle>
            <div className="card-tools me-n1">
              <UncontrolledDropdown>
                <DropdownToggle
                  tag="a"
                  className="dropdown-toggle btn btn-icon btn-trigger"
                >
                  <Icon name="more-h"></Icon>
                </DropdownToggle>
                <DropdownMenu end>
                  <ul className="link-list-opt no-bdr">
                    <li>
                      <DropdownItem
                        tag="a"
                        href="#dropdownitem"
                        onClick={(ev) => {
                          ev.preventDefault();
                        }}
                      >
                        <Icon name="setting"></Icon>
                        <span>Action Settings</span>
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem
                        tag="a"
                        href="#dropdownitem"
                        onClick={(ev) => {
                          ev.preventDefault();
                        }}
                      >
                        <Icon name="notify"></Icon>
                        <span>Push Notification</span>
                      </DropdownItem>
                    </li>
                  </ul>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
        </div>
        <div className="card-inner">
          <div className="nk-wg-action">
            <div className="nk-wg-action-content">
              <Icon name="shield"></Icon>
              <div className="title">Xác minh đang chờ</div>
              <p>Còn 200 yêu cầu xác minh chưa được duyệt</p>
            </div>
            <Button className="btn-icon btn-trigger me-n2">
              <Icon name="forward-ios"></Icon>
            </Button>
          </div>
        </div>
        <div className="card-inner">
          <div className="nk-wg-action">
            <div className="nk-wg-action-content">
              <Icon name="msg-circle"></Icon>
              <div className="title">Tin nhắn hỗ trợ</div>
              <p>Có 18 yêu cầu đang mở</p>
            </div>
            <Button className="btn-icon btn-trigger me-n2">
              <Icon name="forward-ios"></Icon>
            </Button>
          </div>
        </div>
        <div className="card-inner">
          <div className="nk-wg-action">
            <div className="nk-wg-action-content">
              <Icon name="alert"></Icon>
              <div className="title">Vấn đề thanh toán</div>
              <p>Có 5 giao dịch chưa xác minh cần kiểm tra</p>
            </div>
            <Button className="btn-icon btn-trigger me-n2">
              <Icon name="forward-ios"></Icon>
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ActionCenter;
