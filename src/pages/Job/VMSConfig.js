import React, { useState, useEffect } from "react";
import NewHor from "../../components/NewHor";
import TabName from "../../components/TabName";
import { HiOutlineDownload } from "react-icons/hi";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { Sidebar_Context } from "../../components/hooks/ContextSidebar";
import DatalistInput from "react-datalist-input";
import GetManagerById from "../../API/Jobs/GetManagerById";
import { getState } from "../../service/storage";

const TAGS_OPTION = [
  { id: 1, value: "Driving-License" },
  { id: 2, value: "SSN-Card" },
  { id: 3, value: "Resume" },
  { id: 4, value: "HR-sheet" },
  { id: 5, value: "Skill-Checklist" },
  { id: 6, value: "Reference-1" },
  { id: 7, value: "Reference-2" },
  { id: 8, value: "BLS" },
  { id: 9, value: "ACLS" },
  { id: 10, value: "PALS" },
  { id: 11, value: "NBRC" },
  { id: 12, value: "NRP" },
  { id: 13, value: "TNCC" },
  { id: 14, value: "CPI" },
  { id: 15, value: "Nursing-License" },
  { id: 16, value: "State-License" },
  { id: 17, value: "COVID-Card" },
  { id: 18, value: "TB-Record" },
  { id: 19, value: "Physical" },
  { id: 20, value: "Flu-record" },
  { id: 21, value: "OSHA" },
  { id: 22, value: "Fit-Test" },
  { id: 23, value: "MMR" },
  { id: 24, value: "Hep-B" },
  { id: 25, value: "Varicella" },
  { id: 26, value: "TDap" },
  { id: 27, value: "Drug-Screening" },
  { id: 28, value: "Core-Competency" },
  { id: 29, value: "Speciality-Exam" },
  { id: 30, value: "Training" },
  { id: 31, value: "COA" },
  { id: 32, value: "Background-Check" },
  { id: 33, value: "Degree-Transcript" },
  { id: 34, value: "Fingerprinting" },
  { id: 35, value: "STATE-DOC" },
];

const VMSConfig = () => {
  const [loading, setLoading] = useState();
  const [manager, setManager] = useState();

  console.log(manager);

  // const ManagerFilterId = getState("User");
  // console.log("loggedInData:", ManagerFilterId);

  //Modal  Bootstrap ******************************************

  const { isSidebarExpanded } = useContext(Sidebar_Context);

  //Row Styling ********************************************************************

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
      name: "ExternalVMSName",
      sortable: true,
      reorder: true,
      width: 10,
    },
  ];

  useEffect(() => {
    GetManagerById(setManager, setLoading);
  }, []);

  return (
    <>
      <div
        class={"container-fluid table-container"}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <NewHor />

        <div
          className={
            isSidebarExpanded ? "container " : "container tab-container"
          }
        >
          <div class="d-flex mt-2 mb-2">
            <TabName tabname="VMS ASSIGNMENT" />
            <div className="right-data d-flex align-items-center">
              <span className="sync-data">
                Data sync: <br /> 5-mins ago
              </span>
            </div>
          </div>

          <div className="container tab-container mb-5 mt-3">
            <div className="row">
              <div className="col-md-6">
                <DatalistInput
                  placeholder="Please Choose Manager"
                  label="Account Manager"
                  name="fileName"
                  items={TAGS_OPTION}
                />
              </div>
              <div className="col-md-6">
                <DatalistInput
                  placeholder="Please Choose VMS"
                  label="VMS"
                  name="fileName"
                  //   onSelect={(item) => setFileName(item.value)}
                  items={TAGS_OPTION}
                />
              </div>
            </div>
          </div>
          <div className="job-table">
            <DataTable
              columns={columns}
              //   data={allJobs}
              pagination
              selectableRows
              customStyles={customStyles}
              //   onSelectedRowsChange={(row) => setSelectedRow(row.selectedRows)}
              dense
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VMSConfig;
