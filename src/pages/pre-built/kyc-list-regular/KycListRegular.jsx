/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Content from "@/layout/content/Content";
import Head from "@/layout/head/Head";
import adminService from "@/services/adminService";
import AdminBadge from "@/components/admin/AdminBadge";
import {
  Modal,
  ModalBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
} from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  Row,
  TooltipComponent,
  UserAvatar,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  PaginationComponent,
  RSelect,
} from "@/components/Component";
import { KYC_STATUS } from "./enum";
import DownloadDropdown from "@/components/download-dropdown/DownloadDropdown";
import { findUpper } from "@/utils/Utils";

// Filter option functions
const filterStatus = () => [
  { value: KYC_STATUS.PENDING, label: "Đang chờ xử lý" },
  { value: KYC_STATUS.APPROVED, label: "Đã phê duyệt" },
  { value: KYC_STATUS.REJECTED, label: "Đã từ chối" }
];

const filterDoc = () => [
  { value: "PASSPORT", label: "Hộ chiếu" },
  { value: "NATIONAL_ID", label: "CCCD/CMND" },
  { value: "DRIVING_LICENSE", label: "Bằng lái xe" }
];

const bulkActionKycOptions = () => [
  { value: KYC_STATUS.APPROVED, label: "Phê duyệt" },
  { value: KYC_STATUS.REJECTED, label: "Từ chối" }
];

const DOC_TYPE = {
  PASSPORT: "PASSPORT",
  ID_CARD: "ID_CARD",
  DRIVING_LICENSE: "DRIVING_LICENSE",
}

