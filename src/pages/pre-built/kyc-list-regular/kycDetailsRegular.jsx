import React, { useEffect, useState } from "react";
import Content from "@/layout/content/Content";
import Head from "@/layout/head/Head";
import { Badge, Card, Spinner } from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  UserAvatar,
} from "@/components/Component";
import { findUpper } from "@/utils/Utils";
import { Link, useParams } from "react-router-dom";
import adminService from "@/services/adminService";
import { KYC_STATUS } from "@/pages/pre-built/kyc-list-regular/enum";

// Document type names
const DOC_TYPE_NAME = {
  PASSPORT: "Hộ chiếu",
  DRIVING_LICENSE: "Bằng lái xe",
  ID_CARD: "CCCD/CMND",
};

const fieldTranslationMap = {
  fullName: "Họ và tên",
  idNumber: "Số CCCD/CMND",
  dateOfBirth: "Ngày sinh",
  gender: "Giới tính",
  nationality: "Quốc tịch",
  placeOfResidence: "Nơi thường trú",
  placeOfOrigin: "Quê quán",
  issueDate: "Ngày cấp",
  expiryDate: "Ngày hết hạn",
};

const KycDetailsRegular = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let { kycId } = useParams();

  const forceDownload = (url, filename) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename || "download";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
      })
      .catch((err) => console.error("Download failed", err));
  };

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      if (!kycId) return;

      setLoading(true);
      try {
        const response = await adminService.getEkycDetail(kycId);

        if (response.success) {
          const record = response.data;
          setUser({
            id: record._id,
            name: `${record?.personalInfo?.name || ""}`.trim(),
            date: new Date(record.createdAt).toLocaleDateString(),
            status: record?.status?.toUpperCase() || KYC_STATUS.PENDING,
            doc: DOC_TYPE_NAME[record.documentType] || "CCCD/CMND",
            documentType: record.documentType,
            frontImagePath: record.frontImage,
            backImagePath: record.backImage,
            faceImagePath: record.userImage,
            checked: record.adminVerifiedBy || "Chưa được duyệt",
            adminVerifiedAt: record.adminVerifiedAt
              ? new Date(record.adminVerifiedAt).toLocaleString()
              : "Chưa được duyệt",
            personalInfo: record.personalInfo || {},
            ocrResult: record.ocrResult || {},
            organization: record?.organization || null,
          });
        } else {
          setError("Không thể lấy chi tiết giấy tờ");
        }
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết giấy tờ:", error);
        setError("Có lỗi xảy ra khi lấy chi tiết giấy tờ");
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentDetails();
  }, [kycId]);

  // Show loading state while fetching data
  if (loading) {
    return (
      <React.Fragment>
        <Head title="Chi tiết KYC"></Head>
        <Content>
          <div className="d-flex justify-content-center align-items-center p-5">
            <Spinner color="primary" />
            <span className="ms-2">Đang tải chi tiết giấy tờ...</span>
          </div>
        </Content>
      </React.Fragment>
    );
  }

  // Show error if fetch failed
  if (error) {
    return (
      <React.Fragment>
        <Head title="Chi tiết KYC"></Head>
        <Content>
          <div className="d-flex flex-column justify-content-center align-items-center p-5">
            <div className="text-danger mb-3">
              <Icon name="cross-circle" />
            </div>
            <h4>Lỗi tải chi tiết</h4>
            <p>{error}</p>
            <Link to="/kyc-list-regular">
              <Button color="primary">Quay lại danh sách KYC</Button>
            </Link>
          </div>
        </Content>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Head title="Chi tiết KYC"></Head>
      {user && (
        <Content>
          <BlockHead size="sm">
            <BlockBetween className="g-3">
              <BlockHeadContent>
                <div className="d-flex align-items-center">
                  <BlockTitle page>
                    Hồ sơ KYC /{" "}
                    <strong className="text-primary small">{user.name}</strong>
                  </BlockTitle>
                </div>
                <BlockDes className="text-soft">
                  <ul className="list-inline">
                    <li>
                      Loại giấy tờ: <span className="text-base">{user.id}</span>
                    </li>
                    <li>
                      Ngày nộp: <span className="text-base">{user.date}</span>
                    </li>
                  </ul>
                </BlockDes>
              </BlockHeadContent>
              <BlockHeadContent>
                <Link to={`/kyc-list-regular`}>
                  <Button
                    color="light"
                    outline
                    className="bg-white d-none d-sm-inline-flex"
                  >
                    <Icon name="arrow-left"></Icon>
                    <span>Quay lại</span>
                  </Button>
                  <Button
                    color="light"
                    outline
                    className="btn-icon bg-white d-inline-flex d-sm-none"
                  >
                    <Icon name="arrow-left"></Icon>
                  </Button>
                </Link>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <Block>
            <Row className="gy-5">
              <Col lg="5">
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5">Thông tin đơn</BlockTitle>
                    <p>Ngày nộp, ngày duyệt, trạng thái v.v.</p>
                  </BlockHeadContent>
                </BlockHead>
                <Card className="card-bordered">
                  <ul className="data-list is-compact">
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Tổ chức</div>
                        <div className="data-value">
                          {user?.organization?.name}
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Người nộp</div>
                        <div className="data-value">
                          {user?.ocrResult?.fullName}
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Ngày nộp</div>
                        <div className="data-value">{user.date}</div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Trạng thái</div>
                        <div className="data-value">
                          <Badge
                            size="sm"
                            color={
                              user.status === KYC_STATUS.APPROVED
                                ? "outline-success"
                                : user.status === KYC_STATUS.PENDING
                                ? "outline-info"
                                : "outline-danger"
                            }
                            className="badge-dim"
                          >
                            {user.status === KYC_STATUS.PENDING
                              ? "Đang chờ xử lý"
                              : user.status === KYC_STATUS.APPROVED
                              ? "Đã phê duyệt"
                              : "Đã từ chối"}
                          </Badge>
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Người duyệt</div>
                        <div className="data-value">
                          <div className="user-card">
                            <UserAvatar
                              theme="orange-dim"
                              text={findUpper(user.checked)}
                            ></UserAvatar>
                            <div className="user-info">
                              <span className="tb-lead">{user.checked}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Thời gian duyệt</div>
                        <div className="data-value">{user.adminVerifiedAt}</div>
                      </div>
                    </li>
                  </ul>
                </Card>
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5">Giấy tờ đã tải lên</BlockTitle>
                    <p>Các giấy tờ người dùng đã tải lên</p>
                  </BlockHeadContent>
                </BlockHead>

                <Card className="card-bordered">
                  <ul className="data-list is-compact">
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Loại giấy tờ</div>
                        <div className="data-value">{user.doc}</div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Ảnh mặt trước</div>
                        <div className="data-value">
                          {user.frontImagePath ? (
                            <a
                              href="#"
                              className="text-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                forceDownload(
                                  user.frontImagePath,
                                  `${user.id}-front.jpg`
                                );
                              }}
                            >
                              <Icon name="download" /> Tải ảnh mặt trước
                            </a>
                          ) : (
                            "Không có"
                          )}
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Ảnh mặt sau</div>
                        <div className="data-value">
                          {user.documentType !== "PASSPORT" &&
                          user.backImagePath ? (
                            <a
                              href="#"
                              className="text-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                forceDownload(
                                  user.backImagePath,
                                  `${user.id}-back.jpg`
                                );
                              }}
                            >
                              <Icon name="download" /> Tải ảnh mặt sau
                            </a>
                          ) : (
                            "Không áp dụng"
                          )}
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Ảnh chân dung</div>
                        <div className="data-value">
                          {user.userImage ? (
                            <a
                              href="#"
                              className="text-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                forceDownload(
                                  user.userImage,
                                  `${user.id}-user-image.jpg`
                                );
                              }}
                            >
                              <Icon name="download" /> Tải ảnh chân dung
                            </a>
                          ) : (
                            "Không có"
                          )}
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card>
              </Col>

              <Col lg="7">
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5">Thông tin người dùng</BlockTitle>
                    <p>Thông tin cơ bản của người nộp đơn</p>
                  </BlockHeadContent>
                </BlockHead>
                <Card className="card-bordered">
                  <ul className="data-list is-compact">
                    {Object.entries(fieldTranslationMap).map(([key, label]) => {
                      const value = user.ocrResult?.[key];
                      return (
                        <li className="data-item" key={key}>
                          <div className="data-col">
                            <div className="data-label">{label}</div>
                            <div className="data-value text-break">
                              {typeof value === "boolean"
                                ? value
                                  ? "Hợp lệ"
                                  : "Không hợp lệ"
                                : value || "—"}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              </Col>
            </Row>
          </Block>
        </Content>
      )}
    </React.Fragment>
  );
};
export default KycDetailsRegular;
