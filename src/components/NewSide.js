import React, { createContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import NewHor from "./NewHor";
import { useContext } from "react";
import { Sidebar_Context } from "./hooks/ContextSidebar";

const NewSide = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { isSidebarExpanded, handleToggleSidebar } =
    useContext(Sidebar_Context);
  // const handleToggleSidebar = (item) => {
  //   setIsSidebarExpanded((prevExpanded) => !prevExpanded);
  // };

  const liColor = (item) => {
    setSelectedItem(item);
  };
  const listItems = [
    {
      tabname: "Jobs",
      tabroute: "jobs",
      fontlogo: "fa-solid fa-square-poll-vertical",
    },
    // {
    //   tabname: "Assigned Job",
    //   tabroute: "assigned-job",
    //   fontlogo: "fa-solid fa-star",
    // },
    {
      tabname: "Active",
      tabroute: "active-candidates",
      fontlogo: "fa-solid fa-chart-line",
    },
    {
      tabname: "Booked",
      tabroute: "booked-candidates",
      fontlogo: "fa-solid fa-address-book",
    },
    {
      tabname: "Pending",
      tabroute: "pending-candidates",
      fontlogo: "fa-solid fa-star",
    },
    {
      tabname: "Availability",
      tabroute: "availability-log",
      fontlogo: "fa-solid fa-list",
    },
    {
      tabname: "VMS",
      tabroute: "job-vms",
      fontlogo: "fa-solid fa-list",
    },
    {
      tabname: "configuration",
      tabroute: "vms-config",
      fontlogo: "fa-solid fa-table",
    },
  ];
  const highlightedItemClass = "light-active";

  return (
    <>
      <div
        className={`sidebar ${isSidebarExpanded ? "expanded " : "collapsed"}`}
      >
        <div className="side-button">
          <button className="toggle-button" onClick={handleToggleSidebar}>
            <i style={{ color: "#fff" }} class="fa-solid fa-chevron-left"></i>
          </button>
        </div>
        <nav className="menu">
          <div className="avatar-menu text-center">
            <img src="/images/avatar.svg" />
            <p>Archit Mishra</p>
          </div>
          <div className="sidebar-logo text-center">
            <img src="/images/logob.png" />
          </div>
          <div className="nav-tabs" style={{ borderBottom: "none" }}>
            <div className="nav-tab-heading">
              <span>Jobs</span>
            </div>
            <ul className="new-sidebar-list">
              {listItems.map((item, index) => {
                return (
                  <li key={index} onClick={() => liColor(item.tabname)}>
                    <span
                      className={
                        selectedItem === item.tabname
                          ? highlightedItemClass
                          : ""
                      }
                    >
                      <i class={item.fontlogo}></i>

                      <Link to={item.tabroute}>{item.tabname}</Link>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NewSide;
