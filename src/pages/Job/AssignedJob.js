import React, { useState, useEffect } from "react";
import NewHor from "../../components/NewHor";
import TabName from "../../components/TabName";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { HiOutlineDownload } from "react-icons/hi";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx/xlsx.mjs";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import DateRangePicker from "../../components/DateRangePicker";
import GetAllTeamLeads from "../../API/User/GetAllTeamLeads";
import GetRecruiterById from "../../API/User/GetRecruiterById";
import sampledata from "../../utils/jobsampledata/sampleJobs.json";
import GetAssignedJobs from "../../API/Jobs/GetAssignedJobs";
import { useContext } from "react";
import { Sidebar_Context } from "../../components/hooks/ContextSidebar";

const AssignedJob = () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [assignedJobs, setAssignedJobs] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const { isSidebarExpanded } = useContext(Sidebar_Context);
  const loopData = [];

  const customStyles = {
    rows: {
      style: {
        width: "1px",
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
      selector: (row) => row.Shift,
      name: "Shift",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 11,
      selector: (row) => row.DurationWeeks,
      name: "DurationWeeks",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 12,
      selector: (row) => `$ ${row.BillRate}`,
      name: "BillRate",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 13,
      selector: (row) => row.ExternalVMSName,
      name: "ExternalVMSName",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 14,
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
  const filterData = () => {};
  useEffect(() => {
    GetAssignedJobs(setAssignedJobs, setIsloading);
    filterData();
  }, []);

  var rows = [];
  for (let index = 0; index < assignedJobs.length; index++) {
    const element = assignedJobs[index];
    const data = JSON.parse(element.assignedJobs);

    for (var i of data) {
      var row = sampledata.filter((item) => item.ProviderJobID === i);
      rows.push(...row);
    }
  }
  console.log(rows);
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
              onSelectedRowsChange={(row) => setSelectedRow(row.selectedRows)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignedJob;
