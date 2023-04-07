import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
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
