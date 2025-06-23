/* eslint-disable no-unused-vars */
import { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Icon, Row, Col } from "@/components/Component";
import { useForm } from "react-hook-form";
import { ModalBody, Modal, Form } from "reactstrap";
import { toast } from "react-toastify";
import { updatePackage } from "../../../services/dashboard";
import { formatToVND } from "../../../utils/Utils";

const EditModal = forwardRef(({ fetchData }, ref) => {
  const [modal, setModal] = useState({ edit: false });
  const [displayPrice, setDisplayPrice] = useState("");
  const [item, setItem] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      requestCount: null,
      durationInMonths: null,
      price: null,
    },
  });

  const onFormCancel = () => {
    setModal({ edit: false });
    reset();
    setDisplayPrice("");
    setItem(null);
  };

  const onFormSubmit = async (values) => {
    try {
      await updatePackage({
        ...values,
        id: item._id,
        requestCount: Number(values.requestCount),
        durationInMonths: Number(values.durationInMonths),
        price: Number(values.price),
      });
      toast.success("Cập nhật gói thành công!");
      fetchData();
      onFormCancel();
    } catch (error) {
      toast.error("Cập nhật thất bại!");
    }
  };

  useImperativeHandle(ref, () => ({
    open: (data) => {
      setItem(data);
      setModal({ edit: true });

      // Gán lại giá trị cho form
      reset({
        name: data.name,
        description: data.description,
        requestCount: data.requestCount,
        durationInMonths: data.durationInMonths,
        price: data.price,
      });

      // Hiển thị giá format
      setDisplayPrice(formatToVND(data.price));
    },
  }));

  return (
    <Modal
      isOpen={modal.edit}
      toggle={onFormCancel}
      className="modal-dialog-centered"
      size="lg"
    >
      <ModalBody>
        <a
          href="#close"
          onClick={(e) => {
            e.preventDefault();
            onFormCancel();
          }}
          className="close"
        >
          <Icon name="cross-sm" />
        </a>
        <div className="p-2">
          <h5 className="title">Chỉnh sửa thông tin gói</h5>
          <Form
            className="mt-4"
            onSubmit={handleSubmit(onFormSubmit)}
            noValidate
          >
            <Row className="g-gs">
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Tên gói</label>
                  <input
                    placeholder="Nhập tên gói"
                    {...register("name", { required: "Trường bắt buộc" })}
                    className="form-control"
                  />
                  {errors.name && (
                    <span className="invalid">{errors.name.message}</span>
                  )}
                </div>
              </Col>

              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Giá</label>
                  <input
                    type="text"
                    placeholder="Nhập giá"
                    value={displayPrice}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^\d]/g, "");
                      setDisplayPrice(formatToVND(raw));
                      setValue("price", Number(raw));
                    }}
                    className="form-control"
                  />
                  {errors.price && (
                    <span className="invalid">{errors.price.message}</span>
                  )}
                </div>
              </Col>

              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Số tháng</label>
                  <input
                    type="number"
                    placeholder="Nhập số tháng"
                    {...register("durationInMonths", {
                      required: "Trường bắt buộc",
                    })}
                    className="form-control"
                  />
                  {errors.durationInMonths && (
                    <span className="invalid">
                      {errors.durationInMonths.message}
                    </span>
                  )}
                </div>
              </Col>

              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Số lượt KYC</label>
                  <input
                    type="number"
                    placeholder="Nhập số lượt KYC"
                    {...register("requestCount", {
                      required: "Trường bắt buộc",
                    })}
                    className="form-control"
                  />
                  {errors.requestCount && (
                    <span className="invalid">
                      {errors.requestCount.message}
                    </span>
                  )}
                </div>
              </Col>

              <Col md="12">
                <div className="form-group">
                  <label className="form-label">Mô tả</label>
                  <textarea
                    rows={4}
                    placeholder="Nhập mô tả"
                    {...register("description", {
                      required: "Trường bắt buộc",
                    })}
                    className="form-control"
                  />
                  {errors.description && (
                    <span className="invalid">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </Col>
            </Row>

            <Col size="12">
              <ul className="align-center justify-content-center flex-wrap flex-sm-nowrap gx-2 gy-2 pt-5">
                <li>
                  <Button type="submit" color="primary" size="md">
                    Lưu
                  </Button>
                </li>
                <li>
                  <Button
                    type="submit"
                    className="btn btn-secondary"
                    size="md"
                    onClick={(e) => {
                      e.preventDefault();
                      onFormCancel();
                    }}
                  >
                    Đóng
                  </Button>
                </li>
              </ul>
            </Col>
          </Form>
        </div>
      </ModalBody>
    </Modal>
  );
});

EditModal.displayName = "EditModal";

export default EditModal;
