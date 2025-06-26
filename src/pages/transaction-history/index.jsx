/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useMemo } from "react";
import Content from "@/layout/content/Content";
import Head from "@/layout/head/Head";
import AdminBadge from "@/components/admin/AdminBadge";
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
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  RSelect,
  PaginationComponent,
} from "@/components/Component";
import {
  getListPackagePurchasesManagement,
  updateOrganization,
} from "../../services/dashboard";
import dayjs from "dayjs";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  UncontrolledDropdown,
} from "reactstrap";
import { toast } from "react-toastify";
import { formatToVND } from "../../utils/Utils";
import * as XLSX from "xlsx";

const TransactionHistory = () => {
  const [onSearch, setonSearch] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [data, setData] = useState({
    transaction: [],
    total: 0,
    page: 1,
    limit: 10,
  });

  const [filterParams, setFilterParams] = useState({
    page: 1,
    limit: 10,
    status: null,
    search: "",
    from: null,
    to: null,
  });

  const [tempFilter, setTempFilter] = useState({
    from: null,
    to: null,
    status: null,
  });

  const handleFilterChange = (key, value) => {
    setFilterParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggle = () => setonSearch(!onSearch);
  const fetchData = async () => {
    try {
      const result = await getListPackagePurchasesManagement(filterParams);
      setData({
        transaction: result.data,
        total: result.total,
        page: result.page,
        limit: result.limit,
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách:", error);
    }
  };

  const handleExportExcel = () => {
    const exportData = data.transaction.map((item) => ({
      "Ngày mua": dayjs(item.purchaseDate).format("HH:mm DD/MM/YYYY"),
      "Tổ chức": item.organization?.name,
      Email: item.organization?.email,
      Gói: item.packageName,
      "Số lượt KYC": item.requestCount,
      "Thời hạn (tháng)": item.durationInMonths,
      Giá: formatToVND(item.price),
      "Trạng thái": item.status === "active" ? "Kích hoạt" : "Ngừng hoạt động",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách");

    XLSX.writeFile(workbook, "Danh sách thanh toán KYC.xlsx");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleFilterChange("search", searchText);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchText]);

  useEffect(() => {
    fetchData();
  }, [filterParams]);

  return (
    <React.Fragment>
      <Head title="Quản lý thanh toán dịch vụ KYC"></Head>
      <Content>
        <BlockHead>
          <BlockBetween>
            <BlockHeadContent>
              <div className="d-flex align-items-center">
                <BlockTitle page>Quản lý thanh toán dịch vụ KYC</BlockTitle>
                <AdminBadge />
              </div>
              <BlockDes className="text-soft">
                <p>Tổng số giao dịch đã ghi nhận: {data?.total}</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <Button
                color="light"
                outline
                className="btn-white"
                onClick={handleExportExcel}
              >
                <Icon name="download-cloud"></Icon>
                <span>Xuất dữ liệu</span>
              </Button>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner">
              <div className="card-title-group">
                <div className="card-title">
                  <h5 className="title">Tất cả giao dịch</h5>
                </div>
                <div className="card-tools me-n1">
                  <ul className="btn-toolbar gx-1">
                    <li>
                      <Button
                        href="#search"
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
                      <UncontrolledDropdown>
                        <DropdownToggle
                          tag="a"
                          className="btn btn-trigger btn-icon dropdown-toggle"
                        >
                          <div className="dot dot-primary"></div>
                          <Icon name="filter-alt"></Icon>
                        </DropdownToggle>
                        <DropdownMenu
                          end
                          className="filter-wg dropdown-menu-xl"
                        >
                          <div className="dropdown-head">
                            <span className="sub-title dropdown-title">
                              Bộ lọc nâng cao
                            </span>
                            <div className="dropdown">
                              <Button size="sm" className="btn-icon">
                                <Icon name="more-h"></Icon>
                              </Button>
                            </div>
                          </div>
                          <div className="dropdown-body dropdown-body-rg">
                            <Row className="gx-6 gy-4">
                              <Col size="12">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">
                                    Từ ngày
                                  </label>
                                  <input
                                    type="date"
                                    ref={(ref) => {
                                      if (ref) {
                                        ref.addEventListener("focus", () =>
                                          ref.showPicker?.()
                                        );
                                      }
                                    }}
                                    className="form-control"
                                    value={tempFilter.from || ""}
                                    onChange={(e) =>
                                      setTempFilter((prev) => ({
                                        ...prev,
                                        from: e.target.value || null,
                                      }))
                                    }
                                  />
                                </div>
                              </Col>
                              <Col size="12">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">
                                    Đến ngày
                                  </label>
                                  <input
                                    type="date"
                                    ref={(ref) => {
                                      if (ref) {
                                        ref.addEventListener("focus", () =>
                                          ref.showPicker?.()
                                        );
                                      }
                                    }}
                                    className="form-control"
                                    value={tempFilter.to || ""}
                                    onChange={(e) =>
                                      setTempFilter((prev) => ({
                                        ...prev,
                                        to: e.target.value || null,
                                      }))
                                    }
                                  />
                                </div>
                              </Col>

                              <Col size="12">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">
                                    Trạng thái
                                  </label>
                                  <RSelect
                                    placeholder="Chọn trạng thái"
                                    value={
                                      tempFilter.status
                                        ? {
                                            label:
                                              tempFilter.status === "active"
                                                ? "Kích hoạt"
                                                : "Ngừng hoạt động",
                                            value: tempFilter.status,
                                          }
                                        : null
                                    }
                                    options={[
                                      {
                                        label: "Kích hoạt",
                                        value: "active",
                                      },
                                      {
                                        label: "Ngừng hoạt động",
                                        value: "cancelled",
                                      },
                                    ]}
                                    onChange={(selected) =>
                                      setTempFilter((prev) => ({
                                        ...prev,
                                        status: selected?.value || null,
                                      }))
                                    }
                                    isClearable
                                  />
                                </div>
                              </Col>

                              <Col size="12">
                                <div className="form-group">
                                  <Button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                      setFilterParams((prev) => ({
                                        ...prev,
                                        page: 1,
                                        ...tempFilter,
                                      }));
                                    }}
                                  >
                                    Lọc
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <div className="dropdown-foot between">
                            <a
                              href="#reset"
                              onClick={(ev) => {
                                ev.preventDefault();
                                const reset = {
                                  status: null,
                                  from: null,
                                  to: null,
                                };
                                setTempFilter(reset);
                                setFilterParams((prev) => ({
                                  ...prev,
                                  page: 1,
                                  ...reset,
                                }));
                              }}
                              className="clickable"
                            >
                              Đặt lại bộ lọc
                            </a>
                          </div>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </div>
                <div
                  className={`card-search search-wrap ${!onSearch && "active"}`}
                >
                  <div className="search-content">
                    <Button
                      onClick={() => {
                        setSearchText("");
                        handleFilterChange("search", "");
                        toggle();
                      }}
                      className="search-back btn-icon toggle-search"
                    >
                      <Icon name="arrow-left" />
                    </Button>
                    <input
                      type="text"
                      className="border-transparent form-focus-none form-control"
                      placeholder="Nhập tên tổ chức hoặc email..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "100%" }} className="relative overflow-x-auto">
              <div className="min-w-[900px] overflow-auto">
                <DataTableBody>
                  <DataTableHead>
                    <DataTableRow
                      style={{
                        width: 150,
                      }}
                    >
                      <span className="text-nowrap">Ngày mua</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="text-nowrap">Tổ chức</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="text-nowrap">Gói</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="text-nowrap">Số lượt KYC</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="text-nowrap">Số tháng</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="text-nowrap">Giá</span>
                    </DataTableRow>
                    <DataTableRow
                      style={{
                        width: 200,
                      }}
                    >
                      <span className="text-nowrap">Trạng thái</span>
                    </DataTableRow>

                    <DataTableRow
                      style={{
                        width: 200,
                      }}
                      className="nk-tb-col-tools"
                    ></DataTableRow>
                  </DataTableHead>
                  {data.transaction.length > 0
                    ? data.transaction.map((item) => {
                        return (
                          <DataTableItem key={item._id}>
                            <DataTableRow>
                              <span>
                                {dayjs(item.purchaseDate).format(
                                  "HH:mm DD/MM/YYYY"
                                )}
                              </span>
                            </DataTableRow>
                            <DataTableRow>
                              <div className=" tb-lead-sub fw-semibold">
                                {item?.organization?.name}
                              </div>
                              <div className="tb-lead-sub">
                                {item.organization?.email}
                              </div>
                            </DataTableRow>
                            <DataTableRow>
                              <div className="tb-lead-sub">
                                {item.packageName}
                              </div>
                            </DataTableRow>
                            <DataTableRow>
                              <div className="tb-lead-sub">
                                {item.requestCount} lượt
                              </div>
                            </DataTableRow>
                            <DataTableRow>
                              <div className="tb-lead-sub">
                                {item.durationInMonths} tháng
                              </div>
                            </DataTableRow>
                            <DataTableRow>
                              <div className="tb-lead-sub">
                                {formatToVND(item.price)}
                              </div>
                            </DataTableRow>

                            <DataTableRow>
                              <Badge
                                color={
                                  item.status === "active"
                                    ? "success"
                                    : "danger"
                                }
                              >
                                {item.status === "active"
                                  ? "Kích hoạt"
                                  : "Ngừng hoạt động"}
                              </Badge>
                            </DataTableRow>

                            <DataTableRow className="nk-tb-col-tools">
                              <ul className="nk-tb-actions gx-1">
                                <li>
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      tag="a"
                                      className="dropdown-toggle bg-white btn btn-sm btn-outline-light btn-icon"
                                    >
                                      <Icon name="more-h" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      end
                                      container="body"
                                      style={{ zIndex: 1050 }}
                                    >
                                      <ul className="link-list-opt no-bdr">
                                        <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#approve"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              setSelectedPackage(item);
                                              setShowDetailModal(true);
                                            }}
                                          >
                                            <Icon name="eye"></Icon>
                                            <span>Chi tiết</span>
                                          </DropdownItem>
                                        </li>
                                        {/* <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#change-status"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              setSelectedPackage(item);
                                              setShowConfirmModal(true);
                                            }}
                                          >
                                            <Icon
                                              name={
                                                item.status === "active"
                                                  ? "cross-round"
                                                  : "check"
                                              }
                                            />
                                            <span>
                                              {item.status === "active"
                                                ? "Ngừng hoạt động"
                                                : "Kích hoạt"}
                                            </span>
                                          </DropdownItem>
                                        </li> */}
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
                {data.transaction.length === 0 && (
                  <div className="card-inner">
                    <div className="text-center">
                      <span className="text-silent">Không có dữ liệu</span>
                    </div>
                  </div>
                )}

                {data.transaction.length !== 0 && (
                  <div className="card-inner">
                    <PaginationComponent
                      currentPage={filterParams.page}
                      itemPerPage={filterParams.limit}
                      totalItems={data.total}
                      paginate={(page) => handleFilterChange("page", page)}
                    />
                  </div>
                )}
              </div>
            </div>
          </DataTable>
        </Block>
      </Content>
      <Modal
        isOpen={showConfirmModal}
        toggle={() => setShowConfirmModal(false)}
        centered
      >
        <ModalBody className="text-center">
          <Icon
            name="alert-circle"
            className="text-warning"
            style={{ fontSize: 48 }}
          />
          <h5 className="mt-3">Xác nhận thay đổi</h5>
          <p>
            Bạn có chắc muốn{" "}
            {selectedPackage?.status === "active"
              ? "ngừng hoạt động"
              : "kích hoạt"}{" "}
            tổ chức <strong>{selectedPackage?.name}</strong>?
          </p>
          <div className="d-flex align-items-center justify-content-center pt-4 pb-2 gap-2">
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowConfirmModal(false)}
            >
              Hủy
            </Button>
            <Button
              type="button"
              className="btn btn-primary"
              onClick={async () => {
                try {
                  await updateOrganization({
                    id: selectedPackage?._id,
                    status:
                      selectedPackage?.status === "active"
                        ? "inactive"
                        : "active",
                  });
                  toast.success("Cập nhật trạng thái thành công");
                  setShowConfirmModal(false);
                  fetchData();
                } catch (error) {
                  toast.error("Cập nhật thất bại");
                }
              }}
            >
              Xác nhận
            </Button>
          </div>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={showDetailModal}
        toggle={() => setShowDetailModal(false)}
        centered
        size="lg"
      >
        <ModalBody>
          <h5 className="mb-3">Chi tiết giao dịch</h5>
          {selectedPackage && (
            <div className="gy-2">
              <p>
                <strong>Tổ chức:</strong> {selectedPackage.organization?.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedPackage.organization?.email}
              </p>
              <p>
                <strong>Gói dịch vụ:</strong> {selectedPackage.packageName}
              </p>
              <p>
                <strong>Số lượt KYC:</strong> {selectedPackage.requestCount}{" "}
                lượt
              </p>
              <p>
                <strong>Thời hạn:</strong> {selectedPackage.durationInMonths}{" "}
                tháng
              </p>
              <p>
                <strong>Giá:</strong> {formatToVND(selectedPackage.price)}
              </p>
              <p>
                <strong>Ngày mua:</strong>{" "}
                {dayjs(selectedPackage.purchaseDate).format("HH:mm DD/MM/YYYY")}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                {selectedPackage.status === "active"
                  ? "Kích hoạt"
                  : "Ngừng hoạt động"}
              </p>
            </div>
          )}

          <div className="text-end mt-3">
            <Button color="secondary" onClick={() => setShowDetailModal(false)}>
              Đóng
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default TransactionHistory;
