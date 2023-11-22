import React, { useState, useEffect } from "react";
import NewHor from "../../components/NewHor";
// import TabName from "../../components/TabName";
import moment from "moment";
import { HiOutlineDownload } from "react-icons/hi";
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
import profession from "../../utils/profession";
import speciality from "../../utils/speciality";
import BoldLabel from "../../components/atoms/BoldLabel";
import InputField from "../../components/atoms/InputField";
import GetRolesAssignment from "../../API/Jobs/GetRolesAssignment";
import JobAssignmentRole from "../../components/molecule/JobAssignmentRole";
import Lottie from "react-lottie";
import getAllVmsConfig from "../../API/Jobs/VMS/GetVmsById";
import TableGrid from "../../components/_alljobs_comp/material_new_grid";
import Loader from "../../components/atoms/Loader";
import sampleJobs from "../../utils/jobsampledata/sampleJobs";

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
  const [allJobs, setAllJobs] = useState([]);
  const [dataByRole, setDataByRole] = useState([]);
  const [loading, setLoading] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [order, setOrder] = useState("desc");
  const [selected, setSelected] = useState("");
  const [applied, setApplied] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);
  const { isSidebarExpanded } = useContext(Sidebar_Context);

  const handleFilterChange = (e, name) => {
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

  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => {
    setShowCanvas(true);
  };

  const handleExcelExport = () => {
    const filteredData = allJobs.map((item) => {
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
  const masterApicall = async () => {
    await getAllVmsConfig();
    await GetAllJobs(setAllJobs, setIsloading);
  };
  useEffect(() => {
    GetAllTeamLeads({ setTeamLead });
    GetRecruiterById({ setRecuiterData });
    masterApicall();
    setIsloading(false);
  }, []);

  useEffect(() => {
    userRoles();
  }, []);
  return (
    <>
      <div
        class={"container-fluid table-container"}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <NewHor tab="JOBS" />
        <div
          className={
            isSidebarExpanded
              ? "container mt-2 mb-2"
              : "container tab-container mt-2 mb-2"
          }
        >
          <div className="job-table">
            {isloading ? (
              <>
                <Loader />
              </>
            ) : (
              <>
                {allJobs.length === 0 ? (
                  <div class="text-center p-5">
                    Please wait for data fetching to get started
                  </div>
                ) : (
                  <TableGrid
                    data={allJobs}
                    user={user}
                    setSelected={setSelected}
                    selected={selected}
                    teamLead={teamLead}
                    recruiterData={recruiterData}
                    setAllJobs={setAllJobs}
                    setIsloading={setIsloading}
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
