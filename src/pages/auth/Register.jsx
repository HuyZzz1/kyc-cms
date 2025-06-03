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
import { Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const handleFormSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/auth-success`);
    }, 1000);
  };
  return (
    <>
      <Head title="Register" />
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
              <BlockTitle tag="h4">Đăng kí</BlockTitle>
              <BlockDes>
                <p>Tạo tài khoản KYC CHAIN</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Tên
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                  placeholder="Nhập tên của bạn"
                  className="form-control-lg form-control"
                />
                {errors.name && <p className="invalid">Trường này bắt buộc</p>}
              </div>
            </div>
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
                  {...register("email", { required: true })}
                  className="form-control-lg form-control"
                  placeholder="Nhập email hoặc tên người dùng của bạn"
                />
                {errors.email && <p className="invalid">Trường này bắt buộc</p>}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Mật khẩu
                </label>
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
                  placeholder="Nhập mật khẩu"
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
                type="submit"
                color="primary"
                size="lg"
                className="btn-block"
              >
                {loading ? <Spinner size="sm" color="light" /> : "Register"}
              </Button>
            </div>
          </form>
          <div className="form-note-s2 text-center pt-4">
            {" "}
            Đã có một tài khoản?{" "}
            <Link to={`/auth-login`}>
              <strong>Đăng nhập</strong>
            </Link>
          </div>
          <div className="text-center pt-4 pb-3">
            <h6 className="overline-title overline-title-sap">
              <span>Hoặc</span>
            </h6>
          </div>
          <ul className="nav justify-center gx-8">
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
export default Register;
