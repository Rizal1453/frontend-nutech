import React, { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { API } from "./config/api";
import { Gbutton } from "./Gbutton";
import { LoginContext } from "./LoginContext";
import { Error, Success } from "../components/helper/toast";
import User from "./assets/user.png";
import { useNavigate } from "react-router-dom";
import { users } from "./DummyUser";

export default function Login() {
  const navigate = useNavigate();
 

  const [change, setChange] = useState({
  });
 
  const handleChange = (e) => {
    setChange({
      ...change,
      [e.target.name]: e.target.value,
    });
  };
 

  const handleSubmit = (e) => {
    console.log(users);
    e.preventDefault();
    // user.email === change && user.password === password
    const user = users.find((user)=>{
      return user.email === change.email && user.password === change.password;
    })
    
    console.log(user,"useeeeeeeeeeeeeeeeeer");
    if (user) {
      navigate("/home");
       Success({ message: `Login Success!` });
    } else {
      navigate("/");
       Error({ message: `Login Failed!` });
      // login failed
    }
  };
  // const handleSubmit = useMutation(async (e) => {
  //   try {
  //     const response = await API.post("/login", change);
  //     dispatch({
  //       type: "LOGIN_SUCCESS",
  //       payload: response.data.data,
  //     });
  //     localStorage.setItem("token", response.data.data.token);

  //     Success({ message: `Login Success!` });
  //     navigate("/home")
  //   } catch (error) {
  //     Error({ message: `Login Failed!` });
  //   }
  // });
  return (
    <div className="myBG d-flex flex-column align-items-center  ">
      <img src={User} alt="" width="150" height="150" className="mt-5" />
      <h1 className=" my-3">Login</h1>
      <p>noted</p>
      <p>email : user1@gmail.com </p>
      <p>password : 123456 </p>
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
        <Gbutton text="Login" size="w-100 mb-3" onClick={handleSubmit} />
      </Form>
      <p>
        Have an account klik
        <span className="ms-2 c-pink" onClick={() => navigate("/register")}>
          HERE
        </span>
      </p>
    </div>
  );
}
