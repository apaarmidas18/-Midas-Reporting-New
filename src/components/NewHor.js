import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router";

const NewHor = ({tab}) => {
  const navigate = useNavigate();

  const loginData = localStorage.getItem("User");
  const user = JSON.parse(loginData);
  const userLogout = () => {
    localStorage.clear();
    navigate("/dashboard");
  };
  return (
    <>
      <nav className="new-nav">
        <span>{tab}</span>
        <Dropdown className="portal-logout">
          <Dropdown.Toggle id="portal-login">Logout</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
            <Dropdown.Item onClick={userLogout}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </>
  );
};

export default NewHor;
