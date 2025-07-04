import React, { useState, useEffect } from "react";
import Content from "@/layout/content/Content";
import Head from "@/layout/head/Head";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  ModalBody,
  Modal,
  DropdownItem,
  Form,
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
  TooltipComponent,
  Row,
  Col,
  OverlineTitle,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  PaginationComponent,
  RSelect,
} from "@/components/Component";
import {
  cryptoActivityOptions,
  filterCoin,
  filterPaymentmethod,
  filterStatusOptions,
  orderData,
} from "./TransData";
import { useForm } from "react-hook-form";

const TransListCrypto = () => {
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [modal, setModal] = useState({
    add: false,
  });
  const [modalDetail, setModalDetail] = useState(false);
  const [data, setData] = useState(orderData);
  const [detail, setDetail] = useState({});
  const [formData, setFormData] = useState({
    orderType: "Deposit",
    amountBTC: "",
    amountUSD: "",
    balanceBTC: "",
    balanceUSD: "",
    status: "Pending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");

  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.ref.localeCompare(b.ref));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.ref.localeCompare(a.ref));
      setData([...sortedData]);
    }
  };

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = orderData.filter((item) => {
        return item.ref.toLowerCase().includes(onSearchText.toLowerCase());
      });
      setData([...filteredObject]);
    } else {
      setData([...orderData]);
    }
  }, [onSearchText]);

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      orderType: "Buy",
      amountBTC: "",
      amountUSD: "",
      balanceBTC: "",
      balanceUSD: "",
      status: "Pending",
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ add: false });
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (submitData) => {
    const { amountBTC, amountUSD, balanceUSD, balanceBTC } = submitData;
    let submittedData = {
      id: data.length + 1,
      ref: "YWLX52JG73",
      date: "18/10/2019 12:04 PM",
      desc:
        formData.orderType === "Profit"
          ? "Credited " + formData.orderType
          : formData.orderType + " Funds",
      orderType: formData.orderType,
      amountBTC: amountBTC,
      amountUSD: amountUSD,
      balanceBTC: balanceBTC,
      balanceUSD: balanceUSD,
      status: formData.status,
    };
    setData([submittedData, ...data]);
    resetForm();
    setModal({ add: false });
  };

  useEffect(() => {
    reset(formData);
  }, [formData]);

  // function to change to approve property for an item
  const onApproveClick = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Completed";
    setData([...newData]);
  };

  // function to change to reject property for an item
  const onRejectClick = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Rejected";
    setData([...newData]);
  };

  // function to load detail data
  const loadDetail = (id) => {
    let index = data.findIndex((item) => item.id === id);
    setDetail(data[index]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // function to toggle details modal
  const toggleModalDetail = () => setModalDetail(!modalDetail);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <React.Fragment>
      <Head title="Quản lý thanh toán dịch vụ KYC"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Quản lý thanh toán dịch vụ KYC</BlockTitle>
              <BlockDes className="text-soft">
                <p>Tổng số giao dịch đã ghi nhận: 12,835.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <Button color="light" outline className="btn-white">
                    <Icon name="download-cloud"></Icon>
                    <span>Xuất dữ liệu</span>
                  </Button>
                </li>
                <li>
                  <Button
                    color="primary"
                    className="btn-icon"
                    onClick={() => setModal({ add: true })}
                  >
                    <Icon name="plus"></Icon>
                  </Button>
                </li>
              </ul>
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
                              Advanced Filter
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
                                    Type
                                  </label>
                                  <RSelect
                                    options={cryptoActivityOptions}
                                    placeholder="Any Activity"
                                  />
                                </div>
                              </Col>
                              <Col size="6">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">
                                    Status
                                  </label>
                                  <RSelect
                                    options={filterStatusOptions}
                                    placeholder="Any Status"
                                  />
                                </div>
                              </Col>
                              <Col size="6">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">
                                    Pay Currency
                                  </label>
                                  <RSelect
                                    options={filterCoin}
                                    placeholder="Any coin"
                                  />
                                </div>
                              </Col>
                              <Col size="6">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">
                                    Method
                                  </label>
                                  <RSelect
                                    options={filterPaymentmethod}
                                    placeholder="Any Method"
                                  />
                                </div>
                              </Col>

                              <Col size="6">
                                <div className="form-group">
                                  <div className="custom-control custom-control-sm custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="includeDel"
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="includeDel"
                                    >
                                      {" "}
                                      Including Deleted
                                    </label>
                                  </div>
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
                              Reset Filter
                            </a>
                            <a
                              href="#save"
                              onClick={(ev) => {
                                ev.preventDefault();
                              }}
                            >
                              Save Filter
                            </a>
                          </div>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          tag="a"
                          className="btn btn-trigger btn-icon dropdown-toggle"
                        >
                          <Icon name="setting"></Icon>
                        </DropdownToggle>
                        <DropdownMenu end className="dropdown-menu-xs">
                          <ul className="link-check">
                            <li>
                              <span>Show</span>
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
                              <span>Order</span>
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
                                DESC
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
                                ASC
                              </DropdownItem>
                            </li>
                          </ul>
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
                      placeholder="Tìm kiếm giao dịch..."
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
                <DataTableBody bodyclass="nk-tb-tnx">
                  <DataTableHead>
                    <DataTableRow>
                      <span className="text-nowrap">Loại giao dịch</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="text-nowrap">Tên doanh nghiệp</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="text-nowrap">Liên hệ</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="text-nowrap">
                        Phương thức thanh toán
                      </span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="text-nowrap">Mã giao dịch</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="text-nowrap">Số tiền</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span className="text-nowrap">Số lượt KYC</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="sub-text text-center ">Trạng thái</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-col-tools"></DataTableRow>
                  </DataTableHead>

                  {currentItems.length > 0
                    ? currentItems.map((item) => {
                        return (
                          <DataTableItem key={item.id}>
                            <DataTableRow>
                              <div className="nk-tnx-type text-nowrap">
                                <div
                                  className={`nk-tnx-type-icon bg-success-dim text-success `}
                                  style={{
                                    width: 30,
                                    height: 30,
                                  }}
                                >
                                  <Icon name="arrow-up-right"></Icon>
                                </div>
                                <div className="nk-tnx-type-text">
                                  <span className="tb-lead">{item.title}</span>
                                </div>
                              </div>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-lead-sub text-nowrap">
                                {item?.company}
                              </span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-lead-sub text-nowrap">
                                {item?.contact?.phone}
                              </span>
                              <span
                                className="tb-lead-sub text-nowrap"
                                style={{
                                  color: "blue",
                                }}
                              >
                                {item?.contact?.email}
                              </span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-lead-sub text-nowrap">
                                {item?.paymentMethod}
                              </span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-lead-sub text-nowrap">
                                {item?.transactionRef}
                              </span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="tb-lead-sub text-nowrap">
                                {item.status === "Rejected" ? "-" : "+"}
                                {item.amount}{" "}
                              </span>
                              <p
                                className="tb-lead-sub"
                                style={{
                                  textAlign: "start",
                                }}
                              >
                                VNĐ
                              </p>
                            </DataTableRow>
                            <DataTableRow className="text-center">
                              <span className="tb-lead-sub text-nowrap">
                                {" "}
                                {item.status === "Rejected" ? "-" : ""}
                                {item.kyc}{" "}
                              </span>
                            </DataTableRow>
                            <DataTableRow>
                              <Badge
                                className="badge-sm badge-dim  text-nowrap"
                                color={`outline-${
                                  item.status === "Completed"
                                    ? "success"
                                    : item.status === "Upcoming"
                                    ? "warning"
                                    : item.status === "Pending"
                                    ? "info"
                                    : "danger"
                                }`}
                              >
                                {item.status === "Completed"
                                  ? "Hoàn tất"
                                  : item.status === "Upcoming"
                                  ? "Chờ xác nhận"
                                  : item.status === "Pending"
                                  ? "Đang xử lí"
                                  : "Từ chối"}
                              </Badge>
                            </DataTableRow>
                            <DataTableRow className="nk-tb-col-tools">
                              <ul className="nk-tb-actions gx-1">
                                <li
                                  className="nk-tb-action-hidden"
                                  onClick={() => {
                                    loadDetail(item.id);
                                    toggleModalDetail();
                                  }}
                                >
                                  <TooltipComponent
                                    tag="a"
                                    containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                    id={item.ref + "details"}
                                    icon="eye"
                                    direction="top"
                                    text="Chi tiết"
                                  />
                                </li>
                                {item.status !== "Completed" &&
                                  item.status !== "Rejected" && (
                                    <React.Fragment>
                                      <li
                                        className="nk-tb-action-hidden"
                                        onClick={() => onApproveClick(item.id)}
                                      >
                                        <TooltipComponent
                                          tag="a"
                                          containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                          id={item.ref + "approve"}
                                          icon="done"
                                          direction="top"
                                          text="Phê duyệt"
                                        />
                                      </li>
                                      <li
                                        className="nk-tb-action-hidden"
                                        onClick={() => onRejectClick(item.id)}
                                      >
                                        <TooltipComponent
                                          tag="a"
                                          containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                          id={item.ref + "reject"}
                                          icon="cross-round"
                                          direction="top"
                                          text="Từ chối"
                                        />
                                      </li>
                                    </React.Fragment>
                                  )}
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
                                        {item.status !== "Completed" &&
                                          item.status !== "Rejected" && (
                                            <React.Fragment>
                                              <li
                                                onClick={() =>
                                                  onApproveClick(item.id)
                                                }
                                              >
                                                <DropdownItem
                                                  tag="a"
                                                  href="#approve"
                                                  onClick={(ev) => {
                                                    ev.preventDefault();
                                                  }}
                                                >
                                                  <Icon name="done"></Icon>
                                                  <span>Phê duyệt</span>
                                                </DropdownItem>
                                              </li>
                                              <li
                                                onClick={() =>
                                                  onRejectClick(item.id)
                                                }
                                              >
                                                <DropdownItem
                                                  tag="a"
                                                  href="#reject"
                                                  onClick={(ev) => {
                                                    ev.preventDefault();
                                                  }}
                                                >
                                                  <Icon name="cross-round"></Icon>
                                                  <span>Từ chối</span>
                                                </DropdownItem>
                                              </li>
                                            </React.Fragment>
                                          )}
                                        <li
                                          onClick={() => {
                                            loadDetail(item.id);
                                            toggleModalDetail();
                                          }}
                                        >
                                          <DropdownItem
                                            tag="a"
                                            href="#details"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                            }}
                                          >
                                            <Icon name="eye"></Icon>
                                            <span>Chi tiết</span>
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
                <div className="card-inner">
                  {currentItems.length > 0 ? (
                    <PaginationComponent
                      noDown
                      itemPerPage={itemPerPage}
                      totalItems={data.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-silent">No data found</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DataTable>
        </Block>

        <Modal
          isOpen={modal.add}
          toggle={() => setModal({ add: false })}
          className="modal-dialog-centered"
          size="lg"
        >
          <ModalBody>
            <a
              href="#close"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add Transaction</h5>
              <Form
                className="mt-4"
                onSubmit={handleSubmit(onFormSubmit)}
                noValidate
              >
                <Row className="g-gs">
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Order Type</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={cryptoActivityOptions}
                          value={{
                            value: formData.orderType,
                            label: formData.orderType,
                          }}
                          onChange={(e) =>
                            setFormData({ ...formData, orderType: e.value })
                          }
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Status</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={filterStatusOptions}
                          value={{
                            value: formData.status,
                            label: formData.status,
                          }}
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.value })
                          }
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <OverlineTitle className="pt-4"> Amount </OverlineTitle>
                <hr className="hr mt-2 border-light" />
                <Row className="g-gs">
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">BTC</label>
                      <input
                        type="number"
                        {...register("amountBTC", {
                          required: "This field is required",
                        })}
                        value={formData.amountBTC}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            amountBTC: e.target.value,
                          })
                        }
                        className="form-control"
                      />
                      {errors.amountBTC && (
                        <span className="invalid">
                          {errors.amountBTC.message}
                        </span>
                      )}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">USD</label>
                      <input
                        type="number"
                        {...register("amountUSD", {
                          required: "This field is required",
                        })}
                        value={formData.amountUSD}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            amountUSD: e.target.value,
                          })
                        }
                        className="form-control"
                      />
                      {errors.amountUSD && (
                        <span className="invalid">
                          {errors.amountUSD.message}
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>
                <OverlineTitle className="pt-4"> Balance </OverlineTitle>
                <hr className="hr mt-2 border-light" />
                <Row className="gy-4">
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">BTC</label>
                      <input
                        type="number"
                        {...register("balanceBTC", {
                          required: "This field is required",
                        })}
                        value={formData.balanceBTC}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            balanceBTC: e.target.value,
                          })
                        }
                        className="form-control"
                      />
                      {errors.balanceBTC && (
                        <span className="invalid">
                          {errors.balanceBTC.message}
                        </span>
                      )}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">USD</label>
                      <input
                        type="number"
                        {...register("balanceUSD", {
                          required: "This field is required",
                        })}
                        value={formData.balanceUSD}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            balanceUSD: e.target.value,
                          })
                        }
                        className="form-control"
                      />
                      {errors.balanceUSD && (
                        <span className="invalid">
                          {errors.balanceUSD.message}
                        </span>
                      )}
                    </div>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button type="submit" color="primary" size="md">
                          Add Transaction
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Form>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={modalDetail}
          toggle={() => toggleModalDetail()}
          className="modal-dialog-centered"
          size="lg"
        >
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                toggleModalDetail();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="nk-modal-head mb-3">
              <h4 className="nk-modal-title title">
                Transaction{" "}
                <small className="text-primary">{detail.transactionId}</small>
              </h4>
            </div>
            <div className="nk-tnx-details">
              <BlockBetween className="flex-wrap g-3">
                <div className="nk-tnx-type">
                  <div
                    className={`nk-tnx-type-icon bg-${
                      detail.status === "Completed"
                        ? "success"
                        : detail.status === "Upcoming"
                        ? "warning"
                        : detail.status === "Pending"
                        ? "info"
                        : "danger"
                    } text-white`}
                  >
                    <Icon name="arrow-up-right"></Icon>
                  </div>
                  <div className="nk-tnx-type-text">
                    <h5 className="title">+ {detail.amountBTC} BTC</h5>
                    <span className="sub-text mt-n1">{detail.date}</span>
                  </div>
                </div>
                <ul className="align-center flex-wrap gx-3">
                  <li>
                    <Badge
                      color={
                        detail.status === "Completed"
                          ? "success"
                          : detail.status === "Upcoming"
                          ? "warning"
                          : detail.status === "Pending"
                          ? "info"
                          : "danger"
                      }
                      size="sm"
                    >
                      {detail.status}
                    </Badge>
                  </li>
                </ul>
              </BlockBetween>
              <div className="nk-modal-head mt-4 mb-3">
                <h5 className="title">Transaction Info</h5>
              </div>
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Order ID</span>
                  <span className="caption-text">{detail.ref}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Reference ID</span>
                  <span className="caption-text text-break">
                    {detail.referenceId}
                  </span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Transaction Fee</span>
                  <span className="caption-text">
                    {detail.transactionFee} BTC
                  </span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Amount</span>
                  <span className="caption-text">{detail.amountBTC} BTC</span>
                </Col>
              </Row>
              <div className="nk-modal-head mt-4 mb-3">
                <h5 className="title">Transaction Details</h5>
              </div>
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Transaction Type</span>
                  <span className="caption-text">{detail.orderType}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Payment Gateway</span>
                  <span className="caption-text align-center">
                    CoinPayments{" "}
                    <Badge color="primary" className="ms-2 text-white">
                      Online Gateway
                    </Badge>
                  </span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Payment From</span>
                  <span className="caption-text text-break">
                    {detail.paymentForm}
                  </span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Payment To</span>
                  <span className="caption-text text-break">
                    {detail.paymentTo}
                  </span>
                </Col>
                <Col lg={12}>
                  <span className="sub-text">Transaction Hash</span>
                  <span className="caption-text text-break">
                    {detail.transactionHash}
                  </span>
                </Col>
                <Col lg={12}>
                  <span className="sub-text">Details</span>
                  <span className="caption-text">{detail.orderType} funds</span>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default TransListCrypto;
