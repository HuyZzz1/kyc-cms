import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Layout from "@/layout/Index";
import LayoutNoSidebar from "@/layout/Index-nosidebar";
import ThemeProvider from "@/layout/provider/Theme";

import Login from "@/pages/auth/Login";
// import Register from "@/pages/auth/Register";
// import ForgotPassword from "@/pages/auth/ForgotPassword";
// import Success from "@/pages/auth/Success";

import Error404Modern from "@/pages/error/404-modern";
import Crypto from "@/pages/Crypto";
import Analytics from "@/pages/Analytics";
import Sales from "@/pages/Sales";
import OrganizationManagement from "@/pages/organization-management";
import { UserContextProvider } from "@/pages/pre-built/user-manage/UserContext";
import { ProductContextProvider } from "@/pages/pre-built/products/ProductContext";
import Faq from "@/pages/others/Faq";
import Regularv1 from "@/pages/others/Regular-1";
import Regularv2 from "@/pages/others/Regular-2";
import Terms from "@/pages/others/Terms";
import UserListRegular from "@/pages/pre-built/user-manage/UserListRegular";
import UserContactCard from "@/pages/pre-built/user-manage/UserContactCard";
import UserDetails from "@/pages/pre-built/user-manage/UserDetailsRegular";
import UserListCompact from "@/pages/pre-built/user-manage/UserListCompact";
import KycListRegular from "@/pages/pre-built/kyc-list-regular/KycListRegular";
import KycDetailsRegular from "@/pages/pre-built/kyc-list-regular/kycDetailsRegular";
import TransListBasic from "@/pages/pre-built/trans-list/TransListBasic";
import ProductCard from "@/pages/pre-built/products/ProductCard";
import ProductList from "@/pages/pre-built/products/ProductList";
import ProductDetails from "@/pages/pre-built/products/ProductDetails";
import InvoiceList from "@/pages/pre-built/invoice/InvoiceList";
import InvoiceDetails from "@/pages/pre-built/invoice/InvoiceDetails";
import FileManager from "@/pages/app/file-manager/FileManager";
import FileManagerFiles from "@/pages/app/file-manager/FileManagerFiles";
import FileManagerShared from "@/pages/app/file-manager/FileManagerShared";
import FileManagerStarred from "@/pages/app/file-manager/FileManagerStarred";
import FileManagerRecovery from "@/pages/app/file-manager/FileManagerRecovery";
import FileManagerSettings from "@/pages/app/file-manager/FileManagerSettings";
import RequestPackage from "../pages/request-package";
import InvoicePrint from "@/pages/pre-built/invoice/InvoicePrint";

import KycGuide from "../pages/others/KycGuide";
import TransactionHistory from "../pages/transaction-history";

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <>{children}</>;
};

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route element={<ThemeProvider />}>
            {/* Public layout - no sidebar */}
            <Route element={<LayoutNoSidebar />}>
              <Route path="/auth-login" element={<Login />} />
              {/* <Route path="/auth-register" element={<Register />} />
              <Route path="/auth-reset" element={<ForgotPassword />} />
              <Route path="/auth-success" element={<Success />} /> */}
              <Route path="*" element={<Error404Modern />} />
            </Route>

            {/* Private layout - with sidebar */}
            <Route element={<Layout />}>
              <Route index path="/" element={<Crypto />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/sales" element={<Sales />} />
              <Route
                path="/organization-management"
                element={<OrganizationManagement />}
              />

              <Route element={<UserContextProvider />}>
                <Route
                  path="user-list-regular"
                  element={<UserListRegular />}
                ></Route>
                <Route
                  path="user-list-compact"
                  element={<UserListCompact />}
                ></Route>
                <Route
                  path="user-contact-card"
                  element={<UserContactCard />}
                ></Route>
                <Route
                  path="user-details-regular/:userId"
                  element={<UserDetails />}
                ></Route>
              </Route>

              <Route
                path="kyc-list-regular"
                element={<KycListRegular />}
              ></Route>
              <Route
                path="kyc-details-regular/:kycId"
                element={<KycDetailsRegular />}
              ></Route>
              <Route
                path="transaction-basic"
                element={<TransListBasic />}
              ></Route>
              <Route
                path="transaction-history"
                element={<TransactionHistory />}
              ></Route>
              <Route element={<ProductContextProvider />}>
                <Route path="product-list" element={<ProductList />}></Route>
                <Route path="product-card" element={<ProductCard />}></Route>
                <Route
                  path="product-details/:productId"
                  element={<ProductDetails />}
                ></Route>
              </Route>

              <Route path="invoice-list" element={<InvoiceList />}></Route>
              <Route
                path="invoice-details/:invoiceId"
                element={<InvoiceDetails />}
              ></Route>

              <Route path="app-file-manager">
                <Route index element={<FileManager />}></Route>
                <Route path="files" element={<FileManagerFiles />}></Route>
                <Route path="starred" element={<FileManagerStarred />}></Route>
                <Route path="shared" element={<FileManagerShared />}></Route>
                <Route
                  path="recovery"
                  element={<FileManagerRecovery />}
                ></Route>
                <Route
                  path="settings"
                  element={<FileManagerSettings />}
                ></Route>
              </Route>

              <Route
                path="request-package"
                element={<RequestPackage />}
              ></Route>

              <Route
                path="invoice-print/:invoiceId"
                element={<InvoicePrint />}
              ></Route>

              <Route path="pages">
                <Route path="terms-policy" element={<Terms />}></Route>
                <Route path="faq" element={<Faq />}></Route>
                <Route path="guide" element={<KycGuide />}></Route>
                <Route path="regular-v1" element={<Regularv1 />}></Route>
                <Route path="regular-v2" element={<Regularv2 />}></Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default Router;
