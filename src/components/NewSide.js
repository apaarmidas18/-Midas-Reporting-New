import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import NewHor from "./NewHor";

const NewSide = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggleSidebar = (item) => {
    setIsSidebarExpanded((prevExpanded) => !prevExpanded);
    setSelectedItem(item);
  };

  const listItems = [
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
      tabname: "Plan My Day",
      tabroute: "",
      fontlogo: "fa-solid fa-table",
    },
  ];
  const highlightedItemClass = "light-active";
  return (
    <>
      <div
        className={`sidebar ${isSidebarExpanded ? "expanded" : "collapsed"}`}
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
                  <li
                    key={index}
                    onClick={() => handleToggleSidebar(item.tabname)}
                  >
                    <i class={item.fontlogo}></i>
                    <span
                      className={
                        selectedItem === item.tabname
                          ? highlightedItemClass
                          : ""
                      }
                    >
                      <Link to={item.tabroute}>{item.tabname}</Link>
                    </span>
                  </li>
                );
              })}
            </ul>
            {/* <ul className="new-sidebar-list">
              <Link href="/active-candidates">
                <li>
                  <i class="fa-solid fa-chart-line"></i>
                  <p>Active</p>
                </li>
              </Link>
              <Link href="/booked-candidates">
                <li>
                  <i class="fa-solid fa-address-book"></i>
                  <p>Booked</p>
                </li>
              </Link>
              <Link href="/pending-candidates">
                <li>
                  <i class="fa-solid fa-star"></i>
                  <p>Pending</p>
                </li>
              </Link>
              <Link href="/availability-log">
                <li>
                  <i class="fa-solid fa-list"></i>
                  <p>Availability Log</p>
                </li>
              </Link>
              <Link href="/submittals">
                <li>
                  <i class="fa-solid fa-table"></i>
                  <p>Submittals</p>
                </li>
              </Link>
            </ul> */}
          </div>
        </nav>
      </div>
    </>
  );
};

export default NewSide;
