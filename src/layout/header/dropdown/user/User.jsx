import { useState, useEffect } from "react";
import UserAvatar from "@/components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "@/components/Component";
import { LinkList, LinkItem } from "@/components/links/Links";
import { useTheme, useThemeUpdate } from "@/layout/provider/Theme";
import { useNavigate } from "react-router-dom";
import adminService from "@/services/adminService";
import { getAdminUserInfo } from "@/utils/authUtils";

const User = () => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(getAdminUserInfo());
  const toggle = () => setOpen((prevState) => !prevState);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await adminService.getProfile();
        // Tùy vào API trả về, lấy đúng trường dữ liệu
        if (res && res.data) {
          setProfile(res.data);
        }
      } catch {
        // Không cần xử lý lỗi, giữ nguyên thông tin cũ
      }
    }
    fetchProfile();
  }, []);

  // Hàm xử lý đăng xuất
  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    // Xóa cookie adminProfile nếu có
    if (typeof document !== "undefined") {
      document.cookie =
        "adminProfile=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    navigate("/auth-login");
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          <div className="user-info d-none d-xl-block">
            <div
              className={`user-status ${
                window.location.pathname.split("/")[2] === "invest"
                  ? "user-status-unverified"
                  : ""
              }`}
            >
              {window.location.pathname.split("/")[2] === "invest"
                ? "Unverified"
                : "Admininstrator"}
            </div>
            <div className="user-name dropdown-indicator">
              {profile?.fullName || "-"}
            </div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>AB</span>
            </div>
            <div className="user-info">
              <span className="lead-text">{profile?.fullName || "-"}</span>
              <span className="sub-text">{profile?.email || "-"}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem
              link={
                window.location.pathname.split("/")[2] === "invest"
                  ? "/invest/profile"
                  : "/user-profile-regular"
              }
              icon="user-alt"
              onClick={toggle}
            >
              View Profile
            </LinkItem>
            <LinkItem
              link={
                window.location.pathname.split("/")[2] === "invest"
                  ? "/invest/profile-setting"
                  : "/user-profile-setting"
              }
              icon="setting-alt"
              onClick={toggle}
            >
              Account Setting
            </LinkItem>
            <LinkItem
              link={
                window.location.pathname.split("/")[2] === "invest"
                  ? "/invest/profile-activity"
                  : "/user-profile-activity"
              }
              icon="activity-alt"
              onClick={toggle}
            >
              Login Activity
            </LinkItem>

            <li>
              <a
                className={`dark-switch ${
                  theme.skin === "dark" ? "active" : ""
                }`}
                href="#"
                onClick={(ev) => {
                  ev.preventDefault();
                  themeUpdate.skin(theme.skin === "dark" ? "light" : "dark");
                }}
              >
                {theme.skin === "dark" ? (
                  <>
                    <em className="icon ni ni-sun"></em>
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <em className="icon ni ni-moon"></em>
                    <span>Dark Mode</span>
                  </>
                )}
              </a>
            </li>
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a href="/auth-login" onClick={handleSignOut}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
