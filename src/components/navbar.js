import React, { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import Logo from "./assets/LogoNutech.png";
import { Gbutton } from "./Gbutton";


import { LoginContext } from "./LoginContext";
import { useNavigate } from "react-router-dom";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(LoginContext);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <Navbar className="" style={{ height: "8vh" }}>
      <Container>
        <Navbar.Brand href="#">
          <img src={Logo} alt="" width={100} />
        </Navbar.Brand>
        <div className="d-flex justify-content-end w-100">
          <Gbutton
            text="Logout"
            size="me-2"
            style={{ height: "35px" }}
            onClick={logout}
          />
        </div>
      </Container>
    </Navbar>
  );
}
