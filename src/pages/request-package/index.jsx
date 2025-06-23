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
} from "@/components/Component";
import CreateModal from "./modal/create";
import {
  deletePackage,
  getListPackages,
  updatePackagePopular,
} from "../../services/dashboard";
import dayjs from "dayjs";
import { formatToVND } from "../../utils/Utils";
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

const RequestPackage = () => {
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [tempFilterPopular, setTempFilterPopular] = useState(null); // lưu giá trị tạm
  const [filterPopular, setFilterPopular] = useState(null); // dùng để lọc thật
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const createRef = useRef();
  const editRef = useRef();

  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  const toggle = () => setonSearch(!onSearch);

  const fetchData = async () => {
    try {
      const result = await getListPackages({});
      setData(result || []);
    } catch (error) {
      console.error("Không thể lấy dữ liệu gói:", error);
    }
  };

  const filteredData = useMemo(() => {
    let result = data;

    if (onSearchText) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(onSearchText.toLowerCase())
      );
    }

    if (filterPopular !== null) {
      result = result.filter((item) => item.isPopular === filterPopular);
    }

    return result;
  }, [data, onSearchText, filterPopular]);

  console.log("data", data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <CreateModal ref={createRef} fetchData={fetchData} />
      <EditModal ref={editRef} fetchData={fetchData} />

      <Head title="Danh sách gói"></Head>
      <Content>
        <BlockHead>
          <BlockBetween>
            <BlockHeadContent>
              <div className="d-flex align-items-center">
                <BlockTitle page>Danh sách gói</BlockTitle>
                <AdminBadge />
              </div>
              <BlockDes className="text-soft">
                <p>Danh sách các gói cho KYC</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <Button
                color="primary"
                className="btn-icon px-2 ps-0"
                onClick={() => createRef?.current?.open()}
              >
                <Icon name="plus"></Icon>
                Tạo mới
              </Button>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner">
              <div className="card-title-group">
                <div className="card-title">
                  <h5 className="title">Tất cả gói</h5>
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
                                    Loại phổ biến
                                  </label>
                                  <RSelect
                                    value={
                                      tempFilterPopular === null
                                        ? null
                                        : {
                                            label: tempFilterPopular
                                              ? "Có"
                                              : "Không",
                                            value: tempFilterPopular,
                                          }
                                    }
                                    options={[
                                      { label: "Có", value: true },
                                      { label: "Không", value: false },
                                    ]}
                                    placeholder="Chọn loại phổ biến"
                                    onChange={(selected) => {
                                      setTempFilterPopular(
                                        selected?.value ?? null
                                      );
                                    }}
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
                                      setFilterPopular(tempFilterPopular);
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
                                setFilterPopular(null);
                                setTempFilterPopular(null);
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
                        toggle();
                      }}
                      className="search-back btn-icon toggle-search"
                    >
                      <Icon name="arrow-left"></Icon>
                    </Button>
                    <input
                      type="text"
                      className="border-transparent form-focus-none form-control"
                      placeholder="Nhập tên gói để tìm kiếm..."
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
            <div style={{ overflowX: "auto", width: "100%" }}>
              <div className="min-w-[900px]">
                <DataTableBody>
                  <DataTableHead>
                    <DataTableRow
                      style={{
                        width: 150,
                      }}
                    >
                      <span>Loại phổ biến</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Gói</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Số lượt</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Giá</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Số tháng</span>
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
                  {filteredData.length > 0
                    ? filteredData.map((item) => {
                        return (
                          <DataTableItem key={item._id}>
                            <DataTableRow>
                              <Badge
                                color={item.isPopular ? "success" : "info"}
                                size="sm"
                              >
                                {item.isPopular ? "Có" : "Không"}
                              </Badge>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-lead-sub">{item.name}</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-lead-sub">
                                {item.requestCount}
                              </span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-lead-sub">
                                {formatToVND(item.price)}
                              </span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-lead-sub">
                                {item.durationInMonths}
                              </span>
                            </DataTableRow>

                            <DataTableRow>
                              <span className="tb-lead-sub">
                                {dayjs(item?.createdAt).format(
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
                                      <Icon name="more-h"></Icon>
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                      <ul className="link-list-opt no-bdr">
                                        <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#details"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              setSelectedPackage(item);
                                              setShowConfirmModal(true);
                                            }}
                                          >
                                            <Icon name="eye"></Icon>
                                            <span>
                                              {item.isPopular
                                                ? "Tắt loại phổ biến"
                                                : " Bật loại phổ biến"}
                                            </span>
                                          </DropdownItem>
                                        </li>
                                        <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#approve"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              editRef?.current?.open(item);
                                            }}
                                          >
                                            <Icon name="done"></Icon>
                                            <span>Chỉnh sửa</span>
                                          </DropdownItem>
                                        </li>

                                        <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#reject"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              setSelectedPackage(item);
                                              setShowDeleteModal(true);
                                            }}
                                          >
                                            <Icon name="cross-round"></Icon>
                                            <span>Xóa</span>
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
                {filteredData.length === 0 && (
                  <div className="card-inner">
                    <div className="text-center">
                      <span className="text-silent">Không có dữ liệu</span>
                    </div>
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
            Bạn có chắc muốn {selectedPackage?.isPopular ? "tắt" : "bật"} loại
            phổ biến cho gói <strong>{selectedPackage?.name}</strong>?
          </p>
          <div className="d-flex align-items-center justify-content-center pt-4 pb-2  gap-2">
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
                  await updatePackagePopular({
                    id: selectedPackage?._id,
                  });
                  toast.success("Cập nhật thành công");
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
        isOpen={showDeleteModal}
        toggle={() => setShowDeleteModal(false)}
        centered
      >
        <ModalBody className="text-center">
          <Icon
            name="alert-circle"
            className="text-danger"
            style={{ fontSize: 48 }}
          />
          <h5 className="mt-3">Xác nhận xóa</h5>
          <p>
            Bạn có chắc muốn <strong>xóa</strong> gói{" "}
            <strong>{selectedPackage?.name}</strong> không? Hành động này không
            thể hoàn tác.
          </p>
          <div className="d-flex align-items-center justify-content-center pt-4 pb-2 gap-2">
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Hủy
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={async () => {
                try {
                  await deletePackage({
                    id: selectedPackage?._id,
                  });
                  toast.success("Xóa gói thành công");
                  setShowDeleteModal(false);
                  fetchData();
                } catch (err) {
                  toast.error("Xóa gói thất bại");
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
export default RequestPackage;
