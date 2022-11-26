import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Gbutton } from "../components/Gbutton";
import Attach from "../components/assets/attach.png";

import { API } from "../components/config/api";
import { useNavigate } from "react-router-dom";
import { Error, Success } from "../components/helper/toast";

function UpdateProduct({ show, handleClose, save, setShowUpdate, getProduct }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name :"",
    buy :"",
    sale:"",
    qty:"",
    

  });
  useEffect(() => {
    if (save) {
      setForm({
        ...form,
        name:save.name,
        sale :save.sale,
        buy:save.buy,
        qty:save.qty

      });
    }
  }, [save]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const id = save.id;

      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("buy", form.buy);
      formData.set("sale", form.sale);
      formData.set("qty", form.qty);
      formData.set("image", form.image[0], form.image[0].name);
      console.log(formData);
      await API.patch(`/update/${id}`, formData);
    
      getProduct();
      handleClose();
      Success({ message: `Edit Success!` });
    } catch (error) {
      console.log(error);
      Error({ message: `Edit Failed!` });
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Form className=" p-3">
          <h4 className="c-pink my-1">Edit Product</h4>
          <div className="d-flex">
            <Form.Group className="mb-2 w-100" controlId="formBasicEmail">
              <Form.Control
                style={{ height: "45px" }}
                type="text"
                name="name"
                value={form?.name}
                onChange={handleChange}
                placeholder={save?.name}
              />
            </Form.Group>
            <div
              className="ms-3 border  rounded-3 "
              style={{ width: "250px", height: "45px" }}
            >
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                hidden
              />
              <label
                htmlFor="image"
                className=" px-3 w-100 h-100 d-flex ms-2 align-items-center"
              >
                {" "}
                Attach Thumbnail
                <img src={Attach} alt="" className="mx-2" />
              </label>
            </div>
          </div>

          <Form.Group className="mb-2">
            <Form.Control
              style={{ height: "45px" }}
              type="text"
              value={form?.sale}
              name="sale"
              onChange={handleChange}
              placeholder={save?.sale}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              style={{ height: "45px" }}
              type="text"
              name="buy"
              value={form?.buy}
              onChange={handleChange}
              placeholder={save?.buy}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              style={{ height: "45px" }}
              type="text"
              name="qty"
              value={form?.qty}
              onChange={handleChange}
              placeholder={save?.qty}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Gbutton
              text="Edit Product"
              size="w-100 my-2 "
              onClick={handleUpdate}
            />
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default UpdateProduct;
