import React from "react";
import "./navbar.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import spotifyLogo from "../../assests/logo/logo.svg";
const MNavbar = ({ logout , userImg , userName }) => {
  return (
    <div className="myNavbar">
      <Navbar expand="lg" className="navbar-body">
        <Container fluid>
          <Navbar.Brand className="text-white" href="#">
            <img className="logoImg" src={spotifyLogo}></img>
            <span className="logoText">Playlister</span>{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse className="" id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 "
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <div className="d-block d-lg-flex">

            <div className="mt-3">

            <button className="button button-logout" onClick={logout}>
              logout
            </button>
            </div>
            <div className="mt-3">

            <button className="button button-profile">
              <div className="profile">
                <span>
                  <img className="profile-img" src={userImg} alt="" />
                </span>
                <span className="profile-name ">
                  
                  {userName}
                </span>
              </div>
            </button>
            </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <img height="100%" src="'../../assests/logo/logo.svg" alt="" />
    </div>
  );
};

export default MNavbar;
