import React, { useState, useEffect } from "react";
import Content from "@/layout/content/Content";
import Head from "@/layout/head/Head";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Card,
  Badge,
  DropdownItem,
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
  PaginationComponent,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
} from "@/components/Component";
import { Link } from "react-router-dom";
import { invoiceData } from "./Invoice";

const InvoiceList = () => {
  const [data, setData] = useState(invoiceData);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("asc");

  // Sorting data
  const sortFunc = () => {
    let defaultData = data;
    if (sort === "dsc") {
      let sortedData = defaultData.sort(
        (a, b) => parseFloat(a.id) - parseFloat(b.id)
      );
      setData([...sortedData]);
    } else if (sort === "asc") {
      let sortedData = defaultData.sort(
        (a, b) => parseFloat(b.id) - parseFloat(a.id)
      );
      setData([...sortedData]);
    }
  };

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = invoiceData.filter((item) => {
        return item.orderId.toLowerCase().includes(onSearchText.toLowerCase());
      });
      setData([...filteredObject]);
    } else {
      setData([...invoiceData]);
    }
  }, [onSearchText]);

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  return (
    <React.Fragment>
      <Head title="Hóa đơn doanh nghiệp"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Hóa đơn doanh nghiệp</BlockTitle>
              <BlockDes className="text-soft">
                <p>Bạn đang có tổng cộng 937 hóa đơn đã được tạo và lưu trữ.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <Button color="primary" className="btn-icon px-2 ps-0">
                    <Icon name="plus"></Icon>
                    Tạo mới
                  </Button>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Card className="card-bordered card-stretch">
            <div className="card-inner-group">
              <div className="card-inner">
                <div className="card-title-group">
                  <div className="card-title">
                    <h5 className="title">Tất cả hóa đơn</h5>
                  </div>
                  <div className="card-tools me-n1">
                    <ul className="btn-toolbar">
                      <li>
                        <Button
                          onClick={toggle}
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
                            className="dropdown-toggle btn btn-icon btn-trigger"
                          >
                            <Icon name="setting"></Icon>
                          </DropdownToggle>
                          <DropdownMenu end>
                            <ul className="link-check">
                              <li>
                                <span>Hiển thị</span>
                              </li>
                              <li
                                className={itemPerPage === 10 ? "active" : ""}
                              >
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
                              <li
                                className={itemPerPage === 15 ? "active" : ""}
                              >
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
                                <span>Thứ tự</span>
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
                  <div
                    className={`card-search search-wrap ${
                      !onSearch ? "active" : ""
                    }`}
                  >
                    <div className="search-content">
                      <Button
                        className="search-back btn-icon toggle-search"
                        onClick={() => {
                          setSearchText("");
                          toggle();
                        }}
                      >
                        <Icon name="arrow-left"></Icon>
                      </Button>
                      <input
                        type="text"
                        className="form-control border-transparent form-focus-none"
                        placeholder="Tìm kiếm theo mã hóa đơn, doanh nghiệp, trạng thái..."
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
                      <DataTableRow>
                        <span className="text-nowrap">Mã hóa đơn</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="text-nowrap">Ngày xuất hóa đơn</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="text-nowrap">Số tiền thanh toán</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="text-nowrap">Trạng thái xử lý</span>
                      </DataTableRow>
                      <DataTableRow>&nbsp;</DataTableRow>
                    </DataTableHead>

                    {currentItems.length > 0
                      ? currentItems.map((item) => {
                          return (
                            <DataTableItem key={item.id}>
                              <DataTableRow>
                                <span className="tb-odr-id text-nowrap">
                                  <Link to={`/invoice-details/${item.id}`}>
                                    #{item.orderId}
                                  </Link>
                                </span>
                              </DataTableRow>
                              <DataTableRow>
                                <span className="tb-odr-date text-nowrap">
                                  {item.date}
                                </span>
                              </DataTableRow>
                              <DataTableRow>
                                <span className="tb-date text-nowrap">
                                  {item.totalAmount} VNĐ
                                </span>
                              </DataTableRow>
                              <DataTableRow>
                                <Badge
                                  color={
                                    item.status === "Complete"
                                      ? "success"
                                      : item.status === "Pending"
                                      ? "warning"
                                      : "danger"
                                  }
                                  className="badge-dot"
                                >
                                  {item.status === "Complete"
                                    ? "Đã thanh toán"
                                    : item.status === "Pending"
                                    ? "Chờ thanh toán"
                                    : "Đã hủy"}
                                </Badge>
                              </DataTableRow>
                              <DataTableRow>
                                <div className="tb-odr-action">
                                  <div className="tb-odr-btns d-none d-sm-inline">
                                    <Link
                                      to={`/invoice-print/${item.id}`}
                                      target="_blank"
                                    >
                                      <Button
                                        color="primary"
                                        size="sm"
                                        className="btn-icon btn-white btn-dim"
                                      >
                                        <Icon name="printer-fill"></Icon>
                                      </Button>
                                    </Link>
                                    <Link to={`/invoice-details/${item.id}`}>
                                      <Button
                                        color="primary"
                                        size="sm"
                                        className="btn btn-dim"
                                      >
                                        View
                                      </Button>
                                    </Link>
                                  </div>
                                  <Link to={`/invoice-details/${item.id}`}>
                                    <Button className="btn-pd-auto d-sm-none">
                                      <Icon name="chevron-right"></Icon>
                                    </Button>
                                  </Link>
                                </div>
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
            </div>
          </Card>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default InvoiceList;
