import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Gbutton } from "../components/Gbutton";
import Attach from "../components/assets/attach.png";

import { API } from "../components/config/api";

import { Error, Success } from "../components/helper/toast";

function AddProduct({ show, handleClose, getProduct }) {
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    // <Alert>okehhhhhhh</Alert>

    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.files[0].size >= 100000) {
      alert("max 100kb");
      setForm({
        ...form,
        image: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("buy", form.buy);
      formData.set("sale", form.sale);
      formData.set("qty", form.qty);

      formData.set("image", form.image[0], form.image[0].name);
      console.log(formData);
      await API.post("/create/products", formData);
      getProduct();
      handleClose();
      Success({ message: ` Success!` });
    } catch (error) {
      console.log(error);
      Error({ message: `Failed!` });
    }
  };

  // fetch name produk
  // onchange != nameProduk ? ok : alert (err)
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Form className=" p-3">
          <h4 className="c-pink my-1">Add Product</h4>
          <div className="d-flex">
            <Form.Group className="mb-2 w-100" controlId="formBasicEmail">
              <Form.Control
                style={{ height: "45px" }}
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Name Product"
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
              name="sale"
              onChange={handleChange}
              placeholder="Salling Price"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              style={{ height: "45px" }}
              type="text"
              name="buy"
              onChange={handleChange}
              placeholder="Buyying Price"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              style={{ height: "45px" }}
              type="text"
              name="qty"
              onChange={handleChange}
              placeholder="Stock"
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Gbutton
              text="Add Product"
              size="w-100 my-2 "
              onClick={(e) => {
                handleSubmit(e);
              }}
            />
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AddProduct;
