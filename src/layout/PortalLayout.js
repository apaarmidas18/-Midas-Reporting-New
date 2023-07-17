import React from "react";
import { Outlet } from "react-router-dom";
import HorizontalMenu from "../components/HorizontalMenu";

const PortalLayout = () => {
  return (
    <div>
      <HorizontalMenu />
      {/* <Layout /> */}
      <div className="outlet-horizontal">
        <Outlet />
      </div>
    </div>
  );
};

export default PortalLayout;
