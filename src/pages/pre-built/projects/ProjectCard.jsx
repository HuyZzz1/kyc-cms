import React, { useState } from "react";
import Head from "@/layout/head/Head";
import Content from "@/layout/content/Content";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Icon,
  Button,
  Row,
  ProjectCard,
  UserAvatar,
  Col,
  PaginationComponent,
} from "@/components/Component";
import { projectData } from "./ProjectData";
import { findUpper, setDeadline, setDeadlineDays, calcPercentage } from "@/utils/Utils";
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Progress,
  DropdownItem,
  Badge
} from "reactstrap";
import FormModal from "./FormModal";

const ProjectCardPage = () => {
  const [sm, updateSm] = useState(false);
  const [modal, setModal] = useState({
    add: false,
    edit: false,
  });
  const [editId, setEditedId] = useState();
  const [data, setData] = useState(projectData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(8);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    lead: "",
    tasks: 0,
    team: [],
    totalTask: 0,
    date: new Date(),
  });
  const [editFormData, setEditFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    lead: "",
    tasks: 0,
    team: [],
    totalTask: 0,
    date: new Date(),
  });

  // function to reset the form
  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      lead: "",
      tasks: 0,
      team: [],
      totalTask: 0,
      date: new Date(),
    });
  };

  const closeModal = () => {
    setModal({ add: false })
    resetForm();
  };

  const closeEditModal = () => {
    setModal({ edit: false })
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (sData) => {
    const { title, subtitle, description, tasks, totalTask } = sData;
    let submittedData = {
      id: data.length + 1,
      avatarClass: "pink",
      title: title,
      subtitle: subtitle,
      desc: description,
      lead: formData.lead,
      team: formData.team,
      tasks: tasks,
      totalTask: totalTask,
      deadline: new Date(`${formData.date}`), // Format ** mm/dd/yyyy
    };
    setData((data) => [submittedData, ...data]);
    resetForm();
    setModal({ add: false });
  };

  // submit function to update a new item
  const onEditSubmit = (sData) => {
    const { title, subtitle, description, tasks, totalTask } = sData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
      if (item.id === editId) {
        submittedData = {
          id: item.id,
          avatarClass: item.avatarClass,
          title: title,
          subtitle: subtitle,
          desc: description,
          lead: editFormData.lead,
          tasks: tasks,
          totalTask: totalTask,
          deadline: new Date(`${editFormData.date}`), // Format ** mm/dd/yyyy
          team: editFormData.team,
        };
      }
    });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = submittedData;
    setModal({ edit: false });
    resetForm();
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        setEditFormData({
          title: item.title,
          subtitle: item.subtitle,
          description: item.desc,
          lead: item.lead,
          team: item.team,
          tasks: item.tasks,
          totalTask: item.totalTask,
          date: item.deadline,
        });
        setModal({ edit: true }, { add: false });
        setEditedId(id);
      }
    });
  };

  // function to change the complete a project property
  const completeProject = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].deadline = setDeadline(0);
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Head title="Project Card"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page> Projects</BlockTitle>
              <BlockDes className="text-soft">You have total {data.length} projects</BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon name="filter-alt" className="d-none d-sm-inline"></Icon>
                          <span>Filtered By</span>
                          <Icon name="chevron-right" className="dd-indc"></Icon>
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <span>Open</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <span>Closed</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <span>OnGoing</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt" onClick={() => setModal({ add: true })}>
                      <Button color="primary">
                        <Icon name="plus"></Icon>
                        <span>Add Project</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            {currentItems &&
              currentItems.map((item, idx) => {
                var days = setDeadlineDays(item.deadline);
                return (
                  <Col sm="6" lg="4" xxl="3" key={item.id}>
                    <ProjectCard>
                      <div className="project-head">
                        <a
                          href="#title"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="project-title"
                        >
                          <UserAvatar className="sq" theme={item.avatarClass} text={findUpper(item.title)} />
                          <div className="project-info">
                            <h6 className="title">{item.title}</h6>
                            <span className="sub-text">{item.subtitle}</span>
                          </div>
                        </a>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="a"
                            className="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 me-n1"
                          >
                            <Icon name="more-h"></Icon>
                          </DropdownToggle>
                          <DropdownMenu end>
                            <ul className="link-list-opt no-bdr">
                              <li onClick={() => onEditClick(item.id)}>
                                <DropdownItem
                                  tag="a"
                                  href="#edit"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                  }}
                                >
                                  <Icon name="edit"></Icon>
                                  <span>Edit Project</span>
                                </DropdownItem>
                              </li>
                              {days >= 0 && (
                                <li onClick={() => completeProject(item.id)}>
                                  <DropdownItem
                                    tag="a"
                                    href="#markasdone"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                    }}
                                  >
                                    <Icon name="check-round-cut"></Icon>
                                    <span>Mark As Done</span>
                                  </DropdownItem>
                                </li>
                              )}
                            </ul>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                      <div className="project-details">
                        {item.desc.length > 90 ? item.desc.substring(0, 89) + "... " : item.desc}
                      </div>
                      <div className="project-progress">
                        <div className="project-progress-details">
                          <div className="project-progress-task">
                            <Icon name="check-round-cut"></Icon>
                            <span>{item.tasks} Tasks</span>
                          </div>
                          <div className="project-progress-percent">
                            {days === 0 ? 100 : calcPercentage(item.totalTask, item.tasks)}%
                          </div>
                        </div>
                        <Progress
                          className="progress-pill progress-md bg-light"
                          value={days === 0 ? 100 : calcPercentage(item.totalTask, item.tasks)}
                        ></Progress>
                      </div>
                      <div className="project-meta">
                        <ul className="project-users g-1">
                          {item.team.slice(0, 2).map((item, idx) => {
                            return (
                              <li key={idx}>
                                <UserAvatar
                                  className="sm"
                                  text={findUpper(item.label)}
                                  theme={item.theme}
                                  image={item.image}
                                />
                              </li>
                            );
                          })}
                          {item.team.length > 2 && (
                            <li>
                              <UserAvatar theme="light" className="sm" text={`+${item.team.length - 2}`} />
                            </li>
                          )}
                        </ul>
                        <Badge
                          className="badge-dim"
                          color={
                            days > 10
                              ? "light"
                              : days <= 10 && days >= 2
                              ? "warning"
                              : days === 1
                              ? "danger"
                              : days <= 0 && "success"
                          }
                        >
                          <Icon name="clock"></Icon>
                          <span>{days <= 0 ? "Done" : days === 1 ? "Due Tomorrow" : days + " Days Left"}</span>
                        </Badge>
                      </div>
                    </ProjectCard>
                  </Col>
                );
              })}
          </Row>
          <div className="mt-5">
            <PaginationComponent
              itemPerPage={itemPerPage}
              totalItems={data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </Block>

        <FormModal modal={modal.add} modalType="add" formData={formData} setFormData={setFormData} closeModal={closeModal} onSubmit={onFormSubmit} />
        <FormModal modal={modal.edit} modalType="edit" formData={editFormData} setFormData={setEditFormData} closeModal={closeEditModal} onSubmit={onEditSubmit} />
      </Content>
    </React.Fragment>
  );
};
export default ProjectCardPage;
