import Head from "@/layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  PreviewCard,
} from "@/components/Component";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const onFormSubmit = () => {
    // navigate("/auth-success");
  };
  const { handleSubmit } = useForm();
  return (
    <>
      <Head title="Forgot-Password" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <img
            style={{
              width: 200,
            }}
            src="logo.png"
            alt="logo"
          />
        </div>
        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h5">Đặt lại mật khẩu</BlockTitle>
              <BlockDes>
                <p>
                  Nếu bạn quên mật khẩu của mình, thì chúng tôi sẽ gửi email cho
                  bạn hướng dẫn để đặt lại mật khẩu của bạn.
                </p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email
                </label>
              </div>
              <input
                type="text"
                className="form-control form-control-lg"
                id="default-01"
                placeholder="Nhập email của bạn"
              />
            </div>
            <div className="form-group">
              <Button color="primary" size="lg" className="btn-block">
                Gửi liên kết đặt lại
              </Button>
            </div>
          </form>
          <div className="form-note-s2 text-center pt-4">
            <Link to={`/auth-login`}>
              <strong>Quay lại đăng nhập</strong>
            </Link>
          </div>
        </PreviewCard>
      </Block>
      <AuthFooter />
    </>
  );
};
export default ForgotPassword;
