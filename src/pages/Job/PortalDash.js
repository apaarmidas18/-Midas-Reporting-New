import React, { useState, useEffect, useContext } from "react";
import NewHor from "../../components/NewHor";
import TabName from "../../components/TabName";
import { Sidebar_Context } from "../../components/hooks/ContextSidebar";

const PortalDash = () => {
  const { isSidebarExpanded } = useContext(Sidebar_Context);
  return (
    <>
      <div
        class={"container-fluid table-container"}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <NewHor />

        <div
          className={
            isSidebarExpanded ? "container " : "container tab-container"
          }
        >
          <h1 className="text-center mt-5">Welcome To Midas HRMS</h1>
        </div>
      </div>
    </>
  );
};

export default PortalDash;
