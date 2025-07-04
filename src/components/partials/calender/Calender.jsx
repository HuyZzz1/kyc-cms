import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap5";
import DatePicker from "react-datepicker";
import { Popover, PopoverHeader, PopoverBody, ModalHeader, Modal, ModalBody,  Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Row, RSelect } from "@/components/Component";
import { setDateForPicker } from "@/utils/Utils";
import { eventOptions, returnDate } from "./CalenderData";

const EventView = (event) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const { title, extendedProps, publicId } = event.event.event._def;
  return (
    <React.Fragment>
      <div id={publicId} onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)}>
        {title}
      </div>{" "}
      <Popover placement="bottom" isOpen={mouseEnter} target={publicId}>
        <PopoverHeader>{title}</PopoverHeader>
        <PopoverBody>{extendedProps.description}</PopoverBody>
      </Popover>
    </React.Fragment>
  );
};

const CalenderApp = ({ events, onDelete, onEdit }) => {
  const [modalState, updateModal] = useState(false);
  const [mockEvents, updateEvents] = useState(events);
  const [event, updateEvent] = useState({});
  const [theme, settheme] = useState();
  const [edit, updateEditModal] = useState(false);
  const [dates, setDates] = useState({
    startDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    updateEvents(events);
  }, [events]);

  const { reset, register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = (formData) => {
    let newEvent = {};
    newEvent = {
      id: event.id,
      className: theme.value,
      type: theme,
      title: formData.title,
      start: event.start,
      end: event.end,
      description: formData.description,
    };
    onEdit(newEvent);
    settheme("");
    toggleEdit();
  };

  const toggle = () => {
    updateModal(!modalState);
  };

  const toggleEdit = () => {
    updateEditModal(!edit);
  };

  const handleEventClick = (info) => {
    const event = events.find((item) => item.id === info.event._def.publicId);
    updateEvent(event);
    settheme(event.type);
    toggle();
  };

  useEffect(() => {
    reset(event)
  }, [event]);

  return (
    <React.Fragment>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, bootstrapPlugin]}
        events={mockEvents}
        eventClick={(info) => handleEventClick(info)}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "title prev,next",
          center: null,
          right: "today dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        themeSystem="bootstrap5"
        height={800}
        contentHeight={780}
        eventContent={(e) => <EventView event={e} />}
        aspectRatio={3}
        editable={true}
        droppable={true}
      />

      <Modal isOpen={modalState} toggle={toggle} className="modal-md">
        <ModalHeader className={event && event.className} toggle={toggle}>
          {event && event.title}
        </ModalHeader>
        <ModalBody>
          <Row className="gy-3 py-1">
            <Col sm="6">
              <h6 className="overline-title">Start Time</h6>
              <p id="preview-event-start">{event && returnDate(event.start)}</p>
            </Col>
            <Col sm="6" id="preview-event-end-check">
              <h6 className="overline-title">End Time</h6>
              <p id="preview-event-end">{event && returnDate(event.end)}</p>
            </Col>
            <Col sm="10" id="preview-event-description-check">
              <h6 className="overline-title">Description</h6>
              <p id="preview-event-description">{event && event.description}</p>
            </Col>
          </Row>
          <ul className="d-flex justify-content-between gx-4 mt-3">
            <li>
              <Button
                color="primary"
                onClick={() => {
                  toggle();
                  toggleEdit();
                }}
              >
                Edit Event
              </Button>
            </li>
            <li>
              <Button
                color="danger"
                className="btn-dim"
                onClick={() => {
                  toggle();
                  onDelete(event && event.id);
                }}
              >
                Delete
              </Button>
            </li>
          </ul>
        </ModalBody>
      </Modal>
      <Modal isOpen={edit} toggle={toggleEdit} className="modal-md">
        <ModalHeader toggle={toggleEdit}>Edit Event</ModalHeader>
        <ModalBody>
          <form className="form-validate is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
            <Row className="gx-4 gy-3">
              <Col size="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="event-title">
                    Event Title
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="event-title"
                      {...register('title', { required: true })}
                      className="form-control"
                      value={event.title} 
                      onChange={(e) => updateEvent({ ...event, title: e.target.value })}/>
                    {errors.title && <p className="invalid">This field is required</p>}
                  </div>
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label className="form-label">Start Date &amp; Time</label>
                  <Row className="gx-2">
                    <div className="w-55">
                      <div className="form-control-wrap">
                        <DatePicker
                          selected={new Date(event.start)}
                          onChange={(date) => updateEvent({ ...event, start: setDateForPicker(date) })}
                          className="form-control date-picker"
                        />
                      </div>
                    </div>
                    <div className="w-45">
                      <div className="form-control-wrap has-timepicker">
                        <DatePicker
                          selected={dates.startTime}
                          onChange={(date) => setDates({ ...dates, startTime: date })}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          className="form-control date-picker"
                        />
                      </div>
                    </div>
                  </Row>
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label className="form-label">End Date &amp; Time</label>
                  <Row className="gx-2">
                    <div className="w-55">
                      <div className="form-control-wrap">
                        <DatePicker
                          selected={new Date(event.end)}
                          onChange={(date) => updateEvent({ ...event, end: setDateForPicker(date) })}
                          className="form-control date-picker"
                        />
                      </div>
                    </div>
                    <div className="w-45">
                      <div className="form-control-wrap has-timepicker">
                        <DatePicker
                          selected={dates.endTime}
                          onChange={(date) => setDates({ ...dates, endTime: date })}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          className="form-control date-picker"
                        />
                      </div>
                    </div>
                  </Row>
                </div>
              </Col>
              <Col size="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="event-description">
                    Event Description
                  </label>
                  <div className="form-control-wrap">
                    <textarea
                      className="form-control"
                      id="event-description"
                      {...register('description', { required: true })}
                      value={event.description}
                      onChange={(e) => updateEvent({ ...event, description: e.target.value })}></textarea>
                    {errors.description && <p className="invalid">This field is required</p>}
                  </div>
                </div>
              </Col>
              <Col size="12">
                <div className="form-group">
                  <label className="form-label">Event Category</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={eventOptions}
                      defaultValue={event.type}
                      onChange={(e) => settheme(e)}
                      //ref={register({ required: true })}
                    />
                  </div>
                </div>
              </Col>
              <Col size="12">
                <ul className="d-flex justify-content-between gx-4 mt-1">
                  <li>
                    <Button type="submit" color="primary">
                      Update Event
                    </Button>
                  </li>
                  <li>
                    <Button color="danger" className="btn-dim" onClick={toggleEdit}>
                      Discard
                    </Button>
                  </li>
                </ul>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default CalenderApp;
