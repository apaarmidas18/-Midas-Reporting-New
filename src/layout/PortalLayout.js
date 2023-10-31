import React from "react";
import { Outlet } from "react-router-dom";
import PortalSidebar from "../components/PortalSidebar";

const PortalLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <PortalSidebar />
      <Outlet />
    </div>
  );
};

export default PortalLayout;
