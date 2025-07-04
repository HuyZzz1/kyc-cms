import React, { useState } from "react";
import Head from "@/layout/head/Head";
import DatePicker from "react-datepicker";
import { Modal, ModalBody,  Card } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  Button,
  RSelect,
} from "@/components/Component";
import { countryOptions, userData } from "./data";
import { getDateStructured } from "@/utils/Utils";

const Profile = () => {
  const [modalTab, setModalTab] = useState("1");
  const [userInfo, setUserInfo] = useState(userData[0]);
  const [formData, setFormData] = useState({
    name: "Abu Bin Ishtiak",
    displayName: "Ishtiak",
    phone: "818474958",
    dob: "10 Aug, 1980",
    address: "2337 Kildeer Drive",
    address2: "",
    state: "Kentucky",
    country: "Canada",
  });
  const [modal, setModal] = useState(false);

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    let submitData = {
      ...formData,
    };
    setUserInfo(submitData);
    setModal(false);
  };

  return (
    <React.Fragment>
      <Head title="My Profile"></Head>
      <BlockHead>
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h5">Personal Information</BlockTitle>
            <BlockDes>
              <p>Basic info, like your name and address, that you use on Nio Platform.</p>
            </BlockDes>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>

      <Block>
        <Card className="card-bordered">
          <div className="nk-data data-list">
            <div className="data-item" onClick={() => setModal(true)}>
              <div className="data-col">
                <span className="data-label">Full Name</span>
                <span className="data-value">{userInfo.name}</span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more">
                  <Icon name="forward-ios"></Icon>
                </span>
              </div>
            </div>
            <div className="data-item" onClick={() => setModal(true)}>
              <div className="data-col">
                <span className="data-label">Display Name</span>
                <span className="data-value">{userInfo.displayName}</span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more">
                  <Icon name="forward-ios"></Icon>
                </span>
              </div>
            </div>
            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Email</span>
                <span className="data-value">info@softnio.com</span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more disable">
                  <Icon name="lock-alt"></Icon>
                </span>
              </div>
            </div>
            <div className="data-item" onClick={() => setModal(true)}>
              <div className="data-col">
                <span className="data-label">Phone Number</span>
                <span className="data-value text-soft">{userInfo.phone}</span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more">
                  <Icon name="forward-ios"></Icon>
                </span>
              </div>
            </div>
            <div className="data-item" onClick={() => setModal(true)}>
              <div className="data-col">
                <span className="data-label">Date of Birth</span>
                <span className="data-value">{userInfo.dob}</span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more">
                  <Icon name="forward-ios"></Icon>
                </span>
              </div>
            </div>
            <div className="data-item" onClick={() => setModal(true)}>
              <div className="data-col">
                <span className="data-label">Address</span>
                <span className="data-value">
                  {userInfo.address},
                  <br />
                  {userInfo.state}, {userInfo.country}
                </span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more">
                  <Icon name="forward-ios"></Icon>
                </span>
              </div>
            </div>
          </div>
        </Card>

        <BlockHead>
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h5">Personal Preference</BlockTitle>
              <BlockDes>
                <p>Your personalized preference allows you to best use the application</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Card className="card-bordered">
          <div className="nk-data data-list">
            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Language</span>
                <span className="data-value">English (United State)</span>
              </div>
              <div className="data-col data-col-end">
                <a
                  href="#language"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                  className="link link-primary"
                >
                  Change Language
                </a>
              </div>
            </div>
            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Date Format</span>
                <span className="data-value">MM/DD/YYYY</span>
              </div>
              <div className="data-col data-col-end">
                <a
                  href="#link"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                  className="link link-primary"
                >
                  Change
                </a>
              </div>
            </div>
            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Timezone</span>
                <span className="data-value">Bangladesh (GMT +6)</span>
              </div>
              <div className="data-col data-col-end">
                <a
                  href="#link"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                  className="link link-primary"
                >
                  Change
                </a>
              </div>
            </div>
          </div>
        </Card>
      </Block>

      <Modal isOpen={modal} className="modal-dialog-centered" size="lg" toggle={() => setModal(false)}>
        <ModalBody>
          <a
            href="#dropdownitem"
            onClick={(ev) => {
              ev.preventDefault();
              setModal(false);
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">Update Profile</h5>
            <ul className="nk-nav nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "1" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("1");
                  }}
                  href="#personal"
                >
                  Personal
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "2" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("2");
                  }}
                  href="#address"
                >
                  Address
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className={`tab-pane ${modalTab === "1" ? "active" : ""}`} id="personal">
                <Row className="gy-4">
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="full-name">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="full-name"
                        className="form-control"
                        name="name"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.name}
                        placeholder="Enter Full name"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="display-name">
                        Display Name
                      </label>
                      <input
                        type="text"
                        id="display-name"
                        className="form-control"
                        name="displayName"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.displayName}
                        placeholder="Enter display name"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone-no">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        id="phone-no"
                        className="form-control"
                        name="phone"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.phone}
                        placeholder="Phone Number"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="birth-day">
                        Date of Birth
                      </label>
                      <DatePicker
                        selected={new Date(formData.dob)}
                        className="form-control"
                        onChange={(date) => setFormData({ ...formData, dob: getDateStructured(date) })}
                        maxDate={new Date()}
                      />
                    </div>
                  </Col>
                  <Col size="12">
                    <div className="custom-control custom-switch">
                      <input type="checkbox" className="custom-control-input" id="latest-sale" />
                      <label className="custom-control-label" htmlFor="latest-sale">
                        Use full name to display{" "}
                      </label>
                    </div>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button
                          color="primary"
                          size="lg"
                          onClick={(ev) => {
                            ev.preventDefault();
                            submitForm();
                          }}
                        >
                          Update Profile
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setModal(false);
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
              <div className={`tab-pane ${modalTab === "2" ? "active" : ""}`} id="address">
                <Row className="gy-4">
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="address-l1">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        id="address-l1"
                        name="address"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.address}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="address-l2">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        id="address-l2"
                        name="address2"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.address2}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="address-st">
                        State
                      </label>
                      <input
                        type="text"
                        id="address-st"
                        name="state"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.state}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="address-county">
                        Country
                      </label>
                      <RSelect
                        options={countryOptions}
                        placeholder="Select a country"
                        defaultValue={[
                          {
                            value: formData.country,
                            label: formData.country,
                          },
                        ]}
                        onChange={(e) => setFormData({ ...formData, country: e.value })}
                      />
                    </div>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="lg" onClick={() => submitForm()}>
                          Update Address
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setModal(false);
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default Profile;
