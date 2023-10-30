import React from "react";

import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";

import Adduser from "../pages/User/Adduser";

import Employeecontrol from "../pages/Employee/Employeecontrol";

import Home from "../pages/Home";

import Manageproject from "../pages/Project/Manageproject";

import Viewclient from "../pages/Client/Viewclient";

import Viewfacility from "../pages/Facility/Viewfacility";

import Viewuser from "../pages/User/Viewuser";

import Viewvms from "../pages/VMS/Viewvms";

import Employeelogs from "../pages/Employeelogs";

import Projectlogs from "../pages/Projectlogs";

import Projectextension from "../pages/Projectextension";

import Timesheetlogs from "../pages/Timesheetlogs";

import Addclient from "../pages/Client/Addclient";

import Addfacility from "../pages/Facility/Addfacility";

import Addvms from "../pages/VMS/Addvms";

import Login from "../pages/Login";

import GuestGuard from "../Guards/GuestGuard";

import AuthGuard from "../Guards/AuthGuard";

import EditUser from "../pages/User/EditUser";

import EditClient from "../pages/Client/EditClient";

import AddEmployee from "../pages/Employee/AddEmployee";

import EditEmployee from "../pages/Employee/EditEmployee";

import Editfacility from "../pages/Facility/Editfacility";

import Editvms from "../pages/VMS/Editvms";

import AddProject from "../pages/Project/AddProject";

import EditProject from "../pages/Project/EditProject";

import ViewProjectid from "../pages/Project/ViewProjectid";

import AddProjectExtension from "../pages/Project/AddProjectExtension";

import EditProjectExtension from "../pages/Project/EditProjectExtension";

import Timesheet from "../pages/Timesheet/CreateAndViewTimesheer";

import EditTimeSheet from "../pages/Timesheet/EditTimeSheet";

import UploadDoc from "../pages/Document/UploadDocument";
import ViewChecklist from "../pages/Checklist/Viewchecklist";

import ChecklistDetails from "../pages/Checklist/ChecklistDetails";
import AddTemplates from "../pages/Templates/AddTemplates";
import EditTemplates from "../pages/Templates/EditTemplates";
import ViewTemplates from "../pages/Templates/ViewTemplates";
import PendingDocument from "../pages/PendingDocument";
import PortalLayout from "../layout/PortalLayout";
import PortalHome from "../pages/PortalRoutes/PortalHome";
import ViewDocument from "../pages/Templates/ViewDocument";
import ActiveCandidates from "../pages/Job/ActiveCandidates";
import Booked from "../pages/Job/Booked";
import ExtensionCandidates from "../pages/Job/ExtensionCandidates";
import PendingCandidates from "../pages/Job/Pending";
import AvailabilityLog from "../pages/Job/AvailabilityLog";
import RequestDocument from "../pages/Templates/RequestDocument";
import AllJobs from "../pages/Job/AllJobs";
import AssignedJob from "../pages/Job/AssignedJob";
import ActiveVMS from "../pages/Job/ActiveVMS";
import VMSConfig from "../pages/Job/VMSConfig";

export const Router = () => {
  return useRoutes([
    {
      path: "",

      children: [
        {
          path: "",

          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },

        // {

        //   path: "register",

        //   element: (

        //     <GuestGuard>

        //       <Register />

        //     </GuestGuard>

        //   ),

        // },
      ],
    },

    {
      path: "/template",
      element: "",
      children: [
        { path: "view-document/:templateid", element: <ViewDocument /> },
        { path: "request-document/:requestid", element: <RequestDocument /> },
      ],
    },
    {
      path: "/dashboard",

      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),

      children: [
        {
          path: "",
          element: <Navigate to="/dashboard/home" replace />,
        },

        { path: "home", element: <Home /> },

        { path: "add-user", element: <Adduser /> },

        { path: "view-user", element: <Viewuser /> },

        { path: "edit-user", element: <EditUser /> },

        { path: "view-employee", element: <Employeecontrol /> },

        { path: "add-employee", element: <AddEmployee /> },

        { path: "edit-employee", element: <EditEmployee /> },

        { path: "view-project", element: <Manageproject /> },

        { path: "project-extension", element: <AddProjectExtension /> },

        // { path: "edit-project-extension", element: <AddProjectExtension /> },

        { path: "edit-extension", element: <EditProjectExtension /> },

        { path: "view-project-by-empid", element: <ViewProjectid /> },

        { path: "add-project", element: <AddProject /> },

        { path: "edit-project", element: <EditProject /> },

        { path: "view-client", element: <Viewclient /> },

        { path: "edit-client", element: <EditClient /> },

        { path: "add-client", element: <Addclient /> },

        { path: "view-facility", element: <Viewfacility /> },

        { path: "add-facility", element: <Addfacility /> },

        { path: "edit-facility", element: <Editfacility /> },

        { path: "view-vms", element: <Viewvms /> },

        { path: "add-vms", element: <Addvms /> },

        { path: "edit-vms", element: <Editvms /> },

        { path: "employee-logs", element: <Employeelogs /> },

        { path: "project-logs", element: <Projectlogs /> },

        { path: "project-extension-logs", element: <Projectextension /> },

        { path: "timesheet-logs", element: <Timesheetlogs /> },

        { path: "timesheet", element: <Timesheet /> },

        { path: "edit-timesheet", element: <EditTimeSheet /> },

        { path: "upload-document", element: <UploadDoc /> },

        { path: "view-checklist", element: <ViewChecklist /> },

        { path: "view-list-details", element: <ChecklistDetails /> },
        { path: "view-pending", element: <PendingDocument /> },
        { path: "view-templates", element: <ViewTemplates /> },

        { path: "edit-templates", element: <EditTemplates /> },

        { path: "add-templates", element: <AddTemplates /> },
      ],
    },
    {
      path: "/portal",

      element: (
        <>
          <PortalLayout />
        </>
      ),

      children: [
        // { path: "portal", element: <Navigate to="/portal/home" replace /> },

        { path: "jobs", element: <AllJobs /> },
        { path: "active-candidates", element: <ActiveCandidates /> },
        { path: "assigned-job", element: <AssignedJob /> },
        { path: "booked-candidates", element: <Booked /> },
        { path: "extension-candidates", element: <ExtensionCandidates /> },
        { path: "pending-candidates", element: <PendingCandidates /> },
        { path: "availability-log", element: <AvailabilityLog /> },
        { path: "job-vms", element: <ActiveVMS /> },
        { path: "vms-config", element: <VMSConfig /> },
      ],
    },
  ]);
};
