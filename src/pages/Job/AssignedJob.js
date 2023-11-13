import React, { useState, useEffect } from "react";
import NewHor from "../../components/NewHor";
import TabName from "../../components/TabName";
import moment from "moment";
import { HiOutlineDownload } from "react-icons/hi";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx/xlsx.mjs";
import sampledata from "../../utils/jobsampledata/sampleJobs.json";
import GetAssignedJobs from "../../API/Jobs/GetAssignedJobs";
import { useContext } from "react";
import { Sidebar_Context } from "../../components/hooks/ContextSidebar";
import GetManagerById from "../../API/Jobs/GetManagerById";
import recruiter from "./assigned_data_factory/recruiter";
import { teamlead } from "./assigned_data_factory/teamlead";
import GetAllUsers from "../../API/User/GetAllUsers";
import assignee_stat from "../../utils/Jobs/assignee_stat";
import TableGrid from "../../components/_alljobs_comp/material_new_grid";

const AssignedJob = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  const [loading, setLoading] = useState("");
  const [data_user, setUserData] = useState([]);
  const [recruiterData, setRecruiterData] = useState([]);
  const [manager, setManager] = useState([]);
  const [assignedJobs, setAssignedJobs] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const { isSidebarExpanded } = useContext(Sidebar_Context);
  const loopData = [];

  const customStyles = {
    rows: {
      style: {
        width: "100px",
        fontSize: "13px",
      },
    },
    headCells: {
      style: {
        width: "1px",
        fontSize: "13px",
      },
    },
    cells: {
      style: {
        width: "1px",
        fontSize: "13px",
        borderBottom: "1px solid #dedede",
      },
    },
  };
  const columns = [
    {
      id: 1,
      selector: (row) => row.ProviderJobID,
      name: "Job-ID",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 2,
      selector: (row) =>
        row.WorkType == "1"
          ? "Travel"
          : row.WorkType == "2"
          ? "Perm"
          : row.WorkType == "3"
          ? "Per Diem"
          : row.WorkType,
      name: "Job-Type",
      sortable: true,
      reorder: true,
      width: 5,
    },
    {
      id: 3,
      selector: (row) => row.StatusString,
      name: "Status",
      conditionalCellStyles: [
        {
          when: (row) => row.StatusString === "Open",
          style: {
            backgroundColor: "#ccffb2bd",
            color: "black",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row.StatusString === "Cancelled",
          style: {
            backgroundColor: "#ff7c7c",
            color: "white",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row.StatusString === "Manually Frozen",
          style: {
            backgroundColor: "rgb(253 189 111)",
            color: "white",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row.StatusString === "Closed",
          style: {
            backgroundColor: "#dc3545",
            color: "white",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 4,
      selector: (row) => row.Priority,
      name: "Priority",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 5,
      selector: (row) => row.Degree,
      name: "Prof",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 6,
      selector: (row) => row.JobSpecialty,
      name: "Speciality",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 7,
      selector: (row) => row.Facility,
      name: "Facility",
      sortable: true,
      reorder: true,
      width: 50,
    },
    {
      id: 8,
      selector: (row) => row.City,
      name: "City",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 9,
      selector: (row) => row.State,
      name: "State",
      sortable: true,
      reorder: true,
      width: 10,
    },

    {
      id: 10,
      selector: (row) => row.FormattedStartDate,
      name: "Start Date",
      sortable: true,
      reorder: true,
    },
    {
      id: 11,
      selector: (row) => row.FormattedEndDate,
      name: "End Date",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 12,
      selector: (row) => row.Shift,
      name: "Shift",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 13,
      selector: (row) => row.DurationWeeks,
      name: "DurationWeeks",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 14,
      selector: (row) => `$ ${row.BillRate}`,
      name: "BillRate",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 15,
      selector: (row) => row.SourceName,
      name: "VMS-Name",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 16,
      selector: (row) => moment(row.PostDate).format("MM/DD/YYYY"),
      name: "PostDate",
      sortable: true,
      reorder: true,
      width: 50,
    },
  ];

  const handleExcelExport = () => {
    const filteredData = loopData.map((item) => {
      return {
        Job_ID: item.ProviderJobID,
        Job_Type:
          item.WorkType == "1"
            ? "Travel"
            : item.WorkType == "2"
            ? "Perm"
            : item.WorkType == "3"
            ? "Per Diem"
            : item.WorkType,

        Status: item.StatusString,
        Priority: item.Priority,
        Prof: item.Degree,
        Speciality: item.JobSpecialty,
        Facility: item.Facility,
        City: item.Facility,
        State: item.State,
        Shift: item.Shift,
        WorkingWeeks: item.DurationWeeks,
        BillRate: item.BillRate,
        ExternalVMSName: item.ExternalVMSName,
        PostDate: moment(item.PostDate).format("MM/DD/YYYY"),
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Job-List.xlsx"); // Adjust the filename as needed
  };

  useEffect(() => {
    GetAssignedJobs(setAssignedJobs, setIsloading);
    GetAllUsers({ setUserData, setLoading });
  }, []);

  var rows = [];
  var jobsfeeds = [];
  for (let index = 0; index < assignedJobs.length; index++) {
    const element = assignedJobs[index];
    var name1 = "";
    var name2 = "";
    var type = "";

    data_user
      .filter((item, index) => item.id === element.assignee)
      .map((ite, index) => {
        return (name1 = ite.name);
      });
    data_user
      .filter((item, index) => item.id === element.assigner)
      .map((ite, index) => {
        return (name2 = ite.name);
      });

    assignee_stat
      .filter((item, index) => item.value === element.assignType)
      .map((ite, index) => {
        return (type = ite.label);
      });

    rows.push({
      ...element,
      assignee: name2,
      assigner: name1,
      assignType: type,
    });

    jobsfeeds.push(...element.jobsFeedsSet);
  }
  var assignJobdetails = [];

  for (let index = 0; index < jobsfeeds.length; index++) {
    const element = jobsfeeds[index];
    var name1 = "";
    var name2 = "";

    data_user
      .filter((item, index) => item.id === element.amId)
      .map((ite, index) => {
        return (name1 = ite.name);
      });

    data_user
      .filter((item, index) => item.id === element.tlId)
      .map((ite, index) => {
        return (name2 = ite.name);
      });

    assignJobdetails.push({
      ...element,
      assignee: name2,
      assigner: name1,
    });
  }

  return (
    <>
      <div
        class="container-fluid table-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <NewHor />
        <div
          className={
            isSidebarExpanded ? "container" : "container tab-container"
          }
        >
          <div class="d-flex">
            <TabName tabname="Assigned Jobs" />
            <button
              className="export-btn"
              style={{
                width: "126px",
                whiteSpace: "nowrap",
                height: "40px",
                marginTop: "6px",
              }}
              onClick={() => handleExcelExport()}
            >
              <HiOutlineDownload size={22} />
              <span>Export List</span>
            </button>
          </div>
          <TableGrid
            data={assignJobdetails}
            user={user}
            columnsss={columns}
            route={"assigned"}
            userData={data_user}
          />
        </div>
      </div>
    </>
  );
};

export default AssignedJob;
