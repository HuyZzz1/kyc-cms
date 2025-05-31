import React from "react";
import Content from "@/layout/content/Content";
import Head from "@/layout/head/Head";
import {
  Block,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  PreviewCard,
} from "@/components/Component";

const Terms = () => {
  return (
    <React.Fragment>
      <Head title="Chính sách KYC doanh nghiệp" />
      <Content>
        <div className="content-page wide-md m-auto">
          <BlockHead size="lg" className="mx-auto">
            <BlockHeadContent className="text-center">
              <BlockTitle tag="h2" className="fw-semibold">
                CHÍNH SÁCH KYC DOANH NGHIỆP
              </BlockTitle>
              <BlockDes>
                <p className="lead">
                  Điều khoản sử dụng nền tảng xác minh khách hàng điện tử KYC
                  CHAIN
                </p>
                <p className="text-soft ff-italic">
                  Phiên bản 2.3 - có hiệu lực: 01/06/2025
                </p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <PreviewCard className="card-bordered">
              <div className="entry">
                <h4>1. PHẠM VI ÁP DỤNG</h4>
                <p className="mb-1">
                  Áp dụng cho mọi tổ chức đăng ký sử dụng dịch vụ KYC CHAIN tại
                  kycchain.com
                </p>
                <p>Không áp dụng cho cá nhân không có tư cách pháp nhân</p>
                <h4>2. ĐĂNG KÝ TÀI KHOẢN</h4>
                <p className="mb-1">Doanh nghiệp phải cung cấp:</p>
                <p className="mb-1">- Giấy phép kinh doanh hợp lệ</p>
                <p className="mb-1">- MST doanh nghiệp</p>
                <p className="mb-1">- Thông tin người đại diện pháp luật</p>
                <p>
                  Hệ thống có quyền từ chối đăng ký nếu nghi ngờ vi phạm AML
                </p>

                <h4>3. QUYỀN SỞ HỮU TRÍ TUỆ</h4>
                <p className="mb-1">
                  Mọi công nghệ thuộc về KYC CHAIN bao gồm:
                </p>
                <p className="mb-1">- Thuật toán Face Matching</p>
                <p className="mb-1">- Hệ thống OCR nhận dạng tài liệu</p>
                <p className="mb-1">- Công nghệ liveness detection</p>
                <p>Cấm sao chép dưới mọi hình thức</p>
                <h4>4. GIỚI HẠN SỬ DỤNG</h4>
                <p className="mb-1">Chỉ được sử dụng cho:</p>
                <p className="mb-1">1. Xác minh khách hàng mới</p>
                <p className="mb-1">2. Đối soát định kỳ theo quy định AML</p>
                <p className="mb-1">3. Kích hoạt tài khoản ngân hàng</p>
                <p className="mb-1">CẤM sử dụng cho:</p>
                <p className="mb-1">- Mục đích thương mại hóa dữ liệu</p>
                <p>- Xác minh không có sự đồng ý của khách hàng</p>
                <h4>5. BẢO MẬT DỮ LIỆU</h4>
                <p className="mb-1">Tiêu chuẩn áp dụng:</p>
                <p className="mb-1">- Mã hóa AES-256 cho dữ liệu nhạy cảm</p>
                <p className="mb-1">- ISO 27001:2022 cho hệ thống lưu trữ</p>
                <p className="mb-1">- PCI DSS Level 1 cho dữ liệu thanh toán</p>
                <p className="mb-1">Chính sách lưu trữ:</p>
                <p className="mb-1">- Dữ liệu sinh trắc học: 90 ngày</p>
                <p>- Nhật ký giao dịch: 5 năm</p>
                <h4>6. TRÁCH NHIỆM PHÁP LÝ</h4>
                <p className="mb-1">Khách hàng cam kết:</p>
                <p className="mb-1">- Tính chính xác của dữ liệu đầu vào</p>
                <p className="mb-1">
                  - Chịu trách nhiệm nếu cung cấp thông tin giả mạo
                </p>
                <p className="mb-1">KYC CHAIN chịu trách nhiệm:</p>
                <p className="mb-1">- Bảo mật hệ thốngy</p>
                <p>- Đảm bảo SLA 99.9%</p>
                <h4>7. THANH TOÁN VÀ PHÍ</h4>
                <p className="mb-1">Chính sách giá:</p>
                <p className="mb-1">- Tính phí theo lượt xác minh</p>
                <p className="mb-1">- Miễn phí đối soát định kỳ</p>
                <p className="mb-1">Điều kiện hoàn tiền:</p>
                <p className="mb-1">- Lỗi kỹ thuật từ phía KYC CHAIN</p>
                <p>- Không hoàn tiền do dữ liệu đầu vào không chính xác</p>
                <h4>8. BẢO HÀNH DỊCH VỤ</h4>
                <p className="mb-1">Hỗ trợ 24/7 các lỗi:</p>
                <p className="mb-1">- Không nhận diện được tài liệu</p>
                <p className="mb-1">- Lỗi kết nối API</p>
                <p className="mb-1">- Sai lệch kết quả xác minh</p>
                <p className="mb-1">Không bao gồm:</p>
                <p className="mb-1">- Lỗi do hạ tầng khách hàng</p>
                <p>- Trường hợp force majeure</p>
                <h4>9. CHẤM DỨT HỢP ĐỒNG</h4>
                <p className="mb-1">KYC CHAIN có quyền chấm dứt khi:</p>
                <p className="mb-1">- Phát hiện gian lận</p>
                <p className="mb-1">- Vi phạm điều khoản bảo mật</p>
                <p className="mb-1">- Không thanh toán quá 30 ngày</p>
                <p className="mb-1">Quy trình chấm dứt:</p>
                <p className="mb-1">- Ngừng dịch vụ ngay lập tức</p>
                <p>- Xóa toàn bộ dữ liệu sau 7 ngày</p>
                <h4>10. TUÂN THỦ PHÁP LUẬT</h4>
                <p className="mb-1">Hệ thống đáp ứng:</p>
                <p className="mb-1">- Thông tư 06/NHNN về KYC số</p>
                <p className="mb-1">- Luật Giao dịch điện tử 2023</p>
                <p className="mb-1">
                  - Nghị định 13/2023/NĐ-CP về bảo mật dữ liệu
                </p>
                <p className="mb-1">Nghĩa vụ báo cáo:</p>
                <p className="mb-1">- Tự động báo cáo nghi ngờ AML</p>
                <p>- Hợp tác với cơ quan điều tra</p>
                <h4>11. GIỚI HẠN TRÁCH NHIỆM</h4>
                <p className="mb-1">KYC CHAIN không chịu trách nhiệm:</p>
                <p className="mb-1">
                  - Thiệt hại do gian lận từ phía khách hàng
                </p>
                <p className="mb-1">- Sự cố do lỗi hạ tầng viễn thông</p>
                <p className="mb-1">- Trường hợp bất khả kháng</p>
                <p className="mb-1">Mức bồi thường tối đa:</p>
                <p>- Không vượt quá 200% giá trị hợp đồng</p>
                <h4>12. ĐIỀU KHOẢN SỬA ĐỔI</h4>
                <p className="mb-1">Thông báo sửa đổi:</p>
                <p className="mb-1">- Gửi email 30 ngày trước khi áp dụng</p>
                <p className="mb-1">- Đăng thông báo trên website chính thức</p>
                <p className="mb-1">- Trường hợp bất khả kháng</p>
                <p className="mb-1">Hiệu lực:</p>
                <p className="mb-1">- Tự động có hiệu lực sau khi công bố</p>
                <p>
                  - Tiếp tục sử dụng dịch vụ đồng nghĩa với chấp nhận thay đổi
                </p>
                <h4>13. GIẢI QUYẾT TRANH CHẤP</h4>
                <p className="mb-1">Ưu tiên thương lượng</p>
                <p className="mb-1">Trường hợp không thống nhất:</p>
                <p className="mb-1">
                  - Giải quyết tại Tòa án có thẩm quyền tại Hà Nội
                </p>
                <p className="mb-1">Luật áp dụng:</p>
                <p className="mb-1">- Pháp luật Việt Nam</p>
                <p>- Điều ước quốc tế mà Việt Nam là thành viên</p>
                <h4>TIÊU CHUẨN TUÂN THỦ</h4>
                <div className="d-flex w-100 h-100 flex-column flex-md-row flex-wrap gap-3 pt-2">
                  <div
                    className="d-flex align-items-center flex-grow-1 p-2 rounded-3"
                    style={{ border: "1px solid #dbdfea" }}
                  >
                    <div className="nk-tnx-type-icon bg-success-dim text-success me-2">
                      <i
                        className="bi bi-shield-check"
                        style={{
                          fontSize: 20,
                          color: "var(--bs-success)",
                        }}
                      ></i>
                    </div>
                    <div className="d-flex flex-column">
                      <p
                        className=" text-black fw-medium"
                        style={{
                          marginBottom: -4,
                        }}
                      >
                        ISO 27001:2022
                      </p>
                      <p className="mb-0 text-soft">An toàn thông tin</p>
                    </div>
                  </div>
                  <div
                    className="d-flex align-items-center flex-grow-1 p-2 rounded-3"
                    style={{ border: "1px solid #dbdfea" }}
                  >
                    <div
                      className="nk-tnx-type-icon text-success me-2"
                      style={{
                        background: "#DBE9FE",
                      }}
                    >
                      <i
                        className="bi bi-credit-card"
                        style={{
                          fontSize: 20,
                          color: "#2564EB",
                        }}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <p
                        className="text-black fw-medium"
                        style={{
                          marginBottom: -4,
                        }}
                      >
                        PCI DSS Level 1
                      </p>
                      <p className="mb-0 text-soft">Bảo mật thanh toán</p>
                    </div>
                  </div>
                  <div
                    className="d-flex align-items-center flex-grow-1 p-2 rounded-3"
                    style={{ border: "1px solid #dbdfea" }}
                  >
                    <div
                      className="nk-tnx-type-icon text-success me-2"
                      style={{
                        background: "#F3E8FF",
                      }}
                    >
                      <i
                        className="bi bi-clipboard2-check"
                        style={{
                          fontSize: 20,
                          color: "#AB63EF",
                        }}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <p
                        className="text-black fw-medium"
                        style={{
                          marginBottom: -4,
                        }}
                      >
                        SOC 2 Type II
                      </p>
                      <p className="mb-0 text-soft">Kiểm soát hệ thống</p>
                    </div>
                  </div>
                </div>

                <div
                  className="w-100 h-100 p-3 rounded-3 mt-4"
                  style={{ border: "1px solid #DEEBFE", background: "#EFF6FF" }}
                >
                  <p className="text-black">
                    Bằng việc sử dụng dịch vụ, bạn đã đồng ý với tất cả điều
                    khoản trên
                  </p>
                  <div
                    style={{
                      background: "#C0DBFE",
                      width: "100%",
                      height: 1,
                      marginBottom: 16,
                    }}
                  />
                  <h6 className="text-black m-0">THÔNG TIN LIÊN HỆ</h6>
                  <div className="d-flex w-100 h-100 flex-column flex-md-row flex-wrap gap-3 pt-2">
                    <div className="d-flex flex-column flex-grow-1">
                      <p
                        className="mb-0 text-black fw-medium "
                        style={{
                          fontSize: 15,
                        }}
                      >
                        Phòng Pháp chế - KYC CHAIN
                      </p>
                      <p>Email: Info@kycchain.com</p>
                    </div>
                    <div className="d-flex flex-column flex-grow-1">
                      <p className="m-0 fw-medium">Email:</p>
                      <a
                        className="fw-medium"
                        style={{
                          color: "#526484",
                        }}
                      >
                        Hotline:{" "}
                        <span
                          style={{
                            color: "blue",
                            fontWeight: 500,
                          }}
                        >
                          1900 1234
                        </span>{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </PreviewCard>
          </Block>
        </div>
      </Content>
    </React.Fragment>
  );
};

export default Terms;
