import React, { useRef, useEffect } from "react";
import SimpleBar from "simplebar-react";
import data from "../Data";
import { Icon } from "@/components/Component";
// import {
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   UncontrolledDropdown,
// } from "reactstrap";
import { Link } from "react-router-dom";
import { useFileManager, useFileManagerUpdate } from "./Context";

const FileManagerAside = () => {
  const { fileManager } = useFileManager();
  const { fileManagerUpdate } = useFileManagerUpdate();

  const asideWrap = useRef(null);

  useEffect(() => {
    fileManagerUpdate.contentHeight(asideWrap.current.clientHeight + 10);
  }, [asideWrap.current]);

  return (
    <React.Fragment>
      <SimpleBar
        className={`nk-fmg-aside toggle-screen-lg ${
          fileManager.asideVisibility ? "content-active" : ""
        }`}
      >
        <div className="nk-fmg-aside-wrap">
          <div ref={asideWrap}>
            <SimpleBar className="nk-fmg-aside-top">
              <ul className="nk-fmg-menu">
                {data.navigation.map((item) => (
                  <li
                    key={item.id}
                    onClick={(ev) => {
                      ev.preventDefault();
                      fileManagerUpdate.asideHide();
                    }}
                    className={`${
                      window.location.pathname ===
                      `/app-file-manager${item.link}`
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      className="nk-fmg-menu-item"
                      to={`/app-file-manager${item.link}`}
                    >
                      <Icon name={item.icon}></Icon>
                      <span className="nk-fmg-menu-text">{item.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </SimpleBar>
            <div className="nk-fmg-aside-bottom">
              {/*
              <div className="nk-fmg-status">
                <h6 className="nk-fmg-status-title">
                  <Icon name="hard-drive"></Icon>
                  <span>Dung lượng</span>
                </h6>
                <div className="progress progress-md bg-light">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${
                        1200 /
                        fileManager.data.plans.find(
                          (item) => item.id === fileManager.currentPlan
                        ).memory
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="nk-fmg-status-info">
                  12.47 GB of{" "}
                  {
                    fileManager.data.plans.find(
                      (item) => item.id === fileManager.currentPlan
                    ).memory
                  }{" "}
                  GB đã sử dụng
                </div>
                <div className="nk-fmg-status-action">
                  <Link
                    to={`/app-file-manager/settings?tab=billing`}
                    className="link link-primary link-sm"
                  >
                    Nâng cấp gói dữ liệu
                  </Link>
                </div>
              </div>
              */}
              {/*
              <div className="nk-fmg-switch">
                ...
              </div>
              */}
            </div>
          </div>
          {/* <div className="h-100 d-flex flex-column justify-content-end px-2 pb-2 pt-5">
            <p className="fw-semibold m-0">Tài khoản:</p>
            <span className="m-0">Quản trị viên</span>
          </div> */}
        </div>
      </SimpleBar>
      {fileManager.asideVisibility && (
        <div
          className="toggle-overlay"
          onClick={(ev) => {
            ev.preventDefault();
            fileManagerUpdate.asideVisibility();
          }}
        ></div>
      )}
    </React.Fragment>
  );
};

export default FileManagerAside;
