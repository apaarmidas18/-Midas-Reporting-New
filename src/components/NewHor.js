import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router";

const NewHor = () => {
  const navigate = useNavigate();

  const loginData = localStorage.getItem("User");
  const user = JSON.parse(loginData);
  console.log(user);
  const userLogout = () => {
    localStorage.clear();
    navigate("/dashboard");
  };
  return (
    <>
      <nav className="new-nav">
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
