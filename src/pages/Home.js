import React, { useEffect } from "react";
import Dashboardcard from "../components/Dashboardcard";
import AccessToken from "../API/Zoho-API/AccessToken";

const Home = () => {
  const loginData = localStorage.getItem("User");
  const user = JSON.parse(loginData);

  useEffect(() => {
    AccessToken();
  }, []);

  return (
    <>
      <div className="container dashboard-container">
        <div className="row">
          <div className=" col-md-4">
            <Dashboardcard type="Total Users" number="24" style="total-user" />
          </div>
          <div className="col-md-4">
            <Dashboardcard
              type="Total Projects"
              number="11"
              style="total-project"
            />
          </div>
          <div className="col-md-4">
            <Dashboardcard
              type="Active Users"
              number="19"
              style="active-user"
            />
          </div>
        </div>
        <div className="welcome-banner">
          <div className="welcome-text">
            <h3>Welcome back,</h3>
            <h3>{user.name} !</h3>
            <span>
              Welcome to <strong>Midas Consulting.</strong>
            </span>
          </div>
          <div className="welcome-image">
            <img src="/images/3d.jpg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
