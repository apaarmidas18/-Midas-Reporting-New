import React from "react";
import { Outlet } from "react-router-dom";
// import HorizontalMenu from "../components/HorizontalMenu";
// import SubHorizontal from "../components/SubHorizontal";
import NewSide from "../components/NewSide";
import NewHor from "../components/NewHor";

const PortalLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* <HorizontalMenu />
      <SubHorizontal /> */}
      <NewSide />
      <NewHor />
      <div className="outlet-horizontal">
        <Outlet />
      </div>
    </div>
  );
};

export default PortalLayout;
