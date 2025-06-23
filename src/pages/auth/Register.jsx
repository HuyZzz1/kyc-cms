/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
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
  RSelect,
} from "@/components/Component";
import { Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { registerOrganization } from "@/services/adminService";
import {
  getListCountries,
  getListIndustries,
  getListPackages,
} from "../../services/dashboard";
import { formatToVND } from "../../utils/Utils";

const Register = () => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [listCountries, setListCountries] = useState();
  const [listIndustries, setListIndustries] = useState();
  const [listPackage, setListPackage] = useState();

  const fetchListCountries = async () => {
    try {
      const result = await getListCountries();
      const formatted = result.map((item) => ({
        label: item.name,
        value: item.code,
      }));
      setListCountries(formatted);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchListIndustries = async () => {
    try {
      const result = await getListIndustries();
      const formatted = result.map((item) => ({
        label: item.name,
        value: item.code,
      }));
      setListIndustries(formatted);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchListPackage = async () => {
    try {
      const result = await getListPackages({});

      console.log("result", result);

      const formatted = result.map((item) => ({
        label: `${item?.name} - ${formatToVND(item?.price)}`,
        value: item._id,
      }));
      setListPackage(formatted);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const handleFormSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      await registerOrganization({
        name: data.name,
        identifier: data.identifier,
        password: data.passcode,
        industry: data.industry,
        country: data.country,
        packageId: data.packageId,
      });
      navigate(`/auth-success`);
    } catch (err) {
      setError(err.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    register("country", { required: "Trường này bắt buộc" });
    register("industry", { required: "Trường này bắt buộc" });
    register("packageId", { required: "Trường này bắt buộc" });

    fetchListCountries();
    fetchListIndustries();
    fetchListPackage();
  }, []);

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
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
              <label className="form-label">Quốc gia</label>
              <div className="form-control-wrap">
                <RSelect
                  id="country"
                  options={listCountries}
                  placeholder="Chọn quốc gia"
                  onChange={(selected) => {
                    setValue("country", selected?.value ?? null);
                  }}
                />
                {errors.country && (
                  <span className="text-danger small  fw-medium">
                    {errors.country.message}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Ngành nghề</label>
              <div className="form-control-wrap">
                <RSelect
                  id="industry"
                  options={listIndustries}
                  placeholder="Chọn ngành nghề"
                  onChange={(selected) => {
                    setValue("industry", selected?.value ?? null);
                  }}
                />
                {errors.industry && (
                  <span className="text-danger small  fw-medium">
                    {errors.industry.message}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Gói</label>
              <div className="form-control-wrap">
                <RSelect
                  id="packageId"
                  options={listPackage}
                  placeholder="Chọn gói"
                  onChange={(selected) => {
                    setValue("packageId", selected?.value ?? null);
                  }}
                />
                {errors.packageId && (
                  <span className="text-danger small  fw-medium">
                    {errors.packageId.message}
                  </span>
                )}
              </div>
            </div>

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
                  className="form-control"
                  style={{
                    height: 38,
                  }}
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
                  {...register("identifier", { required: true })}
                  className="form-control "
                  placeholder="Nhập email hoặc tên người dùng của bạn"
                  style={{
                    height: 38,
                  }}
                />
                {errors.identifier && (
                  <p className="invalid">Trường này bắt buộc</p>
                )}
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
                  className={`form-icon form-icon-right passcode-switch ${
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
                  className={` form-control ${
                    passState ? "is-hidden" : "is-shown"
                  }`}
                  style={{
                    height: 38,
                  }}
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
                {loading ? <Spinner size="sm" color="light" /> : "Đăng kí"}
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
