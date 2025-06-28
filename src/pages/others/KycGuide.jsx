import { useState } from "react";
import Content from "@/layout/content/Content";
import Head from "@/layout/head/Head";

const KycGuide = () => {
  const [activeSection, setActiveSection] = useState("start");

  return (
    <>
      {" "}
      <Head title="Hướng dẫn" />
      <Content>
        <div className="container-fluid py-4">
          <div className="row">
            {/* Sidebar */}
            <div className="col-12 col-md-3 mb-4">
              <div
                className="card p-3"
                style={{
                  border: "1px solid #dbdfea",
                }}
              >
                <h6 className="fw-bold mb-3">Mục lục</h6>
                <ul className="list-unstyled">
                  <li
                    className={`mb-2 d-flex align-items-center ${
                      activeSection === "start"
                        ? "text-primary fw-bold"
                        : "text-muted"
                    }`}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveSection("start")}
                  >
                    {" "}
                    <i
                      className="bi bi-rocket-takeoff me-2"
                      style={{
                        fontSize: 18,
                      }}
                    ></i>{" "}
                    Bắt Đầu Nhanh{" "}
                  </li>
                  <li
                    className={`mb-2 d-flex align-items-center  ${
                      activeSection === "document"
                        ? "text-primary fw-bold"
                        : "text-muted"
                    }`}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveSection("document")}
                  >
                    {" "}
                    <i
                      className="bi bi-file-earmark-text me-2"
                      style={{
                        fontSize: 18,
                      }}
                    ></i>{" "}
                    Xác Minh Tài Liệu{" "}
                  </li>
                  <li
                    className={`mb-2 d-flex align-items-center ${
                      activeSection === "biometric"
                        ? "text-primary fw-bold"
                        : "text-muted"
                    }`}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveSection("biometric")}
                  >
                    {" "}
                    <i
                      className="bi bi-person-bounding-box me-2"
                      style={{
                        fontSize: 18,
                      }}
                    ></i>{" "}
                    Xác Thực Sinh Trắc Học{" "}
                  </li>
                  <li
                    className={`mb-2 d-flex align-items-center ${
                      activeSection === "integration"
                        ? "text-primary fw-bold"
                        : "text-muted"
                    }`}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      window.open(
                        "https://dashboard.kycchain.net/api/redoc",
                        "_blank"
                      )
                    }
                  >
                    {" "}
                    <i
                      className="bi bi-gear me-2"
                      style={{
                        fontSize: 18,
                      }}
                    ></i>{" "}
                    Tích Hợp Hệ Thống{" "}
                  </li>
                  <li
                    className={`d-flex align-items-center  ${
                      activeSection === "issue"
                        ? "text-primary fw-bold"
                        : "text-muted"
                    }`}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveSection("issue")}
                  >
                    {" "}
                    <i
                      className="bi bi-wrench-adjustable me-2"
                      style={{
                        fontSize: 18,
                      }}
                    ></i>{" "}
                    Xử Lý Sự Cố{" "}
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-12 col-md-9">
              {activeSection === "start" && (
                <>
                  <div
                    className="card p-3 mb-2"
                    style={{
                      border: "1px solid #dbdfea",
                    }}
                  >
                    <h4 className="fw-bold">Hướng Dẫn Sử Dụng KYC CHAIN</h4>
                    <p className="mb-1">
                      Tài liệu hướng dẫn toàn diện cho doanh nghiệp tích hợp hệ
                      thống xác minh khách hàng điện tử
                    </p>
                    <p className="text-soft ff-italic">
                      Phiên bản 2.3 - có hiệu lực: 01/06/2025
                    </p>
                  </div>

                  <div
                    className="card p-3 mb-2"
                    style={{
                      border: "1px solid #dbdfea",
                    }}
                  >
                    <h5 className="fw-bold mb-3">
                      <i className="bi bi-rocket-takeoff me-2" /> Bắt Đầu Nhanh
                    </h5>
                    <div
                      className="mb-3"
                      style={{
                        borderLeft: "2px solid #BFDBFE",
                        paddingLeft: 20,
                      }}
                    >
                      <h6 className="fw-bold">
                        Đăng Ký Tài Khoản Doanh Nghiệp
                      </h6>
                      <ol className="mb-2 ps-2">
                        <li>1. Truy cập trang đăng ký</li>
                        <li>
                          2. Chọn gói dịch vụ phù hợp (Basic/Pro/Enterprise)
                        </li>
                        <li>3. Upload giấy phép kinh doanh và MST</li>
                        <li>
                          4. Xác minh email và số điện thoại người đại diện
                        </li>
                      </ol>
                      <div
                        className="w-100 px-2 py-1 d-flex align-items-center rounded-3"
                        style={{
                          background: "#F3F4F6",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          window.open("https://www.youtube.com", "_blank");
                        }}
                      >
                        <i
                          className="bi bi-play"
                          style={{
                            fontSize: 18,
                            margin: 0,
                            marginRight: 5,
                          }}
                        />
                        <p className="m-0">Video hướng dẫn có sẵn</p>
                      </div>
                    </div>
                    <div
                      className="mb-3 mt-3"
                      style={{
                        borderLeft: "2px solid #BFDBFE",
                        paddingLeft: 20,
                      }}
                    >
                      <h6 className="fw-bold">Kích hoạt API Key</h6>
                      <ol className="mb-2 ps-2">
                        <li>1. Truy cập mục Cài đặt tích hợp</li>
                        <li>2. Tạo mới API Key với quyền phù hợp</li>
                        <li>3. Sao lưu Secret Key ở nơi an toàn</li>
                        <li>4. Thiết lập IP Whitelist (nếu cần)</li>
                      </ol>
                      <div
                        className="w-100 px-2 py-1 d-flex align-items-center rounded-3 "
                        style={{
                          background: "#FEFCE8",
                          border: "1px solid #FFF198",
                        }}
                      >
                        <i
                          className="bi bi-exclamation-triangle"
                          style={{
                            fontSize: 18,
                            margin: 0,
                            marginRight: 10,
                          }}
                        />
                        <p className="m-0">
                          Lưu ý: Không chia sẻ Secret Key với bên thứ ba
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card p-3 mb-2 pb-4"
                    style={{
                      border: "1px solid #dbdfea",
                    }}
                  >
                    <h5 className="fw-bold">Tài Nguyên & Hỗ Trợ</h5>

                    <div className="d-flex w-100 h-100 flex-column flex-md-row flex-wrap gap-5 pt-2">
                      <div className="d-flex flex-column flex-grow-1">
                        <div className="d-flex align-items-center gap-1">
                          <i
                            className="bi bi-file-earmark-text"
                            style={{
                              fontSize: 18,
                            }}
                          />
                          <p
                            className="fw-medium"
                            style={{
                              fontSize: 15,
                            }}
                          >
                            Tài liệu tải về
                          </p>
                        </div>
                        <div className="w-100 h-100 d-flex flex-column gap-2 pt-4">
                          <div
                            className="rounded-3 px-2 py-1 d-flex  align-items-center justify-content-between"
                            style={{
                              border: "1px solid #dbdfea",
                            }}
                          >
                            <div className="d-flex flex-column">
                              <p className="m-0 fw-medium">
                                Tài liệu API Full(PDF)
                              </p>
                              <span>2.4MB</span>
                            </div>
                            <div className="d-flex align-items-center">
                              <a
                                href="https://www.google.com/"
                                className="fw-medium"
                                target="_blank"
                              >
                                <i
                                  className="bi bi-download"
                                  style={{
                                    fontSize: 16,
                                    color: "blue",
                                    marginRight: 5,
                                  }}
                                />
                                Tải về
                              </a>
                            </div>
                          </div>
                          <div
                            className="rounded-3 px-2 py-1 d-flex  align-items-center justify-content-between"
                            style={{
                              border: "1px solid #dbdfea",
                            }}
                          >
                            <div className="d-flex flex-column">
                              <p className="m-0 fw-medium">
                                Brandling Guidelines
                              </p>
                              <span>8.1MB</span>
                            </div>
                            <div className="d-flex align-items-center">
                              <a
                                href="https://www.google.com/"
                                className="fw-medium"
                                target="_blank"
                              >
                                <i
                                  className="bi bi-download"
                                  style={{
                                    fontSize: 16,
                                    color: "blue",
                                    marginRight: 5,
                                  }}
                                />
                                Tải về
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-column flex-grow-1">
                        <div className="d-flex align-items-center gap-1">
                          <i
                            className="bi bi-headphones"
                            style={{
                              fontSize: 18,
                            }}
                          />
                          <p
                            className="fw-medium"
                            style={{
                              fontSize: 15,
                            }}
                          >
                            Hỗ trợ khách hàng
                          </p>
                        </div>
                        <div className="w-100 h-100 d-flex flex-column gap-2 pt-4">
                          <div
                            className="rounded-3 px-2 py-1 d-flex  align-items-center justify-content-between"
                            style={{
                              border: "1px solid #dbdfea",
                            }}
                          >
                            <div className="d-flex flex-column">
                              <p className="m-0 fw-medium">Email</p>
                              <a
                                href="mailto:support@kycchain.com"
                                className="fw-medium"
                              >
                                support@kycchain.com
                              </a>
                            </div>
                          </div>
                          <div
                            className="rounded-3 px-2 py-1 d-flex  align-items-center justify-content-between"
                            style={{
                              border: "1px solid #dbdfea",
                            }}
                          >
                            <div className="d-flex flex-column">
                              <p className="m-0 fw-medium">Hotline</p>
                              <a href="tel:19001234" className="fw-medium">
                                1900 1234
                              </a>
                            </div>
                          </div>
                          <div
                            className="rounded-3 px-2 py-1 d-flex  align-items-center justify-content-between"
                            style={{
                              border: "1px solid #dbdfea",
                            }}
                          >
                            <div className="d-flex flex-column">
                              <p className="m-0 fw-medium">Live Chat</p>
                              <a
                                href="https://www.google.com/"
                                className="fw-medium"
                                target="_blank"
                              >
                                Trò chuyện ngay{" "}
                                <i
                                  className="bi bi-box-arrow-up-right"
                                  style={{
                                    marginLeft: 5,
                                  }}
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeSection === "document" && (
                <div
                  className="card p-3 mb-4"
                  style={{
                    border: "1px solid #dbdfea",
                  }}
                >
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-file-earmark-text me-2" /> Xác Minh Tài
                    Liệu
                  </h5>
                  <p>Hướng dẫn xác minh tài liệu...</p>
                </div>
              )}

              {activeSection === "biometric" && (
                <div
                  className="card p-3 mb-4"
                  style={{
                    border: "1px solid #dbdfea",
                  }}
                >
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-person-bounding-box me-2" /> Xác Thực
                    Sinh Trắc Học
                  </h5>
                  <p>Hướng dẫn xác thực sinh trắc học...</p>
                </div>
              )}

              {activeSection === "integration" && (
                <div
                  className="card p-3 mb-4"
                  style={{
                    border: "1px solid #dbdfea",
                  }}
                >
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-gear me-2" /> Tích Hợp Hệ Thống
                  </h5>
                  <p>Hướng dẫn tích hợp hệ thống...</p>
                </div>
              )}

              {activeSection === "issue" && (
                <div
                  className="card p-3 mb-4"
                  style={{
                    border: "1px solid #dbdfea",
                  }}
                >
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-wrench-adjustable me-2" /> Xử Lý Sự Cố
                  </h5>
                  <p>Hướng dẫn xử lý sự cố thường gặp...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default KycGuide;
