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
import { urlVideo } from "@/utils/videoUtils";

// Document type names
const DOC_TYPE_NAME = {
  PASSPORT: "Hộ chiếu",
  DRIVING_LICENSE: "Bằng lái xe",
  ID_CARD: "CCCD/CMND",
};

const KycDetailsRegular = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let { kycId } = useParams();

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
            recordVideo: record?.video?.filename || null,
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

  // Function to download document image
  const downloadDocument = async (imagePath, filename) => {
    if (!imagePath) return;

    try {
      const response = await adminService.downloadFileMedia(imagePath);

      // Create a download link and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Lỗi khi tải ảnh:", error);
    }
  };

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
                        <div className="data-value">{user.name}</div>
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
                              href="#download"
                              className="text-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                downloadDocument(
                                  user.frontImagePath,
                                  `${user.name}-front.jpg`
                                );
                              }}
                            >
                              <Icon name="download"></Icon> Tải ảnh mặt trước
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
                              href="#download"
                              className="text-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                downloadDocument(
                                  user.backImagePath,
                                  `${user.name}-back.jpg`
                                );
                              }}
                            >
                              <Icon name="download"></Icon> Tải ảnh mặt sau
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
                          {user.faceImagePath ? (
                            <a
                              href="#download"
                              className="text-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                downloadDocument(
                                  user.faceImagePath,
                                  `${user.name}-face.jpg`
                                );
                              }}
                            >
                              <Icon name="download"></Icon> Tải ảnh chân dung
                            </a>
                          ) : (
                            "Không có"
                          )}
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Video</div>
                        <div className="data-value">
                          {user.recordVideo ? (
                            <a
                              href="#download"
                              className="text-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                downloadDocument(
                                  user.recordVideo,
                                  `${user.name}-face-scan.webm`
                                );
                              }}
                            >
                              <Icon name="download" /> Tải video
                            </a>
                          ) : (
                            "Không có"
                          )}
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card>
                {user.recordVideo ? (
                  <video
                    width="100%"
                    height="auto"
                    controls
                    style={{
                      borderRadius: "8px",
                      maxHeight: "480px",
                      marginTop: "1.25rem",
                    }}
                  >
                    <source
                      src={urlVideo(user.recordVideo)}
                      type="video/webm"
                    />
                    Trình duyệt không hỗ trợ phát video
                  </video>
                ) : (
                  <div></div>
                )}
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
                    {user.personalInfo &&
                      Object.entries(user.personalInfo).map(([key, value]) => {
                        // Map the key to the corresponding translation key
                        const fieldTranslationMap = {
                          name: "Họ và tên",
                          id: "Số CCCD/CMND",
                          birthDay: "Ngày sinh",
                          gender: "Giới tính",
                          originLocation: "Quê quán",
                          recentLocation: "Nơi thường trú",
                          issueDate: "Ngày cấp",
                          issuePlace: "Nơi cấp",
                          validDate: "Ngày hết hạn",
                          cardType: "Loại giấy tờ",
                          isLegal: "Giấy tờ hợp lệ",
                        };
                        const label =
                          fieldTranslationMap[key] ||
                          key.charAt(0).toUpperCase() + key.slice(1);
                        return (
                          <li className="data-item" key={key}>
                            <div className="data-col">
                              <div className="data-label">{label}</div>
                              <div className="data-value text-break">
                                {typeof value === "boolean"
                                  ? value
                                    ? "Hợp lệ"
                                    : "Không hợp lệ"
                                  : value}
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
