import React from "react";
import Collapsible from "react-collapsible";
// import { GoChevronRight,  } from "react-icons/go";
import { Link } from "react-router-dom";
import Header from "./Header";

const Sidebar = () => {
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
        <Collapsible
          trigger={[
            <i class="fa-solid fa-user"></i>,
            <span className="trig-span">User</span>,
            <i class="fas fa-chevron-right"></i>,
          ]}
        >
          <ul className="sidebar-list">
            <Link to="/dashboard/add-user">
              <li>Add User</li>
            </Link>
            <Link to="/dashboard/view-user">
              <li>View User</li>
            </Link>
          </ul>
        </Collapsible>
        <Collapsible
          trigger={[
            <i class="fa-solid fa-id-card-clip"></i>,
            <span className="trig-span">Employees</span>,
            <i class="fas fa-chevron-right"></i>,
          ]}
        >
          <ul className="sidebar-list">
            <Link to="/dashboard/view-employee">
              <li>Employee Controls</li>
            </Link>
          </ul>
        </Collapsible>
        <Collapsible
          trigger={[
            <i class="fa-solid fa-building-columns"></i>,
            <span className="trig-span">Projects</span>,
            <i class="fas fa-chevron-right"></i>,
          ]}
        >
          <ul className="sidebar-list">
            <Link to="/dashboard/view-project">
              <li>Manage Projects</li>
            </Link>
          </ul>
        </Collapsible>
        <Collapsible
          trigger={[
            <i class="fa-solid fa-users"></i>,
            <span className="trig-span">Client</span>,
            <i class="fas fa-chevron-right"></i>,
          ]}
        >
          <ul className="sidebar-list">
            <Link to="/dashboard/add-client">
              <li>Add Client</li>
            </Link>
            <Link to="/dashboard/view-client">
              <li>View Client</li>
            </Link>
          </ul>
        </Collapsible>
        <Collapsible
          trigger={[
            <i class="fa-solid fa-file-export"></i>,
            <span className="trig-span">Facility</span>,
            <i class="fas fa-chevron-right"></i>,
          ]}
        >
          <ul className="sidebar-list">
            <Link to="/dashboard/add-facility">
              <li>Add Facility</li>
            </Link>
            <Link to="/dashboard/view-facility">
              <li>View Facility</li>
            </Link>
          </ul>
        </Collapsible>
        <Collapsible
          trigger={[
            <i class="fa-solid fa-briefcase"></i>,
            <span className="trig-span">VMS</span>,
            <i class="fas fa-chevron-right"></i>,
          ]}
        >
          <ul className="sidebar-list">
            <Link to="/dashboard/add-vms">
              <li>Add VMS</li>
            </Link>
            <Link to="/dashboard/view-vms">
              <li>View VMS</li>
            </Link>
          </ul>
        </Collapsible>
        <Collapsible
          trigger={[
            <i class="fa-solid fa-chart-simple"></i>,
            <span className="trig-span">Change-Logs</span>,
            <i class="fas fa-chevron-right"></i>,
          ]}
        >
          <ul className="sidebar-list">
            <Link to="/dashboard/employee-logs">
              <li>Employee Logs</li>
            </Link>
            <Link to="/dashboard/project-logs">
              <li>Project Logs</li>
            </Link>
            <Link to="/dashboard/project-extension-logs">
              <li>Project Extension Logs</li>
            </Link>
            <Link to="/dashboard/timesheet-logs">
              <li>Timesheet Logs</li>
            </Link>
          </ul>
        </Collapsible>
      </div>
    </>
  );
};

export default Sidebar;
