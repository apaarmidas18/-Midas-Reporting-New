import React, { useState, useEffect, useContext } from "react";
import NewHor from "../../components/NewHor";
import TabName from "../../components/TabName";
import { Sidebar_Context } from "../../components/hooks/ContextSidebar";
import DashCard from "../../components/portaldash/DashCard";
// import { Chart } from "react-google-charts";

const PortalDash = () => {
  // const data = [
  //   ["Task", "Total Jobs"],
  //   ["Closed", 17219],
  //   ["Open", 5201],
  //   ["Filled", 290],
  //   ["Cancelled", 1400],
  //   // ["Sleep", 7],
  // ];

  // const options = {
  //   title: "All Jobs",
  // };

  const { isSidebarExpanded } = useContext(Sidebar_Context);
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
          <div className="container dashboard-page mt-2">
            <div className="dash-head mb-2">
              <h3>Dashboard</h3>
              <span>
                On this screen you can get all the essential status of your work
              </span>
            </div>
            <div className="row">
              <div className="col-md-4 ">
                <DashCard
                  bgclass="first-card"
                  iclass="fa-solid fa-check-to-slot"
                  cardtitle="Assigned Jobs"
                  cardnumber="4"
                  cardpara="You have pending assigned jobs"
                />
              </div>
              <div className="col-md-4 ">
                <DashCard
                  bgclass="second-card"
                  iclass="fa-solid fa-book-open"
                  cardtitle="Open Jobs"
                  cardnumber="1799"
                  cardpara="Total Number of Open Jobs"
                />
              </div>
              <div className="col-md-4 ">
                <DashCard
                  bgclass="third-card"
                  iclass="fa-solid fa-earth-americas"
                  cardtitle="Total Jobs"
                  cardnumber="35209"
                  cardpara="All Jobs coming from all VMS "
                />
              </div>
            </div>
          </div>

          <div className="container mt-4">
            <div className="row">
              <div className="col-md-5">
                <div className="team-table">
                  <div className="dash-table-head">
                    <div className="ver-line"></div>
                    <h5>Team Members</h5>
                  </div>
                  <hr className="border-hr" />
                  <div className=" team-table-data d-flex justify-content-between align-items-end mt-3">
                    <div className="team-info">
                      <h6>Neha Singh</h6>
                      <span>neha@midasconsulting.org</span>
                    </div>
                    <div className="team-desig">
                      <h6>Team Lead</h6>
                    </div>
                  </div>
                  <div className="team-table-data d-flex justify-content-between align-items-end mt-3">
                    <div className="team-info">
                      <h6>Gaurav Kumar</h6>
                      <span>gaurav@midasconsulting.org</span>
                    </div>
                    <div className="team-desig">
                      <h6>Recruiter</h6>
                    </div>
                  </div>
                  <div className=" team-table-data d-flex justify-content-between align-items-end mt-3">
                    <div className="team-info">
                      <h6>Mansi Singh</h6>
                      <span>mansi@midasconsulting.org</span>
                    </div>
                    <div className="team-desig">
                      <h6>Recruiter</h6>
                    </div>
                  </div>
                  <div className=" team-table-data d-flex justify-content-between align-items-end mt-3">
                    <div className="team-info">
                      <h6>Naman Singh</h6>
                      <span>naman@midasconsulting.org</span>
                    </div>
                    <div className="team-desig">
                      <h6>Recruiter</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="team-table">
                  {/* <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"300px"}
    /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortalDash;
