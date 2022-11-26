import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { API } from "./config/api";
import { Gbutton } from "./Gbutton";
import { Error, Success } from "../components/helper/toast";
import User from "./assets/user.png";
import { useNavigate } from "react-router-dom";

export default function Register({ show, handleClose }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      Success({ message: `Register Success!` });
      // handleClose();
      navigate("/");
    } catch (error) {
      console.log(error);
      Error({ message: `Register Failed!` });
    }
  };
  return (
    <div className="myBG d-flex flex-column align-items-center">
      <img src={User} alt="" width="150" height="150" className="mt-5" />
      <h1 className=" ">Register</h1>
      <Form className="w-25">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Full Name"
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Gbutton
          text="Register"
          size="w-100 mb-3 "
          onClick={(e) => handleRegister(e)}
        />
      </Form>
      <p>
        Have an account klik
        <span className="ms-2 c-pink" onClick={() => navigate("/")}></span>
        HERE
      </p>
    </div>
  );
}
