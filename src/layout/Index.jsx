import { Outlet } from "react-router-dom";
import { menu } from "./header/MenuData";
import Head from "./head/Head";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import AppRoot from "./global/AppRoot";
import AppWrap from "./global/AppWrap";

import FileManagerProvider from "@/pages/app/file-manager/components/Context";
import { useNavigate } from "react-router-dom";
import adminService from "@/services/adminService";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { profileStateAtom } from "../services/recoil/profile";

const Layout = ({ title }) => {
  const navigate = useNavigate();
  const setProfile = useSetRecoilState(profileStateAtom);

  const fetchProfile = async () => {
    try {
      const profileData = await adminService.getProfile();

      if (profileData?.data) {
        setProfile(profileData.data);
        navigate("/", { replace: true });
      }
    } catch (profileError) {
      console.error("Lỗi lấy profile:", profileError);
      navigate("/auth-login", { replace: true });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <FileManagerProvider>
      <Head title={!title && "Loading"} />
      <AppRoot>
        <AppWrap>
          <Header menuData={menu} fixed />
          <Outlet />
          <Footer />
        </AppWrap>
      </AppRoot>
    </FileManagerProvider>
  );
};
export default Layout;
