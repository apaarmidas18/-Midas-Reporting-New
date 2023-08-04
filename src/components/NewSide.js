import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const NewSide = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarExpanded((prevExpanded) => !prevExpanded);
  };
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
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NewSide;
