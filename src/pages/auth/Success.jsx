import Head from "@/layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
} from "@/components/Component";
import { Link } from "react-router-dom";
import { Button } from "@/components/Component";

const Success = () => {
  return (
    <>
      <Head title="Success" />
      <Block className="nk-block-middle nk-auth-body">
        <div className="brand-logo pb-5">
          <Link to="/" className="logo-link">
            <img
              className="logo-dark logo-img logo-img-lg"
              src="/logo.png"
              alt="logo-dark"
            />
          </Link>
        </div>
        <BlockHead>
          <BlockContent>
            <BlockTitle tag="h4">Đăng ký thành công</BlockTitle>
            <BlockDes className="text-success">
              <p>Bạn có thể đăng nhập bằng tài khoản vừa tạo</p>
              <Link to={`/auth-login`}>
                <Button color="primary" size="lg">
                  Quay lại đăng nhập
                </Button>
              </Link>
            </BlockDes>
          </BlockContent>
        </BlockHead>
      </Block>
      <AuthFooter />
    </>
  );
};
export default Success;
