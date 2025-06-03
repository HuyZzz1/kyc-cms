import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Head from "@/layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "@/components/Component";
import { Form, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = (formData) => {
    setLoading(true);
    const loginName = "admin@gmail.com";
    const pass = "123123";
    if (formData.name === loginName && formData.passcode === pass) {
      localStorage.setItem("accessToken", "token");
      setTimeout(() => {
        navigate("/overview");
      }, 1000);
    } else {
      setTimeout(() => {
        setError("Cannot login with credentials");
        setLoading(false);
      }, 1000);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Head title="Login" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <img
            style={{
              width: 200,
            }}
            src="/logo.png"
            alt="logo"
          />
        </div>

        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Đăng nhập</BlockTitle>
              <BlockDes>
                <p>Truy cập KYC CHAIN bằng email và mật khẩu của bạn.</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" /> Unable to login with credentials{" "}
              </Alert>
            </div>
          )}
          <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email hoặc Tên người dùng
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="default-01"
                  {...register("name", { required: "Trường này bắt buộc" })}
                  defaultValue="admin@gmail.com"
                  placeholder="Nhập email hoặc tên người dùng của bạn"
                  className="form-control-lg form-control"
                />
                {errors.name && (
                  <span className="invalid">{errors.name.message}</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Mật Khẩu
                </label>
                <Link className="link link-primary link-sm" to={`/auth-reset`}>
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${
                    passState ? "is-hidden" : "is-shown"
                  }`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon
                    name="eye-off"
                    className="passcode-icon icon-hide"
                  ></Icon>
                </a>
                <input
                  type={passState ? "text" : "password"}
                  id="password"
                  {...register("passcode", {
                    required: "Trường này bắt buộc",
                  })}
                  defaultValue="123123"
                  placeholder="Nhập mật khẩu của bạn"
                  className={`form-control-lg form-control ${
                    passState ? "is-hidden" : "is-shown"
                  }`}
                />
                {errors.passcode && (
                  <span className="invalid">{errors.passcode.message}</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <Button
                size="lg"
                className="btn-block"
                type="submit"
                color="primary"
              >
                {loading ? <Spinner size="sm" color="light" /> : "Đăng nhập"}
              </Button>
            </div>
          </Form>
          <div className="form-note-s2 text-center pt-4">
            Người mới trên KYC Chain?{" "}
            <Link to={`/auth-register`}>Tạo tài khoản</Link>
          </div>
          <div className="text-center pt-4 pb-3">
            <h6 className="overline-title overline-title-sap">
              <span>Hoặc</span>
            </h6>
          </div>
          <ul className="nav justify-center gx-4">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#socials"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Facebook
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#socials"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Google
              </a>
            </li>
          </ul>
        </PreviewCard>
      </Block>
      <AuthFooter />
    </>
  );
};
export default Login;
