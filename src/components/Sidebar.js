import React from "react";
import Collapsible from "react-collapsible";
// import { GoChevronRight,  } from "react-icons/go";
import { Link } from "react-router-dom";
import Header from "./Header";
import SuperAdminRoutes from "../utils/Sidebar/SuperAdminRoutes";
import AdminRoutes from "../utils/Sidebar/AdminRoutes";
import ModeratorRoutes from "../utils/Sidebar/ModeratorRoutes";
import OnboardingRoutes from "../utils/Sidebar/OnboardingRoutes";
import RecruiterRoutes from "../utils/Sidebar/RecruiterRoutes";
import TeamLeadRoutes from "../utils/Sidebar/TeamLeadRoutes";
import AccountManagerRoutes from "../utils/Sidebar/AccountManagerRoutes";

const Sidebar = () => {
  const userData = localStorage.getItem("User");
  const user = JSON.parse(userData);
  const ROLLS =
    user.rollId == 1
      ? SuperAdminRoutes
      : user.rollId == 2
      ? AdminRoutes
      : user.rollId == 3
      ? ModeratorRoutes
      : user.rollId == 4
      ? OnboardingRoutes
      : user.rollId == 5
      ? RecruiterRoutes
      : user.rollId == 6
      ? TeamLeadRoutes
      : user.rollId == 7
      ? AccountManagerRoutes
      : "";

  return (
    <>
      <Header />
      <div id="sidebar-wrapper">
        <div className="home-btn">
          <i class="fa fa-home"></i>
          <Link to="/dashboard">
            <span>Dashboard</span>
          </Link>
        </div>
        {ROLLS.map((item, index) => {
          return (
            <Collapsible
              trigger={[
                <i class={item.iconleft}></i>,
                <span className="trig-span">{item.subheader}</span>,
                <i class={item.icon}></i>,
                ,
              ]}
            >
              {item.items.map((children, index) => {
                const { title, path } = children;
                return (
                  <ul className="sidebar-list">
                    <Link to={path}>
                      <li>{title}</li>
                    </Link>
                  </ul>
                );
              })}
            </Collapsible>
          );
        })}
        <div className="home-btn">
          <i class="fa fa-home"></i>
          <Link to="/portal">
            <span>Jobs Portal</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
