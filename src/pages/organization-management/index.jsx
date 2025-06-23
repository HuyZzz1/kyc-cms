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
import CreateModal from "./modal/create";
import {
  getListCountries,
  getListIndustries,
  getListOrganizationManagement,
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
import EditModal from "./modal/edit";

const OrganizationManagement = () => {
  const [onSearch, setonSearch] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [listCountries, setListCountries] = useState();
  const [listIndustries, setListIndustries] = useState();

  const [data, setData] = useState({
    organizations: [],
    total: 0,
    page: 1,
    limit: 10,
  });

  const [filterParams, setFilterParams] = useState({
    page: 1,
    limit: 10,
    country: null,
    industry: null,
    status: null,
    search: "",
  });

  const [tempFilter, setTempFilter] = useState({
    country: null,
    industry: null,
    status: null,
  });

  const createRef = useRef();
  const editRef = useRef();

  const handleFilterChange = (key, value) => {
    setFilterParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggle = () => setonSearch(!onSearch);

  const fetchData = async () => {
    try {
      const result = await getListOrganizationManagement(filterParams);
      setData(result);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách:", error);
    }
  };

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleFilterChange("search", searchText);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchText]);

  useEffect(() => {
    fetchListCountries();
    fetchListIndustries();
  }, []);

  useEffect(() => {
    fetchData();
  }, [filterParams]);

  return (
    <React.Fragment>
      <CreateModal ref={createRef} fetchData={fetchData} />
      <EditModal ref={editRef} fetchData={fetchData} />

      <Head title="Danh sách Tổ Chức"></Head>
      <Content>
        <BlockHead>
          <BlockBetween>
            <BlockHeadContent>
              <div className="d-flex align-items-center">
                <BlockTitle page>Quản lí Tổ Chức</BlockTitle>
                <AdminBadge />
              </div>
              <BlockDes className="text-soft">
                <p>Danh sách các Tổ Chức</p>
              </BlockDes>
            </BlockHeadContent>
            {/* <BlockHeadContent>
              <Button
                color="primary"
                className="btn-icon px-2 ps-0"
                onClick={() => createRef?.current?.open()}
              >
                <Icon name="plus"></Icon>
                Tạo mới
              </Button>
            </BlockHeadContent> */}
          </BlockBetween>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner">
              <div className="card-title-group">
                <div className="card-title">
                  <h5 className="title">Tất cả Tổ Chức</h5>
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
                                    Quốc gia
                                  </label>
                                  <RSelect
                                    placeholder="Chọn quốc gia"
                                    value={
                                      tempFilter.country
                                        ? {
                                            label:
                                              listCountries?.find(
                                                (c) =>
                                                  c.value === tempFilter.country
                                              )?.label || tempFilter.country,
                                            value: tempFilter.country,
                                          }
                                        : null
                                    }
                                    options={listCountries}
                                    onChange={(selected) =>
                                      setTempFilter((prev) => ({
                                        ...prev,
                                        country: selected?.value || null,
                                      }))
                                    }
                                    isClearable
                                  />
                                </div>
                              </Col>
                              <Col size="12">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">
                                    Ngành nghề
                                  </label>
                                  <RSelect
                                    placeholder="Chọn ngành nghề"
                                    value={
                                      tempFilter.industry
                                        ? {
                                            label:
                                              listIndustries?.find(
                                                (c) =>
                                                  c.value ===
                                                  tempFilter.industry
                                              )?.label || tempFilter.industry,
                                            value: tempFilter.industry,
                                          }
                                        : null
                                    }
                                    options={listIndustries}
                                    onChange={(selected) =>
                                      setTempFilter((prev) => ({
                                        ...prev,
                                        industry: selected?.value || null,
                                      }))
                                    }
                                    isClearable
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
                                        value: "inactive",
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
                                  country: null,
                                  industry: null,
                                  status: null,
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
            <div style={{ overflowX: "auto", width: "100%" }}>
              <div className="min-w-[900px]">
                <DataTableBody>
                  <DataTableHead>
                    <DataTableRow>
                      <span>Tổ chức</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Quốc gia</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Ngành nghề</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Thông tin gói</span>
                    </DataTableRow>
                    <DataTableRow
                      style={{
                        width: 200,
                      }}
                    >
                      <span>Trạng thái</span>
                    </DataTableRow>
                    <DataTableRow
                      style={{
                        width: 200,
                      }}
                    >
                      <span>Ngày tạo</span>
                    </DataTableRow>
                    <DataTableRow
                      style={{
                        width: 200,
                      }}
                      className="nk-tb-col-tools"
                    ></DataTableRow>
                  </DataTableHead>
                  {data.organizations.length > 0
                    ? data.organizations.map((item) => {
                        return (
                          <DataTableItem key={item._id}>
                            <DataTableRow>
                              <div className=" tb-lead-sub fw-semibold">
                                {item.name}
                              </div>
                              <div className="tb-lead-sub">{item.email}</div>
                            </DataTableRow>

                            <DataTableRow>
                              <span className="tb-lead-sub">
                                {item.country?.name || "--"}
                              </span>
                            </DataTableRow>

                            <DataTableRow>
                              <span className="tb-lead-sub">
                                {item.industry?.name || "--"}
                              </span>
                            </DataTableRow>

                            <DataTableRow>
                              {item.currentPackage ? (
                                <div className="tb-lead-sub">
                                  <div className="fw-semibold">
                                    {item.currentPackage.name}
                                  </div>
                                  <div className="tb-lead-sub">
                                    {item.currentPackage.requestUsed}/
                                    {item.currentPackage.requestLimit} lượt
                                  </div>
                                </div>
                              ) : (
                                <span className="text-muted">Chưa có gói</span>
                              )}
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

                            <DataTableRow>
                              <span>
                                {dayjs(item.createdAt).format(
                                  "HH:mm DD/MM/YYYY"
                                )}
                              </span>
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
                                    <DropdownMenu end>
                                      <ul className="link-list-opt no-bdr">
                                        <li>
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
                                        </li>
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
                {data.organizations.length === 0 && (
                  <div className="card-inner">
                    <div className="text-center">
                      <span className="text-silent">Không có dữ liệu</span>
                    </div>
                  </div>
                )}

                {data.organizations.length !== 0 && (
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
    </React.Fragment>
  );
};
export default OrganizationManagement;
