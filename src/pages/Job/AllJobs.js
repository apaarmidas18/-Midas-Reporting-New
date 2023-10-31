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
import AssignJobs from "../../API/Jobs/AssignJobs";
import { useContext } from "react";
import { Sidebar_Context } from "../../components/hooks/ContextSidebar";
import GetAllJobs from "../../API/Jobs/GetAllJobs";
import CustomModal from "../../components/JobModal";
import { filter } from "lodash";
import profession from "../../utils/profession";
import speciality from "../../utils/speciality";
import BoldLabel from "../../components/atoms/BoldLabel";
import InputField from "../../components/atoms/InputField";
import AllVms from "../../utils/jobsampledata/samplevms.json";
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

const ModalContent = (props) => {
  const { finalClickInfo, setFinalClickInfo } = props;

  return (
    <div>
      <div className="row">
        <div className="col-md-4 ">
          <BoldLabel boldName="Assignee" boldFor="Assignee" />
          <InputField
            inptype="text"
            inpid="Assignee"
            inpvalue={"Gaurav Singh"}
            style={{ fontSize: "15px !important", fontWeight: "500" }}
            disabled
          />
        </div>

        <div className="col-md-4 ">
          <BoldLabel boldName="Assigner" boldFor="Assigner" />
          <InputField
            inptype="text"
            inpid="Assigner"
            inpvalue={"Nitesh Yadav"}
            style={{ fontSize: "15px", fontWeight: "500" }}
            disabled
          />
        </div>
        <span>Job ID-</span>
        <button className="btn job-common-btn">Submit</button>
      </div>
    </div>
  );
};
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
  const [errorState, setErrorState] = useState("");

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
  const [teamLeadID, setTeamLeadID] = useState("");
  const [selectedRow, setSelectedRow] = useState([]);
  const [assignedJobs, setAssignedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [order, setOrder] = useState("desc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [applied, setApplied] = useState([]);
  //Modal  Bootstrap ******************************************
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);
  const { isSidebarExpanded } = useContext(Sidebar_Context);

  const handleFilterChange = (e, name) => {
    // GetAllJobs(setAllJobs, setIsloading, e.target.value);

    const formatDate = moment(e).format("MM/DD/YYYY");

    name === "startDate" || name === "endDate"
      ? setFilters({ ...filters, [name]: formatDate })
      : setFilters({ ...filters, [name]: e.target.value });
    setApplied(filters);
  };
  const handleOnCellClick = (params) => {
    setFinalClickInfo(params);
    console.log(params);
    handleShow();
  };

  //Row Styling ********************************************************************

  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);

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

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query.city !== "") {
      if (query) {
        return filter(
          array,
          (_jobs) =>
            _jobs.City.toLowerCase().indexOf(query.city.toLowerCase()) !== -1
        );
      }
      return stabilizedThis.map((el) => el[0]);
    } else if (query.States !== "") {
      if (query) {
        return filter(
          array,
          (_jobs) =>
            _jobs.State.toLowerCase().indexOf(query.States.toLowerCase()) !== -1
        );
      }
    } else if (query.Profession !== "") {
      if (query) {
        return filter(
          array,
          (_jobs) =>
            _jobs.Degree.toLowerCase().indexOf(
              query.Profession.toLowerCase()
            ) !== -1
        );
      }
    } else if (query.Speciality !== "") {
      if (query) {
        return filter(
          array,
          (_jobs) =>
            _jobs.JobSpecialty.toLowerCase().indexOf(
              query.Speciality.toLowerCase()
            ) !== -1
        );
      }
    } else if (query.startDate !== "" && query.endDate !== "") {
      if (query) {
        return filter(
          array,
          (_jobs) =>
            _jobs.FormattedStartDate >= query.endDate &&
            _jobs.FormattedEndDate <= query.startDate !== -1
        );
      }
    } else if (query.VMS !== "") {
      if (query) {
        return filter(
          array,
          (_jobs) =>
            _jobs.SourceName.toLowerCase().indexOf(query.VMS.toLowerCase()) !==
            -1
        );
      }
      {
        if (query) {
          return filter(
            array,
            (_jobs) =>
              _jobs.Facility.toLowerCase().indexOf(
                query.clientName.toLowerCase()
              ) !== -1
          );
        }
      }
    }
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const filteredUsers = applySortFilter(
    sampledata,
    getComparator(order, orderBy),
    filters
  );

  useEffect(() => {
    GetAllTeamLeads({ setTeamLead });
    GetRecruiterById({ setRecuiterData });
  }, []);

  return (
    <>
      {/* FILTER TABS */}

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
                  onChange={(e) => {
                    handleFilterChange(e, "VMS");
                    handleCloseCanvas();
                  }}
                >
                  <option selected>Select VMS</option>
                  {AllVms.map((item, index) => (
                    <option value={item}>{item}</option>
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
              <span className="sync-data">
                Data sync: <br /> 5-mins ago
              </span>
              <Button
                variant="primary"
                onClick={handleShow1}
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
            jobid={finalClickInfo.ProviderJobID}
            className={"job-modal"}
          />
          <CustomModal
            open={show1}
            handleClose={handleClose1}
            children={<ModalContent />}
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
                    Please Select VMS to get data by Clicking on apply filters
                  </div>
                )}
              </>
            ) : (
              <>
                {allJobs.length === 0 ? (
                  <div class="text-center p-5">
                    Please Select VMS to get data by Clicking on apply filters
                  </div>
                ) : (
                  <DataTable
                    columns={columns}
                    data={allJobs}
                    pagination
                    selectableRows
                    customStyles={customStyles}
                    onSelectedRowsChange={(row) =>
                      setSelectedRow(row.selectedRows)
                    }
                    onRowClicked={(row) => handleOnCellClick(row)}
                    dense
                  />
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
