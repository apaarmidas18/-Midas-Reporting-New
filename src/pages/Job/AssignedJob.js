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

const AssignedJob = () => {
  const [loading, setLoading] = useState("");
  const [data, setUserData] = useState([]);
  const [recruiterData, setRecruiterData] = useState([]);
  const [manager, setManager] = useState([]);
  const [assignedJobs, setAssignedJobs] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const { isSidebarExpanded } = useContext(Sidebar_Context);
  const loopData = [];

  const customStyles = {
    rows: {
      style: {
        fontSize: "13px",
      },
    },
    headCells: {
      style: {
        fontSize: "13px",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
      },
    },
  };
  const columns = [
    {
      id: 1,
      selector: (row) => row.assigner,
      name: "Assigner",
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      selector: (row) => row.assignee,
      name: "Assigner",
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      selector: (row) => row.assignType,
      name: "Assign type",
      sortable: true,
      reorder: true,
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
  for (let index = 0; index < assignedJobs.length; index++) {
    const element = assignedJobs[index];
    var name1 = "";
    var name2 = "";
    var type = "";

    data
      .filter((item, index) => item.id === element.assignee)
      .map((ite, index) => {
        return (name1 = ite.name);
      });
    data
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
      assignee: name1,
      assigner: name2,
      assignType: type,
    });
  }
  console.log(data);
  return (
    <>
      <div
        class="container-fluid table-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <NewHor />
        <div
          className={
            isSidebarExpanded ? "container " : "container tab-container"
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
          <div className="job-table">
            <DataTable
              columns={columns}
              data={rows}
              pagination
              selectableRows
              customStyles={customStyles}
              // onSelectedRowsChange={(row) => setSelectedRow(row.selectedRows)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignedJob;
