import classNames from "classnames";
import Toggle from "./Toggle";
import Menu from "../menu/Menu";
import MenuMobile from "../menu/MenuMobile";
import User from "./dropdown/user/User";
import Notification from "./dropdown/notification/Notification";

import { useTheme, useThemeUpdate } from "@/layout/provider/Theme";
import { Link } from "react-router";

const Header = ({ fixed, className, menuData }) => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();

  const headerClass = classNames({
    "nk-header is-regular": true,
    "nk-header-fixed": fixed,
    [`is-light`]: theme.header === "white",
    [`is-${theme.header}`]:
      theme.header !== "white" && theme.header !== "light",
    [`${className}`]: className,
  });

  return (
    <div className={headerClass}>
      <div
        className={`container-fluid wide-${
          window.location.pathname.split("/")[2] === "invest" ? "lg" : "xl"
        }`}
      >
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger me-sm-2 d-lg-none">
            <Toggle
              className="nk-nav-toggle nk-quick-nav-icon"
              icon="menu"
              click={themeUpdate.sidebarVisibility}
            />
          </div>
          <div className="nk-header-brand">
            <Link to="/" className="logo-link">
              <img
                style={{
                  width: 140,
                }}
                src="/logo.png"
                alt="logo"
              />
            </Link>
          </div>
          <div
            className={`nk-header-menu  ${
              theme.sidebarMobile ? "mobile-menu" : ""
            }  ${theme.sidebarVisibility ? "nk-header-active" : ""}`}
          >
            <div className="nk-header-mobile ">
              <div className="nk-header-brand">
                <img
                  style={{
                    width: 140,
                  }}
                  src="logo.png"
                  alt="logo"
                />
              </div>
              <div className="nk-menu-trigger me-n2">
                <Toggle
                  className="nk-nav-toggle nk-quick-nav-icon"
                  icon="arrow-left"
                  click={themeUpdate.sidebarVisibility}
                />
              </div>
            </div>
            {theme.sidebarMobile ? (
              <MenuMobile data={menuData} ui="ui-s2" />
            ) : (
              <Menu data={menuData} ui="ui-s2" />
            )}
          </div>
          {theme.sidebarVisibility && (
            <div
              className="nk-header-overlay"
              onClick={themeUpdate.sidebarVisibility}
            ></div>
          )}
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="user-dropdown">
                <User />
              </li>
              <li className="notification-dropdown me-n1">
                <Notification />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