const KycListRegular = () => {
  // Định nghĩa text tiếng Việt cho các loại giấy tờ
  const DOC_TYPE_NAME = useMemo(() => ({
    PASSPORT: "Hộ chiếu",
    DRIVING_LICENSE: "Bằng lái xe",
    ID_CARD: "CCCD/CMND"
  }), []);
  // Khởi tạo các option filter và state
  const translatedFilterStatus = useMemo(() => filterStatus(), []);
  const translatedFilterDoc = useMemo(() => filterDoc(), []);
  const translatedBulkActionOptions = useMemo(() => bulkActionKycOptions(), []);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [tablesm, updateTableSm] = useState(false);
  const [data, setData] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAdmin] = useState("Admin"); // Thay bằng thông tin admin thực tế từ auth

  // Fetch data when page or itemPerPage changes
  useEffect(() => {
    const fetchEkycData = async () => {
      try {
        const response = await adminService.getEkycList({
          page: currentPage,
          limit: itemPerPage,
        });

        if (response.success) {
          const { records, pagination } = response.data;
          setData(
            records.map((record) => ({
              id: record._id,
              safeId: `id_${record._id.replace(/[^a-zA-Z0-9]/g, '_')}`,
              name: `${record.firstName || ""} ${record.lastName || ""}`.trim(),
              doc: DOC_TYPE_NAME[record.documentType] || "CCCD/CMND",
              front: true,
              back: record.documentType !== DOC_TYPE.PASSPORT,
              date: new Date(record.createdAt).toLocaleDateString(),
              status: record?.status?.toUpperCase() || KYC_STATUS.PENDING,
              checked: record.adminVerifiedBy || "-",
              avatarBg: "primary",
              email: record.email,
              phone: record.phoneNumber,
              verifiedAt: record.verifiedAt
                ? new Date(record.verifiedAt).toLocaleString()
                : "-",
              adminVerifiedAt: record.adminVerifiedAt
                ? new Date(record.adminVerifiedAt).toLocaleString()
                : "-",
              check: false,
              personalInfo: record.personalInfo || {},
              frontImagePath: record.frontImage,
              backImagePath: record.backImage,
              userImage: record.userImage,
              recordVideo: record?.video?.filename || null,
            }))
          );
          setTotalItems(pagination.total);
        } else {
          console.error("Không thể lấy dữ liệu eKYC");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu eKYC:", error);
      }
    };
    
    fetchEkycData();
  }, [currentPage, itemPerPage, DOC_TYPE_NAME]);

  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.name.localeCompare(b.name));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.name.localeCompare(a.name));
      setData([...sortedData]);
    }
  };    // Changing state value when searching name  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onSearchText !== "") {
        setData(prevData => {
          const filteredObject = prevData.filter((item) => {
            return item?.personalInfo?.name?.toLowerCase().includes(onSearchText.toLowerCase()) || 
                   item?.id?.toLowerCase().includes(onSearchText.toLowerCase());
          });
          return [...filteredObject];
        });
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [onSearchText]);

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to declare the state change
  const onActionText = (e) => {
    setActionText(e.value);
  };

  // function to select all the items of the table
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // function to change the property of an item of the table
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
  };

  // function to fire actions after dropdowm select
  const onActionClick = () => {
    if (actionText === KYC_STATUS.REJECTED) {
      let newData = data.map((item) => {
        if (item.check === true) item.status = KYC_STATUS.REJECTED;
        return item;
      });
      setData([...newData]);
    } else if (actionText === "Delete") {
      let newData;
      newData = data.filter((item) => item.check !== true);
      setData([...newData]);
    }
  };

  // function to change to approve property for an item
  const onApproveClick = async (id) => {
    setIsProcessing(true);
    try {
      // Call the admin approval API
      const response = await adminService.adminVerifyDocument(id, {
        adminName: currentAdmin,
        status: KYC_STATUS.APPROVED
      });

      if (response.success) {
        // Update the UI to reflect the change
        let newData = [...data];
        let index = newData.findIndex((item) => item.id === id);
        newData[index].status = response?.data?.status;
        newData[index].checked = response?.data?.adminVerifiedBy;
        newData[index].adminVerifiedAt = response?.data?.adminVerifiedAt
        setData([...newData]);

        // Show success notification (you can implement a toast notification)
        console.log("Phê duyệt giấy tờ thành công");
      } else {
        console.error("Không thể phê duyệt giấy tờ");
      }
    } catch (error) {
      console.error("Lỗi khi phê duyệt giấy tờ:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // function to change to reject property for an item
  const onRejectClick = async (id) => {
    setIsProcessing(true);
    try {
      // Call the admin approval API with rejected status
      const response = await adminService.adminVerifyDocument(id, {
        adminName: currentAdmin,
        status: KYC_STATUS.REJECTED
      });

      if (response.success) {
        // Update the UI to reflect the change
        let newData = [...data];
        let index = newData.findIndex((item) => item.id === id);
        newData[index].status = response?.data?.status;
        newData[index].checked = response?.data?.adminVerifiedBy;
        newData[index].adminVerifiedAt = response?.data?.adminVerifiedAt
        setData([...newData]);

        // Show success notification (you can implement a toast notification)
        console.log("Từ chối giấy tờ thành công");
      } else {
        console.error("Không thể từ chối giấy tờ");
      }
    } catch (error) {
      console.error("Lỗi khi từ chối giấy tờ:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to download document image
  const downloadDocumentImage = async (imagePath, filename) => {
    try {
      const response = await adminService.downloadFileMedia(imagePath);

      // Create a download link and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Lỗi khi tải ảnh:", error);
    }
  };

  // function to load detail data
  const loadDetail = (id) => {
    let index = data.findIndex((item) => item.id === id);
    setDetail(data[index]);
  };

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Use the data from API directly without slicing again
  const currentItems = data;

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Head title="Danh sách KYC"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <div className="d-flex align-items-center">
                <BlockTitle page>Danh sách KYC</BlockTitle>
                <AdminBadge />
              </div>
              <BlockDes className="text-soft">
                <p>Danh sách các đơn đăng ký KYC</p>
                <p>Tổng số hồ sơ: {totalItems}</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <Button color="light" outline className="bg-white d-none d-sm-inline-flex">
                <Icon name="download-cloud"></Icon>
                <span>Xuất</span>
              </Button>
              <Button color="light" outline className="btn-icon bg-white d-inline-flex d-sm-none">
                <Icon name="download-cloud"></Icon>
              </Button>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-tools">
                  <div className="form-inline flex-nowrap gx-3">
                    <div className="form-wrap">
                      <RSelect
                        options={translatedBulkActionOptions}
                        className="w-130px"
                        placeholder="Tất cả"
                        onChange={(e) => onActionText(e)}
                      />
                    </div>
                    <div className="btn-wrap">
                      <span className="d-none d-md-block">
                        <Button
                          color="light"
                          outline
                          disabled={actionText === "" ? true : false}
                          className="btn-dim"
                          onClick={() => onActionClick()}
                        >
                          Áp dụng
                        </Button>
                      </span>
                      <span className="d-md-none">
                        <Button
                          color="light"
                          outline
                          disabled={actionText === "" ? true : false}
                          className="btn-dim btn-icon"
                          onClick={() => onActionClick()}
                        >
                          <Icon name="arrow-right"></Icon>
                        </Button>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card-tools me-n1">
                  <ul className="btn-toolbar gx-1">
                    <li>
                      <Button
                        onClick={(ev) => {
                          ev.preventDefault();
                          toggle();
                        }}
                        className="btn-icon search-toggle toggle-search"
                      >
                        <Icon name="search"></Icon>
                      </Button>
                    </li>
                    <li className="btn-toolbar-sep"></li>
                    <li>
                      <div className="toggle-wrap">
                        <Button
                          className={`btn-icon btn-trigger toggle ${tablesm ? "active" : ""}`}
                          onClick={() => updateTableSm(true)}
                        >
                          <Icon name="menu-right"></Icon>
                        </Button>
                        <div className={`toggle-content ${tablesm ? "content-active" : ""}`}>
                          <ul className="btn-toolbar gx-1">
                            <li className="toggle-close">
                              <Button className="btn-icon btn-trigger toggle">
                                <Icon name="arrow-left"></Icon>
                              </Button>
                            </li>
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                  <div className="dot dot-primary"></div>
                                  <Icon name="filter-alt"></Icon>
                                </DropdownToggle>
                                <DropdownMenu
                                  end
                                  className="filter-wg dropdown-menu-xl"
                                  style={{ overflow: "visible" }}
                                >
                                  <div className="dropdown-head">
                                    <span className="sub-title dropdown-title">Bộ lọc nâng cao</span>
                                  </div>
                                  <div className="dropdown-body dropdown-body-rg">
                                    <Row className="gx-6 gy-3">
                                      <Col size="6">
                                        <div className="form-group">
                                          <label className="overline-title overline-title-alt">Loại giấy tờ</label>
                                          <RSelect options={translatedFilterDoc} placeholder="Tất cả loại" />
                                        </div>
                                      </Col>
                                      <Col size="6">
                                        <div className="form-group">
                                          <label className="overline-title overline-title-alt">Trạng thái</label>
                                          <RSelect options={translatedFilterStatus} placeholder="Tất cả trạng thái" />
                                        </div>
                                      </Col>
                                      <Col size="12">
                                        <div className="form-group">
                                          <Button type="button" color="secondary">
                                            Lọc
                                          </Button>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                  <div className="dropdown-foot between">
                                    <a
                                      className="clickable"
                                      href="#reset"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      Đặt lại bộ lọc
                                    </a>
                                    <a
                                      href="#save"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      Lưu bộ lọc
                                    </a>
                                  </div>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                  <Icon name="setting"></Icon>
                                </DropdownToggle>
                                <DropdownMenu end className="dropdown-menu-xs">
                                  <ul className="link-check">
                                    <li>
                                      <span>Hiển thị</span>
                                    </li>
                                    <li className={itemPerPage === 10 ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setItemPerPage(10);
                                        }}
                                      >
                                        10
                                      </DropdownItem>
                                    </li>
                                    <li className={itemPerPage === 15 ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setItemPerPage(15);
                                        }}
                                      >
                                        15
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                  <ul className="link-check">
                                    <li>
                                      <span>Sắp xếp</span>
                                    </li>
                                    <li className={sort === "dsc" ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setSortState("dsc");
                                          sortFunc("dsc");
                                        }}
                                      >
                                        Giảm dần
                                      </DropdownItem>
                                    </li>
                                    <li className={sort === "asc" ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setSortState("asc");
                                          sortFunc("asc");
                                        }}
                                      >
                                        Tăng dần
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`card-search search-wrap ${!onSearch && "active"}`}>
                <div className="card-body">
                  <div className="search-content">
                    <Button
                      onClick={() => {
                        setSearchText("");
                        toggle();
                      }}
                      className="search-back btn-icon toggle-search"
                    >
                      <Icon name="arrow-left"></Icon>
                    </Button>
                    <input
                      type="text"
                      className="border-transparent form-focus-none form-control"
                      placeholder="Tìm kiếm theo tên hoặc mã hồ sơ"
                      value={onSearchText}
                      onChange={(e) => onFilterChange(e)}
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DataTableBody>
              <DataTableHead>
                <DataTableRow className="nk-tb-col-check">
                  <div className="custom-control custom-control-sm custom-checkbox notext">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="uid_1"
                      onChange={(e) => selectorCheck(e)}
                    />
                    <label className="custom-control-label" htmlFor="uid_1"></label>
                  </div>
                </DataTableRow>                <DataTableRow>
                  <span>Người dùng</span>
                </DataTableRow>
                <DataTableRow size="mb">
                  <span>Loại giấy tờ</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span>Giấy tờ</span>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span>Ngày nộp</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span>Trạng thái</span>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span>Người duyệt</span>
                </DataTableRow>
                <DataTableRow className="nk-tb-col-tools">&nbsp;</DataTableRow>
              </DataTableHead>

              {currentItems.length > 0
                ? currentItems.map((item) => {
                  return (
                    <DataTableItem key={item.id}>
                      <DataTableRow className="nk-tb-col-check">
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            defaultChecked={item.check}
                            id={`uid1_${item.safeId}`}
                            key={Math.random()}
                            onChange={(e) => onSelectChange(e, item.id)}
                          />
                          <label className="custom-control-label" htmlFor={`uid1_${item.safeId}`}></label>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        <Link to={`/kyc-details-regular/${item.id}`}>
                          <div className="user-card">
                            {/* <UserAvatar
                                  theme={item.avatarBg}
                                  text={findUpper(item.name)}
                                  image={item.image}
                                ></UserAvatar> */}
                            <div className="user-info">
                              <span className="tb-lead">
                                {item?.personalInfo?.name}
                                <span
                                  className={`dot dot-${item.status === KYC_STATUS.APPROVED
                                      ? "success"
                                      : item.status === KYC_STATUS.PENDING
                                        ? "info"
                                        : "danger"
                                    } d-md-none ms-1`}
                                ></span>
                              </span>
                              <span>{item?.id}</span>
                            </div>
                          </div>
                        </Link>
                      </DataTableRow>
                      <DataTableRow size="mb">
                        <span className="tb-lead-sub">{item.doc}</span>
                      </DataTableRow>
                      <DataTableRow size="md">
                        <DownloadDropdown item={item} downloadDocumentImage={downloadDocumentImage} />
                      </DataTableRow>
                      <DataTableRow size="lg">
                        <span className="tb-date">{item.date}</span>
                      </DataTableRow>
                      <DataTableRow size="md">
                        <span
                          className={`tb-status text-${
                            item.status === KYC_STATUS.APPROVED 
                              ? "success" 
                              : item.status === KYC_STATUS.PENDING 
                                ? "info" 
                                : "danger"
                          }`}
                        >
                          {item.status === KYC_STATUS.PENDING ? "Đang chờ xử lý" : item.status === KYC_STATUS.APPROVED ? "Đã phê duyệt" : "Đã từ chối"}
                        </span>                        {item.status !== KYC_STATUS.PENDING && (
                          <TooltipComponent
                            icon="info"
                            direction="top"
                            id={`tooltip_status_${item.safeId}`}
                            text={`$${item.status === KYC_STATUS.APPROVED ? "Đã phê duyệt" : "Đã từ chối"} lúc ${item.adminVerifiedAt}`}
                          ></TooltipComponent>
                        )}
                        {!item.status === KYC_STATUS.PENDING && (
                          <span>
                            <TooltipComponent
                              icon="info"
                              direction="top"
                              text={`Đã nộp lúc ${item.date}`}
                              id={`tooltip_date_${item.safeId}`}
                            />
                          </span>
                        )}
                      </DataTableRow>
                      <DataTableRow size="lg">
                        <div className="user-card">
                          <UserAvatar theme="orange-dim" size="xs" text={findUpper(item.checked)}></UserAvatar>
                          <div className="user-name">
                            <span className="tb-lead">{item.checked} </span>
                          </div>
                        </div>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1">
                          <li
                            className="nk-tb-action-hidden"
                            onClick={() => {
                              loadDetail(item.id);
                              setViewModal(true);
                            }}
                          >                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={`view_${item.safeId}`}
                              icon="eye-fill"
                              direction="top"
                              text="Xem nhanh"
                            />
                          </li>
                          {item.status === KYC_STATUS.REJECTED ? null : item.status === KYC_STATUS.APPROVED ? (
                            <li className="nk-tb-action-hidden" onClick={() => onRejectClick(item.id)}>                              <TooltipComponent
                                tag="a"
                                containerClassName="btn btn-trigger btn-icon"
                                id={`reject_${item.safeId}`}
                                icon="cross-fill-c"
                                direction="top"
                                text="Từ chối"
                              />
                            </li>
                          ) : (
                            <React.Fragment>
                              <li className="nk-tb-action-hidden">
                                <Button
                                  disabled={isProcessing}
                                  className="btn-trigger btn-icon"
                                  onClick={() => onApproveClick(item.id)}
                                >                                <TooltipComponent
                                    tag="a"
                                    containerClassName="btn-trigger btn-icon"
                                    id={`approve_${item.safeId}`}
                                    icon={isProcessing ? "loader" : "check-fill-c"}
                                    direction="top"
                                    text="Phê duyệt"
                                  />
                                </Button>
                              </li>
                              <li className="nk-tb-action-hidden">
                                <Button
                                  disabled={isProcessing}
                                  className="btn-trigger btn-icon"
                                  onClick={() => onRejectClick(item.id)}
                                >                                  <TooltipComponent
                                    tag="a"
                                    containerClassName="btn-trigger btn-icon"
                                    id={`reject_${item.safeId}`}
                                    icon={isProcessing ? "loader" : "cross-fill-c"}
                                    direction="top"
                                    text="Từ chối"
                                  />
                                </Button>
                              </li>
                            </React.Fragment>
                          )}
                          <li>
                            <UncontrolledDropdown>
                              <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                <Icon name="more-h"></Icon>
                              </DropdownToggle>
                              <DropdownMenu end>
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#view"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        loadDetail(item.id);
                                        setViewModal(true);
                                      }}
                                    >
                                      <Icon name="eye"></Icon>
                                      <span>Xem nhanh</span>
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <Link
                                      to={`/kyc-details-regular/${item.id}`}
                                    >
                                      <Icon name="focus"></Icon>
                                      <span>Xem chi tiết</span>
                                    </Link>
                                  </li>
                                  {item.status === KYC_STATUS.REJECTED ? null : item.status === KYC_STATUS.APPROVED ? (
                                    <li onClick={() => onRejectClick(item.id)}>
                                      <DropdownItem
                                        tag="a"
                                        href="#reject"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="na"></Icon>
                                        <span>Từ chối người dùng</span>
                                      </DropdownItem>
                                    </li>
                                  ) : (
                                    <React.Fragment>
                                      <li onClick={() => onApproveClick(item.id)}>
                                        <DropdownItem
                                          tag="a"
                                          href="#approve"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                          }}
                                        >
                                          <Icon name="check-thick"></Icon>
                                          <span>Phê duyệt</span>
                                        </DropdownItem>
                                      </li>
                                      <li onClick={() => onRejectClick(item.id)}>
                                        <DropdownItem
                                          tag="a"
                                          href="#suspend"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                          }}
                                        >
                                          <Icon name="na"></Icon>
                                          <span>Tạm khóa người dùng</span>
                                        </DropdownItem>
                                      </li>
                                    </React.Fragment>
                                  )}
                                </ul>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </li>
                        </ul>
                      </DataTableRow>
                    </DataTableItem>
                  );
                })
                : null}
            </DataTableBody>
            <div className="card-inner">
              {currentItems.length > 0 ? (
                <PaginationComponent
                  noDown
                  itemPerPage={itemPerPage}
                  totalItems={totalItems}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">Không tìm thấy dữ liệu</span>
                </div>
              )}
            </div>
          </DataTable>
        </Block>
      </Content>

      <Modal isOpen={viewModal} toggle={() => setViewModal(false)} className="modal-dialog-centered" size="lg">
        <ModalBody>
          <a
            href="#cancel"
            onClick={(ev) => {
              ev.preventDefault();
              setViewModal(false);
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="nk-modal-head">
            <h4 className="nk-modal-title title">
              Chi tiết hồ sơ KYC <small className="text-primary"> {detail.id}</small>
            </h4>
          </div>
          <div className="nk-tnx-details mt-sm-3">
            <Row className="gy-3">
              <Col lg={6}>
                <span className="sub-text"> Mã hồ sơ</span>
                <span className="caption-text">{detail.id}</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Tên người nộp </span>
                <span className="caption-text text-break">{detail?.personalInfo?.name || detail?.id}</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Loại giấy tờ </span>
                <span className="caption-text">{detail.doc}</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Trạng thái</span>
                <Badge
                  color={detail.status === KYC_STATUS.APPROVED ? "success" : detail.status === KYC_STATUS.PENDING ? "info" : "danger"}
                  size="md"
                >
                  {detail.status === KYC_STATUS.PENDING ? "Đang chờ xử lý" : detail.status === KYC_STATUS.APPROVED ? "Đã phê duyệt" : "Đã từ chối"}
                </Badge>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Ngày nộp</span>
                <span className="caption-text"> {detail.date}</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Người duyệt</span>
                <span className="caption-text"> {detail.checked}</span>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default KycListRegular;
