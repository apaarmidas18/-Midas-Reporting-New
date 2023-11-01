import React, { createContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import NewHor from "./NewHor";
import { useContext } from "react";
import { Sidebar_Context } from "./hooks/ContextSidebar";
import AdminRoutes from "../utils/PortalRoutes/AdminRoutes";
import TeamLeadRoutes from "../utils/PortalRoutes/TeamLeadRoutes";
import AccountManagerRoutes from "../utils/PortalRoutes/AccountManagerRoutes";
import RecruiterRoutes from "../utils/PortalRoutes/RecruiterRoutes";

const PortalSidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const user = JSON.parse(localStorage.getItem("User"));
  const { isSidebarExpanded, handleToggleSidebar } =
    useContext(Sidebar_Context);
  // const handleToggleSidebar = (item) => {
  //   setIsSidebarExpanded((prevExpanded) => !prevExpanded);
  // };

  const liColor = (item) => {
    setSelectedItem(item);
  };

  const highlightedItemClass = "light-active";

  const Routes =
    user.rollId == 1 || user.rollId == 2
      ? AdminRoutes
      : user.rollId == 6
      ? TeamLeadRoutes
      : user.rollId == 7
      ? AccountManagerRoutes
      : user.rollId == 5
      ? RecruiterRoutes
      : null;

  return (
    <>
      <div
        className={`sidebar ${isSidebarExpanded ? "expanded " : "collapsed"}`}
      >
        <div className="side-button">
          <button className="toggle-button" onClick={handleToggleSidebar}>
            <i
              style={{ color: "#fff" }}
              className="fa-solid fa-chevron-left"
            ></i>
          </button>
        </div>
        <nav className="menu">
          <div className="avatar-menu text-center">
            <img src="/images/avatar.svg" />
            <p>{user.name}</p>
            <h6>
              {user.rollId == 7
                ? "Account Manager"
                : user.rollId == 6
                ? "Team Lead"
                : user.rollId == 5
                ? "Recruiter"
                : null}
            </h6>
          </div>
          <div className="sidebar-logo text-center">
            <img src="/images/logob.png" />
          </div>
          <div className="nav-tabs mt-3" style={{ borderBottom: "none" }}>
            <ul className="new-sidebar-list">
              {Routes.map((item, index) => {
                return (
                  <li key={index} onClick={() => liColor(item.tabname)}>
                    <span
                      className={
                        selectedItem === item.tabname
                          ? highlightedItemClass
                          : ""
                      }
                    >
                      <i className={item.fontlogo}></i>

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

export default PortalSidebar;
