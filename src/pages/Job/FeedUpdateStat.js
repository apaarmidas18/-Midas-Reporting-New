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
// import loader from "../../lottie/search.json";
import Loader from "../../components/atoms/Loader";
import FeedStats from "../../API/Jobs/FeedStats";


const FeedUpdateStat = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  
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

  const [allJobs, setAllJobs] = useState([]);
  const [feedStats, setFeedStats] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [order, setOrder] = useState("desc");
  const [selected, setSelected] = useState("");
 


  const { isSidebarExpanded } = useContext(Sidebar_Context);




  useEffect(() => {
    FeedStats( setFeedStats, setIsloading );
  }, []);

  console.log(feedStats);

  return (
    <>
      <div
        class={"container-fluid table-container"}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <NewHor tab="Feed Stats" />

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
                {feedStats.length === 0 ? (
                  <div class="text-center p-5">
                    Please wait for data fetching to get started
                  </div>
                ) : (
                  <TableGrid
                    data={feedStats}
                    user={user}
                    setSelected={setSelected}
                    selected={selected}
                    route={"feeds"}
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

export default FeedUpdateStat;
