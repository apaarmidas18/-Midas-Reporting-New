import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import AccessToken from "../API/Zoho-API/AccessToken";

const DashboardLayout = () => {
  useEffect(() => {
    AccessToken();
  }, []);
  return (
    <div>
      <Sidebar />
      {/* <Layout /> */}
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
