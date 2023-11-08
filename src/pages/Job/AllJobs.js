import React, { useState, useEffect } from "react";
import sampledata from "../../utils/jobsampledata/sampleJobs.json";
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
import { useContext } from "react";
import { Sidebar_Context } from "../../components/hooks/ContextSidebar";
import GetAllJobs from "../../API/Jobs/GetAllJobs";
import CustomModal from "../../components/JobModal";
import { filter } from "lodash";
import profession from "../../utils/profession";
import speciality from "../../utils/speciality";
import BoldLabel from "../../components/atoms/BoldLabel";
import InputField from "../../components/atoms/InputField";
import Select from "../../components/atoms/Select";
import GetRolesAssignment from "../../API/Jobs/GetRolesAssignment";
import active_vms from "../../utils/active_vms";
import JobAssignmentRole from "../../components/molecule/JobAssignmentRole";
import GetVmsById from "../../API/Jobs/VMS/GetVmsById";
import Box from "@mui/material/Box";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import {
  applySortFilter,
  getComparator,
} from "../../components/molecule/jobs_functions/sort_filter";
import getAllVmsConfig from "../../API/Jobs/VMS/GetVmsById";
import GetActiveVMSAPI from "../../API/Jobs/GetActiveVMSAPI";
import TableGrid from "../../components/_alljobs_comp/material_new_grid";
const States = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const RobotixModalContent = (props) => {
  const { finalClickInfo, setFinalClickInfo } = props;

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="row job-select-row">
            <div className="col-md-4 job-select">
              <label>Job-ID</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={finalClickInfo.ProviderJobID}
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>Job-Title</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={finalClickInfo.Title}
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>Job Type</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={
                  finalClickInfo.WorkType == 1
                    ? "Travel"
                    : finalClickInfo.WorkType == "2"
                    ? "Perm"
                    : finalClickInfo.WorkType == 3
                    ? "Per Diem"
                    : finalClickInfo.WorkType
                }
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>Job Status</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={finalClickInfo.StatusString}
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>Job Profession</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={finalClickInfo.Degree}
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>Job Speciality</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={finalClickInfo.JobSpecialty}
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>Job Facility</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={finalClickInfo.Facility}
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>Job City</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={finalClickInfo.City}
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>Job State</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={finalClickInfo.State}
                disabled
              />
            </div>

            <div className="col-md-4 job-select">
              <label>Job On Call Rate</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={`$ ${finalClickInfo.OnCallRate}`}
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>Job Bill Rate</label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                value={`$ ${finalClickInfo.BillRate}`}
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>VMS Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={finalClickInfo.SourceName}
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>Job Start Date</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={moment(finalClickInfo["startdate"]).format("MM/DD/YYYY")}
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>Job End Date</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={moment(finalClickInfo.EndDate).format("MM/DD/YYYY")}
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>Job Posted On</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={moment(finalClickInfo["created-at"]).format(
                  "MM/DD/YYYY"
                )}
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>Job Guaranteed Hours</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={finalClickInfo.GuaranteedHours}
                disabled
              />
            </div>
            <div className="col-md-4 job-select">
              <label>Job Bonus</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={`$ ${finalClickInfo.Bonus}`}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllJobs = () => {
  const user = JSON.parse(localStorage.getItem("User"));

  const [errorState, setErrorState] = useState("");
  const [field, setField] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [finalClickInfo, setFinalClickInfo] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
  const [showCanvas, setShowCanvas] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [teamLead, setTeamLead] = useState([]);
  const [recruiterData, setRecuiterData] = useState([]);
  const [filters, setFilters] = useState({
    clientName: "",
    city: "",
    States: "",
    Profession: "",
    Speciality: " ",
    VMS: "",
    startDate: "",
    endDate: "",
  });
  const [teamLeadID, setTeamLeadID] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [assignedJobs, setAssignedJobs] = useState([]);
  const [vms, setVMS] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [dataByRole, setDataByRole] = useState([]);
  const [vmsDetails, setVMSDetails] = useState([]);
  const [loading, setLoading] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [order, setOrder] = useState("desc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [applied, setApplied] = useState([]);
  // const [selectionModel, setSelectionModel] =
  //   React.useState <
  //   import("@mui/x-data-grid").GridRowSelectionModel >
  //   (() => allJobs.filter((r) => r.age > 40).map((r) => r.id));
  // const [selectedRows, setSelectedRows] = React.useState([]);

  // console.log("selectionModel:", selectionModel);
  //Modal  Bootstrap ******************************************
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);
  const { isSidebarExpanded } = useContext(Sidebar_Context);

  const handleFilterChange = (e, name) => {
    // if(name=="VMS"){
    //   console.log(e,"DheerajArr");
    //   GetAllJobs(setAllJobs, setIsloading, e);
    // }else if(name!=""){
    //   GetAllJobs(setAllJobs, setIsloading, e.target.value);
    // }

    // GetAllJobs(setAllJobs, setIsloading, currentVMS);
    const formatDate = moment(e).format("MM/DD/YYYY");

    name === "startDate" || name === "endDate"
      ? setFilters({ ...filters, [name]: formatDate })
      : setFilters({ ...filters, [name]: e.target.value });
    setApplied(filters);
  };
  const handleOnCellClick = (params) => {
    setFinalClickInfo(params);

    handleShow();
  };

  //Row Styling ********************************************************************

  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => {
    setShowCanvas(true);
    GetAllJobs(setAllJobs, setIsloading, vmsDetails);
  };

  const loopData = filterArray.length !== 0 ? filterArray : [];

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

  /* row.WorkType == "1"
          ? "Travel"
          : row.WorkType == "2"
          ? "Perm"
          : row.WorkType == "3"
          ? "Per Diem"
          : row.WorkType,
      name: "Job-Type", */
  const columns = [
    { field: "ProviderJobID", headerName: "JOB-Id" },
    {
      field: "WorkType",
      headerName: "Work Type",
      renderCell: (params) => {
        if (params.row.WorkType == 1) {
          return <div>Travel</div>;
        } else if (params.row.WorkType == 2) {
          return <div>Perm</div>;
        } else if (params.row.WorkType == 3) {
          return <div>Per-Diem</div>;
        } else return "";
      },
    },
    { field: "StatusString", headerName: "Status" },
    { field: "Priority", headerName: "Priority" },
    { field: "Degree", headerName: "Profession" },
    { field: "JobSpecialty", headerName: "Speciality" },
    { field: "Facility", headerName: "Facility" },
    { field: "City", headerName: "city" },
    { field: "State", headerName: "state" },
    { field: "FormattedStartDate", headerName: "Start Date" },
    { field: "FormattedEndDate", headerName: "End Date" },
    { field: "Shift", headerName: "shift" },
    { field: "DurationWeeks", headerName: "Duration" },
    {
      field: "BillRate",
      headerName: "Bill rate",
      renderCell: (params) => {
        if (params.row.BillRate) {
          return <div>{params.row.BillRate}$</div>;
        } else return "";
      },
    },
    { field: "SourceName", headerName: "Vms name" },
    {
      field: "PostDate",
      headerName: "Post date",
      renderCell: (params) => {
        if (params.row.PostDate) {
          return <div>{moment(params.row.PostDate).format("DD/MM/YYYY")}</div>;
        } else return "";
      },
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

  const filteredUsers = applySortFilter(
    allJobs,
    getComparator(order, orderBy),
    filters
  );

  const userRoles = async () => {
    if (user.rollId === 7) {
      await GetRolesAssignment(setTeamLeadID, 6);
      await GetRolesAssignment(setDataByRole, 5);
    } else if (user.rollId === 6) {
      await GetRolesAssignment(setDataByRole, 5);
    } else {
      return null;
    }
  };

  useEffect(() => {
    getAllVmsConfig(setVMS, setVMSDetails);
    GetAllTeamLeads({ setTeamLead });
    GetRecruiterById({ setRecuiterData });
  }, []);

  useEffect(() => {
    userRoles();
  }, []);

  return (
    <>
      <div className="job-filter">
        <Offcanvas
          show={showCanvas}
          onHide={handleCloseCanvas}
          placement={"end"}
        >
          <Offcanvas.Header className="jobfilter" closeButton>
            <Offcanvas.Title>Apply Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="row">
              <div className="col-md-4 job-select">
                <BoldLabel boldName="Job Id" boldFor="Job Id" />
                <InputField
                  inptype="text"
                  inpid="client"
                  inpchange={(e) => handleFilterChange(e, "clientName")}
                  style={{ fontSize: "13px", fontWeight: "500" }}
                />
              </div>
              <div className="col-md-4 job-select">
                <BoldLabel boldName="Facility Name" boldFor="Facility Name" />
                <InputField
                  inptype="text"
                  inpid="facility"
                  inpchange={(e) => handleFilterChange(e, "clientName")}
                  style={{ fontSize: "13px", fontWeight: "500" }}
                />
              </div>
              <div className="col-md-4 job-select">
                <BoldLabel boldName="City" boldFor="City" />
                <InputField
                  inptype="text"
                  inpid="city"
                  inpchange={(e) => handleFilterChange(e, "city")}
                  style={{ fontSize: "13px", fontWeight: "500" }}
                />
              </div>
              <div className="col-md-4 job-select">
                <BoldLabel boldName="States" boldFor="States" />
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => handleFilterChange(e, "States")}
                >
                  <option selected>Select States</option>
                  {States.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="col-md-4 job-select">
                <BoldLabel boldName="Profession" boldFor="Profession" />
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => handleFilterChange(e, "Profession")}
                >
                  <option selected>Select Profession</option>
                  {profession.map((item, index) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 job-select">
                <BoldLabel boldName="Speciality" boldFor="Speciality" />
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => handleFilterChange(e, "Speciality")}
                >
                  <option selected>Select Speciality</option>
                  {speciality.map((item, index) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 job-select">
                <BoldLabel boldName="VMS" boldFor="VMS" />

                <select
                  class="form-select"
                  aria-label="Default select example"
                  multiple
                  onChange={(e) => {
                    handleFilterChange(field, "VMS");
                  }}
                >
                  <option selected>Select VMS</option>
                  {vms.map((item, index) => (
                    <option value={item.vmsName}>{item.vmsName}</option>
                  ))}
                </select>
              </div>

              <DateRangePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                handleFilterChange={handleFilterChange}
              />
              <div className="col-md-3 job-select mt-2">
                <button
                  className="btn btn-danger"
                  onClick={() => setFilterArray([])}
                >
                  Reset
                </button>
              </div>
              <div className="col-md-3 job-select mt-2">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setFilterArray(filteredUsers);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      {/* FILTER TABS */}
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
            <TabName tabname="Jobs" />
            <div className="right-data d-flex align-items-center">
              <Button
                variant={user.rollId === 5 ? "light" : "primary"}
                onClick={handleShow1}
                disabled={user.rollId === 5 && true}
                data-toggle={"tooltip"}
                data-placement="top"
                title="Assign a Job"
                style={{
                  padding: "12px",
                  whiteSpace: "nowrap",
                  fontSize: "11px",
                }}
              >
                Assign Job
              </Button>

              <button
                className="export-btn"
                data-toggle={"tooltip"}
                data-placement="top"
                title="Export List in CSV"
                style={{
                  width: "126px",
                  whiteSpace: "nowrap",
                  height: "40px",
                }}
                onClick={() => handleExcelExport()}
              >
                <HiOutlineDownload size={22} />
                <span>Export List</span>
              </button>
              <Button
                variant="primary"
                data-toggle={"tooltip"}
                data-placement="top"
                title="Apply Filters On Jobs"
                onClick={handleShowCanvas}
                style={{
                  padding: "12px",
                  whiteSpace: "nowrap",
                  fontSize: "11px",
                }}
              >
                <i class="fa-solid fa-filter fa-lg"></i>
                Apply Filters
              </Button>
            </div>
          </div>

          <CustomModal
            open={show}
            handleClose={handleClose}
            children={
              <RobotixModalContent
                finalClickInfo={finalClickInfo}
                setFinalClickInfo={setFinalClickInfo}
              />
            }
            jobid={finalClickInfo}
            className={"job-modal"}
          />
          <CustomModal
            open={show1}
            handleClose={handleClose1}
            children={
              <JobAssignmentRole
                dataByRole={dataByRole}
                teamLeadID={teamLeadID}
                finalClickInfo={finalClickInfo}
                setFinalClickInfo={setFinalClickInfo}
              />
            }
            jobid={0}
            className={"assign-modal"}
          />
          <div className="job-table">
            {filterArray.length !== 0 ? (
              <div className="applied-filers ">
                <h5>Filters</h5>
                {Object.keys([filters[0]]).map((key, i) => (
                  <>
                    <span>{key}</span>
                    <span>{[filters][key].city}</span>
                  </>
                ))}
              </div>
            ) : (
              ""
            )}
            {isloading ? (
              <>
                {errorState ? (
                  errorState
                ) : (
                  <div class="text-center p-5">
                    Please Select VMS to get dataew by Clicking on apply filters
                  </div>
                )}
              </>
            ) : (
              <>
                {allJobs.length === 0 ? (
                  <div class="text-center p-5">
                    Please Select VMS to get daweta by Clicking on apply filters
                  </div>
                ) : (
                  <TableGrid data={allJobs} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllJobs;
// <DataGrid
//   columns={columns}
//   rows={allJobs}
//   initialState={{
//     pagination: {
//       paginationModel: { page: 0, pageSize: 10 },
//     },
//   }}
//   getRowId={(row) => row.ProviderJobID}
//   autoHeight={true}
//   dense
//   checkboxSelection={true}
//   isRowSelectable={(params) => {
//     const { row } = params;
//     console.log(row);
//     return user.rollId == 7 && row.amId > 0
//       ? false
//       : user.rollId == 6 && row.tlId >= 0
//       ? false
//       : user.rollId == 5 && row.amId >= 0
//       ? false
//       : true;
//   }}
//   onRowSelectionModelChange={(row) => {
//     // setSelectedRow(row.selectedRows);
//     setFinalClickInfo(row);
//   }}
//   // onRowClicked={(row) => handleOnCellClick(row)}
//   // selectableRowDisabled={(row) =>
//   //   user.rollId == 7 && row.amId >= 0
//   //     ? true
//   //     : user.rollId == 6 && row.tlId >= 0
//   //     ? true
//   //     : user.rollId == 5 && row.amId >= 0
//   //     ? true
//   //     : false
//   // }
//   // dense
// />
