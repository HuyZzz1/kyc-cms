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
  TooltipComponent,
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
import { getListPackages } from "../../services/dashboard";
import dayjs from "dayjs";
import { formatToVND } from "../../utils/Utils";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const RequestPackage = () => {
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  const createRef = useRef();

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
    if (!onSearchText) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(onSearchText.toLowerCase())
    );
  }, [onSearchText, data]);

  console.log("data", data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <CreateModal ref={createRef} fetchData={fetchData} />
      <Head title="Danh sách gói"></Head>
      <Content>
        <BlockHead size="sm">
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
                              <Col size="6">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">
                                    Loại phổ biến
                                  </label>
                                </div>
                              </Col>

                              <Col size="12">
                                <div className="form-group">
                                  <Button
                                    type="button"
                                    className="btn btn-secondary"
                                  >
                                    Filter
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
                              }}
                              className="clickable"
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
            <DataTableBody>
              <DataTableHead>
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
                            {dayjs(item?.createdAt).format("HH:mm DD/MM/YYYY")}
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
                                        }}
                                      >
                                        <Icon name="eye"></Icon>
                                        <span>Bật tắt loại phổ biến</span>
                                      </DropdownItem>
                                    </li>
                                    <li>
                                      <DropdownItem
                                        tag="a"
                                        href="#approve"
                                        onClick={(ev) => {
                                          ev.preventDefault();
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
          </DataTable>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default RequestPackage;
