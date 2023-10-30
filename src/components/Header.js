import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  const loginData = localStorage.getItem("User");
  const user = JSON.parse(loginData);
  const userLogout = () => {
    localStorage.clear();
    navigate("/dashboard");
  };
  return (
    <>
      <div className="container-fluid header-section">
        <div className="logo-section">
          <img src="/images/logob.png" alt="logo" />
          <div className="vertical-line"></div>
          <span className="page-name">DASHBOARD</span>
        </div>
        <div className="search-section">
          <form class="example" style={{ margin: "auto", maxWidth: "300px" }}>
            <input type="text" placeholder="search" name="search2" />
            <button type="submit">
              <i class="fa fa-search"></i>
            </button>
          </form>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-login"></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
              <Dropdown.Item onClick={userLogout}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Header;
